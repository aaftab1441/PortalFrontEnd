import * as Constants from "./constants" ;

export function handlePasswordResetItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_PASSWORD_RESET_ITEM_CHANGE_ACTION , theName, theValue, checked }; }

export function submitPasswordReset(data){ return {type: Constants.SUBMIT_PASSWORD_RESET_INFO_ACTION, data} }

export function moveToUrlAction(url, user){ return {type: Constants.MOVE_TO_URL_ACTION, url, user} }

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}

export function receivePasswordReset(data, lists){ return {type: Constants.RECEIVE_PASSWORD_RESET_ACTION, data, lists} }

export function receivePasswordResetError(err, lists){ return {type: Constants.RECEIVE_PASSWORD_RESET_ERROR, err, lists} }

export function receivePasswordResetDisplay(data, lists){ return {type: Constants.RECEIVE_PASSWORD_RESET_DISPLAY_ACTION, data, lists} }

export function receivePasswordResetDisplayError(err, lists){ return {type: Constants.RECEIVE_PASSWORD_RESET_DISPLAY_ERROR, err, lists} }

export default {
  receivePasswordResetDisplayError,
};
