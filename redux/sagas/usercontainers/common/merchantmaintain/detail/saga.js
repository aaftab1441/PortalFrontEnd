import { takeLatest, put } from "redux-saga/effects";
import * as AppConstants from "/utilities/constants";
import * as Actions from "/redux/actions/usercontainers/common/merchantmaintain/detail/action";
import * as Constants from "/redux/actions/usercontainers/common/merchantmaintain/detail/constants";


 

export function * getMerchantDetailData(params){
   
	var lists = params.lists;
	const requestURL = AppConstants.BASE_HOST_URL + `merchantSearch/GetMerchantMaintainDetail`;
	 
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

export default function* watchMerchantMaintainDetail() {
  yield takeLatest(Constants.GET_MERCHANT_ACTION, getMerchantDetailData);
  yield takeLatest(Constants.CHANGE_PAGE_ACTION, getChangePageAction);
  
}
