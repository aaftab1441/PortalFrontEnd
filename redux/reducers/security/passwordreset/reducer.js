import * as Constants from "../../../actions/security/passwordreset/constants";
import * as AppConstants from "../../../../utilities/constants";
// Define initial states.
const initialState = {
  task: '',
  loading: false,
};

const passwordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.RECEIVE_PASSWORD_RESET_ACTION:
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.WELCOME_PATH };  
    case Constants.SUBMIT_PASSWORD_RESET_INFO_ACTION:
      return { ...state, loading: false };  
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url };  
      
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false};
    default:
      return state;
  }
};

export default  passwordResetReducer;