/*------- THIS IS THE MAIN SAGA COMPONENT -------*/

import { all } from "redux-saga/effects";

/* IMPORT ALL SAGA WATCHERS */
import watchCentral from "./central/saga";
import watchDashboard from "./dashboard/saga";
import watchLogin from "./security/login/saga";
import watchPasswordReset from "./security/passwordreset/saga";
import watchGenericMerchantList from "./usercontainers/common/genericmerchantlist/saga";
import watchMerchantDetail from "./usercontainers/common/merchantdetail/saga";
import watchMerchantSearch from "./usercontainers/common/merchantsearch/saga";

import watchMerchantMaintainSearch from "./usercontainers/common/merchantmaintain/search/saga";
import watchMerchantMaintainDetail from "./usercontainers/common/merchantmaintain/detail/saga";
import watchMerchantMaintainUserSaga from "./usercontainers/common/merchantmaintain/manageuser/saga";
import watchMerchantAddStep1Saga from "./usercontainers/common/merchantadd/merchantaddstep1/saga";
import watchMerchantAddStep2Saga from "./usercontainers/common/merchantadd/merchantaddstep2/saga";
import watchMerchantAddStep3Saga from "./usercontainers/common/merchantadd/merchantaddstep3/saga";
import watchMerchantAddStep4Saga from "./usercontainers/common/merchantadd/merchantaddstep4/saga";
import watchMerchantAddStep5Saga from "./usercontainers/common/merchantadd/merchantaddstep5/saga";


import watchDasIsoDashboard from "./usercontainers/das/dasisodashboard/saga";
import watchIsoListDashboard from "./usercontainers/das/isolistdashboard/saga";
import watchIsoMerchantDashboard from "./usercontainers/das/isomerchantdashboard/saga";
import watchIsoDashboard from "./usercontainers/iso/isodashboard/saga";

import watchListUsers from "./usermanagement/listusers/saga";
import watchManageUser from "./usermanagement/manageuser/saga";
import watchSecurityLog from "./usermanagement/securitylog/saga";
import watchMyInformation from "./usermanagement/myinformation/saga";
import watchIsoOrganizationManagement from "./organization-management/iso/saga";
import watchSubIsoOrganizationManagement from "./organization-management/subiso/saga";
import watchSalesOfficeOrganizationManagement from "./organization-management/sales-office/saga";
import watchSalesAgentOrganizationManagement from "./organization-management/sales-agent/saga";
import watchRiskHistory from "./risk/history/saga";
import watchMerchantReserve from "./risk/merchant-reserve/saga";
import watchISOParameterSearch from "./usercontainers/common/isoparametersmaintain/search/saga";



/* CREATE THE ROOT SAGA */
export default function* rootSaga() {
  yield all([watchCentral(), watchDashboard(), watchLogin(), watchPasswordReset(), watchGenericMerchantList(), watchMerchantDetail(),
  watchMerchantSearch(), watchDasIsoDashboard(), watchIsoListDashboard(), watchIsoMerchantDashboard(), watchIsoDashboard(), watchListUsers(),
  watchManageUser(), watchSecurityLog(), watchIsoOrganizationManagement(), watchSubIsoOrganizationManagement(), watchSalesOfficeOrganizationManagement(),
  watchMyInformation(), watchMerchantMaintainSearch(), watchMerchantMaintainDetail(), watchMerchantMaintainUserSaga(), watchMerchantAddStep1Saga(),
  watchMerchantAddStep2Saga(), watchMerchantAddStep3Saga(), watchMerchantAddStep4Saga(), watchMerchantAddStep5Saga(),
  watchSalesAgentOrganizationManagement(), watchRiskHistory(), watchMerchantReserve(), watchISOParameterSearch()]);

}