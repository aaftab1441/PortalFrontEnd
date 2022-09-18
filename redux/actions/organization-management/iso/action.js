import * as Constants from "./constants";

export function getIsos(params, user){ return {type: Constants.GET_ISOS, params, user }}
export function addIso(user){ return {type: Constants.ADD_ISO, user }}

export function receivedGetISOs(data){ return {type: Constants.RECEIVED_GET_ISOS_ACTION, data}}
export function receivedGetISOsError(err, data){ return {type: Constants.RECEIVED_GET_ISOS_ERROR, err, data}}

export function getIso(iso, user){ return {type: Constants.GET_ISO, iso, user}}
export function receivedGetISO(data){ return {type: Constants.RECEIVED_GET_ISO_ACTION, data}}
export function receivedGetISOError(err, data){ return {type: Constants.RECEIVED_GET_ISO_ERROR, err, data}}

export function deleteIso(iso, user){ return {type: Constants.DELETE_ISO, iso, user}}
export function receivedDeleteISO(data){ return {type: Constants.RECEIVED_DELETE_ISO_ACTION, data}}
export function receivedDeleteISOError(err, data){ return {type: Constants.RECEIVED_DELETE_ISO_ERROR, err, data}}

export function saveIso(iso, user){ return {type: Constants.SAVE_ISO, iso, user}}
export function receivedSaveISO(data){ return {type: Constants.RECEIVED_SAVE_ISO_ACTION, data}}
export function receivedSaveISOError(err, data){ return {type: Constants.RECEIVED_SAVE_ISO_ERROR, err, data}}

export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function handleEditItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_EDIT_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function handleUserSearchChange(theName, theValue, checked) { return { type: Constants.HANDLE_USER_SEARCH_CHANGE_ACTION , theName, theValue, checked }; }
export function handleSubIsoSearchChange(theName, theValue, checked) { return { type: Constants.HANDLE_SUB_ISO_SEARCH_CHANGE_ACTION , theName, theValue, checked }; }
export function handleSalesOfficeSearchChange(theName, theValue, checked) { return { type: Constants.HANDLE_SALES_OFFICE_SEARCH_CHANGE_ACTION , theName, theValue, checked }; }
export function handleSalesAgentSearchChange(theName, theValue, checked) { return { type: Constants.HANDLE_SALES_AGENT_SEARCH_CHANGE_ACTION , theName, theValue, checked }; }

export function handlePanelChange(newPanel) { return { type: Constants.ISO_PANEL_CHANGE_ACTION , newPanel }; }




export default {
  getIsos,
};
