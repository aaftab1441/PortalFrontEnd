/*------- THIS IS THE MAIN REDUCER COMPONENT -------*/

import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

/* IMPORT ALL REDUCERS HERE */
import central from "./central/reducer";
import dashboard from "./dashboard/reducer";
import login from "./security/login/reducer";
import passwordReset from "./security/passwordreset/reducer";
import genericMerchantList from "./usercontainers/common/genericmerchantlist/reducer";
import merchantAddStep1 from "./usercontainers/common/merchantadd/merchantaddstep1/reducer";
import merchantAddStep2 from "./usercontainers/common/merchantadd/merchantaddstep2/reducer";
import merchantAddStep3 from "./usercontainers/common/merchantadd/merchantaddstep3/reducer";
import merchantAddStep4 from "./usercontainers/common/merchantadd/merchantaddstep4/reducer";
import merchantAddStep5 from "./usercontainers/common/merchantadd/merchantaddstep5/reducer";
import merchantDetail from "./usercontainers/common/merchantdetail/reducer";
import merchantSearch from "./usercontainers/common/merchantsearch/reducer";
import dasIsoDashboard from "./usercontainers/das/dasisodashboard/reducer";
import isoListDashboard from "./usercontainers/das/isolistdashboard/reducer";
import isoMerchantDashboard from "./usercontainers/das/isomerchantdashboard/reducer";
import isoDashboard from "./usercontainers/iso/dashboard/reducer";

import listUsers from "./usermanagement/listusers/reducer";
import manageUser from "./usermanagement/manageuser/reducer";
import securityLog from "./usermanagement/securitylog/reducer";
import myInformation from "./usermanagement/myinformation/reducer";

import isoOrganizationManagement from "./organization-management/iso/reducer";
import subIsoOrganizationManagement from "./organization-management/subiso/reducer";
import salesOfficeOrganizationManagement from "./organization-management/sales-office/reducer";
import salesAgentOrganizationManagement from "./organization-management/sales-agent/reducer";

import merchantMaintainSearch from "./usercontainers/common/merchantmaintain/search/reducer";
import merchantMaintainDetail from "./usercontainers/common/merchantmaintain/detail/reducer";
import merchantMaintainUser from "./usercontainers/common/merchantmaintain/manageuser/reducer";
import isoParametersMaintainSearch from "./usercontainers/common/isoparametersmaintain/search/reducer";
import isoParametersMaintainDetail from "./usercontainers/common/isoparametersmaintain/detail/reducer";
import riskHistory from "./risk/history/reducer";
import merchantReserve from "./risk/merchant-reserve/reducer";


// If it is client side or not. (window is defined or not)
const isClient = typeof window !== "undefined";

