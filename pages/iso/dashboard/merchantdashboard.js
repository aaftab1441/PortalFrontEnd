/**
 *
 * Dashboard
 *
 */

 import React, { memo } from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 
 import { compose } from 'redux';
 import { push } from 'connected-react-router';

 import {withRouter} from "next/router";

 
 import Footer from "../../../components/common/GetFooter";
 import Header from "../../../components/common/GetHeader";
 import Loading from "../../../components/common/Loading";
 import GetIsoMerchantDashboard from "../../../components/userscreens/das/GetIsoMerchantDashboard";
 
 import Navbar from "../../../components/common/GetNavbar";
 import Sidebar from "../../../components/common/GetSidebar";
 import SettingsPanel from "../../../components/common/GetSettingsPanel";
 
 import * as CentralActions from "../../../redux/actions/central/action";
 import * as Actions from "../../../redux/actions/usercontainers/das/isolistdashboard/action";
 import * as Constants from "../../../redux/actions/usercontainers/das/isolistdashboard/constants";
 
 import * as AppConstants from "../../../utilities/constants";
 
class IsoMerchantDashboard extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getIsoMerchantDashboardData();
	}
	
	render(){
	  console.log("Iso Dashboard Index", this.props);
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
			  <Header title={'Eagle Processing Iso Dashboard'} description={'Eagle Processing Iso Dashboard'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetIsoMerchantDashboard {...this.props} />
			 
					<SettingsPanel  {...this.props} />
				</div>
				<Footer  {...this.props} />
				</div>
	        <Loading {...this.props}/>
	        </div>
	      </div>
	    );
	 }
	}
}

IsoMerchantDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  task: PropTypes.string,
  lists: PropTypes.object,
  moveToUrl: PropTypes.string,
  handleItemChange: PropTypes.func,
  getIsoMerchantDashboardData: PropTypes.func,
  navigateToUrl: PropTypes.func,
  processForm: PropTypes.func,
  displayWarning: PropTypes.func,
  account: PropTypes.object,
  warningBack: PropTypes.func ,
  dashboardData: PropTypes.object,
  isLeftMenuOpen: PropTypes.bool,
  toggleLeftMenu: PropTypes.func,
  viewMerchantDetail: PropTypes.func,
  currentIso: PropTypes.object,
   
};

const  mapStateToProps = (state) =>{ 
	return { 
		dashboard: state.isoDashboard.IsoMerchantDashboard(),
		task: state.isoDashboard.task,
		loading: state.isoDashboard.loading,
		messages: state.central.messages,
		moveToUrl: state.isoDashboard.MoveToUrl(),
		lists: state.central.lists,
		user: state.central.user,
		account: state.central.Account(),
		navigationParams: state.isoDashboard.navigationParams,
		isoMerchantDashboardData: state.central.IsoMerchantDashboardData(),
		currentIso: state.central.CurrentIsoDashboardObject(),
		
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetTask: () => dispatch(Actions.resetTaskAction()),
    getIsoMerchantDashboardData: () => dispatch(Actions.getIsoMerchantDashboardDataAction()),
    navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
    toggleLeftMenu: (currentState) => dispatch(CentralActions.toggleLeftMenuAction(currentState)),
	viewMerchantDetail: (merchant) => dispatch(Actions.viewMerchantDetailAction(merchant)),
	

  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IsoMerchantDashboard));
 