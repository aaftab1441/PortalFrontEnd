/**
 *
 * ListSalesOffices
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from "next/router";
import { compose } from 'redux';
import { push } from 'connected-react-router';



import GetFooter from "/components/common/GetFooter";
import GetHeader from "/components/common/GetHeader";

import Loading from "/components/common/Loading";
import GetListSalesOffices from "/components/commonscreens/organization-management/sales-office/GetListSalesOffices";
import Navbar from "/components/common/GetNavbar";

import Sidebar from "/components/common/GetSidebar";
import SettingsPanel from "/components/common/GetSettingsPanel";


import * as Actions  from "/redux/actions/organization-management/sales-office/action";
import * as Constants  from "/redux/actions/organization-management/sales-office/constants";
import * as AppConstants  from "/utilities/constants";

class ListSalesOffices extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		 this.props.getItems(this.props.params, this.props.user);
	}
	
	render(){
	  console.log("ListSalesOffices Index", this.props);
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
			  <GetHeader title={'Eagle Processing Merchant Search'} description={'Eagle Processing Merchant Search'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetListSalesOffices {...this.props} />
			 
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

ListSalesOffices.propTypes = {
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
  params: PropTypes.object,
  merchantSearchParams: PropTypes.object,
   
};

const  mapStateToProps = (state) =>{ 
	return { 
		task: state.merchantAddStep1.task,
		loading: state.merchantAddStep1.loading,
		messages: state.central.messages,
		moveToUrl: state.merchantAddStep1.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		itemList: state.salesOfficeOrganizationManagement.list,
		params: state.salesOfficeOrganizationManagement.params,
		changeState: state.salesOfficeOrganizationManagement.changeState,
		
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getItems: (params, user) => dispatch(Actions.getItems(params, user)),
    viewItem: (item, user) => dispatch(Actions.getItem(item, user)),
	handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
	addItem: (user) => dispatch(Actions.addItem( user)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListSalesOffices));
 