import * as Constants from "./constants";

export function getData(category, status){ return {type: Constants.GET_DATA, category, status}}
export function receivedDataAction(data){ return {type: Constants.RECEIVED_DATA_ACTION, data}}
export function receivedDataError(err, data){ return {type: Constants.RECEIVED_DATA_ERROR, err, data}}

export function getMerchantsAction(searchType, user, lists, searchParams){ return {type: Constants.GET_MERCHANTS_ACTION, searchType, user, lists, searchParams}}
export function viewMerchantAction(merchant){ return {type: Constants.VIEW_MERCHANT_ACTION, merchant}}

export function displayWarningAction() { return {type: Constants.DISPLAY_WARNING_ACTION} }

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION , theName, theValue, checked }; }


export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

export default {
  getData,
};
