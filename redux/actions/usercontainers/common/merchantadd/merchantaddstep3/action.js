
import * as Constants from './constants';

export function saveIsoInfoAction(isoInfo, merchantId) { return { type: Constants.SAVE_ISO_INFO_ACTION, isoInfo, merchantId } }

export function handleItemChangeAction(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION, theName, theValue, checked }; }
export function performReturnAction() { return { type: Constants.PERFORM_RETURN_ACTION }; }

export function resetTaskAction() { return { type: Constants.RESET_TASK_ACTION } }
export function moveToUrlAction(url, params) { return { type: Constants.MOVE_TO_URL_ACTION, url, params } }
export function receivedMerchantDataAction(data) { return { type: Constants.RECEIVED_MERCHANT_DATA_ACTION, data } }
export function receivedMerchantDataError(err, data) { return { type: Constants.RECEIVED_MERCHANTS_DATA_ERROR, err, data } }
export default {
  handleItemChangeAction,
};