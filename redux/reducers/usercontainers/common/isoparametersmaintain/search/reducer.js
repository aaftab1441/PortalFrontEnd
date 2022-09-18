import * as Constants from "/redux/actions/usercontainers/common/isoparametersmaintain/search/constants";
import * as AppConstants from "/utilities/constants";


// Define initial states.
const initialState = {
  task: '',
  loading: false,
  navigationParams: {},
  isoParametersSearchData: [], 
  IsoParametersSearchParams: {ISO_Code: '', VI_Settle_Fee: '', MC_Settle_Fee: '', DS_Settle_Fee: ''},
  changeState: 0,
};

const isoparametersMaintainSearchReducer = (state = initialState, action) => {

  //console.log("Merchant Search  Action", action);
  switch (action.type) {
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };   
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.VIEW_ISOPARAMETERS_ACTION:
      return { ...state, task:  Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.ISOPARAMETERS_SEARCH_PATH };
    case Constants.RECEIVED_ISOPARAMETERS_SEARCH_DATA_ERROR:
      return { ...state, loading:  false};    
    case Constants.RECEIVED_ISOPARAMETERS_SEARCH_DATA_ACTION:
      let isoparameterdata = [];
      if(action.data.Success){
        isoparameterdata = action.data.result;
      }  
      return { ...state, loading:  false, isoParametersSearchData: isoparameterdata, changeState: state.changeState + 1};   
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      let items = state.IsoParametersSearchParams;
      if(typeof action.checked !== "undefined"){
        items[action.theName] = action.checked? action.theValue: 0; 
      }else {
        items[action.theName] = action.theValue.toUpperCase(); 
      }
      return { ...state, IsoParametersSearchParams:  items, changeState: state.changeState + 1};                
    case Constants.GET_ISOPARAMETERS_SEARCH_DATA:
      return { ...state, loading:  true};   
        
    default:
      return state;
  }
};

export default  isoparametersMaintainSearchReducer;