let mainReducer;
if (isClient) {
  // Client side logic.

  const { persistReducer } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;
  const storageSession = require("redux-persist/lib/storage/session").default;

  // Root persist configuration.
  const rootPersistConfig = {
    key: "root", storage: storageSession,
    // blacklist the states for which nested persist configs you are going to define.
    // --OR-- You might use whitelist if you want to persist all states of seleted reducers.
    blacklist: ["dashboard", "login", "passwordReset", "genericMerchantList", "merchantAddStep1", "merchantAddStep2",
      "merchantAddStep3", "merchantAddStep4", "merchantAddStep5", "merchantDetail", "dasIsoDashboard", "isoListDashboard",
      "isoMerchantDashboard"],
    whitelist: ["central", "isoOrganizationManagement", "subIsoOrganizationManagement", "salesOfficeOrganizationManagement", "riskHistory",
      "salesAgentOrganizationManagement", "merchantSearch", "merchantReserve", "isoDashboard", "listUsers", "manageUser", "securityLog", "myInformation", "merchantMaintainSearch",
      "merchantMaintainDetail", "merchantMaintainUser"]
  };

  // Persist config for each of reducers you create.
  const dashboardPersistConfig = { key: "dashboard", storage: storage, whitelist: [], };
  const centralPersistConfig = { key: "central", storage: storageSession, whitelist: ["central"], };
  const loginPersistConfig = { key: "login", storage: storage, whitelist: [], };

  const passwordResetPersistConfig = { key: "passwordReset", storage: storage, whitelist: [], };
  const genericMerchantListPersistConfig = { key: "genericMerchantList", storage: storage, whitelist: [], };
  const merchantAddStep1PersistConfig = { key: "merchantAddStep1", storage: storage, whitelist: [], };
  const merchantAddStep2PersistConfig = { key: "merchantAddStep2", storage: storage, whitelist: [], };
  const merchantAddStep3PersistConfig = { key: "merchantAddStep3", storage: storage, whitelist: [], };
  const merchantAddStep4PersistConfig = { key: "merchantAddStep4", storage: storage, whitelist: [], };
  const merchantAddStep5PersistConfig = { key: "merchantAddStep5", storage: storage, whitelist: [], };
  const merchantDetailPersistConfig = { key: "merchantDetail", storage: storage, whitelist: [], };

  const merchantSearchPersistConfig = { key: "merchantSearch", storage: storage, whitelist: [], };
  const dasIsoDashboardPersistConfig = { key: "dasIsoDashboard", storage: storage, whitelist: [], };
  const isoListDashboardPersistConfig = { key: "isoListDashboard", storage: storage, whitelist: [], };

  const isoMerchantDashboardPersistConfig = { key: "isoMerchantDashboard", storage: storage, whitelist: [], };
  const isoDashboardPersistConfig = { key: "isoDashboard", storage: storage, whitelist: [], };

  const listUsersPersistConfig = { key: "listUsers", storage: storage, whitelist: [], };
  const manageUserPersistConfig = { key: "manageUser", storage: storage, whitelist: [], };
  const securityLogPersistConfig = { key: "securityLog", storage: storage, whitelist: [], };
  const isoOrganizationManagementPersistConfig = { key: "isoOrganizationManagement", storage: storageSession, whitelist: [], };

  const subIsoOrganizationManagementPersistConfig = { key: "subIsoOrganizationManagement", storage: storageSession, whitelist: [], };
  const salesOfficeOrganizationManagementPersistConfig = { key: "salesOfficeOrganizationManagement", storage: storageSession, whitelist: [], };
  const salesAgentOrganizationManagementPersistConfig = { key: "salesAgentOrganizationManagement", storage: storageSession, whitelist: [], };
  const myInformationPersistConfig = { key: "myInformation", storage: storage, whitelist: [], };
  const merchantMaintainSearchPersistConfig = { key: "merchantMaintainSearch", storage: storage, whitelist: [], };
  const merchantMaintainDetailPersistConfig = { key: "merchantMaintainDetail", storage: storage, whitelist: [], };
  const isoParametersMaintainSearchPersistConfig = { key: "isoParametersMaintainSearch", storage: storage, whitelist: [], };
  const isoParametersMaintainDetailPersistConfig = { key: "isoParametersMaintainDetail", storage: storage, whitelist: [], };
  const merchantMaintainUserPersistConfig = { key: "merchantMaintainUser", storage: storage, whitelist: [], };
  const riskHistoryPersistConfig = { key: "riskHistory", storage: storage, whitelist: [], };
  const merchantReservePersistConfig = { key: "merchantReserve", storage: storage, whitelist: [], };


  /* COMBINE ALL REDUCERS */
  const combinedReducers = combineReducers({
    dashboard: persistReducer(dashboardPersistConfig, dashboard),
    central: persistReducer(centralPersistConfig, central),
    login: persistReducer(loginPersistConfig, login),
    passwordReset: persistReducer(passwordResetPersistConfig, passwordReset),
    genericMerchantList: persistReducer(genericMerchantListPersistConfig, genericMerchantList),
    merchantAddStep1: persistReducer(merchantAddStep1PersistConfig, merchantAddStep1),
    merchantAddStep2: persistReducer(merchantAddStep2PersistConfig, merchantAddStep2),
    merchantAddStep3: persistReducer(merchantAddStep3PersistConfig, merchantAddStep3),
    merchantAddStep4: persistReducer(merchantAddStep4PersistConfig, merchantAddStep4),
    merchantAddStep5: persistReducer(merchantAddStep5PersistConfig, merchantAddStep5),
    merchantDetail: persistReducer(merchantDetailPersistConfig, merchantDetail),
    merchantSearch: persistReducer(merchantSearchPersistConfig, merchantSearch),
    dasIsoDashboard: persistReducer(dasIsoDashboardPersistConfig, dasIsoDashboard),
    isoListDashboard: persistReducer(isoListDashboardPersistConfig, isoListDashboard),
    isoMerchantDashboard: persistReducer(isoMerchantDashboardPersistConfig, isoMerchantDashboard),
    isoDashboard: persistReducer(isoDashboardPersistConfig, isoDashboard),
    listUsers: persistReducer(listUsersPersistConfig, listUsers),
    manageUser: persistReducer(manageUserPersistConfig, manageUser),
    securityLog: persistReducer(securityLogPersistConfig, securityLog),
    isoOrganizationManagement: persistReducer(isoOrganizationManagementPersistConfig, isoOrganizationManagement),
    subIsoOrganizationManagement: persistReducer(subIsoOrganizationManagementPersistConfig, subIsoOrganizationManagement),
    salesOfficeOrganizationManagement: persistReducer(salesOfficeOrganizationManagementPersistConfig, salesOfficeOrganizationManagement),
    salesAgentOrganizationManagement: persistReducer(salesAgentOrganizationManagementPersistConfig, salesAgentOrganizationManagement),
    myInformation: persistReducer(myInformationPersistConfig, myInformation),
    merchantMaintainSearch: persistReducer(merchantMaintainSearchPersistConfig, merchantMaintainSearch),
    merchantMaintainDetail: persistReducer(merchantMaintainDetailPersistConfig, merchantMaintainDetail),
    isoParametersMaintainSearch: persistReducer(isoParametersMaintainSearchPersistConfig, isoParametersMaintainSearch),
    isoParametersMaintainDetail: persistReducer(isoParametersMaintainDetailPersistConfig, isoParametersMaintainDetail),
    merchantMaintainUser: persistReducer(merchantMaintainUserPersistConfig, merchantMaintainUser),
    riskHistory: persistReducer(riskHistoryPersistConfig, riskHistory),
    merchantReserve: persistReducer(merchantReservePersistConfig, merchantReserve),
  });

  // Main Reducer if in client side.
  mainReducer = persistReducer(rootPersistConfig, combinedReducers);
} else {
  //Server side logic.
  // Main Reducer if in client side.
  mainReducer = combineReducers({
    central, login, dashboard, passwordReset, genericMerchantList, merchantAddStep1, merchantAddStep2, merchantAddStep3,
    merchantAddStep4, merchantAddStep5, merchantDetail, merchantSearch, dasIsoDashboard, isoListDashboard,
    isoMerchantDashboard, isoDashboard, listUsers, securityLog, isoOrganizationManagement, subIsoOrganizationManagement,
    salesOfficeOrganizationManagement, salesAgentOrganizationManagement, myInformation, merchantMaintainSearch, merchantMaintainDetail, merchantMaintainUser,
    riskHistory, merchantReserve, isoParametersMaintainSearch, isoParametersMaintainDetail
  });
}


