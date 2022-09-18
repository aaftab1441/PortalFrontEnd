import * as Constants from "./constants" ;
export function handleLoginInfoChange(theName, theValue, checked) { return { type: Constants.HANDLE_LOGIN_INFO_CHANGE_ACTION , theName, theValue, checked }; }

export function receivedLoginInfo(data, lists){ return {type: Constants.RECEIVED_LOGIN_INFO_ACTION, data, lists} }

export function submitLoginAction(user, lists){ return {type: Constants.SUBMIT_LOGIN_ACTION, user, lists} }

export function submitLoginInfoError(err){ return {type: Constants.SUBMITTED_LOGIN_INFO_ERROR, err} }

export function displayWarningAction() { return {type: Constants.DISPLAY_WARNING_ACTION} }

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}

export function warningBackAction() { return {type: Constants.WARNING_BACK_ACTION }}

export function doRegisterAction() { return {type: Constants.REGISTER_ACTION }}

export function doExitAction() { return {type: Constants.EXIT_ACTION }}

export function loginAction() { return {type: Constants.LOGIN_ACTION }}

export function doForgotPasswordAction() { return {type: Constants.FORGOT_PASSWORD_ACTION }}

export function registerVerifyAction(role) { return {type: Constants.REGISTER_VERIFY_ACTION, role }}

export function moveToUrlAction(url, user){ return {type: Constants.MOVE_TO_URL_ACTION, url, user} }
export default {
  moveToUrlAction,
};
