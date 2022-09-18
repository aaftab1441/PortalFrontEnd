import { takeLatest, put } from "redux-saga/effects";
import * as AppConstants from "/utilities/constants";
import * as Actions from "/redux/actions/usercontainers/common/isoparametersmaintain/search/action";
import * as Constants from "/redux/actions/usercontainers/common/isoparametersmaintain/search/constants";
 
export function * getISOParametersSearchData(params){  
	var lists = params.lists;
	const requestURL = AppConstants.BASE_HOST_URL + `iSOParameters/GetISOParametersSearchData`; 
	var data = {};
	let submitData = {data: params.data, user: params.user, type: params.type};
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options);  
		data = yield receiveJson.json();  
		if(data){
			yield put(Actions.receivedISOParametersSearchDataAction(data, lists));
		}else {
			yield put(Actions.receivedISOParametersSearchDataError(null, data, lists));
		}
	} catch (err) {
	  yield put(Actions.receivedISOParametersSearchDataError(err, data, lists));
	} 
}

export default function* watchISOParameterSearch() {
  yield takeLatest(Constants.GET_ISOPARAMETERS_SEARCH_DATA, getISOParametersSearchData);
}
