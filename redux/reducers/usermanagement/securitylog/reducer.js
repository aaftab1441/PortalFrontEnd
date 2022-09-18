
// Define initial states.
import * as Constants from "../../../actions/usermanagement/securitylog/constants";
import * as AppConstants from "../../../../utilities/constants";
const initialState = {
  task: '',
  loading: false,
};

const securityLogReducer = (state = initialState, action) => {
  //console.log("Central Action", action);
  switch (action.type) {
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
    default:
      return state;
  }
};

export default  securityLogReducer;