import { takeLatest, put } from "redux-saga/effects";
import * as Actions from "../../../../../actions/usercontainers/common/merchantadd/merchantaddstep5/action";
import * as Constants from "../../../../../actions/usercontainers/common/merchantadd/merchantaddstep5/constants";
import * as AppConstants from "../../../../../../utilities/constants";
import { LOCATION_CHANGE } from 'connected-react-router';
import { propsToClassKey } from "@mui/styles";

function* fetchFees(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }

  const feesData = yield fetch(AppConstants.BASE_HOST_URL + `fees/Getfees`, requestOptions); // Fetch call.

  const fees = yield feesData.json(); // Convert to JSON.
  console.log(fees);
  yield put(Actions.receivedFeesAction(fees));
}

export function* submitMerchantStep5(params) {

  debugger
  const selectedTemplate = params.templates.find(obj => {
    return obj.id === params.selectedTemplateId
  })
  //TODO: for time being hardcoding application information, not sure how where to get this information, we don't have this information on UI
  const application = {
    displayid: '001',
    appid: '001',
    applicationstatusid: '1',
    applicationtypeid: '',
    isoid: '',
    lenderid: '',
    giftloyaltyid: '',
    lineofcreditid: '',
    checkaccountid: '',
    locationid: '',
    underwritingcomplete: '',
    invoiceid: '',
    applicationdate: '',
    statuschangedate: '',
    statuschangeby: '',
    newapplicationdate: '',
    paperworksentdate: '',
    paperworkreceiveddate: '',
    incompletepaperworkdate: '',
    outstandingesigdate: '',
    completedesigdate: '',
    submittedtovalidationdate: '',
    invalidationdate: '',
    submittedtopivitoldate: '',
    cancelleddate: '',
    liveaccountdate: '',
    validationrejecteddate: '',
    fundeddate: '',
    approveddate: '',
    paidoffdate: '',
    submittedtounderwritingdate: '',
    incompleteapplicationdate: '',
    voidflag: '',
    unlockfeesflag: '',
    checkprocid: '',
    leadid: ''
  }
  const data = { merchantId: params.merchantId, template: selectedTemplate, application: application }
  const requestURL = AppConstants.BASE_HOST_URL + `Application/AddApplication`;

  const options = { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), credentials: 'same-origin' };

  try {
    const receiveJson = yield fetch(requestURL, options);  //Fetch call.
    const receivedData = yield receiveJson.json();  //Convert to JSON.
    if (receivedData) {
      yield put(Actions.receivedMerchantDataAction(receivedData));
    } else {
      yield put(Actions.receivedMerchantDataError(null, receivedData));
    }
  } catch (err) {
    yield put(Actions.receivedMerchantDataError(err, err));
  }
}

export default function* watchCentral() {
  yield takeLatest(Constants.GET_FEES_ACTION, fetchFees);
  yield takeLatest(Constants.ADD_MERCHANT_STEP5_ACTION, submitMerchantStep5);
}