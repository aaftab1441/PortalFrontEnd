import { takeLatest, put, call } from "redux-saga/effects";
import * as Actions from "/redux/actions/organization-management/sales-agent/action";
import * as Constants from "/redux/actions/organization-management/sales-agent/constants";
import * as AppConstants from "/utilities/constants";
import Router from 'next/router'


function * list(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  const receivedData = yield fetch(AppConstants.BASE_HOST_URL + `salesAgent/List`, requestOptions); // Fetch call.
  const results = yield receivedData.json(); // Convert to JSON.
  console.log(results);
  yield put(Actions.receivedGetItems(results));
}



function * deleteItem(subIso) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subIso)
  }

  const receivedData = yield fetch(AppConstants.BASE_HOST_URL + `salesAgent/Delete`, requestOptions); // Fetch call.
  const results = yield receivedData.json(); // Convert to JSON.

  yield put(Actions.receivedDeleteItem(results));
  console.log("Pushing");
  yield call(Router.back);
}


function * get(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  const receivedData = yield fetch(AppConstants.BASE_HOST_URL + `salesAgent/Get`, requestOptions); // Fetch call.
  const results = yield receivedData.json(); // Convert to JSON.
  console.log(results);
  yield put(Actions.receivedGetItem(results));
  //Router.push(Constants.LIST_SALES_OFFICE_PATH);
}


function * save(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  const receivedData = yield fetch(AppConstants.BASE_HOST_URL + `salesAgent/Save`, requestOptions); // Fetch call.
  const results = yield receivedData.json(); // Convert to JSON.
  console.log(results);
  yield put(Actions.receivedSaveItem(results));
  yield call(Router.back);
}


export default function* watchIsoOrganizationManagement() {
  yield takeLatest(Constants.GET_ITEMS, list);
  yield takeLatest(Constants.GET_ITEM, get);
  yield takeLatest(Constants.EDIT_ITEM, get);
  
  yield takeLatest(Constants.DELETE_ITEM, deleteItem);
  yield takeLatest(Constants.SAVE_ITEM, save);
}
