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
import GetUserList from "/components/commonscreens/user-management/GetUserList";
import Navbar from "/components/common/GetNavbar";

import Sidebar from "/components/common/GetSidebar";
import SettingsPanel from "/components/common/GetSettingsPanel";
 

import * as Actions  from "/redux/actions/usermanagement/securitylog/action";
import * as Constants  from "/redux/actions/usermanagement/securitylog/constants";
import * as AppConstants  from "/utilities/constants";

class UserList extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		console.log("Props", this.props);
		let parts = this.props.router.asPath.split('#');
		if(parts.length > 0){
			console.log('Parts', parts[1]);
			this.props.getSecurityLogs(parts[1], this.props.user, this.props.lists);
		}
		
	}
	
	render(){
	  console.log("User List", this.props);
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
			  <GetHeader title={'Eagle Processing User List'} description={'Eagle Processing User List'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetUserList {...this.props} />
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

UserList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  task: PropTypes.string,
  lists: PropTypes.object,
  moveToUrl: PropTypes.string,
  handleItemChange: PropTypes.func,
  securityLogData: PropTypes.object,
  securityLogParams: PropTypes.object,
   
};

const  mapStateToProps = (state) =>{ 
	return { 
		task: state.securityLog.task,
		loading: state.securityLog.loading,
		messages: state.central.messages,
		moveToUrl: state.securityLog.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		securityLogData: state.central.securityLogData,
		data: state.securityLog.data,
		

	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetTask: () => dispatch(Actions.resetTaskAction()),
	viewSecurityLogAction: (data) => dispatch(Actions.viewSecurityLogAction(data)),
	getSecurityLogs: (searchType, user, lists) => dispatch(Actions.getSecurityLogsAction(searchType, user, lists)),
    navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
	handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));
 
