import { takeLatest, put } from "redux-saga/effects";
import * as Actions from "../../../../actions/usercontainers/das/dasisodashboard/action";
import * as Constants from "../../../../actions/usercontainers/das/dasisodashboard/constants";
import * as AppConstants from "../../../../../utilities/constants";


export function* getDASISODashboardData(params) {
	let lists = params.lists;
	delete params.lists;
	const requestURL = AppConstants.BASE_HOST_URL + `dashboard/GetIsoDashboardData`;
	console.log("Getting Pending", params);

	let submitData = params;

	const options = { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(submitData), credentials: 'same-origin' };
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
		data = yield receiveJson.json(); // Convert to JSON.
		if (data) {
			console.log("received");
			yield put(Actions.receivedDASISODashboardDataAction(data, lists));
		} else {
			yield put(Actions.receivedDASISODashboardDataError(null, data, lists));
		}
	} catch (err) {
		yield put(Actions.receivedDASISODashboardDataError(err, data, lists));
	}


}

export default function* watchDasIsoDashboard() {
	yield takeLatest(Constants.GET_DASHBOARD_DATA, getDASISODashboardData);
}
