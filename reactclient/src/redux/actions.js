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