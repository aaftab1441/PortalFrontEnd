import * as Constants from "../../../../actions/usercontainers/das/isomerchantdashboard/constants";
import * as AppConstants from "../../../../../utilities/constants";
// Define initial states.
const initialState = {
  task: '',
  loading: false,
  navigationParams: {},
};

const isoMerchantDashboardReducer = (state = initialState, action) => {
  //console.log("ISO Merchant Dashboard", action);
  switch (action.type) {
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.RECEIVED_ISO_MERCHANT_DASHBOARD_DATA_ERROR:
      return { ...state, loading:  false}; 
    case Constants.RECEIVED_ISO_MERCHANT_DASHBOARD_DATA_ACTION:
      return { ...state, loading:  false}; 
    case Constants.VIEW_MERCHANT_DETAIL_ACTION:
      return { ...state, task:  Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_DETAIL_PATH };  
    case Constants.RECEIVED_ISO_MERCHANT_DASHBOARD_DATA_ERROR:
      return { ...state,  loading: false };  
    case Constants.GET_ISO_MERCHANT_DASHBOARD_DATA:
      return { ...state,  loading: true };  
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };   
    default:
      return state;
  }
};

export default  isoMerchantDashboardReducer;