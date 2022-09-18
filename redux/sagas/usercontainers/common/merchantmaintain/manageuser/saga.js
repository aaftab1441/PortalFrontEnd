import { takeLatest, put , call} from "redux-saga/effects";
import * as Actions from "/redux/actions/usercontainers/common/merchantmaintain/manageuser/action";
import * as Constants from "/redux/actions/usercontainers/common/merchantmaintain/manageuser/constants";

import * as AppConstants from "/utilities/constants";
import Router from 'next/router';


export function * getUser(toSubmit){
  console.log("User Record", data);
  const requestURL = AppConstants.BASE_HOST_URL + `security/GetUserDetails`;
  
  console.log("get user", toSubmit);
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(toSubmit), credentials: 'same-origin'};
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

export function * deleteUser(data){
  console.log("User Record", data);
  const requestURL = AppConstants.BASE_HOST_URL + `security/DeleteUser`;
  
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(data), credentials: 'same-origin'};
  try {
    const receiveJson = yield fetch(requestURL, options); // Fetch call.
    const receivedData = yield receiveJson.json(); // Convert to JSON.
    if(receivedData){
      yield put(Actions.receivedUserDeleteAction(receivedData));
      yield call(Router.push, data.fromLocation);
    }else {
      yield put(Actions.receivedUserDeleteError(null, receivedData));
    }
    
  } catch (err) {
    yield put(Actions.receivedUserDeleteError(err, err));
  }
 
}

export function * deleteUserAccess(data){
  delete data.lists;
  console.log("User Access", data);
  const requestURL = AppConstants.BASE_HOST_URL + `security/DeleteUserAccess`;
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(data), credentials: 'same-origin'};
  try {
    const receiveJson = yield fetch(requestURL, options); // Fetch call.
    const receivedData = yield receiveJson.json(); // Convert to JSON.
    if(receivedData){
      yield put(Actions.receivedUserAccessDeleteAction(receivedData));
      yield call(getUser, {currentUser: data.currentUser.UserDetails, user: data.user});
    }else {
      yield put(Actions.receivedUserAccessDeleteError(null, receivedData));
    }
    
  } catch (err) {
    yield put(Actions.receivedUserAccessDeleteError(err, err));
  }
 
}
 

export function * enableUserAccess(data){
  delete data.lists;
  console.log("Enable Access", data);
  const requestURL = AppConstants.BASE_HOST_URL + `security/EnableUserAccess`;
  
  const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(data), credentials: 'same-origin'};
  try {
    const receiveJson = yield fetch(requestURL, options); // Fetch call.
    const receivedData = yield receiveJson.json(); // Convert to JSON.
    if(receivedData){
      yield put(Actions.receivedUserAccessEnableAction(receivedData));
      yield call(getUser, {currentUser: data.currentUser.UserDetails, user: data.user});

    }else {
      yield put(Actions.receivedUserAccessEnableError(null, receivedData));
    }
    
  } catch (err) {
    yield put(Actions.receivedUserAccessEnableError(err, err));
  }
 
}
 
export function * getMerchantSearchData(params){  
	const requestURL = AppConstants.BASE_HOST_URL + `merchantSearch/GetMerchantSearchData`; 
	var data = {};
	let submitData = params;
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
		data = yield receiveJson.json(); // Convert to JSON.
	  if(data){
	    console.log("received");
	    yield put(Actions.receivedMerchantSearchDataAction(data));
	  }else {
	    yield put(Actions.receivedMerchantSearchDataError(null, data));
	  }
	} catch (err) {
	  yield put(Actions.receivedMerchantSearchDataError(err, data));
	} 
}
 
export default function* watchMerchantMaintainUserSaga() {
  yield takeLatest(Constants.VIEW_USER_ACTION, getUser);
  yield takeLatest(Constants.SUBMIT_FORM, submitUser);
  yield takeLatest(Constants.DELETE_USER_ACTION, deleteUser);
  yield takeLatest(Constants.DELETE_USER_ACCESS_ACTION, deleteUserAccess);
  yield takeLatest(Constants.ENABLE_USER_ACCESS_ACTION, enableUserAccess);
  yield takeLatest(Constants.GET_MERCHANT_SEARCH_DATA, getMerchantSearchData);
  yield takeLatest(Constants.CHANGE_PAGE_ACTION, getMerchantSearchData);
}
 