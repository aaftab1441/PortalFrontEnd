import * as Constants from './constants';

export function addMerchantStep5(selectedTemplateId, templates, merchantId) { return { type: Constants.ADD_MERCHANT_STEP5_ACTION, selectedTemplateId, templates, merchantId } }

export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION, theName, theValue, checked }; }

export function processForm(addMerchant, merchant, lists) { return { type: Constants.SUBMIT_FORM, addMerchant, merchant, lists } }
export function receivedSubmission(data) { return { type: Constants.RECEIVED_SUBMISSION_ACTION, data } }
export function resetTaskAction() { return { type: Constants.RESET_TASK_ACTION } }
export function moveToUrlAction(url, params) { return { type: Constants.MOVE_TO_URL_ACTION, url, params } }
export function receivedMerchantDataAction(data) { return { type: Constants.RECEIVED_MERCHANT_DATA_ACTION, data } }
export function receivedMerchantDataError(err, data) { return { type: Constants.RECEIVED_MERCHANTS_DATA_ERROR, err, data } }
export function performReturnAction() { return { type: Constants.PERFORM_RETURN_ACTION }; }

export function receivedFeesAction(data) { return { type: Constants.RECEIVED_FEES_ACTION, data } }
export function receivedFeesError(err, data) { return { type: Constants.RECEIVED_FEES_ERROR, err, data } }
export function getFeesAction(user) { return { type: Constants.GET_FEES_ACTION, user } }
export function addFeeAction(theFee) { return { type: Constants.ADD_FEE_ACTION, theFee } }
export function removeFeeAction(theFee) { return { type: Constants.REMOVE_FEE_ACTION, theFee } }

export default {
  handleItemChange,
};
