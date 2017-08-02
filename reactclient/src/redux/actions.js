import reqwest from 'reqwest'
import fetch from 'isomorphic-fetch'

/*********************************************************************************/
export const Open_Spinner = () => {
    return {
        type: 'OPEN_SPINNER'
    }
}

export const Close_Spinner = () => {

    return {
        type: 'CLOSE_SPINNER'
    }
}


/*********************************************************************************/

export const Register_Action = (email, password, recaptchaResponse) => {




    return function (dispatch) {
        dispatch(Open_Spinner());

        return fetch('http://localhost:8090/user/registration', {
            method: 'POST',
            body: {email: email, password: password}
        })
            .then(res => {
                console.log(res.json());

                if(res.status >= 400) {
                    throw new Error(res);
                }

                return res.json()

            })
            .then(json => dispatch(Register_Succeed_Action()))
            .then(json => dispatch(Close_Spinner()))
            .catch(ex => dispatch(Register_Fail_Action(ex)));


        /* return reqwest({
            url: 'http://localhost:8090/user/registration',
            method: 'post',
            type: 'json',
            crossOrigin: true,
            withCredentials: false,
            data: {email: email, password: password, recaptchaResponse: recaptchaResponse},
            success:function(resp){
                conslog.log(resp);
                dispatch(Register_Succeed_Action(resp));

            },
            error: function (err) { console.log(err) },
            complete: function(resp){

            }


        })

            .then(function(resp){
                conslog.log(resp);
                dispatch(Register_Succeed_Action(resp));

            })
            .fail(function(err, msg){
                conslog.log(err, msg);
                dispatch(Register_Fail_Action(msg));

            })
            .always(function(resp){
                //dispatch(Close_Spinner());
            });
            */
    }
}

export const Register_Succeed_Action = () => {
    return {
        type: 'Register_Succeed'
    }
}

export const Register_Fail_Action = (message) => {
    console.log(message);
    return {
        type: 'Register_Fail',
        message: message
    }
}