import styles from "../styles/Home.module.css";
import React from "react";

import Head from "next/head";
import Header from "../components/common/GetHeader";
import Footer from "../components/common/GetFooter";
import Navbar from "../components/common/GetNavbar";
import Sidebar from "../components/common/GetSidebar";
import SettingsPanel from "../components/common/GetSettingsPanel";
import Loading from "../components/common/Loading";

import GetDASDashboard from "../components/userscreens/das/GetDASDashboard";
import GetIsoDashboard from "../components/userscreens/iso/GetIsoDashboard";
import { bindActionCreators } from 'redux'
import {wrapper} from '../redux/store';
import { connect } from 'react-redux'
import * as centralActions from "../redux/actions/central/action";
import * as actions from "../redux/actions/dashboard/action";
import * as Constants from "../redux/actions/dashboard/constants";
import * as AppConstants from "../utilities/constants";
import {withRouter} from "next/router";

class Index extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		if(this.props.user && this.props.user.UserDetail){
			this.props.getDashboardData(this.props.user, this.props.lists);
		}
		
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

export const getStaticProps = wrapper.getStaticProps((store) => () => {
   // store.dispatch(serverRenderClock(true))
   // store.dispatch(addCount())
})

const  mapStateToProps = (state) =>{ 
    return {
        task: state.dashboard.task,
        loading: state.dashboard.loading,
        messages: state.central.messages,
        moveToUrl: state.dashboard.moveToUrl,
        lists: state.central.lists,
        user: state.central.user,
        account: state.central.account,
        navigationParams: state.dashboard.navigationParams,
        dashboardData: state.central.dashboardData,


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getConfig: bindActionCreators(centralActions.loadListsAndConfig, dispatch),
        resetTask: bindActionCreators(actions.resetTaskAction, dispatch),
        getDashboardData: bindActionCreators(actions.getDashboardDataAction, dispatch),
        navigateToUrl: bindActionCreators(actions.moveToUrlAction, dispatch),
        toggleLeftMenu: bindActionCreators(centralActions.toggleLeftMenuAction, dispatch),

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))