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
 
 import Footer from "/components/common/GetFooter";
 import Header from "/components/common/GetHeader";
 import Loading from "/components/common/Loading";
 import GetIsoListDashboard from "/components/userscreens/das/GetIsoListDashboard";
 
 import Navbar from "/components/common/GetNavbar";
 import Sidebar from "/components/common/GetSidebar";
 import SettingsPanel from "/components/common/GetSettingsPanel";
 import { bindActionCreators } from 'redux'
  
 import * as CentralActions from "/redux/actions/central/action";
 import * as Actions from "/redux/actions/usercontainers/das/isolistdashboard/action";
 import * as Constants from "/redux/actions/usercontainers/das/isolistdashboard/constants";
 
 import * as AppConstants from "/utilities/constants";
 
 class IsoListDashboard extends React.PureComponent {
	 constructor(props){
		 super(props);
	 }
 
	 componentDidMount(){
		 this.props.getIsoListDashboardData(this.props.user, this.props.currentIso);
	 }
	 
	 render(){
	   console.log("Iso Dashboard Index", this.props);
	   if(this.props.task == Constants.MOVE_TO_URL_ACTION){
			this.props.resetTask();
			this.props.router.push(this.props.moveToUrl);
			return (
				<></>
			);

		} else {  
		  return (
			 <div className="container-scroller">
			   <Header title={'Eagle Processing Iso Dashboard'} description={'Eagle Processing Iso Dashboard'} {...this.props}/>
			   <Navbar {...this.props} />
			   <div className="container-fluid page-body-wrapper">
			   <Sidebar  {...this.props} />
			   <div className="main-panel">
				 <div className="content-wrapper">
					 <GetIsoListDashboard {...this.props} />
			  
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
 
 IsoListDashboard.propTypes = {
   dispatch: PropTypes.func.isRequired,
   loading: PropTypes.bool,
   user: PropTypes.object,
   task: PropTypes.string,
   lists: PropTypes.object,
   moveToUrl: PropTypes.string,
   handleItemChange: PropTypes.func,
   getIsoListDashboardData: PropTypes.func,
   navigateToUrl: PropTypes.func,
   processForm: PropTypes.func,
   displayWarning: PropTypes.func,
   account: PropTypes.object,
   warningBack: PropTypes.func ,
   dashboardData: PropTypes.object,
   isLeftMenuOpen: PropTypes.bool,
   toggleLeftMenu: PropTypes.func,
   viewISODetail: PropTypes.func,
	
 };
 
 const  mapStateToProps = (state) => { return { 
   task: state.isoListDashboard.task,
   loading: state.isoListDashboard.loading,
   messages: state.central.messages,
   moveToUrl: state.isoListDashboard.moveToUrl,
   lists: state.central.lists,
   user: state.central.user,
   account: state.central.account,
   navigationParams: state.isoListDashboard.navigationParams,
   isoListDashboardData: state.central.isoListDashboardData,
   currentIso: state.central.currentIsoDashboardObject,
   
 }};
 
 function mapDispatchToProps(dispatch) {
   return {
	 resetTask: bindActionCreators(Actions.resetTaskAction, dispatch),
	 getIsoListDashboardData: bindActionCreators(Actions.getIsoListDashboardDataAction, dispatch),
	 navigateToUrl: bindActionCreators(Actions.moveToUrlAction, dispatch),
	 toggleLeftMenu: bindActionCreators(CentralActions.toggleLeftMenuAction, dispatch),
	 viewISODetail: bindActionCreators(Actions.viewISODetailAction, dispatch),
   };
 }
 
  
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IsoListDashboard));