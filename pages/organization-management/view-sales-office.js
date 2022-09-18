/**
 *
 * ViewSalesOffice
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from "next/router";
import { compose } from 'redux';
import { push } from 'connected-react-router';


import { bindActionCreators } from 'redux'
import GetFooter from "/components/common/GetFooter";
import GetHeader from "/components/common/GetHeader";

import Loading from "/components/common/Loading";
import Navbar from "/components/common/GetNavbar";

import Sidebar from "/components/common/GetSidebar";
import SettingsPanel from "/components/common/GetSettingsPanel";


import * as Actions  from "/redux/actions/organization-management/sales-office/action";
import * as Constants  from "/redux/actions/organization-management/sales-office/constants";
import * as AppConstants  from "/utilities/constants";
import GetEditSalesOffice from '../../components/commonscreens/organization-management/sales-office/GetEditSalesOffice';

import * as UserActions  from "/redux/actions/usermanagement/listusers/action";
import * as ManageUserActions  from "/redux/actions/usermanagement/manageuser/action";
import * as SalesAgentActions  from "/redux/actions/organization-management/sales-agent/action";



class ViewSalesOffice extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		console.log("View ISO", this.props.currentSalesOffice);
		if(this.props.currentSalesOffice && this.props.currentSalesOffice.Detail &&  this.props.currentSalesOffice.Detail.Code){
			this.props.getItem(this.props.currentSalesOffice, this.props.user);
		}
		
	}
	
	render(){
	  console.log("ViewSalesOffice Index", this.props);
	    return (
			<div className="container-scroller">
			  <GetHeader title={'Eagle Processing Sales Office'} description={'Eagle Processing Sales Office'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetEditSalesOffice {...this.props} />
			 
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

ViewSalesOffice.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  task: PropTypes.string,
  lists: PropTypes.object,
  moveToUrl: PropTypes.string,
  handleItemChange: PropTypes.func,
  doSearch: PropTypes.func,
  navigateToUrl: PropTypes.func,
  doSearch: PropTypes.func,
  viewMerchant: PropTypes.func,   
  currentSalesOffice: PropTypes.object,
  changeState: PropTypes.number,
  userSearchParams: PropTypes.object,
   
};

const  mapStateToProps = (state) =>{ 
	return { 
		task: state.merchantAddStep1.task,
		loading: state.merchantAddStep1.loading,
		messages: state.central.messages,
		moveToUrl: state.merchantAddStep1.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		navigationParams: state.merchantAddStep1.navigationParams,
		currentSalesOffice: state.salesOfficeOrganizationManagement.currentItem,
		changeState: state.salesOfficeOrganizationManagement.changeState,
		userSearchParams: state.salesOfficeOrganizationManagement.userSearchParams,
		salesAgentParams: state.salesOfficeOrganizationManagement.salesAgentParams,
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetTask: () => dispatch(Actions.resetTaskAction()),
	getItem: (iso, user) => dispatch(Actions.getItem(iso, user)),
    navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
	processForm: (data, user) => dispatch(Actions.saveItem(data, user)),
	handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
	handleUserSearchChange: (evt, checked) => dispatch(Actions.handleUserSearchChange(evt.target.name, evt.target.value, checked)),
	handleEditItemChange: (evt, checked) => dispatch(Actions.handleEditItemChange(evt.target.name, evt.target.value, checked)),
	handleSalesAgentSearchChange: (evt, checked) => dispatch(Actions.handleSalesAgentSearchChange(evt.target.name, evt.target.value, checked)),
	viewUser: (item, user, lists) => dispatch(UserActions.viewUserAction(item, user, lists)),
	deleteItem: (item, user, lists) => dispatch(Actions.deleteItem(item, user, lists)),
	addUser: (user, lists, currentSalesOffice) => dispatch(ManageUserActions.addUser(user, lists, currentSalesOffice, 'SALES-OFFICE')), 
	registerFromLocation: (fromLocation) => dispatch(ManageUserActions.registerFromLocation(fromLocation)),
	addSalesAgent: (user, parentCode, parentType, parentId) => dispatch(SalesAgentActions.addItem(user, parentCode, parentType, parentId)),
	editSalesAgent: (user, item, parentCode, parentType, parentId) => dispatch(SalesAgentActions.editItem(user, item, parentCode, parentType, parentId)),
	
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewSalesOffice));
 