/**
 * Created by dayong on 7/31/17.
 */
function Reducer(state = {}, action)  {
    switch (action.type){

        case 'OPEN_SPINNER':

            return Object.assign({}, state,  {showSpinner: true });

        case 'CLOSE_SPINNER':

            return Object.assign({}, state, { showSpinner: false });

        case 'OPEN_MESSAGEBOX':
            return  Object.assign({}, state, {
                messageBoxType: action.messageBoxType,
                messageBoxTitle: action.messageBoxTitle,
                messageBoxMessage: action.messageBoxMessage,
                showMessageBox: true

            });

        case 'CLOSE_MESSAGEBOX':
            return  Object.assign({}, state, {
                messageBoxFollowUp: action.messageBoxFollowUp,
                showMessageBox: false

            });

        case 'Register_Succeed':

            return  Object.assign({}, state, {
                EV_AGREEMENT_TEXTS: action.EV_AGREEMENT_TEXTS,
                EV_FERPA_RIGHTS_TEXTS: action.EV_FERPA_RIGHTS_TEXTS,
                EV_FERPA_DIRECTORY_TEXTS: action.EV_FERPA_DIRECTORY_TEXTS

            });



        default:
            return state;
    }
}

export default Reducer