
import * as Constants from './constants';



export function getIsoMerchantDashboardDataAction(user, iso, lists){ return {type: Constants.GET_ISO_MERCHANT_DASHBOARD_DATA, user, iso, lists}}
export function receivedIsoMerchantDashboardDataAction(data){ return {type: Constants.RECEIVED_ISO_MERCHANT_DASHBOARD_DATA_ACTION, data}}
export function receivedIsoMerchantDashboardDataError(err, data){ return {type: Constants.RECEIVED_ISO_MERCHANT_DASHBOARD_DATA_ERROR, err, data}}


export function displayWarningAction() { return {type: Constants.DISPLAY_WARNING_ACTION} }

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}

export function warningBackAction() { return {type: Constants.WARNING_BACK_ACTION }}

export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }
export function viewMerchantDetailAction(merchant ){ return {type: Constants.VIEW_MERCHANT_DETAIL_ACTION, merchant} }


export default {
  viewMerchantDetailAction,
};
