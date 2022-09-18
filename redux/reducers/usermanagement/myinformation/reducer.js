
// Define initial states.
import * as Constants from "../../../actions/usermanagement/myinformation/constants";
import * as AppConstants from "../../../../utilities/constants";
import * as Utils from "../../../../utilities/util";
const initialState = {
  task: '',
  loading: false,
  currentUser: {UserDetails: {}, Permissions: {}, MerchantUser: {}},
  changeState: 0,
  fromLocation: '',
};

const myInformationReducer = (state = initialState, action) => {
  console.log("Manage Action", action);
  switch (action.type) {
    case Constants.REGISTER_FROM_LOCATION:
      return { ...state, fromLocation: action.fromLocation, changeState: state.changeState + 1 };
    case Constants.ADD_USER_ACTION:
      let newUser = {UserDetails: {}, Permissions: {}, MerchantUser: {}};
      if(action.parentItem && action.parentItem.IsoDetail && action.parentItem.IsoDetail.ISO_CODE){
        newUser.Permissions.iso = action.parentItem.IsoDetail.ISO_CODE;
      }else if(action.parentItem && action.parentItem.Detail && action.parentItem.Detail.Code){
        newUser.Permissions.sub_iso = action.parentItem.Detail.Code;
      }else if(action.parentItem && action.parentItem.Detail && action.parentItem.Detail.Code){
        newUser.Permissions.sales_office = action.parentItem.Detail.Code;
      }else if(action.parentItem && action.parentItem.Detail && action.parentItem.Detail.Code){
        newUser.Permissions.sales_agent = action.parentItem.Detail.Code;
      }
      return { ...state, currentUser: newUser, changeState: state.changeState + 1 };
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url };
    case Constants.RECEIVED_USER_DATA_ACTION:
      let currentUser = state.currentUser;
      
      if(action.data.Success){
        let result = action.data.result;
        let user = Utils.getFirstObject(result.User);
        let permission = Utils.getFirstObject(result.Permissions);
        let merchantUser = Utils.getFirstObject(result.MerchantUser);
        currentUser.UserDetails = user;
        currentUser.Permissions = permission;
        currentUser.MerchantUser = merchantUser;
        return { ...state, currentUser: currentUser, changeState: state.changeState + 1 };  
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

export default  myInformationReducer;