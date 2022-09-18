import * as Constants from "./constants";

export function getIsoListDashboardDataAction(user, lists){ return {type: Constants.GET_DASHBOARD_DATA, user, lists}}
export function viewISODetailAction(data, lists){ return {type: Constants.VIEW_ISO_DETAIL_ACTION, data, lists}}

export function receivedDashboardDataAction(data){ return {type: Constants.RECEIVED_DASHBOARD_DATA_ACTION, data}}
export function receivedDashboardDataError(err, data){ return {type: Constants.RECEIVED_DASHBOARD_DATA_ERROR, err, data}}

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

export default {
  moveToUrlAction,
};
