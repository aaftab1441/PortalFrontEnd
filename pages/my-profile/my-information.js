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
import GetMyInformation from "/components/commonscreens/user-management/GetMyInformation";
import Navbar from "/components/common/GetNavbar";

import Sidebar from "/components/common/GetSidebar";
import SettingsPanel from "/components/common/GetSettingsPanel";
 
import * as centralActions from "/redux/actions/central/action";
import * as Actions  from "/redux/actions/usermanagement/myinformation/action";
import * as Constants  from "/redux/actions/usermanagement/myinformation/constants";
import * as AppConstants  from "/utilities/constants";

class MyInformation extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getConfig();
		this.props.viewUser(this.props.user, this.props.lists);	
		
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
					<GetMyInformation {...this.props} />
			 
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

MyInformation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  task: PropTypes.string,
  lists: PropTypes.object,
  moveToUrl: PropTypes.string,
  handleItemChange: PropTypes.func,
  doSearch: PropTypes.func,
  navigateToUrl: PropTypes.func,
  currentUser: PropTypes.object,
  viewUser: PropTypes.func,   
  manageUserData: PropTypes.object,
  manageUserParams: PropTypes.object,
  changeState: PropTypes.number,
};

const  mapStateToProps = (state) =>{ 
	return { 
		task: state.myInformation.task,
		loading: state.myInformation.loading,
		messages: state.central.messages,
		moveToUrl: state.myInformation.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		manageUserData: state.central.manageUserData,
		data: state.myInformation.data,
		passedUser: state.central.currentUser,
		currentUser: state.myInformation.currentUser,
		changeState: state.myInformation.changeState,
		fromLocation: state.myInformation.fromLocation,
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
	getConfig: () => dispatch(centralActions.loadListsAndConfig()),
	resetTask: () => dispatch(Actions.resetTaskAction()),
	viewUser: (user, lists) => dispatch(Actions.viewUserAction(user, lists)),
	navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
	handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
	handlePermissionItemChange: (evt, checked) => dispatch(Actions.handlePermissionItemChange(evt.target.name, evt.target.value, checked)),
	processForm: (currentUser, user, lists) => dispatch(Actions.processForm(currentUser, user, lists)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyInformation));
 
