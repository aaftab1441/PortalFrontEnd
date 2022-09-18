
import * as Constants from './constants';

 
export function getRiskHistory(data, dataType, user, lists){ return {type: Constants.GET_RISK_HISTORY, data, dataType, user}}
export function receivedRiskHistoryDataAction(data){ return {type: Constants.RECEIVE_RISK_HISTORY, data}}
export function receivedRiskHistoryDataError(err, data){ return {type: Constants.RECEIVED_RISK_HISTORY_ERROR, err, data}}

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

 

export default {
  getRiskHistory,
};