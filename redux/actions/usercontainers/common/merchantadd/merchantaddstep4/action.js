
import * as Constants from './constants';

export function addMerchantStep4Action(locations, merchantId) { return { type: Constants.ADD_MERCHANT_STEP4_ACTION, locations, merchantId } }
export function getLocationsAction( merchantId) { return { type: Constants.GET_LOCATIONS, merchantId } }
export function saveLocation(locations, location, lists) { return { type: Constants.SAVE_LOCATION, locations, location, lists } }
export function locationSaved(data) { return { type: Constants.LOCATION_SAVED, data } }
export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION, theName, theValue, checked }; }
export function handleDateChangeAction(theName, theValue, container) { return { type: Constants.HANDLE_DATE_CHANGE_ACTION, theName, theValue, container }; }
export function handleMultiSelectChangeAction(theName, theValue) { return { type: Constants.HANDLE_MULTISELECT_CHANGE_ACTION, theName, theValue }; }
export function performReturnAction() { return { type: Constants.PERFORM_RETURN_ACTION }; }
export function updateActiveTabAction(tabKey) { return { type: Constants.HANDLE_ACTIVE_TAB_ACTION, tabKey }; }
export function resetTaskAction() { return { type: Constants.RESET_TASK_ACTION } }
export function moveToUrlAction(url, params) { return { type: Constants.MOVE_TO_URL_ACTION, url, params } }
export function receivedLocationsDataAction(data) { return { type: Constants.RECEIVED_LOCATIONS_DATA_ACTION, data } }
export function receivedLocationsDataError(err, data) { return { type: Constants.RECEIVED_LOCATIONS_DATA_ERROR, err, data } }
export function receivedMerchantDataAction(data) { return { type: Constants.RECEIVED_MERCHANT_DATA_ACTION, data } }
export function receivedMerchantDataError(err, data) { return { type: Constants.RECEIVED_MERCHANTS_DATA_ERROR, err, data } }
export function handleFileChangeAction(formFile, theName, theValue, checked) { return { type: Constants.HANDLE_FILE_CHANGE_ACTION, formFile, theName, theValue, checked }; }
export function uploadDocumentAction(formFile, document) { return { type: Constants.HANDLE_DOCUMENT_UPLOAD_ACTION, formFile, document } }
export function receiveduploadDocumentDataAction(data) { return { type: Constants.RECEIVED_UPLOAD_DOCUMENTS_DATA_ACTION, data } }

export default {
  handleItemChange,
};