function reducer(state, action) {
  //console.log("STate", state);
  switch (action.type) {
    /* ON HYDRATE */
    case HYDRATE:
      const nextState = {
        ...state,
        ...action.payload,
      };

      if (state.login) nextState.login = state.login; //Preserve state during client side navigations.
      if (state.central) nextState.central = state.central;
      if (state.dashboard) nextState.dashboard = state.dashboard;
      if (state.passwordReset) nextState.passwordReset = state.passwordReset;
      if (state.genericMerchantList) nextState.genericMerchantList = state.genericMerchantList;
      if (state.merchantAddStep1) nextState.merchantAddStep1 = state.merchantAddStep1;
      if (state.merchantAddStep2) nextState.merchantAddStep2 = state.merchantAddStep2;
      if (state.merchantAddStep3) nextState.merchantAddStep3 = state.merchantAddStep3;
      if (state.merchantAddStep4) nextState.merchantAddStep4 = state.merchantAddStep4;
      if (state.merchantAddStep5) nextState.merchantAddStep5 = state.merchantAddStep5;
      if (state.merchantDetail) nextState.dashboard = state.dashboard;
      if (state.merchantSearch) nextState.merchantSearch = state.merchantSearch;
      if (state.dasIsoDashboard) nextState.dasIsoDashboard = state.dasIsoDashboard;
      if (state.isoListDashboard) nextState.isoListDashboard = state.isoListDashboard;
      if (state.isoMerchantDashboard) nextState.isoMerchantDashboard = state.isoMerchantDashboard;
      if (state.isoDashboard) nextState.isoDashboard = state.isoDashboard;
      if (state.listUsers) nextState.listUsers = state.listUsers;
      if (state.securityLog) nextState.securityLog = state.securityLog;
      if (state.isoOrganizationManagement) nextState.isoOrganizationManagement = state.isoOrganizationManagement;
      if (state.subIsoOrganizationManagement) nextState.subIsoOrganizationManagement = state.subIsoOrganizationManagement;
      if (state.salesOfficeOrganizationManagement) nextState.salesOfficeOrganizationManagement = state.salesOfficeOrganizationManagement;
      if (state.salesAgentOrganizationManagement) nextState.salesAgentOrganizationManagement = state.salesAgentOrganizationManagement;
      if (state.myInformation) nextState.myInformation = state.myInformation;
      if (state.merchantMaintainSearch) nextState.merchantMaintainSearch = state.merchantMaintainSearch;
      if (state.merchantMaintainDetail) nextState.merchantMaintainDetail = state.merchantMaintainDetail;

      if (state.isoParametersMaintainSearch) nextState.isoParametersMaintainSearch = state.isoParametersMaintainSearch;
      if (state.isoParametersMaintainDetail) nextState.isoParametersMaintainDetail = state.isoParametersMaintainDetail;
      if (state.merchantMaintainUser) nextState.merchantMaintainUser = state.merchantMaintainUser;
      if (state.riskHistory) nextState.riskHistory = state.riskHistory;
      if (state.merchantReserve) nextState.merchantReserve = state.merchantReserve;


      return nextState;

    default:
      return mainReducer(state, action);
  }
}



export default reducer;
