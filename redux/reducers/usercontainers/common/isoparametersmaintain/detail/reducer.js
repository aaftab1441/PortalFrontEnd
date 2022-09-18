import * as Constants from "/redux/actions/usercontainers/common/isoparametersmaintain/detail/constants";
import * as SearchConstants from "/redux/actions/usercontainers/common/isoparametersmaintain/detail/constants";

// Define initial states.
const initialState = {
  task: '',
  loading: false,
  sectionLoading: {batch: false, transactions: false, ach: false, chargebacks: false }, 
  currentIsoParameter: {IsoParameter: {}, Users: []},
  changeState: 0,
  itemSearch: {ISO_Code: '', VI_Settle_Fee: '', MC_Settle_Fee: '', DS_Settle_Fee: ''},  
};
 
const isoparametersMaintainDetailReducer = (state = initialState, action) => {

  console.log("ISO Parameters Detail Action", action);
  switch (action.type) {
    case Constants.CHANGE_PAGE_ACTION:
      let sectionLoading  = state.sectionLoading;
      sectionLoading[action.pageInfo.Name] = true;
      return { ...state, sectionLoading: sectionLoading, changeState: state.changeState + 1};
    case Constants.HANDLE_SEARCH_CHANGE_ACTION:
      let itemSearch = state.itemSearch;
      itemSearch[action.container][action.theName] = action.theValue; 
      return {...state, itemSearch: itemSearch, changeState: state.changeState + 1};
      
    case SearchConstants.VIEW_ISOPARAMETERS_ACTION:
      let currentIsoParameter = state.currentIsoParameter;  
      currentIsoParameter.IsoParameter = action.isoparameter;
      return { ...state, currentIsoParameter: currentIsoParameter, changeState: state.changeState + 1 };  

    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
      
    case Constants.GET_ISOPARAMETERS_ACTION:
      return { ...state, loading: true };
    case Constants.RECEIVED_ISOPARAMETERS_DETAIL_DATA_ERROR:
      return { ...state, loading: false };
    case Constants.RECEIVED_ISOPARAMETERS_DETAIL_DATA_ACTION:
      if(action.data.result){
        return { ...state, currentIsoParameter: action.data.result, changeState: state.changeState + 1, loading: false };
      }
      break;
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      let items = state.isoParametersDetail;

      if(typeof action.checked !== "undefined"){
        items[action.theName] = action.checked? action.theValue: 0; 
      }else {
        items[action.theName] = action.theValue.toUpperCase(); 
      }
      return { ...state, search:  items};          
    case Constants.GET_ISOPARAMETERS_DETAIL_DATA:
      return { ...state, loading: true };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
        
    default:
      return state;
  }
};

export default  isoparametersMaintainDetailReducer;