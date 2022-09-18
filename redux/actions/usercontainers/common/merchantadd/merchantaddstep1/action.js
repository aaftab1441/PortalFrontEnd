
import * as Constants from './constants';

export function saveMerchantAction(merchant) { return { type: Constants.SAVE_MERCHANT_ACTION, merchant } }
export function handleItemChangeAction(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION, theName, theValue, checked }; }
export function handleAutoCompleteChange(theName, theValue) { return { type: Constants.HANDLE_AUTO_COMPLETE_CHANGE_ACTION, theName, theValue }; }
export function receivedSubmission(data) { return { type: Constants.RECEIVED_SUBMISSION_ACTION, data } }
export function resetTaskAction() { return { type: Constants.RESET_TASK_ACTION } }
export function moveToUrlAction(url, params) { return { type: Constants.MOVE_TO_URL_ACTION, url, params } }
export function receivedMerchantDataAction(data) { return { type: Constants.RECEIVED_MERCHANT_DATA_ACTION, data } }
export function receivedMerchantDataError(err, data) { return { type: Constants.RECEIVED_MERCHANTS_DATA_ERROR, err, data } }
export default {
  handleItemChangeAction,
};