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
                dispatch(Close_Spinner());
                return res;
            })
            .then(res => {

                if (res.status >= 400) {
                    return res.json()
                        .then(function(err) {
                            throw new Error(err.message);
                        });
                }
                else{
                    return res.json()
                }

            })
            .then(json => {

                dispatch(Register_Succeed_Action());

            })
            .catch(ex => dispatch(Register_Fail_Action(ex)));



/*
         return reqwest({
            url: 'http://localhost:8090/user/registration',
            method: 'post',
            type: 'json',
            crossOrigin: true,
            withCredentials: false,
            data: {email: email, password: password, recaptchaResponse: recaptchaResponse}


        })

            .then(function(resp){
                conslog.log(resp);
                dispatch(Register_Succeed_Action());

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

export const Register_Fail_Action = (ex) => {

    return {
        type: 'Register_Fail',
        message: ex.message
    }
}