
import * as Constants from './constants';

 
export function getISOParametersSearchDataAction(data, user, lists){ return {type: Constants.GET_ISOPARAMETERS_SEARCH_DATA, data, user, lists}}
export function receivedISOParametersSearchDataAction(data){ return {type: Constants.RECEIVED_ISOPARAMETERS_SEARCH_DATA_ACTION, data}}
export function receivedISOParametersSearchDataError(err, data){ return {type: Constants.RECEIVED_ISOPARAMETERS_SEARCH_DATA_ERROR, err, data}}
 
export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function viewISOParametersAction(isoParameter, user){ return {type: Constants.VIEW_ISOPARAMETERS_ACTION, isoParameter, user}}

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
 
export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

export default {
  handleItemChange,
};