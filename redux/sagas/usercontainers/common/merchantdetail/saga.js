import { takeLatest, put } from "redux-saga/effects";
import * as AppConstants from "../../../../../utilities/constants";
import * as Actions from "../../../../actions/usercontainers/common/merchantdetail/action";
import * as Constants from "../../../../actions/usercontainers/common/merchantdetail/constants";


 

export function * getMerchantDetailData(params){
   
	var lists = params.lists;
	const requestURL = AppConstants.BASE_HOST_URL + `merchantSearch/GetMerchantDetail`;
	 
	var data = {};
	let submitData = params;
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
    data = yield receiveJson.json(); // Convert to JSON.
	  if(data){
	    console.log("received");
	    yield put(Actions.receivedMerchantDetailDataAction(data, lists));
	  }else {
	    yield put(Actions.receivedMerchantDetailDataError(null, data, lists));
	  }
	} catch (err) {
	  yield put(Actions.receivedMerchantDetailDataError(err, data, lists));
	}
}


export function * getChangePageAction(params){
	var lists = params.lists;
	const requestURL = AppConstants.BASE_HOST_URL + `merchantSearch/GetPageData`;
	 
	var data = {};
	let submitData = params;
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
    data = yield receiveJson.json(); // Convert to JSON.
	  if(data){
	    console.log("received");
	    yield put(Actions.receivedPageChangeAction(data, lists));
	  }else {
	    yield put(Actions.receivedPageChangeError(null, data, lists));
	  }
	} catch (err) {
	  yield put(Actions.receivedPageChangeError(err, data, lists));
	}
}

export function * getChargeBackExport(data){
	 
	const requestURL = AppConstants.BASE_HOST_URL + `merchantDetail/ExportChargeBacks`;
	 
 
	let submitData = data;
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
    	data = yield receiveJson.json(); // Convert to JSON.
	  if(data){
	    console.log("File Name:", data.FileName);
	    window.location = AppConstants.BASE_HOST_URL + `merchantDetail/GetFile?fileName=` + data.FileName;
	  }else {
	    yield put(Actions.receivedExportChargeBacksError(null, data));
	  }
	} catch (err) {
	  yield put(Actions.receivedExportChargeBacksError(err, data));
	}
}


export function * getStatement(data){
	 
	const requestURL = AppConstants.BASE_HOST_URL + `merchantDetail/GenerateStatement`;
	 
 
	let submitData = data;
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
    	data = yield receiveJson.json(); // Convert to JSON.
	  if(data){
	    console.log("File Name:", data.FileName);
	    window.location = AppConstants.BASE_HOST_URL + `merchantDetail/GetFile?fileName=` + data.FileName;
	  }else {
	    yield put(Actions.receivedExportChargeBacksError(null, data));
	  }
	} catch (err) {
	  yield put(Actions.receivedExportChargeBacksError(err, data));
	}
}


export default function* watchCentral() {
	yield takeLatest(Constants.EXPORT_CHARGE_BACK_ACTION, getChargeBackExport);
	yield takeLatest(Constants.GET_STATEMENT_ACTION, getStatement);
  
  yield takeLatest(Constants.GET_MERCHANT_ACTION, getMerchantDetailData);
  yield takeLatest(Constants.CHANGE_PAGE_ACTION, getChangePageAction);
  
}
