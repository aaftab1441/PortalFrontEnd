import * as Constants from "../../../../actions/usercontainers/common/merchantdetail/constants";

// Define initial states.
const initialState = {
  task: '',
  loading: false,
  sectionLoading: { batch: false, transactions: false, ach: false, chargebacks: false },
  changeState: 0,
  openTransactionDetail: false,
  openBatchDetail: false,
  openACHDetail: false,
  openChargeBackDetail: false,
  transactionDetail: {},
  batchDetail: {},
  aCHDetail: {},
  chargeBackDetail: {},
  itemSearch: {
    batch: { batchStartDate: '', batchEndDate: '' }, transactions: { transactionStartDate: '', transactionEndDate: '', transactionCard: '' },
    ach: { achStartDate: '', achEndDate: '' }, chargebacks: { chargebacksStartDate: '', chargebacksEndDate: '', chargebacksCard: '' }
  },
};

const merchantDetailReducer = (state = initialState, action) => {
  console.log("Merchant Detail Action", action);
  switch (action.type) {

    case Constants.CHANGE_PAGE_ACTION:
      let sectionLoading = state.sectionLoading;
      sectionLoading[action.pageInfo.Name] = true;
      return { ...state, sectionLoading: sectionLoading, changeState: state.changeState + 1 };
    case Constants.HANDLE_SEARCH_CHANGE_ACTION:
      let itemSearch = state.itemSearch;
      itemSearch[action.container][action.theName] = action.theValue;
      return { ...state, itemSearch: itemSearch, changeState: state.changeState + 1 };
    case Constants.VIEW_TRANSACTION_DETAIL:
      return { ...state, openTransactionDetail: true, transactionDetail: action.data };
    case Constants.VIEW_BATCH_DETAIL:
      return { ...state, openBatchDetail: true, batchDetail: action.data };
    case Constants.VIEW_ACH_DETAIL:
      return { ...state, openACHDetail: true, aCHDetail: action.data };
    case Constants.VIEW_CHARGEBACK_DETAIL:
      return { ...state, openChargeBackDetail: true, chargeBackDetail: action.data };
    case Constants.CLOSE_BATCH_DETAIL:
      return { ...state, openBatchDetail: false };
    case Constants.CLOSE_TRANSACTION_DETAIL:
      return { ...state, openTransactionDetail: false };
    case Constants.CLOSE_ACH_DETAIL:
      return { ...state, openACHDetail: false };
    case Constants.CLOSE_CHARGEBACK_DETAIL:
      return { ...state, openChargeBackDetail: false };
    case Constants.RECEIVED_PAGE_CHANGE_ERROR:

      return { ...state, changeState: state.changeState + 1, sectionLoading: { batch: false, transactions: false, ach: false, chargebacks: false } };

    case Constants.RECEIVED_PAGE_CHANGE_ACTION:
      let changeSectionLoading = state.sectionLoading;
      changeSectionLoading[action.data.result.Name] = false;
      return { ...state, changeState: state.changeState + 1, sectionLoading: changeSectionLoading };
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.GET_MERCHANT_ACTION:
      return { ...state, loading: true };
    case Constants.RECEIVED_MERCHANT_DETAIL_DATA_ERROR:
      return { ...state, loading: false };
    case Constants.RECEIVED_MERCHANT_DETAIL_DATA_ACTION:
      return { ...state, loading: false };
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

export default merchantDetailReducer;