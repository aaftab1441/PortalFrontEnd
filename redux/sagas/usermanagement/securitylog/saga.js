import { takeLatest, put } from "redux-saga/effects";
import * as Actions from "/redux/actions/usermanagement/securitylog/action";
import * as Constants from "/redux/actions/usermanagement/securitylog/constants";
import * as AppConstants from "../../../../utilities/constants";


export function * getSecurityLog(user, lists){
  
}
 

export default function* securityLogSaga() {
  yield takeLatest(Constants.GET_SECURITY_LOG_DATA, getSecurityLog);
}
 