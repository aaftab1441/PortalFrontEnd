/**
 *
 * DASISODashboard
 *
 */

 import React, { memo } from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 
 import { compose } from 'redux';
 import { push } from 'connected-react-router';


 import Footer from "/components/common/GetFooter";
 import Header from "/components/common/GetHeader";
 import Loading from "/components/common/Loading";
 import GetDASISODashboard from "/components/userscreens/das/GetDASISODashboard";
 
 import Navbar from "/components/common/GetNavbar";
 import Sidebar from "/components/common/GetSidebar";
 import SettingsPanel from "/components/common/GetSettingsPanel";
 
  
 import * as CentralActions from "/redux/actions/central/action";
 import * as Actions from "/redux/actions/usercontainers/das/dasisodashboard/action";
 import * as Constants from "/redux/actions/usercontainers/das/dasisodashboard/constants";
 
 import * as AppConstants from "/utilities/constants";
 import {withRouter} from "next/router";
 
 class DASISODashboard extends React.PureComponent {
	 constructor(props){
		 super(props);
	 }
 
	 componentDidMount(){
		 this.props.getDASISODashboardData(this.props.user, this.props.iso, this.props.lists);
	 }
	 
	 render(){
	   console.log("DASISODashboard Index", this.props);
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
			   <Header title={'Eagle Processing ISO Dashboard'} description={'Eagle Processing ISO Dashboard'} {...this.props}/>
			   <Navbar {...this.props} />
			   <div className="container-fluid page-body-wrapper">
			   <Sidebar  {...this.props} />
			   <div className="main-panel">
				 <div className="content-wrapper">
					  <GetDASISODashboard {...this.props} />
					  
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
 
 DASISODashboard.propTypes = {
   dispatch: PropTypes.func.isRequired,
   loading: PropTypes.bool,
   user: PropTypes.object,
   task: PropTypes.string,
   lists: PropTypes.object,
   moveToUrl: PropTypes.string,
   handleItemChange: PropTypes.func,
   getDASISODashboardData: PropTypes.func,
   navigateToUrl: PropTypes.func,
   processForm: PropTypes.func,
   displayWarning: PropTypes.func,
   account: PropTypes.object,
   warningBack: PropTypes.func ,
   dasISODashboardData: PropTypes.object,
   isLeftMenuOpen: PropTypes.bool,
   toggleLeftMenu: PropTypes.func,
	
 };
 
 const  mapStateToProps = (state) =>{ return { 
   task: state.dasIsoDashboard.task,
   loading: state.dasIsoDashboard.loading,
   messages: state.central.messages,
   moveToUrl: state.dasIsoDashboard.moveToUrl,
   lists: state.central.lists,
   user: state.central.user,
   iso: state.central.currentIsoDashboardObject,
   navigationParams: state.dasIsoDashboard.navigationParams,
   dashboardData: state.central.dASISODashboardData,
   changeState: state.dasIsoDashboard.changeState,
   
 }};
 
 function mapDispatchToProps(dispatch) {
   return {
	 dispatch,
	 resetTask: () => dispatch(Actions.resetTaskAction()),
	 getDASISODashboardData: (user, iso, lists) => dispatch(Actions.getDASISODashboardDataAction(user, iso, lists)),
	 warningBack: () => dispatch(Actions.warningBackAction()),
	 navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
	 toggleLeftMenu: (currentState) => dispatch(CentralActions.toggleLeftMenuAction(currentState)),
 
   };
 }
 

 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DASISODashboard));
 
 