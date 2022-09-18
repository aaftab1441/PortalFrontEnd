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
import GetRiskHistory from "/components/commonscreens/risk/GetRiskHistory";
import Navbar from "/components/common/GetNavbar";

import Sidebar from "/components/common/GetSidebar";
import SettingsPanel from "/components/common/GetSettingsPanel";
 
import * as centralActions from "/redux/actions/central/action";
import * as Actions  from "/redux/actions/usermanagement/myinformation/action";
import * as Constants  from "/redux/actions/usermanagement/myinformation/constants";
import * as AppConstants  from "/utilities/constants";

class RiskHistory extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getConfig();
		
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
					<GetRiskHistory {...this.props} />
			 
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

RiskHistory.propTypes = {
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
		riskHistory: state.riskHistory.riskHistory,
		lists: state.central.lists,
		user: state.central.user,
		iso: state.central.currentIsoDashboardObject,
		changeState: state.riskHistory.changeState,
		currentMerchant: state.central.currentMerchant,
		orgType: state.riskHistory.orgType,
		org: state.riskHistory.org,
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
	getConfig: () => dispatch(centralActions.loadListsAndConfig()),
	resetTask: () => dispatch(Actions.resetTaskAction()),
	 
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RiskHistory));
 
