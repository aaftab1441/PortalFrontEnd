
import * as Constants from './constants';

 
export function getMerchantSearchDataAction(merchantSearchParams, user, pageInfo){ return {type: Constants.GET_MERCHANT_SEARCH_DATA, merchantSearchParams, user, pageInfo}}
export function changePage(merchantSearchParams, user, pageInfo){ return {type: Constants.CHANGE_PAGE_ACTION, merchantSearchParams, user, pageInfo} }
export function receivedMerchantSearchDataAction(data){ return {type: Constants.RECEIVED_MERCHANT_SEARCH_DATA_ACTION, data}}
export function receivedMerchantSearchDataError(err, data){ return {type: Constants.RECEIVED_MERCHANT_SEARCH_DATA_ERROR, err, data}}
 
export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function viewMerchantAction(merchant, user){ return {type: Constants.VIEW_MERCHANT_ACTION, merchant, user}}

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
 
export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

export default {
  handleItemChange,
};