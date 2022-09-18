import * as Constants from "/redux/actions/organization-management/iso/constants";
import * as AppConstants from "/utilities/constants";
// Define initial states.
const initialState = {
  task: '',
  loading: false,
  list: [],
  userSearchParams: {emailId: '', firstName: '', lastName: '', city: '' },
  subIsoParams: { name: '', streetAddress: '', city: '', state: ''},
  salesOfficeParams: { name: '', streetAddress: '', city: '', state: ''},
  salesAgentParams: {emailId: '', firstName: '', lastName: '', city: '' },
  currentItem: {IsoDetail: {}, Users: [], SubIsos: [], SalesOffices:[] , SalesAgents:[]}, 
  changeState: 0,
  isoPanel: 0,
  params: {name: '', streetAddress: '', city: '', state: ''},
};

const isoManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.ISO_PANEL_CHANGE_ACTION:
        return { ...state, isoPanel: action.newPanel};
    case Constants.HANDLE_USER_SEARCH_CHANGE_ACTION:
      let currentSearch = state.userSearchParams;
      currentSearch[action.theName] = action.theValue;
      return { ...state, loading: false, userSearchParams: currentSearch, changeState: state.changeState + 1 };
    case Constants.HANDLE_SUB_ISO_SEARCH_CHANGE_ACTION:
      let currentSubIsoParams = state.subIsoParams;
      currentSubIsoParams[action.theName] = action.theValue;
      return { ...state, loading: false, subIsoParams: currentSubIsoParams, changeState: state.changeState + 1 };
    case Constants.HANDLE_SALES_OFFICE_SEARCH_CHANGE_ACTION:
      let currentSalesOfficeParams = state.salesOfficeParams;
      currentSalesOfficeParams[action.theName] = action.theValue;
      return { ...state, loading: false, salesOfficeParams: currentSalesOfficeParams, changeState: state.changeState + 1 };
    case Constants.HANDLE_SALES_AGENT_SEARCH_CHANGE_ACTION:
      let currentSalesAgentParams  = state.salesAgentParams;
      currentSalesAgentParams[action.theName] = action.theValue;
      return { ...state, loading: false, salesAgentParams: currentSalesAgentParams, changeState: state.changeState + 1 };
  
     case Constants.ADD_ISO:
      let newIso = {IsoDetail: {}, Users: [], SubIsos: [], SalesOffices:[] , SalesAgents:[]};
      return { ...state, currentItem:  newIso, changeState: state.changeState + 1  };   
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      let items = state.params;
      if(typeof action.checked !== "undefined"){
        items[action.theName] = action.checked? action.theValue: 0; 
      }else {
        items[action.theName] = action.theValue.toUpperCase(); 
      }
      return { ...state, params:  items, changeState: state.changeState + 1 };    
    case Constants.GET_ISOS:
      return { ...state, loading: false };
    case Constants.RECEIVED_GET_ISOS_ACTION:
      return { ...state, loading: false, list: action.data.result, changeState: state.changeState + 1};
    case Constants.RECEIVED_GET_ISOS_ERROR:
      return { ...state, loading: false };
    case Constants.GET_ISO:
      let isoItem = {};
      isoItem.IsoDetail = action.iso;
      return { ...state, currentItem: isoItem, loading: false, changeState: state.changeState + 1 };
    case Constants.HANDLE_EDIT_ITEM_CHANGE_ACTION:
        let currentItem = state.currentItem;
        currentItem.IsoDetail[action.theName] = action.theValue;
        console.log("New Value for ", action.theName, currentItem.IsoDetail[action.theName]);
        return { ...state, loading: false, currentItem: currentItem, changeState: state.changeState + 1 };
    case Constants.RECEIVED_GET_ISO_ACTION:
      return { ...state, loading: false, currentItem: action.data.result, changeState: state.changeState + 1 };
    case Constants.RECEIVED_GET_ISO_ERROR:
      return { ...state, loading: false };
    case Constants.DELETE_ISO:
      return { ...state, loading: false };
    case Constants.RECEIVED_DELETE_ISO_ACTION:
      return { ...state, loading: false };
    case Constants.RECEIVED_DELETE_ISO_ERROR:
      return { ...state, loading: false };
    case Constants.SAVE_ISO:
      return { ...state, loading: true, changeState: state.changeState + 1 };
    case Constants.RECEIVED_SAVE_ISO_ERROR:
      return { ...state, loading: false, changeState: state.changeState + 1 };
    case Constants.RECEIVED_SAVE_ISO_ACTION:
      return { ...state, loading: false, changeState: state.changeState + 1 };
    default:
      return state;
  }
};

export default  isoManagementReducer;