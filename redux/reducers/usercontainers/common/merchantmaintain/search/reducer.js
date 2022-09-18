import * as Constants from "/redux/actions/usercontainers/common/merchantmaintain/search/constants";
import * as AppConstants from "/utilities/constants";


// Define initial states.
const initialState = {
  task: '',
  loading: false,
  navigationParams: {},
  searchParams: {legalName: '', dbaName: '', ownerLastName: '', mid: ''},
  pageInfo: {Page: 1, PageSize: 10, SortDirection: 'ASC', SortField: 'mm_cust_no' },
  changeState: 0,
  count: 0,
  merchantSearchData: [],
};

const merchantMaintainSearchReducer = (state = initialState, action) => {
  //console.log("Merchant Search  Action", action);
  switch (action.type) {
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };   
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.VIEW_MERCHANT_ACTION:
      return { ...state, task:  Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_MAINTAIN_DETAIL_PATH };
    case Constants.RECEIVED_MERCHANT_SEARCH_DATA_ERROR:
      return { ...state, loading:  false};    
    case Constants.RECEIVED_MERCHANT_SEARCH_DATA_ACTION:
      if(action.data.Success){
        return { ...state, merchantSearchData: action.data.Data, count: action.data.Count, loading: false };
      }
      return { ... state, loading: false};
    case Constants.CHANGE_PAGE_ACTION:
      return { ...state, pageInfo: action.pageInfo, loading: false };   
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      let items = state.searchParams;
      if(typeof action.checked !== "undefined"){
        items[action.theName] = action.checked? action.theValue: 0; 
      }else {
        items[action.theName] = action.theValue.toUpperCase(); 
      }
      return { ...state, searchParams:  items, changeState: state.changeState + 1};                
    case Constants.GET_MERCHANT_SEARCH_DATA:
      return { ...state, loading:  true};   
        
    default:
      return state;
  }
};

export default  merchantMaintainSearchReducer;