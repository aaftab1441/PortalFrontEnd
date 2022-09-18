import { takeLatest, put } from "redux-saga/effects";
import * as Actions from "../../actions/dashboard/action";
import * as ActionConstants from "../../actions/dashboard/constants";
import * as AppConstants from "../../../utilities/constants";
import { fetchedConfigAction } from "../../actions/central/action";


function * getDashboardData(type, user, lists) {
  console.log("Dashboard", type);
  delete type.lists;
  let submitData = type;
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(submitData)
}
  const receivedJson = yield fetch(AppConstants.BASE_HOST_URL + `dashboard/GetDashboardData`, requestOptions); // Fetch call.
  const receivedData = yield receivedJson.json(); // Convert to JSON.
  yield put(Actions.receivedDashboardDataAction(receivedData));
}

export default function* watchDashboard() {
  yield takeLatest(ActionConstants.GET_DASHBOARD_DATA, getDashboardData);
  yield takeLatest(ActionConstants.SELECT_MERCHANT_ACTION, getDashboardData);
  
}
