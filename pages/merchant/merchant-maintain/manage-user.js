/**
 *
 * MerchantSearch
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { compose } from 'redux';
import { push } from 'connected-react-router';

import GetFooter from "/components/common/GetFooter";
import GetHeader from "/components/common/GetHeader";
import { withRouter} from "next/router";
import Loading from "/components/common/Loading";
import GetManageUser from "/components/commonscreens/merchant/maintain/GetManageUser";
import Navbar from "/components/common/GetNavbar";

import Sidebar from "/components/common/GetSidebar";
import SettingsPanel from "/components/common/GetSettingsPanel";
 
import * as centralActions from "/redux/actions/central/action";
import * as Actions  from   "/redux/actions/usercontainers/common/merchantmaintain/manageuser/action";
import * as Constants  from "/redux/actions/usercontainers/common/merchantmaintain/manageuser/constants";
import * as AppConstants  from "/utilities/constants";

class ManageUser extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getConfig();
		if(!/.*add-user.*/.test(this.props.router.asPath)){
			this.props.clearUser();
		
			this.props.viewUser(this.props.passedUser, this.props.user, this.props.merchantSearchParams, this.props.pageInfo);	
		}else if(/.*add-user.*/.test(this.props.router.asPath)){
			this.props.clearUser();
		}
	}
	
	render(){
	  console.log("Manage User Index", this.props);
	  if(this.props.task == Constants.MOVE_TO_URL_ACTION){
	    this.props.resetTask();
		this.props.router.push(this.props.moveToUrl);
	    return (
			<></>
	    );
	  }else if(!this.props.user || !this.props.user.UserDetail || !this.props.user.UserDetail.User_Level_Code){
	    this.props.router.push(AppConstants.LOGIN_PATH); 
		return (
			<></>);
		}else {  
	    return (
			<div className="container-scroller">
			  <GetHeader title={'Eagle Processing User'} description={'Eagle Processing User'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetManageUser {...this.props} />			 
					<SettingsPanel  {...this.props} />
				</div>
				<GetFooter  {...this.props} />
				</div>
	        <Loading {...this.props}/>
	        </div>
	      </div>
	    );
	 }
	}
}

ManageUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  task: PropTypes.string,
  lists: PropTypes.object,
  moveToUrl: PropTypes.string,
  handleItemChange: PropTypes.func,
  doSearch: PropTypes.func,
  navigateToUrl: PropTypes.func,
  currentUser: PropTypes.object,
  viewUser: PropTypes.func,   
  manageUserData: PropTypes.object,
  manageUserParams: PropTypes.object,
  changeState: PropTypes.number,
   
};

const  mapStateToProps = (state) =>{ 
	return { 
		task: state.merchantMaintainUser.task,
		loading: state.merchantMaintainUser.loading,
		messages: state.central.messages,
		moveToUrl: state.merchantMaintainUser.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		manageUserData: state.central.manageUserData,
		data: state.merchantMaintainUser.data,
		passedUser: state.central.currentUser,
		currentUser: state.merchantMaintainUser.currentUser,
		changeState: state.merchantMaintainUser.changeState,
		fromLocation: state.merchantMaintainUser.fromLocation,
		currentMerchant: state.merchantMaintainUser.currentMerchant,
		openUserAccess: state.merchantMaintainUser.openUserAccess,
		merchants: state.merchantMaintainUser.merchants,
		
		merchantSearchParams: state.merchantMaintainUser.searchParams,
		navigationParams: state.merchantMaintainUser.navigationParams,  
		merchantSearchData: state.merchantMaintainUser.merchantSearchData,
		navigationParams: state.merchantMaintainUser.navigationParams,  
		pageInfo: state.merchantMaintainUser.pageInfo,
		changeState: state.merchantMaintainUser.changeState,
		count: state.merchantMaintainUser.count,
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
	getConfig: () => dispatch(centralActions.loadListsAndConfig()),
	resetTask: () => dispatch(Actions.resetTaskAction()),
	viewUser: (currentUser, user, params, pageInfo) => dispatch(Actions.viewUserAction(currentUser, user, params, pageInfo)),
	navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
	handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
	handleMerchantSearchItemChange: (evt, checked) => dispatch(Actions.handleMerchantSearchItemChange(evt.target.name, evt.target.value, checked)),
	clearUser: (item, user, lists) => dispatch(Actions.clearUserAction(item, user, lists)),	
	
	handlePermissionItemChange: (evt, checked) => dispatch(Actions.handlePermissionItemChange(evt.target.name, evt.target.value, checked)),
	deleteItem: (currentUser, user, currentMerchant, lists, fromLocation) => dispatch(Actions.deleteItem(currentUser, user, currentMerchant, lists, fromLocation)),
	deleteAccess: (currentUser, user, currentMerchant, lists, fromLocation) => dispatch(Actions.deleteAccess(currentUser, user, currentMerchant, lists, fromLocation)),
	enableAccess: (currentUser, user, currentMerchant, lists, fromLocation) => dispatch(Actions.enableAccess(currentUser, user, currentMerchant, lists, fromLocation)),
	processForm: (currentUser, user, lists) => dispatch(Actions.processForm(currentUser, user, lists)),
	openUserMerchantAccess: (currentMerchant) => dispatch(Actions.openUserMerchantAccess(currentMerchant)),
	closeUserMerchantAccess: () => dispatch(Actions.closeUserMerchantAccess()),
	doSearch: (merchantSearchParams, user, pageInfo) => dispatch(Actions.getMerchantSearchDataAction(merchantSearchParams, user, pageInfo)),
    changePage: (merchantSearchParams, user, pageInfo) => dispatch(Actions.changePage(merchantSearchParams, user, pageInfo)),

  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageUser));
 
