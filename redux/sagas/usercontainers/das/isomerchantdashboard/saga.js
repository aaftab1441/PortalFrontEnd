import { takeLatest, put } from "redux-saga/effects";
import * as Actions from "../../../../actions/usercontainers/das/isomerchantdashboard/action";
import * as Constants from "../../../../actions/usercontainers/das/isomerchantdashboard/constants";
import * as AppConstants from "../../../../../utilities/constants";




export function* getIsoMerchantDashboardData(params) {
	console.log("Get Data ISO Dashboard", params);


	const requestURL = AppConstants.BASE_HOST_URL + `dashboard/GetIsoDetailDashboardData`;
	let lists = params.lists;
	var data = {};
	let submitData = params;

	const options = { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(submitData), credentials: 'same-origin' };
	var data = null;
	try {
		const receiveJson = yield fetch(requestURL, options); // Fetch call.
		data = yield receiveJson.json(); // Convert to JSON.
		if (data) {
			console.log("received");
			yield put(Actions.receivedIsoMerchantDashboardDataAction(data, lists));
		} else {
			yield put(Actions.receivedIsoMerchantDashboardDataError(null, data, lists));
		}
	} catch (err) {
		yield put(Actions.receivedIsoMerchantDashboardDataError(err, data, lists));
	}
}
export default function* watchIsoMerchantDashboard() {
	yield takeLatest(Constants.GET_ISO_MERCHANT_DASHBOARD_DATA, getIsoMerchantDashboardData);
}

