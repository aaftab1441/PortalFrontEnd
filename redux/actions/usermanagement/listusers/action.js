
import * as Constants from './constants';

 
export function getUserListDataAction(data, user, lists){ return {type: Constants.GET_USER_LIST_DATA, data, user, lists}}
export function getMerchantUserListDataAction(data, user, pageInfo){ return {type: Constants.GET_MERCHANT_USER_LIST_DATA, data, user, pageInfo}}
export function changeMerchantUserListPageAction(data, user, pageInfo){ return {type: Constants.CHANGE_MERCHANT_USERS_PAGE_ACTION, data, user, pageInfo} }

export function receivedMerchantUserListDataAction(data){ return {type: Constants.RECEIVED_MERCHANT_USER_LIST_DATA_ACTION, data}}
export function receivedUserListDataAction(data){ return {type: Constants.RECEIVED_USER_LIST_DATA_ACTION, data}}
export function receivedUserListDataError(err, data){ return {type: Constants.RECEIVED_USER_LIST_DATA_ERROR, err, data}}
 
export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function viewUserAction(currentUser, user){ return {type: Constants.VIEW_USER_ACTION, currentUser, user}}
export function addUserAction(user){ return {type: Constants.ADD_USER_ACTION, user}}

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
 
export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

export default {
  handleItemChange,
};