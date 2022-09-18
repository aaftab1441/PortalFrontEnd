import * as Constants from "../../../../actions/usercontainers/das/isolistdashboard/constants";
import * as AppConstants from "../../../../../utilities/constants";

// Define initial states.
const initialState = {
  task: '',
  loading: false,
  navigationParams: {},
  currentStatus: 'all',
  changeState: 0,
  isoMerchantList: [], 
  allData: {},
};

const isoListDashboardReducer = (state = initialState, action) => {
  //console.log("Merchant Add Step 1 Action", action);
  switch (action.type) {
    case Constants.GET_ISO_MERCHANT_COUNT_DATA:
      return { ...state, currentStatus: action.searchType};
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.RECEIVED_ISO_DASHBOARD_DATA_ERROR:
      return { ...state, loading: false };
    case Constants.RECEIVED_ISO_DASHBOARD_DATA_ACTION:
      return { ...state, loading: false };   
    case Constants.VIEW_ISO_DETAIL_ACTION:      
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.DAS_ISO_DASHBOARD_PATH };
    case Constants.GET_ISO_DASHBOARD_DATA:
      return { ...state };
    case Constants.RECEIVED_ISO_MERCHANT_COUNT_DATA_ACTION:        
      return { ...state, isoMerchantList: action.data.Data, allData: action.data, changeState: state.changeState + 1 };   
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };   
    default:
      return state;
  }
};

export default  isoListDashboardReducer;