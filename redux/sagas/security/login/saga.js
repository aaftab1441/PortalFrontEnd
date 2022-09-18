import { takeLatest, put, call } from "redux-saga/effects";
import * as Actions from "/redux/actions/security/login/action";
import * as Constants from "/redux/actions/security/login/constants";
import * as AppConstants from "/utilities/constants";

import Router  from 'next/router'

function * submitLoginInfo(user, lists) {
  let submitData = user;
  console.log("About to Submit", submitData);
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
  try {
    const receiveJson = yield fetch(AppConstants.BASE_HOST_URL + `login/Authenticate`, options); // Fetch call.
    const data = yield receiveJson.json(); // Convert to JSON.
    yield put(Actions.receivedLoginInfo(data));
    if(data.Success && data.result.User){
      yield call(Router.push, AppConstants.DASHBOARD_PATH);
    }
    
  }catch(err){
    yield put(Actions.submitLoginInfoError(err, null, lists));
  }
}

export default function* watchLogin() {
  yield takeLatest(Constants.SUBMIT_LOGIN_ACTION, submitLoginInfo);
}
