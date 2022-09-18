
import * as Constants from './constants';

 
export function getMerchantReserve(data, dataType, user, lists){ return {type: Constants.GET_MERCHANT_RESERVE, data, dataType, user}}
export function receivedMerchantReserveDataAction(data){ return {type: Constants.RECEIVE_MERCHANT_RESERVE, data}}
export function receivedMerchantReserveDataError(err, data){ return {type: Constants.RECEIVED_MERCHANT_RESERVE_ERROR, err, data}}

export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION , theName, theValue, checked }; }

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

 

export default {
  getMerchantReserve,
};