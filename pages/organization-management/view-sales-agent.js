/**
 *
 * ViewSalesAgent
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


import * as Actions  from "/redux/actions/organization-management/sales-agent/action";
import * as Constants  from "/redux/actions/organization-management/sales-agent/constants";
import * as AppConstants  from "/utilities/constants";
import GetEditSalesAgent from '../../components/commonscreens/organization-management/sales-agent/GetEditSalesAgent';

import * as UserActions  from "/redux/actions/usermanagement/listusers/action";
import * as ManageUserActions  from "/redux/actions/usermanagement/manageuser/action";



class ViewSalesAgent extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		console.log("View ISO", this.props.currentSalesAgent);
		if(this.props.currentSalesAgent && this.props.currentSalesAgent.Detail &&  this.props.currentSalesAgent.Detail.Code){
			this.props.getItem(this.props.currentSalesAgent, this.props.user);
		}
		
	}
	
	render(){
	  console.log("ViewSalesAgent Index", this.props);
	    return (
			<div className="container-scroller">
			  <GetHeader title={'Eagle Processing Sales Office'} description={'Eagle Processing Sales Office'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetEditSalesAgent {...this.props} />
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

ViewSalesAgent.propTypes = {
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
  currentSalesAgent: PropTypes.object,
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
		currentSalesAgent: state.salesAgentOrganizationManagement.currentItem,
		changeState: state.salesAgentOrganizationManagement.changeState,
		userSearchParams: state.salesAgentOrganizationManagement.userSearchParams,
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
	viewUser: (item, user, lists) => dispatch(UserActions.viewUserAction(item, user, lists)),
	deleteItem: (item, user, lists) => dispatch(Actions.deleteItem(item, user, lists)),
	addUser: (user, lists, currentSalesAgent) => dispatch(ManageUserActions.addUser(user, lists, currentSalesAgent, 'SALES-AGENT')), 
	registerFromLocation: (fromLocation) => dispatch(ManageUserActions.registerFromLocation(fromLocation)),
	
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewSalesAgent));
 