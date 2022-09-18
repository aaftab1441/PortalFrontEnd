import * as Constants from "../../../../../actions/usercontainers/common/merchantadd/merchantaddstep5/constants";
import * as AppConstants from "../../../../../../utilities/constants";
// Define initial states.
const initialState = {
  task: '',
  loading: false,
  changeState: 0,
  selectedTemplateId: '',
  navigationParams: {},
  merchantId: 0,
  templates: [{ id: '', name: '', categories: [{ fees: [{ id: '', defaultvalue: '' }] }] }]
};

const merchantAddStep5Reducer = (state = initialState, action) => {
  //console.log("Merchant Add Step 5 Action", action);
  switch (action.type) {
    case Constants.ADD_MERCHANT_STEP5_ACTION:
      debugger
      return { ...state, loading: true, changeState: state.changeState + 5 };
    case Constants.RECEIVED_MERCHANT_DATA_ACTION:
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_ADD_STEP_1_PATH };
    case Constants.RECEIVED_FEES_ACTION:
      state.templates = action.data.Fees.templates;
      return { ...state };
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.PERFORM_RETURN_ACTION:
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_ADD_STEP_4_PATH };
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      if (action.theName === "selectedTemplateId") {
        state.selectedTemplateId = action.theValue;
        return { ...state };
      }
      else {
        let name = action.theName.split("-");
        let selectedTemplate = state.templates.find(obj => {
          return obj.id === state.selectedTemplateId;
        })

        let category = selectedTemplate.categories.find(obj => {
          return obj.id === name[1];
        })

        let fee = category.fees.find(obj => {
          return obj.id === name[2];
        })

        let isInt = (n => {
          return n % 1 === 0;
        })

        let currentValue = action.theValue;

        let value;
        if (isInt(fee.lowValue) && isInt(fee.highValue)) {
          value = Math.max(parseInt(fee.lowValue), Math.min(parseInt(fee.highValue), Number(action.theValue)));
        }
        else {
          value = Math.max(parseFloat(fee.lowValue), Math.min(parseFloat(fee.highValue), parseFloat(action.theValue)));
        }

        if (value == currentValue) {
          fee.defaultValue = value;
        }

        return { ...state, changeState: state.changeState + 1 };
      }
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
    default:
      return state;
  }
};

export default merchantAddStep5Reducer;

