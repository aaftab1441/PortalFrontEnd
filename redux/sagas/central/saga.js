import { takeLatest, put } from "redux-saga/effects";
import * as Actions from  "../../actions/central/action";
import * as Constants from  "../../actions/central/constants";
import * as AppConstants from "../../../utilities/constants";
import  { LOCATION_CHANGE } from 'connected-react-router';

function * fetchConfig() {
  console.log("Central");
  const configData = yield fetch(AppConstants.BASE_HOST_URL + `config/list`); // Fetch call.
  const config = yield configData.json(); // Convert to JSON.
  console.log(config);
  yield put(Actions.receivedListsAndConfig(config));
}

export default function* watchCentral() {
  yield takeLatest(Constants.LOAD_LISTS_AND_CONFIG, fetchConfig);
}
