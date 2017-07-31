import reqwest from 'reqwest'

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

//type: one of: ["success", "warning", "danger", "info", "default", "primary"]
export const Open_MessageBox = (type, title, message) => {
    return {
        type: 'OPEN_MESSAGEBOX',
        messageBoxType: type,
        messageBoxTitle: title,
        messageBoxMessage: message
    }
}

export const Close_MessageBox = (followUpAction) => {

    return {
        type: 'CLOSE_MESSAGEBOX',
        messageBoxFollowUp: followUpAction
    }
}

/*********************************************************************************/

export const Register_Action = (email, password, recaptchaResponse) => {


    return function (dispatch) {
        dispatch(Open_Spinner());
        return reqwest({
            url: 'http://localhost:8090/user/registration',
            method: 'get',
            type: 'json',
            crossOrigin: true,
            withCredentials: false,
            error: function (err) {
                dispatch(Open_MessageBox('danger', 'Unexpected Error', '<h3>' + err.status + '-' + err.statusText + '</h3>' + err.responseText));
                console.log('error in Register_Action,', err);
            },

            success: function (response) {
                console.log('successfully Register_Action, ', response);

                dispatch(Close_Spinner());
                dispatch(Register_Succeed_Action(response));
            }

        })
    }
}

export const Register_Succeed_Action = (response) => {
    return {
        type: 'Register_Succeed',
        EV_AGREEMENT_TEXTS: response.EV_AGREEMENT_TEXTS,
        EV_FERPA_RIGHTS_TEXTS: response.EV_FERPA_RIGHTS_TEXTS,
        EV_FERPA_DIRECTORY_TEXTS: response.EV_FERPA_DIRECTORY_TEXTS
    }
}
