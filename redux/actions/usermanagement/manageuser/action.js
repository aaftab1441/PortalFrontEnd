
import * as Constants from './constants';
export function deleteItem(currentUser, user, currentIso, lists, fromLocation){ return {type: Constants.DELETE_USER_ACTION, currentUser, user, currentIso, lists, fromLocation}}

export function registerFromLocation(fromLocation){ return {type: Constants.REGISTER_FROM_LOCATION, fromLocation}}
export function receivedUserDeleteAction(data){ return {type: Constants.RECEIVED_USER_DELETE_ACTION, data}}
export function receivedUserDeleteError(err, data){ return {type: Constants.RECEIVED_USER_DELETE_ERROR, err, data}}

export function addUser(user, lists, parentItem, parentType){ return {type: Constants.ADD_USER_ACTION, user, lists, parentItem, parentType}}
export function clearUserAction(){ return {type: Constants.CLEAR_USER_ACTION}}

export function getUserListDataAction(data, user, lists){ return {type: Constants.GET_USER_LIST_DATA, data, user, lists}}
export function receivedUserListDataAction(data){ return {type: Constants.RECEIVED_USER_LIST_DATA_ACTION, data}}
export function receivedUserListDataError(err, data){ return {type: Constants.RECEIVED_USER_LIST_DATA_ERROR, err, data}}
 
export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function handlePermissionItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_PERMISSION_ITEM_CHANGE_ACTION , theName, theValue, checked }; }

export function viewUserAction(currentUser, user){ return {type: Constants.VIEW_USER_ACTION, currentUser, user}}
export function receivedUserDataAction(data){ return {type: Constants.RECEIVED_USER_DATA_ACTION, data}}
export function receivedUserDataError(err, data){ return {type: Constants.RECEIVED_USER_DATA_ERROR, err, data}}

export function processForm(currentUser, user, lists){ return {type: Constants.SUBMIT_FORM, currentUser, user, lists}}
export function receivedSubmission(data){ return {type: Constants.RECEIVED_SUBMISSION_ACTION, data}}

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
 
export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

export default {
  handleItemChange,
};