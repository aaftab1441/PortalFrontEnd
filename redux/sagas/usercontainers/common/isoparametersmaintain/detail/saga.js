import { takeLatest, put } from "redux-saga/effects";
import * as AppConstants from "/utilities/constants";
import * as Actions from "/redux/actions/usercontainers/common/isoparametersmaintain/detail/action";
import * as Constants from "/redux/actions/usercontainers/common/isoparametersmaintain/detail/constants";

export function * getISOParameterDetailData(params){
   
	var lists = params.lists;
	const requestURL = AppConstants.BASE_HOST_URL + `iSOParameters/GetISOParametersDetail`;
	 
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
	    yield put(Actions.receivedISOParametersDetailDataError(null, data, lists));
	  }
	} catch (err) {
	  yield put(Actions.receivedISOParametersDetailDataError(err, data, lists));
	}
}


export function * getChangePageAction(params){
	var lists = params.lists;
	const requestURL = AppConstants.BASE_HOST_URL + `iSOParameters/GetPageData`;
	 
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

export default function* watchMerchantMaintainDetail() {
  yield takeLatest(Constants.GET_ISOPARAMETERS_ACTION, getISOParameterDetailData);
  yield takeLatest(Constants.CHANGE_PAGE_ACTION, getChangePageAction);
  
}
