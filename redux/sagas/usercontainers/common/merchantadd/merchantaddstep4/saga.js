
import { takeLatest, put } from "redux-saga/effects";
import * as Actions from "/redux/actions/usercontainers/common/merchantadd/merchantaddstep4/action";
import * as Constants from "/redux/actions/usercontainers/common/merchantadd/merchantaddstep4/constants";
import * as AppConstants from "/utilities/constants";
import { LOCATION_CHANGE } from 'connected-react-router';

function* submitLocation(params) {

  params.locations.push(params.location);

  yield put(Actions.locationSaved(params.location));
}

function* getLocations(id) {

  console.log('Get locations', id.merchantId)
  const requestURL = AppConstants.BASE_HOST_URL + `Location/GetLocations/${id.merchantId}`;
  const data = { id: id.merchantId};
  // const options = { method: 'GET', headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), credentials: 'same-origin' };
  const options = { method: 'GET', headers: { "Content-Type": "application/json" }, credentials: 'same-origin' };

  try {
    
    const receiveJson = yield fetch(requestURL, options);  //Fetch call.
    console.log("Receive JSON", receiveJson)

    const receivedData = yield receiveJson.json();  //Convert to JSON.

    console.log("Receive data in action saga in catch", receivedData)
    if (receivedData) {
      yield put(Actions.receivedLocationsDataAction(receivedData));
    } else {
      yield put(Actions.receivedLocationsDataError(null, receivedData));
    }
  } catch (err) {
    console.log("Receive data in action saga in catch", err)
    yield put(Actions.receivedLocationsDataError(err, err));
  }
}

function* submitMerchantStep4(params) {

  const data = { merchantId: params.merchantId, locations: params.locations };

  const requestURL = AppConstants.BASE_HOST_URL + `Location/AddLocation`;

  const options = { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), credentials: 'same-origin' };

  try {
    const receiveJson = yield fetch(requestURL, options);  //Fetch call.
    const receivedData = yield receiveJson.json();  //Convert to JSON.
    if (receivedData) {
      yield put(Actions.receivedMerchantDataAction(receivedData));
    } else {
      yield put(Actions.receivedMerchantDataError(null, receivedData));
    }
  } catch (err) {
    yield put(Actions.receivedMerchantDataError(err, err));
  }
}

export function* uploadDocument(params) {

  const formData = new FormData();
  formData.append("formFile", params.formFile);
  formData.append("fileName", params.formFile.name);

  const requestURL = AppConstants.BASE_HOST_URL + `location/UploadDocument`;

  const options = { method: 'POST', body: formData, credentials: 'same-origin' };

  try {
    const receiveJson = yield fetch(requestURL, options);  //Fetch call.
    const receivedData = yield receiveJson.json();  //Convert to JSON.
    if (receivedData) {
      yield put(Actions.receiveduploadDocumentDataAction(receivedData));
    } else {
      yield put(Actions.receivedMerchantDataError(null, receivedData));
    }
  } catch (err) {
    yield put(Actions.receivedMerchantDataError(err, err));
  }
}

export default function* watchMerchantAddStep4Saga() {
  yield takeLatest(Constants.ADD_MERCHANT_STEP4_ACTION, submitMerchantStep4);
  yield takeLatest(Constants.SAVE_LOCATION, submitLocation);
  yield takeLatest(Constants.HANDLE_DOCUMENT_UPLOAD_ACTION, uploadDocument);
  yield takeLatest(Constants.GET_LOCATIONS, getLocations);
}
