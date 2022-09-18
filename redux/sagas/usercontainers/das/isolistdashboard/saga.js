import { takeLatest, put, call } from "redux-saga/effects";
import * as Actions from "../../../../actions/usercontainers/das/isolistdashboard/action";
import * as Constants  from "../../../../actions/usercontainers/das/isolistdashboard/constants";
import * as AppConstants from "../../../../../utilities/constants";


export function * getIsoListDashboardData(params){
	console.log("Get Data ISO Dashboard");
	 
	var lists = params.lists;
	const requestURL = AppConstants.BASE_HOST_URL + `dashboard/GetIsoListDashboardData`;
	 
	 
	let submitData = params;
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
    data = yield receiveJson.json(); // Convert to JSON.
	  if(data){
	    console.log("received");
	    yield put(Actions.receivedIsoListDashboardDataAction(data, lists));
	  }else {
	    yield put(Actions.receivedIsoListDashboardDataError(null, data, lists));
	  }
	} catch (err) {
	  yield put(Actions.receivedIsoListDashboardDataError(err, data, lists));
	}

   
} 

export function * getIsoMerchantCounts(params){
	console.log("Get Data ISO Dashboard"); 
	var lists = params.lists;
	const requestURL = AppConstants.BASE_HOST_URL + `dashboard/GetIsoMerchantCounts`; 
	 
	let submitData = params; 
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
    data = yield receiveJson.json(); // Convert to JSON.
	  if(data){
	    console.log("received");
	    yield put(Actions.receivedIsoMerchantCountDataAction(data, lists));
	  }else {
	    yield put(Actions.receivedIsoMerchantCountDataError(null, data, lists));
	  }
	} catch (err) {
	  yield put(Actions.receivedIsoMerchantCountDataError(err, data, lists));
	} 
} 

export default function* watchIsoListDashboard() {
  yield takeLatest(Constants.GET_ISO_DASHBOARD_DATA, getIsoListDashboardData);
  yield takeLatest(Constants.GET_ISO_MERCHANT_COUNT_DATA, getIsoMerchantCounts);
  
}

