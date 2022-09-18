import * as Constants from "../../../../../actions/usercontainers/common/merchantadd/merchantaddstep1/constants";
import * as AppConstants from "../../../../../../utilities/constants";
// Define initial states.
const initialState = {
  task: '',
  changeState: 0,
  loading: false,
  navigationParams: {},
  merchant: {
    id: 0,
    legalname: '',
    legaladdress: '',
    legalcity: '',
    legalstate: '',
    legalzipcode: '',
    legalzipcodeplus4: '',
    legalphone: '',
    legalfax: '',
    emailaddress: '',
    website: '',
    federalid: '',
    stateofincorporation: '',
    dateofincorporation: '',
    howlongdba: '',
    ownershiptype: '',
    mccsubtype: '',
    locationnumber: '',
    legalbankruptcy: '',
    legalbankruptcyexplain: '',
    bankruptcydischargedate: '',
    reference1name: '',
    reference2name: '',
    reference1address: '',
    reference2address: '',
    reference1companyname: '',
    reference2companyname: '',
    reference1title: '',
    reference2title: '',
    reference1phone: '',
    reference2phone: '',
    reference1fax: '',
    reference2fax: '',
    reference1account: '',
    reference2account: '',

  }
};

const merchantAddStep1Reducer = (state = initialState, action) => {

  switch (action.type) {
    case Constants.SAVE_MERCHANT_ACTION:
      return { ...state, changeState: state.changeState + 1 };
    case Constants.RECEIVED_MERCHANT_DATA_ACTION:
      state.merchant.id = action.data.Success;
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_ADD_STEP_2_PATH };
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.HANDLE_AUTO_COMPLETE_CHANGE_ACTION:
      debugger
      let editMerchant = state.merchant;
      editMerchant[action.theName] = action.theValue;
      return { ...state, changeState: state.changeState + 1 };
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      debugger
      editMerchant = state.merchant;
      editMerchant[action.theName] = action.theValue;
      return { ...state, changeState: state.changeState + 1 };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
    default:
      return state;
  }
};

export default merchantAddStep1Reducer;