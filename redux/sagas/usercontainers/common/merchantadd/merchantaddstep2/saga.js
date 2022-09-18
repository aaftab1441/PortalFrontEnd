
import { takeLatest, put, call } from "redux-saga/effects";
import * as Actions from "/redux/actions/usercontainers/common/merchantadd/merchantaddstep2/action";
import * as Constants from "/redux/actions/usercontainers/common/merchantadd/merchantaddstep2/constants";

import * as AppConstants from "/utilities/constants";


export function* saveOwners(params) {

  const requestURL = AppConstants.BASE_HOST_URL + `owner/UpdateOwner`;

  const options = { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(params), credentials: 'same-origin' };

  try {
    const receiveJson = yield fetch(requestURL, options); // Fetch call.
    const receivedData = yield receiveJson.json(); // Convert to JSON.
    if (receivedData) {
      yield put(Actions.receivedMerchantDataAction(receivedData));
    } else {
      yield put(Actions.receivedMerchantDataError(null, receivedData));
    }
  } catch (err) {
    yield put(Actions.receivedMerchantDataError(err, err));
  }
}



export default function* watchMerchantAddStep2Saga() {
  yield takeLatest(Constants.SAVE_OWNERS_ACTION, saveOwners);
}
