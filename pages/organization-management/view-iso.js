/**
 *
 * ViewIso
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


import * as Actions  from "/redux/actions/organization-management/iso/action";
import * as SubIsoActions  from "/redux/actions/organization-management/subiso/action";
import * as SalesOfficeActions  from "/redux/actions/organization-management/sales-office/action";
import * as SalesAgentActions  from "/redux/actions/organization-management/sales-agent/action";

import * as Constants  from "/redux/actions/organization-management/iso/constants";
import * as AppConstants  from "/utilities/constants";
import GetEditISO from '../../components/commonscreens/organization-management/iso/GetEditISO';

import * as UserActions  from "/redux/actions/usermanagement/listusers/action";
import * as ManageUserActions  from "/redux/actions/usermanagement/manageuser/action";



class ViewIso extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		console.log("View ISO", this.props.currentIso);
		if(this.props.currentIso && this.props.currentIso.IsoDetail &&  this.props.currentIso.IsoDetail.ISO_CODE){
			this.props.getIso(this.props.currentIso, this.props.user);
		}
		
	}
	
	render(){
	  console.log("ViewIso Index", this.props);
	    return (
			<div className="container-scroller">
			  <GetHeader title={'Eagle Processing Merchant Search'} description={'Eagle Processing Merchant Search'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetEditISO {...this.props} />
			 
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

ViewIso.propTypes = {
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
  currentIso: PropTypes.object,
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
		currentIso: state.isoOrganizationManagement.currentItem,
		changeState: state.isoOrganizationManagement.changeState,
		userSearchParams: state.isoOrganizationManagement.userSearchParams,
		subIsoParams: state.isoOrganizationManagement.subIsoParams,
		salesOfficeParams: state.isoOrganizationManagement.salesOfficeParams,
		salesAgentParams: state.isoOrganizationManagement.salesAgentParams,
		
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetTask: () => dispatch(Actions.resetTaskAction()),
	getIso: (iso, user) => dispatch(Actions.getIso(iso, user)),
    navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
	processForm: (data, user) => dispatch(Actions.saveIso(data, user)),
	handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
	handleUserSearchChange: (evt, checked) => dispatch(Actions.handleUserSearchChange(evt.target.name, evt.target.value, checked)),
	handleSubIsoSearchChange: (evt, checked) => dispatch(Actions.handleSubIsoSearchChange(evt.target.name, evt.target.value, checked)),
	handleSalesOfficeSearchChange: (evt, checked) => dispatch(Actions.handleSalesOfficeSearchChange(evt.target.name, evt.target.value, checked)),
	handleSalesAgentSearchChange: (evt, checked) => dispatch(Actions.handleSalesAgentSearchChange(evt.target.name, evt.target.value, checked)),
	handleEditItemChange: (evt, checked) => dispatch(Actions.handleEditItemChange(evt.target.name, evt.target.value, checked)),
	viewUser: (item, user, lists) => dispatch(UserActions.viewUserAction(item, user, lists)),
	deleteItem: (item, user, lists) => dispatch(Actions.deleteIso(item, user, lists)),
	addUser: (user, lists, currentIso) => dispatch(ManageUserActions.addUser(user, lists, currentIso, 'ISO')), 
	registerFromLocation: (fromLocation) => dispatch(ManageUserActions.registerFromLocation(fromLocation)),
	addSubIso: (user, parentCode, parentType, parentId) => dispatch(SubIsoActions.addItem(user, parentCode, parentType, parentId)),
	addSalesOffice: (user, parentCode, parentType, parentId) => dispatch(SalesOfficeActions.addItem(user, parentCode, parentType, parentId)),
	addSalesAgent: (user, parentCode, parentType, parentId) => dispatch(SalesAgentActions.addItem(user, parentCode, parentType, parentId)),
	editSubIso: (user, item, parentCode, parentType, parentId) => dispatch(SubIsoActions.editItem(user, item, parentCode, parentType, parentId)),
	editSalesOffice: (user, item, parentCode, parentType, parentId) => dispatch(SalesOfficeActions.editItem(user, item, parentCode, parentType, parentId)),
	editSalesAgent: (user, item, parentCode, parentType, parentId) => dispatch(SalesAgentActions.editItem(user, item, parentCode, parentType, parentId)),

  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewIso));
 