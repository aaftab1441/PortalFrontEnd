
import * as Constants from './constants';

 
export function getISOParametersDetailDataAction(data, user, lists){ return {type: Constants.GET_ISOPARAMETERS_DETAIL_DATA, data, user, lists}}
export function receivedISOParametersDetailDataAction(data){ return {type: Constants.RECEIVED_ISOPARAMETERS_DETAIL_DATA_ACTION, data}}
export function receivedISOParametersDetailDataError(err, data){ return {type: Constants.RECEIVED_ISOPARAMETERS_DETAIL_DATA_ERROR, err, data}}
 
export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function viewISOParametersAction(isoParameters, user){ return {type: Constants.VIEW_ISOPARAMETERS_ACTION, isoParameters, user}}
export function getISOParametersAction(user, isoParameters){ return {type: Constants.GET_ISOPARAMETERS_ACTION, user, isoParameters}}

export function resetTaskAction() { return {type: Constants.RESET_TASK_ACTION }}
 
export function moveToUrlAction(url, params){ return {type: Constants.MOVE_TO_URL_ACTION, url, params} }

export default {
  handleItemChange,
};