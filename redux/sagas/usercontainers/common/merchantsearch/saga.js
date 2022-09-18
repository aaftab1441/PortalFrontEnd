import { takeLatest, put } from "redux-saga/effects";
import * as AppConstants from "../../../../../utilities/constants";
import * as Actions from "../../../../actions/usercontainers/common/merchantsearch/action";
import * as Constants from "../../../../actions/usercontainers/common/merchantsearch/constants";
 
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

export default function* watchMerchantSearch() {
  yield takeLatest(Constants.GET_MERCHANT_SEARCH_DATA, getMerchantSearchData);
  yield takeLatest(Constants.CHANGE_PAGE_ACTION, getMerchantSearchData);
  
}
