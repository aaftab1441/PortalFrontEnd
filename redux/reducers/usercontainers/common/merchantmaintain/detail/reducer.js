import * as Constants from "/redux/actions/usercontainers/common/merchantmaintain/detail/constants";
import * as SearchConstants from "/redux/actions/usercontainers/common/merchantmaintain/search/constants";

// Define initial states.
const initialState = {
  task: '',
  loading: false,
  sectionLoading: { batch: false, transactions: false, ach: false, chargebacks: false },
  currentMerchant: { Iso: {}, Merchant: {}, Users: [] },
  changeState: 0,
  userSearchParams: { emailId: '', firstName: '', lastName: '', city: '' },
  itemSearch: {
    user: { batchStartDate: '', batchEndDate: '' }, transactions: { transactionStartDate: '', transactionEndDate: '', transactionCard: '' },
    ach: { achStartDate: '', achEndDate: '' }, chargebacks: { chargebacksStartDate: '', chargebacksEndDate: '', chargebacksCard: '' }
  },
};

const merchantMaintainDetailReducer = (state = initialState, action) => {
  console.log("Merchant Detail Action", action);
  switch (action.type) {
    case Constants.HANDLE_USER_SEARCH_CHANGE_ACTION:
      let currentSearch = state.userSearchParams;
      currentSearch[action.theName] = action.theValue;
      return { ...state, loading: false, userSearchParams: currentSearch, changeState: state.changeState + 1 };

    case Constants.CHANGE_PAGE_ACTION:
      let sectionLoading = state.sectionLoading;
      sectionLoading[action.pageInfo.Name] = true;
      return { ...state, sectionLoading: sectionLoading, changeState: state.changeState + 1 };
    case Constants.HANDLE_SEARCH_CHANGE_ACTION:
      let itemSearch = state.itemSearch;
      itemSearch[action.container][action.theName] = action.theValue;
      return { ...state, itemSearch: itemSearch, changeState: state.changeState + 1 };

    case SearchConstants.VIEW_MERCHANT_ACTION:
      let currentMerchant = state.currentMerchant;
      currentMerchant.Merchant = action.merchant;
      return { ...state, currentMerchant: currentMerchant, changeState: state.changeState + 1 };

    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };

    case Constants.GET_MERCHANT_ACTION:
      return { ...state, loading: true };
    case Constants.RECEIVED_MERCHANT_DETAIL_DATA_ERROR:
      return { ...state, loading: false };
    case Constants.RECEIVED_MERCHANT_DETAIL_DATA_ACTION:
      if (action.data.result) {
        return { ...state, currentMerchant: action.data.result, changeState: state.changeState + 1, loading: false };
      }
      break;
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      let items = state.merchantDetail;

      if (typeof action.checked !== "undefined") {
        items[action.theName] = action.checked ? action.theValue : 0;
      } else {
        items[action.theName] = action.theValue.toUpperCase();
      }
      return { ...state, merchantAddStep5: items };
    case Constants.GET_MERCHANT_DETAIL_DATA:
      return { ...state, loading: true };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };

    default:
      return state;
  }
};

export default merchantMaintainDetailReducer;