import * as Actions from "../../actions/search/action";

// Define initial states.
const initialState = {
  usdotSearch: {criteria: '', jurisdiction: ''},
  vehicleSearch: {criteria: '', jurisdiction: ''},
  carrierDetail: {carrier:{}},
  vehicleDetail: {carrier:{}},
  usdotLoading: false,
  vehicleLoading: false,
  usdotResults: {results:[], count: 0, pageSize: 10, page: 0, usdotType: 'usdot'},
  vehicleResults: {results:[], count: 0, pageSize: 10, page: 0, vehicleType: 'plate'},
};


const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ACTION_TYPES.SUBMIT_VEHICLE_SEARCH:
      return { ...state, vehicleLoading : action.vehicleLoading };
    case Actions.ACTION_TYPES.SUBMIT_USDOT_SEARCH:
      return { ...state,  usdotLoading: true };

    case Actions.ACTION_TYPES.FETCHED_USDOT_SEARCH:
      return { ...state, usdotResults: action.payload, usdotLoading: false };
    case Actions.ACTION_TYPES.FETCHED_VEHICLE_SEARCH:
      return { ...state, vehicleResults: action.payload, vehicleLoading: false };
    case Actions.ACTION_TYPES.FETCHED_CARRIER_DETAIL:
      return { ...state, carrierDetail: action.payload };
    case Actions.ACTION_TYPES.FETCHED_VEHICLE_DETAIL:
      return { ...state, vehicleDetail: action.payload };

    default:
      return state;
  }
};

export default  searchReducer;