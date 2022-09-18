import { takeEvery, put, call } from "redux-saga/effects";
import * as Actions from "/redux/actions/usermanagement/listusers/action";
import * as Constants from "/redux/actions/usermanagement/listusers/constants";
import * as AppConstants from "../../../../utilities/constants";
import { fetchedConfigAction } from "/redux/actions/central/action";

import Router  from 'next/router'




function * getUserList(data) {
  const requestURL = AppConstants.BASE_HOST_URL + `security/GetUserList`;
  console.log("User User List", data);
  let  submitData = {user:  data.user, data: data.data};  
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
  try {
    const receiveJson = yield fetch(requestURL, options); // Fetch call.
    const data = yield receiveJson.json(); // Convert to JSON.
    yield put(Actions.receivedUserListDataAction(data));   
    
  }catch(err){
    yield put(Actions.receivedUserListDataError(err, null));
  }
}


function * getMerchantUserList(data) {
  const requestURL = AppConstants.BASE_HOST_URL + `security/GetMerchantUserList`;
  console.log("User User List", data);
  let  submitData = data;
  
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
  try {
    const receiveJson = yield fetch(requestURL, options); // Fetch call.
    const data = yield receiveJson.json(); // Convert to JSON.
    yield put(Actions.receivedMerchantUserListDataAction(data));
  }catch(err){
    yield put(Actions.receivedUserListDataError(err, null));
  }
}

export default function* listUsersSaga() {
  yield takeEvery(Constants.GET_USER_LIST_DATA, getUserList);
  yield takeEvery(Constants.GET_MERCHANT_USER_LIST_DATA, getMerchantUserList);
  yield takeEvery(Constants.CHANGE_MERCHANT_USERS_PAGE_ACTION, getMerchantUserList);
  
  
}
