import { takeLatest, put, call } from "redux-saga/effects";
import * as Actions from "/redux/actions/risk/history/action";
import * as Constants from "/redux/actions/risk/history/constants";
import * as AppConstants from "/utilities/constants";

import Router  from 'next/router'

function * getRiskHistory(data, dataType, user) {
  let submitData = {user: user, data: data, dataType: dataType};
  console.log("About to Submit", submitData);
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
  try {
    const receiveJson = yield fetch(AppConstants.BASE_HOST_URL + `risk/Get13MonthHistory`, options); // Fetch call.
    const data = yield receiveJson.json(); // Convert to JSON.
    yield put(Actions.receivedRiskHistoryDataAction(data));
    yield call(Router.push, AppConstants.RISK_HISTORY_13_MONTH_PATH);
  }catch(err){
    yield put(Actions.receivedRiskHistoryDataError(err, null, lists));
  }
}

export default function* watchRiskHistory() {
  yield takeLatest(Constants.GET_RISK_HISTORY, getRiskHistory);
}
