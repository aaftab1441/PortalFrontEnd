import * as Constants from '../../actions/central/constants';
import * as LoginConstants from "../../actions/security/login/constants";

import * as PasswordResetConstants from "../../actions/security/passwordreset/constants";
import * as MerchantDetailConstants from "../../actions/usercontainers/common/merchantdetail/constants";
import * as MerchantSearchConstants from "../../actions/usercontainers/common/merchantsearch/constants";
    

import * as DashboardConstants from "../../actions/dashboard/constants";
import * as IsoListDashboardConstants from "../../actions/usercontainers/das/isolistdashboard/constants";
import * as DASISODashboardConstants from "../../actions/usercontainers/das/dasisodashboard/constants";
import * as IsoMerchantDashboardConstants from "../../actions/usercontainers/das/isomerchantdashboard/constants";
import * as GenericMerchantListConstants from "../../actions/usercontainers/common/genericmerchantlist/constants";

import * as UserListConstants from "../../actions/usermanagement/listusers/constants";
import * as ManageUserConstants from "../../actions/usermanagement/manageuser/constants";
import * as SecurityLogsConstants from "../../actions/usermanagement/securitylog/constants";



const initialState = {
  messages: [],
  lists: {},
  dashboardData: {MerchantList: []},
  isoListDashboardData: {},
  dASISODashboardData: {},  
  user: {},
  currentMerchant: {Iso: {},Merchant: {}, batch: {Data:[], Page: 1, PageSize: 10, Count: 0}, transactions: {Data:[], Page: 1, PageSize: 10, Count: 0}, 
    ach: {Data:[], Page: 1, PageSize: 10, Count: 0}, chargebacks: {Data:[], Page: 1, PageSize: 10, Count: 0}},
  currentUser: {User: {}},
  isLeftMenuOpen: false,
  currentIsoDashboardObject: {},
  isoMerchantDashboardData: {},
  currentRole: {},
  currentPermission: {},
  currentSecurityLog: {},
};

