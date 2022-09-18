import * as Constants from "/redux/actions/risk/merchant-reserve/constants";

// Define initial states.
const initialState = {
  merchantReserve: [],
  changeState: 0,
  orgType: '',
  org: {},
  params: {dbaName: '', legalName: '', mid: ''},
};


const merchantReserveReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      let params = state.params;
      params[action.theName] = action.theValue.toUpperCase();         
      return { ...state, params: params, changeState: state.changeState + 1};

    case Constants.GET_MERCHANT_RESERVE:
      return { ...state, orgType: action.dataType, changeState: action.changeState + 1 };
    case Constants.RECEIVE_MERCHANT_RESERVE:
      return { ...state,  merchantReserve: action.data.Data, org: action.data.Detail, changeState: state.changeState + 1 };
    default:
      return state;
  }
};

export default  merchantReserveReducer;