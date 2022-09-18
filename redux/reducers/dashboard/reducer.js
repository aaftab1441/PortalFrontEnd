import * as Constants from  "../../actions/dashboard/constants";

// Define initial states.
const initialState = {
  user: {},
  org: {},
  meta: {loggedIn: false},
  merchantSearchParams: {legalName: "", dbaName: "", zip: "", mid: ""},
  config: {},
  currentMid: '',
  openMerchantSelectList: false,
  changeState: 0,
};



const dashboardReducer = (state = initialState, action) => {
  //console.log("Central Action", action);
  switch (action.type) {
    case Constants.OPEN_MERCHANT_LIST_ACTION:
      return { ...state, openMerchantSelectList: true, changeState: state.changeState + 1 };              
    case Constants.CLOSE_MERCHANT_LIST_ACTION:
      return { ...state, openMerchantSelectList: false, changeState: state.changeState + 1 };              
    case Constants.SELECT_MERCHANT_ACTION:
      return { ...state, openMerchantSelectList: false, currentMid: action.merchant.mm_cust_no, changeState: state.changeState + 1 };              
    case Constants.HANDLE_MERCHANT_SEARCH_ITEM_CHANGE_ACTION:
      let items = state.merchantSearchParams;
      if(typeof action.checked !== "undefined"){
        items[action.theName] = action.checked? action.theValue: 0; 
      }else {
        items[action.theName] = action.theValue.toUpperCase(); 
      }
      return { ...state, merchantSearchParams:  items, changeState: state.changeState + 1 };              

    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.SUBMIT_LOGIN_ACTION:
      return { ...state, loading: true };
    case Constants.RECEIVED_DASHBOARD_DATA_ERROR:
      return { ...state, loading: false };
    case Constants.RECEIVED_DASHBOARD_DATA_ACTION:
      return { ...state, loading: false };
    case Constants.GET_DASHBOARD_DATA:
      return { ...state, loading: true };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
    default:
      return state;
  }
};

export default  dashboardReducer;