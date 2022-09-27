import * as Constants from "../../../../../actions/usercontainers/common/merchantadd/merchantaddstep4/constants";
import * as AppConstants from "../../../../../../utilities/constants";
// Define initial states.
const initialState = {
  task: '',
  loading: false,
  activeTabKey: 'LocationInformation',
  navigationParams: {},
  merchantId: 0,
  location: {
    name: '',
    selectedcards: [],
    mktingmethod: [],
    merchanttype: [],
    seasonalmonths: [],
    documents: [],
    bankaccountfordeposit: '',
    storecreditcards: '',
    thirdprty: '',
    softwarepcicompliant: '',
    ecommercesslused: '',
    needterminal: '',
    usepos: '',
    usepaymentgateway: '',
    onmatchlist: '',
    address: '',
    city: '',
    state: '',
    bankaccounttype: '',
    bankstate: '',
    previouscardaccept: '',
    pciemailaddress: '',
    previousstatements: '', previousecommerce: '', seasonal: '', haveretaillocation: '', amexsvcreq: '', acceptamex: '', processdiscover: '', acceptdiscover: '', ebtsignup: '', warranteeguaranteeoffered: '', NEXTDAYFUNDING: '', mktnegativeresponseorauto: '', immediatedelivery: '', refundpolicyexist: '', recurringcharge: '', fulfillmentpaymentbefore: '', merchantpcicompliant: ''
  },
  locations: [],
  allLocations: [],
  changeState: 0,
  locationPanel: 0,
  selectedDocumentType: '',
  formFile: {},
  document: { document_type: '', upload_document: '' },
};

const merchantAddStep4Reducer = (state = initialState, action) => {
  //console.log("Merchant Add Step 4 Action", action);
  switch (action.type) {
    case Constants.ADD_MERCHANT_STEP4_ACTION:
      return { ...state, loading: true, changeState: state.changeState + 4 };

    case Constants.GET_LOCATIONS:
      debugger
      console.log('Reducer firstly get locations', action)
      return { ...state };

    case Constants.RECEIVED_MERCHANT_DATA_ACTION:
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_ADD_STEP_1_PATH };
    // state.merchantId = action.data.Success;
    // return { ...state, loading: false, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_ADD_STEP_5_PATH };

    case Constants.RECEIVED_LOCATIONS_DATA_ACTION:
      console.log('LOCATIONS DATA', state.allLocations);
      debugger
      return {
        ...state,
        allLocations: action.data.Locations
      };
    case Constants.MOVE_TO_URL_ACTION:
      return { ...state, task: action.type, moveToUrl: action.url, navigationParams: action.params };
    case Constants.PERFORM_RETURN_ACTION:
      return { ...state, task: Constants.MOVE_TO_URL_ACTION, moveToUrl: AppConstants.MERCHANT_ADD_STEP_3_PATH };
    case Constants.HANDLE_ITEM_CHANGE_ACTION:
      if (action.theName == "selectedDocumentType") {
        let editDocument = state.document;
        state.selectedDocumentType = action.theValue;
        editDocument["document_type"] = action.theValue;
      }
      let editLocation = state.location;
      editLocation[action.theName] = action.theValue;
      return { ...state, location: editLocation, changeState: state.changeState + 1 };
    case Constants.HANDLE_FILE_CHANGE_ACTION:
      let editDocument = state.document;
      editDocument[action.theName] = action.theValue;
      state.formFile = action.formFile;
      return { ...state, document: editDocument };

    case Constants.SAVE_LOCATION:
      console.log('action', action.location)
      debugger
      console.log('action', allLocations)
      debugger
      return { ...state, loading: true, 
        // allLocations: state.allLocations.concat(action.location) 
        allLocations: [...state.allLocations, action.location]
      };
    case Constants.LOCATION_SAVED:
        debugger
        console.log('save reducer', action.data)
        debugger
        console.log('action', allLocations)
        debugger
      return { 
        ...state, 
        loading: false, 
        changeState: state.changeState + 1,  
        allLocations: [...state.allLocations, action.data]
        // allLocations: state.allLocations.concat(action.location)
      };
    case Constants.HANDLE_MULTISELECT_CHANGE_ACTION:
      editLocation = state.location;
      editLocation[action.theName] = action.theValue;
      return { ...state, location: editLocation, changeState: state.changeState + 1 };
    case Constants.RESET_TASK_ACTION:
      return { ...state, task: '', loading: false };
    case Constants.HANDLE_DATE_CHANGE_ACTION:
      editLocation = state.location;
      editLocation[action.theName] = action.theValue;
      return { ...state, location: editLocation, changeState: state.changeState + 1 };
    case Constants.HANDLE_ACTIVE_TAB_ACTION:
      state.locationPanel = action.tabKey;
      return { ...state };
    case Constants.RECEIVED_UPLOAD_DOCUMENTS_DATA_ACTION:
      if (state.document.document_type) {
        state.location.documents.push({ document_type: state.document.document_type, upload_document: state.document.upload_document, formFile: state.document.formFile })
      }
      editDocument = state.document;
      state.selectedDocumentType = '';
      editDocument["document_type"] = '';
      editDocument["upload_document"] = '';
      state.formFile = {};
      return { ...state, loading: false, changeState: state.changeState + 1 };
    case Constants.HANDLE_DOCUMENT_UPLOAD_ACTION:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default merchantAddStep4Reducer;