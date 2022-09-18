
import { takeLatest, put } from "redux-saga/effects";
import * as Actions from "/redux/actions/usercontainers/common/merchantadd/merchantaddstep3/action";
import * as Constants from "/redux/actions/usercontainers/common/merchantadd/merchantaddstep3/constants";
import * as AppConstants from "/utilities/constants";


export function* saveIsoInfo(params) {

  const requestURL = AppConstants.BASE_HOST_URL + `merchants/UpdateIsoInformation`;

  params.isoInfo.id = params.merchantId;

  const options = { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(params.isoInfo), credentials: 'same-origin' };

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



export default function* watchMerchantAddStep3Saga() {
  yield takeLatest(Constants.SAVE_ISO_INFO_ACTION, saveIsoInfo);
}
