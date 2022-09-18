import * as Constants from "../../../../../actions/usercontainers/common/merchantadd/merchantaddstep2/constants";
import * as AppConstants from "../../../../../../utilities/constants";
// Define initial states.



const initialState = {
  task: '',
  changeState: 0,
  loading: false,
  navigationParams: {},
  merchantId: 0,
  owners: [{
    id: '0',
    ownerfirstname: '',
    ownermiddlename: '',
    ownerlastname: '',
    ownerbirthdate: '',
    owneremail: '',
    owneraddress: '',
    ownercity: '',
    ownerstate: '',
    ownerzipcode: '',
    ownerzipcodeplusfour: '',
    ownercitizenship: '',
    ownerpercent: '',
    ownertitle: '',
    ownersocialsecurity: '',
    ownerhomephone: '',
    ownercellphone: '',
    ownerbankruptcy: '',
    ownerbankruptcydate: '',
    ownerlicense: '',
    ownerlicensestate: '',
    ownerlicenseexpiration: '',
  }]
};

const merchantAddStep2Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.SAVE_OWNERS_ACTION:
      return { ...state, changeState: state.changeState + 2 };
    case Constants.RECEIVED_MERCHANT_DATA_ACTION:
      debugger
      state.merchantId = action.data.Success;
      state.owners = action.data.Owners;
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_ADD_STEP_3_PATH };
    case Constants.PERFORM_RETURN_ACTION:
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_ADD_STEP_1_PATH };
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      debugger
      let owners = state.owners;
      let elementName = action.theName.replace(/[0-9]/g, '');
      owners[action.index][elementName] = action.theValue;
      return { ...state, owners: owners, changeState: state.changeState + 1 };
    case Constants.ADD_OWNER_ACTION:
      owners = state.owners;
      owners.push({
        id: '0',
        ownerfirstname: '',
        ownermiddlename: '',
        ownerlastname: '',
        ownerbirthdate: '',
        owneremail: '',
        owneraddress: '',
        ownercity: '',
        ownerstate: '',
        ownerzipcode: '',
        ownerzipcodeplusfour: '',
        ownercitizenship: '',
        ownerpercent: '',
        ownertitle: '',
        ownersocialsecurity: '',
        ownerhomephone: '',
        ownercellphone: '',
        ownerbankruptcy: '',
        ownerbankruptcydate: '',
        ownerlicense: '',
        ownerlicensestate: '',
        ownerlicenseexpiration: '',
      });
      return { ...state, owners: owners, changeState: state.changeState + 1 };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
    default:
      return state;
  }
};

export default merchantAddStep2Reducer;