const centralReducer = (state = initialState, action) => {
  console.log("Central Action", action);
  switch (action.type) {
    case MerchantDetailConstants.RECEIVED_PAGE_CHANGE_ACTION:
      let pageChangeMerchant = state.currentMerchant;
      if(action.data.Success && action.data.result.Name ){
        pageChangeMerchant[action.data.result.Name] = action.data.result;
      }
      return { ... state, currentMerchant: pageChangeMerchant};
    case GenericMerchantListConstants.VIEW_MERCHANT_ACTION:
      let merchantDetail = {Merchant: action.merchant, batch: {Data:[], Page: 1, PageSize: 10}, transactions: {Data:[], Page: 1, PageSize: 10}, 
        ach: {Data:[], Page: 1, PageSize: 10}, chargebacks: {Data:[], Page: 1, PageSize: 10}};  
      return { ... state, currentMerchant: merchantDetail};
    case UserListConstants.VIEW_USER_ACTION:
      return { ... state, currentUser: action.currentUser};
    case IsoMerchantDashboardConstants.VIEW_MERCHANT_DETAIL_ACTION:
        let aMerchant = {Merchant: {}, batch: {Data:[], Page: 1, PageSize: 10, Count: 0}, transactions: {Data:[], Page: 1, PageSize: 10, Count: 0}, 
        ach: {Data:[], Page: 1, PageSize: 10, Count: 0}, chargebacks: {Data:[], Page: 1, PageSize: 10, Count: 0}};
        aMerchant['Merchant'] = action.merchant;
    return { ...state, currentMerchant:  aMerchant  };
    case IsoMerchantDashboardConstants.RECEIVED_ISO_MERCHANT_DASHBOARD_DATA_ACTION:
      return { ...state, isoMerchantDashboardData: action.data.Data };
      break;
    case DashboardConstants.RECEIVED_DASHBOARD_DATA_ACTION:
      if(action.data.Success){
        let currentMerchant = state.currentMerchant;
        if(action.data.Data.CurrentMid && action.data.Data.CurrentMid.length > 0 && action.data.Data.MerchantList && action.data.Data.MerchantList.length > 0){
          let m = action.data.Data.MerchantList;
          let mid = action.data.Data.CurrentMid;
          for(let i = 0; i < m.length; i++){
            if(m[i].mm_cust_no == mid){
              currentMerchant.Merchant = m[i];
            }
          }
          
        }
        return { ...state, dashboardData: action.data.Data, currentMerchant: currentMerchant };
      }
      return { ...state};
    
  case IsoListDashboardConstants.VIEW_ISO_DETAIL_ACTION:
    return { ...state, currentIsoDashboardObject: action.iso };
    
  case DASISODashboardConstants.RECEIVED_DASHBOARD_DATA_ACTION:
    console.log(action.data);	
    if(action.data.Success){
      return { ...state, dASISODashboardData: action.data.Data, currentIsoDashboardObject: action.data.Data.Detail };
    }
    return { ...state};
  case IsoListDashboardConstants.RECEIVED_ISO_DASHBOARD_DATA_ACTION:
    console.log(action.data);	
    if(action.data.Success){
      return { ...state, isoListDashboardData: action.data.Data };
    }
    break;
   
  case Constants.TOGGLE_LEFT_MENU_ACTION:
    return { ...state, isLeftMenuOpen: !action.currentState };
  case MerchantSearchConstants.VIEW_MERCHANT_ACTION:
    let currentMerchantDetail = {Merchant: action.merchant, batch: {Data:[], Page: 1, PageSize: 10}, transactions: {Data:[], Page: 1, PageSize: 10}, 
      ach: {Data:[], Page: 1, PageSize: 10}, chargebacks: {Data:[], Page: 1, PageSize: 10}};  
    return { ... state, currentMerchant: currentMerchantDetail};  
  case MerchantDetailConstants.RECEIVED_MERCHANT_DETAIL_DATA_ERROR:
    break;
  case MerchantDetailConstants.RECEIVED_MERCHANT_DETAIL_DATA_ACTION:
    if(action.data.result){
      return { ...state, currentMerchant: action.data.result };
    }
    break;
 
    case Constants.RECEIVED_LISTS_AND_CONFIG:
      return { ...state, lists: action.data.Lists };
    case MerchantSearchConstants.VIEW_MERCHANT_ACTION:
      return { ...state, currentMerchant: action.merchant };
    case LoginConstants.LOGIN_ACTION:
        if(action.data){
          return { ...state, messages: action.data.messages.general };
        }
        break; 
    case DashboardConstants.RECEIVED_DASHBOARD_DATA_ACTION:
        if(action.data && action.data.success){
          return { ...state, dashboardData: action.data.dashboard_data };
        }
        break;
      
    case PasswordResetConstants.RECEIVE_PASSWORD_RESET_DISPLAY_ACTION:
        if(action.data){
        }
        break;
    case Constants.LOGOUT_ACTION:
      return { ...state, user: {}, account: {}};
    case LoginConstants.SUBMIT_LOGIN_ACTION:
      return { ...state, messages: [] };
     
    case PasswordResetConstants.RECEIVE_PASSWORD_RESET_DISPLAY_ACTION:
      return { ...state, messages: action.data.messages.general };
      
    case LoginConstants.RECEIVED_LOGIN_INFO_ACTION:
        if(action.data){
          if(action.data.Success){
            let user = {};
            user.UserDetail = action.data.result.User[0];
            if(user.UserDetail.mm_cust_no){
              user.UserDetail.User_Level_Code = 'MERCHANT';
              user.Permissions = {User_Level_Code: "MERCHANT"};
            }else {
              user.Permissions  = action.data.result.Permissions[0];

            }
            delete user.UserDetail.Passwd;
            return { ...state, user: user, messages: {} };
          }else {
            return { ...state, messages: ["Invalid Login"] };
          }
        }
        break;
    case PasswordResetConstants.RECEIVE_PASSWORD_RESET_ACTION:
        return { ...state, messages: action.data.messages.general };
    case LoginConstants.HANDLE_LOGIN_INFO_CHANGE_ACTION:
    case PasswordResetConstants.HANDLE_PASSWORD_RESET_ITEM_CHANGE_ACTION:
        let user = {};
        user = state.user;
        console.log("User", user);
        if(typeof action.checked !== "undefined"){
          user[action.theName] = action.checked? action.theValue: 0;
        }else {
          if(/.*assword.*/.test(action.theName)){
            user[action.theName] = action.theValue;
          } else {
            user[action.theName] = action.theValue.toUpperCase();
          }
          return { ...state, user: user};
        }
        break;       
    default:
      return state;
  }
};

export default  centralReducer;