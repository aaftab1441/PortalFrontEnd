
// Define initial states.
import * as Constants from "../../../actions/usermanagement/listusers/constants";
import * as AppConstants from "../../../../utilities/constants";
const initialState = {
  task: '',
  loading: false,
  userSearchParams: {lastName: '', firstName: '', emailId: '', city: ''},
  pageInfo: {Page: 1, PageSize: 10, SortDirection: 'ASC', SortField: 'Email_ID' },
  changeState: 0,
  count: 0,
  userList: [],
  changeState: 0,
};

const listUsersReducer = (state = initialState, action) => {
  console.log("User List", action);
  switch (action.type) {
    case Constants.RECEIVED_MERCHANT_USER_LIST_DATA_ACTION:
      if(action.data.Success){
        return { ...state, userList: action.data.Data, count: action.data.Count, loading: false, changeState: state.changeState + 1 };
      }
      return { ... state, loading: false};
    case Constants.CHANGE_PAGE_ACTION:
      return { ...state, pageInfo: action.pageInfo, loading: false };  
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      let userSearchParams = state.userSearchParams;
      userSearchParams[action.theName] = action.theValue.toUpperCase();         
      return { ...state, userSearchParams: userSearchParams, changeState: state.changeState + 1};
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url };
    case Constants.RECEIVED_USER_LIST_DATA_ACTION:
      return { ...state, userList: action.data.result };
    case Constants.RECEIVED_USER_LIST_DATA_ERROR:
      return { ...state, loading: false };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
    default:
      return state;
  }
};

export default  listUsersReducer;