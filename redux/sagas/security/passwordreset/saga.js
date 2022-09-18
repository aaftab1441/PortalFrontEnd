import { takeLatest, put } from "redux-saga/effects";
import * as Actions from "../../../actions/security/passwordreset/action";
import * as Constants from "../../../actions/security/passwordreset/constants";
import * as AppConstants from "../../../../utilities/constants";


export function * resetPassword(user, lists){
  const requestURL = AppConstants.BASE_HOST_URL + `resetPassword`;
  console.log("User Record", user);
  var data = {};

  const submitData = Object.assign(user);
  console.log("Save", submitData);
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
  var data = null;
  try {
    const receiveJson = yield fetch(requestURL, options); // Fetch call.
    const data = yield receiveJson.json(); // Convert to JSON.
    if(data){
      yield put(Actions.receivePasswordReset(data, lists));
    }else {
      yield put(Actions.receivePasswordResetError(null, data, lists));
    }
  } catch (err) {
    yield put(Actions.receivePasswordResetError(err, err));
  }

}
 

export default function* passwordResetSaga() {
  yield takeLatest(Constants.SUBMIT_PASSWORD_RESET_INFO_ACTION, resetPassword);
}
 