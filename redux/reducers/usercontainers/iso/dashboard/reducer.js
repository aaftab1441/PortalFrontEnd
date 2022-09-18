import * as Constants from "../../../../actions/usercontainers/iso/isodashboard/constants";
// Define initial states.
const initialState = {
  task: '',
  loading: false,
  navigationParams: {},
};

const isoDashboardReducer = (state = initialState, action) => {
  //console.log("ISO Merchant Dashboard", action);
  switch (action.type) {
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.SUBMIT_LOGIN_ACTION:
      return { ...state,  loading: true }; 
    case Constants.RECEIVED_DASHBOARD_DATA_ERROR:
      return { ...state,  loading: false };   
    case Constants.RECEIVED_DASHBOARD_DATA_ACTION:
      return { ...state,  loading: false };   
    case Constants.GET_DASHBOARD_DATA:
      return { ...state,  loading: true };   

    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };   
    default:
      return state;
  }
};

export default  isoDashboardReducer;