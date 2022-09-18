import { takeLatest, put } from "redux-saga/effects";
import * as Actions from "../../../../actions/usercontainers/iso/isodashboard/action";
import * as Constants  from "../../../../actions/usercontainers/iso/isodashboard/constants";
import * as AppConstants from "../../../../../utilities/constants";
import { fetchedConfigAction } from "../../../../actions/central/action";


 
export function * getDashboardData(user, lists){
	const requestURL = AppConstants.BASE_HOST_URL + `dashboard/GetDashboardData`;
	console.log("Getting Pending", user);
	var data = {};
	let submitData = {user: user};
	
	const options = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(submitData), credentials: 'same-origin'};
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
    data = yield receiveJson.json(); // Convert to JSON.
	  if(data){
	    console.log("received");
	    yield put(Actions.receivedDashboardDataAction(data, lists));
	  }else {
	    yield put(Actions.receivedDashboardDataError(null, data, lists));
	  }
	} catch (err) {
	  yield put(Actions.receivedDashboardDataError(err, data, lists));
	}

   
}
export default function* watchIsoMerchantDashboard() {
  yield takeLatest(Constants.GET_DASHBOARD_DATA, getDashboardData);
}
