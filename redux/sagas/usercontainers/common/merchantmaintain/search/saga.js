import { takeLatest, put } from "redux-saga/effects";
import * as AppConstants from "/utilities/constants";
import * as Actions from "/redux/actions/usercontainers/common/merchantmaintain/search/action";
import * as Constants from "/redux/actions/usercontainers/common/merchantmaintain/search/constants";
import * as DetailActions from "/redux/actions/usercontainers/common/merchantmaintain/detail/action";
 
export function * getMerchantSearchData(params){  
	 
	const requestURL = AppConstants.BASE_HOST_URL + `merchantSearch/GetMerchantSearchData`; 
	var data = {};
	let submitData = params;
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options);  
		data = yield receiveJson.json();  
		if(data){
			yield put(Actions.receivedMerchantSearchDataAction(data));
		}else {
			yield put(Actions.receivedMerchantSearchDataError(null, data));
		}
	} catch (err) {
	  yield put(Actions.receivedMerchantSearchDataError(err, data));
	} 
}

export function * getMerchantDetail(params){  
	var lists = params.lists;
	const requestURL = AppConstants.BASE_HOST_URL + `merchantSearch/GetMerchantMaintainDetail`; 
	var data = {};
	let submitData = {merchant: params.merchant, user: params.user, type: params.type};
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options);  
		data = yield receiveJson.json();  
		if(data){
			yield put(DetailActions.receivedMerchantDetailDataAction(data, lists));
		}else {
			yield put(DetailActions.receivedMerchantDetailDataError(null, data, lists));
		}
	} catch (err) {
	  yield put(DetailActions.receivedMerchantDetailDataError(err, data, lists));
	} 
}

export default function* watchMerchantSearch() {
  yield takeLatest(Constants.GET_MERCHANT_SEARCH_DATA, getMerchantSearchData);
  yield takeLatest(Constants.CHANGE_PAGE_ACTION, getMerchantSearchData);
}
