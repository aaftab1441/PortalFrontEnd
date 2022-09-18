import { takeLatest, put, call } from "redux-saga/effects";
import * as Actions from "/redux/actions/organization-management/iso/action";
import * as Constants from "/redux/actions/organization-management/iso/constants";
import * as AppConstants from "/utilities/constants";
import Router from 'next/router'


function * list(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  const receivedData = yield fetch(AppConstants.BASE_HOST_URL + `iso/List`, requestOptions); // Fetch call.
  const results = yield receivedData.json(); // Convert to JSON.
  console.log(results);
  yield put(Actions.receivedGetISOs(results));
}



function * deleteItem(iso) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(iso)
  }

  const receivedData = yield fetch(AppConstants.BASE_HOST_URL + `iso/Delete`, requestOptions); // Fetch call.
  const results = yield receivedData.json(); // Convert to JSON.

  yield put(Actions.receivedDeleteISO(results));
  console.log("Pushing");
  yield call(Router.push, AppConstants.LIST_ISOS_PATH);
}


function * get(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  const receivedData = yield fetch(AppConstants.BASE_HOST_URL + `iso/Get`, requestOptions); // Fetch call.
  const results = yield receivedData.json(); // Convert to JSON.
  console.log(results);
  yield put(Actions.receivedGetISO(results));
  //Router.push(Constants.LIST_ISOS_PATH);
}


function * save(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  const receivedData = yield fetch(AppConstants.BASE_HOST_URL + `iso/Save`, requestOptions); // Fetch call.
  const results = yield receivedData.json(); // Convert to JSON.
  console.log(results);
  yield put(Actions.receivedSaveISO(results));
  yield call(Router.push, AppConstants.LIST_ISOS_PATH);
}


export default function* watchIsoOrganizationManagement() {
  yield takeLatest(Constants.GET_ISOS, list);
  yield takeLatest(Constants.GET_ISO, get);

  yield takeLatest(Constants.DELETE_ISO, deleteItem);
  yield takeLatest(Constants.SAVE_ISO, save);
}
