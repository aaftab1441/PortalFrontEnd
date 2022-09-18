import * as Constants from "./constants";


export function getDashboardDataAction(user, lists){ return {type: Constants.GET_DASHBOARD_DATA, user, lists}}
export function getIsoListDashboardDataAction(user, lists){ return {type: Constants.GET_DASHBOARD_DATA, user, lists}}

export function receivedDashboardDataAction(data){ return {type: Constants.RECEIVED_DASHBOARD_DATA_ACTION, data}}
export function receivedDashboardDataError(err, data){ return {type: Constants.RECEIVED_DASHBOARD_DATA_ERROR, err, data}}


export function viewISODetailAction(iso ){ return {type: Constants.VIEW_ISO_DETAIL_ACTION, iso} }

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}

export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }
export function viewMerchantDetailAction(url, params){ return {type: Constants.GET_MERCHANT_DETAIL_ACTION, url, params} }

export function handleMerchantSearchItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_MERCHANT_SEARCH_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function openMerchantList(){ return {type: Constants.OPEN_MERCHANT_LIST_ACTION} }
export function closeMerchantList(){ return {type: Constants.CLOSE_MERCHANT_LIST_ACTION} }
export function selectMerchantAction(user, merchant){ return {type: Constants.SELECT_MERCHANT_ACTION, user, merchant} }

 



 
 