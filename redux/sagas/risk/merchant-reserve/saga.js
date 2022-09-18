import { takeLatest, put, call } from "redux-saga/effects";
import * as Actions from "/redux/actions/risk/merchant-reserve/action";
import * as Constants from "/redux/actions/risk/merchant-reserve/constants";
import * as AppConstants from "/utilities/constants";

import Router  from 'next/router'

function * getMerchantReserve(data, dataType, user) {
  let submitData = {user: user, data: data, dataType: dataType};
  console.log("About to Submit", submitData);
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
  try {
    const receiveJson = yield fetch(AppConstants.BASE_HOST_URL + `risk/GetMerchantReserve`, options); // Fetch call.
    const data = yield receiveJson.json(); // Convert to JSON.
    yield put(Actions.receivedMerchantReserveDataAction(data));
    yield call(Router.push, AppConstants.MERCHANT_RESERVE_PATH);
  }catch(err){
    yield put(Actions.receivedMerchantReserveDataError(err, null, lists));
  }
}

export default function* watchRiskHistory() {
  yield takeLatest(Constants.GET_MERCHANT_RESERVE, getMerchantReserve);
}
