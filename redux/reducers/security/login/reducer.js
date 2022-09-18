
// Define initial states.
import * as Constants from "../../../actions/security/login/constants";
import * as AppConstants from "../../../../utilities/constants";
const initialState = {
  task: '',
  loading: false,
};

const loginReducer = (state = initialState, action) => {
  //console.log("Central Action", action);
  switch (action.type) {
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url };
    case Constants.SUBMIT_LOGIN_ACTION:
      return { ...state, loading: true };
    case Constants.SUBMITTED_LOGIN_INFO_ERROR:
      return { ...state, loading: false };
    case Constants.RECEIVED_LOGIN_INFO_ACTION:
      if(action.data.Success){
        return { ...state, loading: false, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.DASHBOARD_PATH };
      }
      return { ...state, loading: false};
    case Constants.FORGOT_PASSWORD_ACTION:
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.SECURITY_RESET_PATH };
    case Constants.SUBMITTED_LOGIN_INFO_ERROR:
      return { ...state, loading: false };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
    default:
      return state;
  }
};

export default  loginReducer;