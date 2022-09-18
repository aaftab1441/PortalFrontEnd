import * as Constants from "/redux/actions/organization-management/sales-agent/constants";
import * as AppConstants from "/utilities/constants";
// Define initial states.
const initialState = {
  task: '',
  loading: false,
  list: [],
  userSearchParams: {emailId: '', firstName: '', lastName: '', city: '' },
  currentItem: {Detail: {}, Users: []}, 
  changeState: 0,
  panel: 0,
  params: {name: '', streetAddress: '', city: '', state: ''},
};

const salesAgentManagementReducer = (state = initialState, action) => {
  console.log("Sales Action", action);
  switch (action.type) {
    case Constants.PANEL_CHANGE_ACTION:
      return { ...state, panel: action.newPanel};
    case Constants.HANDLE_USER_SEARCH_CHANGE_ACTION:
      let currentSearch = state.userSearchParams;
      currentSearch[action.theName] = action.theValue;
      return { ...state, loading: false, userSearchParams: currentSearch, changeState: state.changeState + 1 };
    case Constants.EDIT_ITEM:
      let editItem = {Detail: {}, Users: []};
      editItem.Detail = action.item;      
      editItem.Detail.Parent_Code = action.parentCode;
      editItem.Detail.Parent_Type = action.parentType;
      editItem.Detail.Parent_Id  = action.parentId;
      return { ...state, currentItem:  editItem, changeState: state.changeState + 1  };   
    case Constants.ADD_ITEM:
      let newItem = {Detail: {}, Users: []};
      
      if(!action.parentCode){
        newItem.Detail.Parent_Code = action.user.Permissions.iso;
        newItem.Detail.Parent_Type = action.user.Permissions.User_Level_Code;
        newItem.Detail.Parent_Id  = action.user.Permissions.iso_id;
  
      }else {
        newItem.Detail.Parent_Code = action.parentCode;
        newItem.Detail.Parent_Type = action.parentType;
        newItem.Detail.Parent_Id  = action.parentId;
  
      }
      return { ...state, currentItem:  newItem, changeState: state.changeState + 1  };   
  
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      let items = state.params;
      if(typeof action.checked !== "undefined"){
        items[action.theName] = action.checked? action.theValue: 0; 
      }else {
        items[action.theName] = action.theValue.toUpperCase(); 
      }
      return { ...state, params:  items, changeState: state.changeState + 1 };    
    case Constants.GET_ITEMS:
      return { ...state, loading: false };
    case Constants.RECEIVED_GET_ITEMS_ACTION:
      return { ...state, loading: false, list: action.data.result, changeState: state.changeState + 1};
    case Constants.RECEIVED_GET_ITEMS_ERROR:
      return { ...state, loading: false };
    case Constants.GET_ITEM:
      let subIsoItem = {};
      subIsoItem.Detail = action.item;
      return { ...state, currentItem: subIsoItem, loading: false, changeState: state.changeState + 1 };
    case Constants.HANDLE_EDIT_ITEM_CHANGE_ACTION:
        let currentItem = state.currentItem;
        currentItem.Detail[action.theName] = action.theValue;
        return { ...state, loading: false, currentItem: currentItem, changeState: state.changeState + 1 };
    case Constants.RECEIVED_GET_ITEM_ACTION:
      return { ...state, loading: false, currentItem: action.data.result, changeState: state.changeState + 1 };
    case Constants.RECEIVED_GET_ITEM_ERROR:
      return { ...state, loading: false };
    case Constants.DELETE_ITEM:
      return { ...state, loading: false };
    case Constants.RECEIVED_DELETE_ITEM_ACTION:
      return { ...state, loading: false };
    case Constants.RECEIVED_DELETE_ITEM_ERROR:
      return { ...state, loading: false };
    case Constants.SAVE_ITEM:
      return { ...state, loading: true, changeState: state.changeState + 1 };
    case Constants.RECEIVED_SAVE_ITEM_ERROR:
      return { ...state, loading: false, changeState: state.changeState + 1 };
    case Constants.RECEIVED_SAVE_ITEM_ACTION:
      return { ...state, loading: false, changeState: state.changeState + 1 };
    default:
      return state;
  }
};

export default  salesAgentManagementReducer;