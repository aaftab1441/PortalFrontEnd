import * as Constants from "../../../../../actions/usercontainers/common/merchantadd/merchantaddstep3/constants";
import * as AppConstants from "../../../../../../utilities/constants";
// Define initial states.
const initialState = {
  task: '',
  loading: false,
  changeState: 0,
  navigationParams: {},
  isoInfo: { id: 0, iso_code: '', sub_iso_code: '', sales_office: '', sales_rep_code: '' },
  merchantId: 0,
};

const merchantAddStep3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.SAVE_ISO_INFO_ACTION:
      return { ...state, changeState: state.changeState + 3 };
    case Constants.RECEIVED_MERCHANT_DATA_ACTION:
      state.merchantId = action.data.Success;
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_ADD_STEP_4_PATH };
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.PERFORM_RETURN_ACTION:
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_ADD_STEP_2_PATH };
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      let editIsoInfo = state.isoInfo;
      editIsoInfo[action.theName] = action.theValue;
      return { ...state, changeState: state.changeState + 1 };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
    default:
      return state;
  }
};

export default merchantAddStep3Reducer;