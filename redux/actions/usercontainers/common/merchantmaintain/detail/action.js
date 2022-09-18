import * as Constants from './constants';

export function getMerchantDetailDataAction(user){ return {type: Constants.GET_MERCHANT_DETAIL_DATA, user}}
export function receivedMerchantDetailDataAction(data){ return {type: Constants.RECEIVED_MERCHANT_DETAIL_DATA_ACTION, data}}
export function receivedMerchantDetailDataError(err, data){ return {type: Constants.RECEIVED_MERCHANT_DETAIL_DATA_ERROR, err, data}}
 
export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function viewMerchantAction(merchant){ return {type: Constants.VIEW_MERCHANT_ACTION, merchant}}
export function getMerchantAction(user, merchant){ return {type: Constants.GET_MERCHANT_ACTION, user, merchant}}

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
 
export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

export function changePageAction(pageInfo, user, merchant){ return {type: Constants.CHANGE_PAGE_ACTION, pageInfo, user, merchant} }
export function receivedPageChangeAction(data){ return {type: Constants.RECEIVED_PAGE_CHANGE_ACTION, data}}
export function receivedPageChangeError(err, data){ return {type: Constants.RECEIVED_PAGE_CHANGE_ERROR, err, data}}

export function viewTransactionDetail(data){ return {type: Constants.VIEW_TRANSACTION_DETAIL, data}}
export function viewBatchDetail(data){ return {type: Constants.VIEW_BATCH_DETAIL, data}}
export function viewACHDetail(data){ return {type: Constants.VIEW_ACH_DETAIL, data}}
export function viewChargeBackDetail(data){ return {type: Constants.VIEW_CHARGEBACK_DETAIL, data}}

export function closeTransactionDetail(){ return {type: Constants.CLOSE_TRANSACTION_DETAIL}}
export function closeBatchDetail(){ return {type: Constants.CLOSE_BATCH_DETAIL}}
export function closeACHDetail(){ return {type: Constants.CLOSE_ACH_DETAIL}}
export function closeChargeBackDetail(){ return {type: Constants.CLOSE_CHARGEBACK_DETAIL}}

export function handleSearchChangeAction(theName, theValue, container){ return {type: Constants.HANDLE_SEARCH_CHANGE_ACTION, theName, theValue, container}}
export function handleUserSearchChange(theName, theValue, checked) { return { type: Constants.HANDLE_USER_SEARCH_CHANGE_ACTION , theName, theValue, checked }; }


export default {  handleItemChange, };
