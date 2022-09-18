export const ACTION_TYPES = {
  // Define Action types
  HANDLE_CHANGE: "HANDLE_CHANGE",
  SUBMIT_VEHICLE_SEARCH: "SUBMIT_VEHICLE_SEARCH",
  SUBMIT_USDOT_SEARCH: "SUBMIT_USDOT_SEARCH",
  FETCHED_USDOT_SEARCH: "FETCHED_USDOT_SEARCH",
  FETCHED_VEHICLE_SEARCH: "FETCHED_VEHICLE_SEARCH",

  GET_VEHICLE_DETAIL: "GET_VEHICLE_DETAIL",
  GET_CARRIER_DETAIL: "SUBMIT_CARRIER_SEARCH",
  FETCHED_CARRIER_DETAIL: "FETCHED_CARRIER_DETAIL",
  FETCHED_VEHICLE_DETAIL: "FETCHED_VEHICLE_DETAIL",

};

// Create functions to handle your actions.
export const handleChangeAction = (name, value) => ({
  type: ACTION_TYPES.HANDLE_CHANGE,
  payload: {name, value},
});

export const submitVehicleSearch = (vehicleSearch) => ({
  type: ACTION_TYPES.SUBMIT_VEHICLE_SEARCH,
  payload: vehicleSearch,
  vehicleLoading: true
});

export const submitUSDOTSearch = (usdotSearch) => ({
  type: ACTION_TYPES.SUBMIT_USDOT_SEARCH,
  payload: usdotSearch,
  usdotLoading: true
});

export const submitVehicleDetail = (vehicle) => ({
  type: ACTION_TYPES.GET_VEHICLE_DETAIL,
  payload: vehicle,
});

export const submitCarrierDetail = (carrier) => ({
  type: ACTION_TYPES.GET_CARRIER_DETAIL,
  payload: carrier,
});

export const fetchedUSDOTSearch = (results) => ({
  type: ACTION_TYPES.FETCHED_USDOT_SEARCH,
  payload: results,
});

export const fetchedVehicleSearch = (results) => ({
  type: ACTION_TYPES.FETCHED_VEHICLE_SEARCH,
  payload: results,
});

export const fetchedCarrierDetail = (results) => ({
  type: ACTION_TYPES.FETCHED_CARRIER_DETAIL,
  payload: results,
});

export const fetchedVehicleDetail = (results) => ({
  type: ACTION_TYPES.FETCHED_VEHICLE_DETAIL,
  payload: results,
});

export default {
  submitUSDOTSearch,
};
