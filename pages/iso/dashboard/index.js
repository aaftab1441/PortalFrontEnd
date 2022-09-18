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


 import Footer from "../../../components/common/GetFooter";
 import Header from "../../../components/common/GetHeader";
 import Loading from "../../../components/common/Loading";
 import GetDASDashboard from "../../../components/userscreens/das/GetDASDashboard";
 import GetIsoDashboard from "../../../components/userscreens/iso/GetIsoDashboard";
 
 import Navbar from "../../../components/common/GetNavbar";
 import Sidebar from "../../../components/common/GetSidebar";
 import SettingsPanel from "../../../components/common/GetSettingsPanel";
 
  
 import * as CentralActions from "../../../redux/actions/central/action";
 import * as Actions from "../../../redux/actions/usercontainers/iso/isodashboard/action";
 import * as Constants from "../../../redux/actions/usercontainers/iso/isodashboard/constants";
 import {withRouter} from "next/router";
 import * as AppConstants from "../../../utilities/constants";
 
 
class Dashboard extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getDashboardData();
	}
	
	render(){
	  console.log("Dashboard Index", this.props);
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
			  <Header title={'Eagle Processing Dashboard'} description={'Eagle Processing Dashboard'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					{this.props.user.UserDetail.User_Level_Code == "DAS" && <GetDASDashboard {...this.props} />}
					{this.props.user.UserDetail.User_Level_Code == "ISO" && <GetIsoDashboard {...this.props} />}
			 
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

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  task: PropTypes.string,
  lists: PropTypes.object,
  moveToUrl: PropTypes.string,
  handleItemChange: PropTypes.func,
  getDashboardData: PropTypes.func,
  navigateToUrl: PropTypes.func,
  processForm: PropTypes.func,
  displayWarning: PropTypes.func,
  account: PropTypes.object,
  warningBack: PropTypes.func ,
  dashboardData: PropTypes.object,
  isLeftMenuOpen: PropTypes.bool,
  toggleLeftMenu: PropTypes.func,
   
};

const  mapStateToProps = (state) =>{ 
	return { 
  task: state.isoDashboard.task,
  loading: state.isoDashboard.loading,
  messages: state.central.messages,
  moveToUrl: state.isoDashboard.moveToUrl,
  lists: state.central.lists,
  user: state.central.user,
  account: state.central.Account,
  navigationParams: state.isoDashboard.navigationParams,
  dashboardData: state.central.dashboardData,
  
}};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetTask: () => dispatch(Actions.resetTaskAction()),
    getDashboardData: () => dispatch(Actions.getDashboardDataAction()),
    warningBack: () => dispatch(Actions.warningBackAction()),
    navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
    toggleLeftMenu: (currentState) => dispatch(CentralActions.toggleLeftMenuAction(currentState)),

  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
 