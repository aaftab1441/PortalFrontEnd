import * as Constants from "../../../../actions/usercontainers/common/genericmerchantlist/constants";
import * as AppConstants from "../../../../../utilities/constants";
// Define initial states.
const initialState = {
  task: '',
  loading: false,
  searchType: 'main/all',
  status: 'A',
  navigationParams: {},
  data: [],
  allData: {}, 
  changeState: 0,
  merchantSearch: {legalName: '', dbaName: '', ownerLastName: '', mid: ''},
};

const genericMerchantListReducer = (state = initialState, action) => {
  switch (action.type) {
      case Constants.MOVE_TO_URL_ACTION:
        return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
      case Constants.RECEIVED_DATA_ERROR:
        return { ...state, loading: false };
      case Constants.RECEIVED_DATA_ACTION:
        return { ...state, loading: false, data: action.data.Data, allData: action.data, changeState: state.changeState + 1 };
      case Constants.GET_MERCHANTS_ACTION:
        return { ...state, loading: true, status: action.status, searchType: action.searchType };
      case Constants.HANDLE_ITEM_CHANGE_ACTION:
        let items = state.merchantSearch;
        if(typeof action.checked !== "undefined"){
          items[action.theName] = action.checked? action.theValue: 0; 
        }else {
          items[action.theName] = action.theValue.toUpperCase(); 
        }
        return { ...state, merchantSearch:  items, changeState: state.changeState + 1 };                
    
      case Constants.RESET_TASK_ACTION:
        return { ...state, task: '', loading: false};
    default:
      return state;
  }
};

export default  genericMerchantListReducer;