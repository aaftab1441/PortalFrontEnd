import { takeLatest, put } from "redux-saga/effects";
import * as AppConstants from "../../../../../utilities/constants";
import * as Actions from "../../../../actions/usercontainers/common/genericmerchantlist/action";
import * as Constants from "../../../../actions/usercontainers/common/genericmerchantlist/constants";
 

export function * getGenericMerchantListData(param){
 	const requestURL = AppConstants.BASE_HOST_URL + `merchantList/GetMerchantsByStatus`;
	console.log("Getting Pending", param);
	var data = {};
 
	let submitData = param;
	let lists = param.lists;
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
		data = yield receiveJson.json(); // Convert to JSON.
	  if(data){
	    console.log("received", data);
	    yield put(Actions.receivedDataAction(data, lists));
	  }else {
	    yield put(Actions.receivedDataAction(null, data, lists));
	  }
	} catch (err) {
	  yield put(Actions.receivedDataAction(err, data, lists));
	}

   
}

export default function* watchGenericMerchantList() {
  yield takeLatest(Constants.GET_MERCHANTS_ACTION, getGenericMerchantListData);
}