
import * as Constants from './constants';

 
export function getSecurityLogDataAction(data, user, lists){ return {type: Constants.GET_SECURITY_LOG_DATA, data, user, lists}}
export function getSecurityLogsAction(data, user, lists){ return {type: Constants.GET_SECURITY_LOGS_DATA, data, user, lists}}

export function receivedSecurityLogDataAction(data){ return {type: Constants.RECEIVED_SECURITY_LOG_DATA_ACTION, data}}
export function receivedSecurityLogDataError(err, data){ return {type: Constants.RECEIVED_SECURITY_LOG_DATA_ERROR, err, data}}
 
export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function viewSecurityLogAction(role){ return {type: Constants.VIEW_SECURITY_LOG_ACTION, role}}

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
 
export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

export default {
  handleItemChange,
};