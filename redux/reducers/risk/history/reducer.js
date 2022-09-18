import * as Constants from "/redux/actions/risk/history/constants";

// Define initial states.
const initialState = {
  riskHistory: [],
  changeState: 0,
  orgType: '',
  org: {},
};


const riskHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.GET_RISK_HISTORY:
      return { ...state, orgType: action.dataType, changeState: action.changeState + 1 };
    case Constants.RECEIVE_RISK_HISTORY:
      return { ...state,  riskHistory: action.data.Data, org: action.data.Detail, changeState: state.changeState + 1 };
    default:
      return state;
  }
};

export default  riskHistoryReducer;