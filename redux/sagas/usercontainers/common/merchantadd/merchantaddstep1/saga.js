
import { takeLatest, put } from "redux-saga/effects";
import * as Actions from "/redux/actions/usercontainers/common/merchantadd/merchantaddstep1/action";
import * as Constants from "/redux/actions/usercontainers/common/merchantadd/merchantaddstep1/constants";
import * as AppConstants from "/utilities/constants";

export function* saveMerchant(params) {

  const requestURL = AppConstants.BASE_HOST_URL + (params.merchant.id === 0 ? `merchants/SaveMerchant` : `merchants/UpdateMerchant`);

  const options = { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(params.merchant), credentials: 'same-origin' };

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

export default function* watchMerchantAddStep1Saga() {
  yield takeLatest(Constants.SAVE_MERCHANT_ACTION, saveMerchant);
}
