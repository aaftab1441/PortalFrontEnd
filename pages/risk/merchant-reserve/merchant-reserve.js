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
import GetMerchantReserve from "/components/commonscreens/risk/GetMerchantReserve";
import Navbar from "/components/common/GetNavbar";

import Sidebar from "/components/common/GetSidebar";
import SettingsPanel from "/components/common/GetSettingsPanel";
 
import * as centralActions from "/redux/actions/central/action";
import * as Actions  from "/redux/actions/risk/merchant-reserve/action";
import * as Constants  from "/redux/actions/risk/merchant-reserve/constants";
import * as AppConstants  from "/utilities/constants";

class MerchantReserve extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getConfig();
		
	}
	
	render(){
	  console.log("Merchant Reserve", this.props);
	  
	    return (
			<div className="container-scroller">
			  <GetHeader title={'Eagle Processing Merchant Reserve'} description={'Eagle Processing User'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetMerchantReserve {...this.props} />
			 
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

MerchantReserve.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  task: PropTypes.string,
  lists: PropTypes.object,
  changeState: PropTypes.number,
};

const  mapStateToProps = (state) =>{ 
	return { 
		task: state.myInformation.task,
		loading: state.myInformation.loading,
		messages: state.central.messages,
		data: state.merchantReserve.merchantReserve,
		lists: state.central.lists,
		user: state.central.user,
		iso: state.central.currentIsoDashboardObject,
		changeState: state.merchantReserve.changeState,
		currentMerchant: state.central.currentMerchant,
		orgType: state.merchantReserve.orgType,
		org: state.merchantReserve.org,
		merchantReserveParams: state.merchantReserve.params,
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
	getConfig: () => dispatch(centralActions.loadListsAndConfig()),	
	handleParamChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
	 
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantReserve));
 
