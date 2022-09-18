import * as Constants from "./constants";

export function loadListsAndConfig(){ return {type: Constants.LOAD_LISTS_AND_CONFIG} }

export function receivedListsAndConfig(data){ return {type: Constants.RECEIVED_LISTS_AND_CONFIG, data} }

export function listsAndConfigError(err){ return {type: Constants.LISTS_AND_CONFIG_ERROR, err} }

export function logoutAction(data){ return {type: Constants.LOGOUT_ACTION, data} }

export function toggleLeftMenuAction(currentState){ return {type: Constants.TOGGLE_LEFT_MENU_ACTION, currentState} }




export function defaultAction() {
  return {
    type: Constants.DEFAULT_ACTION,
  };
}
