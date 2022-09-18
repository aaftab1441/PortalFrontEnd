
// Define initial states.
import * as Constants from "/redux/actions/usermanagement/manageuser/constants";
import * as ListUsersConstants from "/redux/actions/usermanagement/listusers/constants";
import * as AppConstants from "/utilities/constants";
import * as Utils from "/utilities/util";
const initialState = {
  task: '',
  loading: false,
  currentUser: {UserDetails: {}, Permissions: {}, MerchantUser: {}, UserMerchants: []},
  changeState: 0,
  fromLocation: '',
};

const manageUserReducer = (state = initialState, action) => {
  console.log("Manage Action", action);
  switch (action.type) {
    case Constants.REGISTER_FROM_LOCATION:
      return { ...state, fromLocation: action.fromLocation, changeState: state.changeState + 1 };
    case ListUsersConstants.ADD_USER_ACTION:
    case Constants.ADD_USER_ACTION:
      let newUser = {UserDetails: {}, Permissions: {}, MerchantUser: {}};
      if(action.parentItem && action.parentItem.IsoDetail && action.parentType == 'ISO'){
        newUser.Permissions.iso = action.parentItem.IsoDetail.ISO_CODE;
        newUser.Permissions.iso_id = action.parentItem.IsoDetail.AutoIdent;
        newUser.UserDetails.User_Level_Code = 'ISO';
      }else if(action.parentItem && action.parentItem.Detail && action.parentType == 'SUB-ISO'){
        newUser.Permissions.sub_iso = action.parentItem.Detail.Code;
        newUser.Permissions.sub_iso_id = action.parentItem.Detail.AutoIdent;
        newUser.UserDetails.User_Level_Code = 'SUB-ISO';
        newUser.Permissions.User_Level_Code = 'SUB-ISO';
      }else if(action.parentItem && action.parentItem.Detail && action.parentType == 'SALES-OFFICE'){
        newUser.Permissions.sales_office = action.parentItem.Detail.Code;
        newUser.Permissions.sales_office_id = action.parentItem.Detail.AutoIdent;
        newUser.UserDetails.User_Level_Code = 'SALES-OFFICE';
        newUser.Permissions.User_Level_Code = 'SALES-OFFICE';
      }else if(action.parentItem && action.parentItem.Detail && action.parentType == 'SALES-AGENT'){
        newUser.Permissions.sales_agent = action.parentItem.Detail.Code;
        newUser.Permissions.sales_agent_id = action.parentItem.Detail.AutoIdent;
        newUser.UserDetails.User_Level_Code = 'SALES-AGENT';
        newUser.Permissions.User_Level_Code = 'SALES-AGENT';
      }else {
        newUser.UserDetails.User_Level_Code = 'DAS';
        newUser.Permissions.User_Level_Code = 'DAS';
  
      }
      return { ...state, currentUser: newUser, changeState: state.changeState + 1 };
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url };
    case Constants.RECEIVED_USER_DATA_ACTION:
      let currentUser1 = state.currentUser;
      
      if(action.data.Success){
        let result = action.data.result;
        let user = Utils.getFirstObject(result.User);
        
        let merchantUser = Utils.getFirstObject(result.MerchantUser);
        currentUser1.UserDetails = user;
        currentUser1.Permissions = result.Permissions;
        currentUser1.MerchantUser = merchantUser;
        currentUser1.UserMerchants = result.UserMerchants;
        return { ...state, currentUser: currentUser1, changeState: state.changeState + 1 };  
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

export default  manageUserReducer;