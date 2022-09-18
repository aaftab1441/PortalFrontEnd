import * as Constants from "./constants";

export function getItems(params, user){ return {type: Constants.GET_ITEMS, params, user }}
export function addItem(user, parentCode, parentType, parentId){ return {type: Constants.ADD_ITEM, user, parentCode, parentType, parentId }}
export function editItem(user, item, parentCode, parentType, parentId){ return {type: Constants.EDIT_ITEM, user, item, parentCode, parentType, parentId }}

export function receivedGetItems(data){ return {type: Constants.RECEIVED_GET_ITEMS_ACTION, data}}
export function receivedGetItemsError(err, data){ return {type: Constants.RECEIVED_GET_ITEMS_ERROR, err, data}}

export function getItem(item, user){ return {type: Constants.GET_ITEM, item, user}}
export function receivedGetItem(data){ return {type: Constants.RECEIVED_GET_ITEM_ACTION, data}}
export function receivedGetItemError(err, data){ return {type: Constants.RECEIVED_GET_ITEM_ERROR, err, data}}

export function deleteItem(item, user){ return {type: Constants.DELETE_ITEM, item, user}}
export function receivedDeleteItem(data){ return {type: Constants.RECEIVED_DELETE_ITEM_ACTION, data}}
export function receivedDeleteItemError(err, data){ return {type: Constants.RECEIVED_DELETE_ITEM_ERROR, err, data}}

export function saveItem(item, user){ return {type: Constants.SAVE_ITEM, item, user}}
export function receivedSaveItem(data){ return {type: Constants.RECEIVED_SAVE_ITEM_ACTION, data}}
export function receivedSaveItemError(err, data){ return {type: Constants.RECEIVED_SAVE_ITEM_ERROR, err, data}}

export function handleItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_ITEM_CHANGE_ACTION, theName, theValue, checked }; }
export function handleEditItemChange(theName, theValue, checked) { return { type: Constants.HANDLE_EDIT_ITEM_CHANGE_ACTION , theName, theValue, checked }; }
export function handleUserSearchChange(theName, theValue, checked) { return { type: Constants.HANDLE_USER_SEARCH_CHANGE_ACTION , theName, theValue, checked }; }


export function handlePanelChange(newPanel) { return { type: Constants.PANEL_CHANGE_ACTION , newPanel }; }

export default {
  getItems,
};
