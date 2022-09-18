import { takeLatest, put , call} from "redux-saga/effects";
import * as Actions from "/redux/actions/usermanagement/myinformation/action";
import * as Constants from "/redux/actions/usermanagement/myinformation/constants";
import * as AppConstants from "../../../../utilities/constants";
import Router from 'next/router';


export function * getUser(data){
  console.log("User Record", data);
  const requestURL = AppConstants.BASE_HOST_URL + `security/GetMyUserDetails`;
  
  let  submitData = {user:  data.user, data: data.user};
  console.log("Save", submitData);
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
  var data = null;
  try {
    const receiveJson = yield fetch(requestURL, options); // Fetch call.
    const receivedData = yield receiveJson.json(); // Convert to JSON.
    if(receivedData){
      yield put(Actions.receivedUserDataAction(receivedData));
    }else {
      yield put(Actions.receivedUserDataError(null, receivedData));
    }
  } catch (err) {
    yield put(Actions.receivedUserDataError(err, err));
  }
 
}
 

export function * submitUser(data){
  console.log("User Record", data);
  const requestURL = AppConstants.BASE_HOST_URL + `security/SubmitUserDetails`;
  
  let  submitData = {user:  data.user, data: data.currentUser};
  console.log("Save", submitData);
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
  var data = null;
  try {
    const receiveJson = yield fetch(requestURL, options); // Fetch call.
    const receivedData = yield receiveJson.json(); // Convert to JSON.
    if(receivedData){
      yield put(Actions.receivedUserDataAction(receivedData));
    }else {
      yield put(Actions.receivedUserDataError(null, receivedData));
    }
  } catch (err) {
    yield put(Actions.receivedUserDataError(err, err));
  }
 
}
 
 
export default function* manageUserSaga() {
  yield takeLatest(Constants.VIEW_USER_ACTION, getUser);
  yield takeLatest(Constants.SUBMIT_FORM, submitUser);
}
 