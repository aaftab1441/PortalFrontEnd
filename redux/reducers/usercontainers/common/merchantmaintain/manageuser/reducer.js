
// Define initial states.
import * as Constants from "/redux/actions/usercontainers/common/merchantmaintain/manageuser/constants";
import * as AppConstants from "/utilities/constants";
import * as Utils from "/utilities/util";
const initialState = {
  task: '',
  loading: false,
  currentUser: {UserDetails: {}, Permissions: {}, MerchantUser: {}},
  searchParams: {legalName: '', dbaName: '', ownerLastName: '', mid: ''},
  pageInfo: {Page: 1, PageSize: 10, SortDirection: 'ASC', SortField: 'mm_cust_no' },
  changeState: 0,
  count: 0,
  currentMerchant: {},
  merchants: [],
  merchantSearchData: [],
  fromLocation: '',
  openUserAccess: false,
};

const maintainManageUserReducer = (state = initialState, action) => {
  console.log("Manage Action", action);
  switch (action.type) {
    case Constants.HANDLE_MERCHANT_SEARCH_ITEM_CHANGE_ACTION:
      let items = state.searchParams;
      if(typeof action.checked !== "undefined"){
        items[action.theName] = action.checked? action.theValue: 0; 
      }else {
        items[action.theName] = action.theValue.toUpperCase(); 
      }
      return { ...state, searchParams:  items, changeState: state.changeState + 1 };   
    case Constants.RECEIVED_MERCHANT_SEARCH_DATA_ACTION:
      if(action.data.Success){
        return { ...state, merchantSearchData: action.data.Data, count: action.data.Count, loading: false };
      }
      return { ... state, loading: false};
             
    case Constants.CHANGE_PAGE_ACTION:
      return { ...state, pageInfo: action.pageInfo, loading: false };   

    case Constants.CLOSE_USER_MERCHANT_ACCESS:
      return { ...state, openUserAccess: false, changeState: state.changeState + 1 }; 
      case Constants.OPEN_USER_MERCHANT_ACCESS:
        return { ...state, currentMerchant: action.merchant, openUserAccess: true, changeState: state.changeState + 1 }; 
      case Constants.REGISTER_FROM_LOCATION:
      return { ...state, fromLocation: action.fromLocation, changeState: state.changeState + 1 };
    case Constants.ADD_USER_ACTION:
      let newUser = {UserDetails: {}, Permissions: {}, MerchantUser: {}};
      if(action.parentItem && action.parentItem.Merchant && action.parentItem.Merchant.mm_cust_no){
        newUser.Permissions.mid = action.parentItem.Merchant.mm_cust_no;
      }
      newUser.Permissions.User_Level_Code = "MERCHANT";
      return { ...state, currentUser: newUser, changeState: state.changeState + 1 };
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url };
    case Constants.CLEAR_USER_ACTION:
        return { ...state, currentUser: {UserDetails: {}, Permissions: {}, MerchantUser: {}}, changeState: state.changeState + 1 };
    case Constants.RECEIVED_USER_DATA_ACTION:
      let currentUser = state.currentUser;
      
      if(action.data.Success){
        let result = action.data.result;
        let user = Utils.getFirstObject(result.User);
        let permission = result.Permissions;
        let merchantUser = Utils.getFirstObject(result.MerchantUser);
        currentUser.UserDetails = user;
        currentUser.Permissions = permission;
        currentUser.MerchantUser = merchantUser;
        currentUser.UserMerchants = result.UserMerchants;
        return { ...state,  openUserAccess: false, currentUser: currentUser, merchants: action.data.merchants, merchantSearchData: action.data.Data, count: action.data.Count, changeState: state.changeState + 1 };  
      }
      break;
    case Constants.HANDLE_PERMISSION_ITEM_CHANGE_ACTION:
      let editUserPermission = state.currentUser;  
      editUserPermission.Permissions[action.theName] = action.theValue;
      return { ...state, currentUser: editUserPermission , changeState: state.changeState + 1 };
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      let editUser = state.currentUser;  
      editUser.UserDetails[action.theName] = action.theValue;
      return { ...state, currentUser: editUser , changeState: state.changeState + 1 };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
    default:
      return state;
  }
};

export default  maintainManageUserReducer;