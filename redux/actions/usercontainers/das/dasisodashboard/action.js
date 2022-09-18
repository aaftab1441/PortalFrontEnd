import * as Constants  from './constants';

export function getDASISODashboardDataAction(user, iso, lists){ return {type: Constants.GET_DASHBOARD_DATA, user, iso, lists}}
export function receivedDASISODashboardDataAction(data){ return {type: Constants.RECEIVED_DASHBOARD_DATA_ACTION, data}}
export function receivedDASISODashboardDataError(err, data){ return {type: Constants.RECEIVED_DASHBOARD_DATA_ERROR, err, data}}

export function displayWarningAction() { return {type: Constants.DISPLAY_WARNING_ACTION} }

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}

export function warningBackAction() { return {type: Constants.WARNING_BACK_ACTION }}

export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

export default {
  moveToUrlAction,
};
