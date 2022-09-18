import * as Constants from './constants';

export function getIsoListDashboardDataAction(user, iso){ return {type: Constants.GET_ISO_DASHBOARD_DATA, user, iso}}
export function receivedIsoListDashboardDataAction(data){ return {type: Constants.RECEIVED_ISO_DASHBOARD_DATA_ACTION, data}}
export function receivedIsoListDashboardDataError(err, data){ return {type: Constants.RECEIVED_ISO_DASHBOARD_DATA_ERROR, err, data}}


export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}

export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }
export function viewISODetailAction(iso){ return {type: Constants.VIEW_ISO_DETAIL_ACTION, iso} }

export function viewMerchantDetailAction(data){ return {type: Constants.VIEW_MERCHANT_DETAIL_ACTION, data} }

export function getISOMerchantListCountDataAction(searchType, user, lists){ return {type: Constants.GET_ISO_MERCHANT_COUNT_DATA, searchType, user, lists}}
export function receivedIsoMerchantCountDataAction(data){ return {type: Constants.RECEIVED_ISO_MERCHANT_COUNT_DATA_ACTION, data}}
export function receivedIsoMerchantCountDataError(err, data){ return {type: Constants.RECEIVED_ISO_MERCHANT_COUNT_DATA_ERROR, err, data}}
export function getIsoMerchantDashboardDataAction(data){ return {type: Constants.GET_ISO_MERCHANT_DASHBOARD_DATA, data}}


export default {
  viewISODetailAction,
};
