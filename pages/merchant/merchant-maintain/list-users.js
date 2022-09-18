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
import GetUserList from "/components/commonscreens/merchant/maintain/GetUserList";
import Navbar from "/components/common/GetNavbar";

import Sidebar from "/components/common/GetSidebar";
import SettingsPanel from "/components/common/GetSettingsPanel";
 
import * as Actions  from "/redux/actions/usermanagement/listusers/action";
import * as Constants  from "/redux/actions/usermanagement/listusers/constants";
import * as ManageUserActions  from "/redux/actions/usermanagement/manageuser/action";

import * as AppConstants  from "/utilities/constants";

class UserList extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getUsers(this.props.userSearchParams, this.props.user, this.props.pageInfo);
		
	}
	
	render(){
	  console.log("User List", this.props);
	  
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

UserList.propTypes = {
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
  userList: PropTypes.array,
  userSearchParams: PropTypes.object,
  changeState: PropTypes.number,
};

const  mapStateToProps = (state) =>{ 
	return { 
		task: state.listUsers.task,
		loading: state.listUsers.loading,
		messages: state.central.messages,
		moveToUrl: state.listUsers.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		userSearchParams: state.listUsers.userSearchParams,  
		userList: state.listUsers.userList,
		changeState: state.listUsers.changeState,
		pageInfo: state.listUsers.pageInfo,
		count: state.listUsers.count,
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetTask: () => dispatch(Actions.resetTaskAction()),
	viewUser: (item, user, lists) => dispatch(Actions.viewUserAction(item, user, lists)),
	addUser: (item, user, lists) => dispatch(ManageUserActions.clearUserAction(item, user, lists)),
	
	getUsers: (params, user, pageInfo) => dispatch(Actions.getMerchantUserListDataAction(params, user, pageInfo)),
    navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
	handleItemChange: (name, value) => dispatch(Actions.handleItemChange(name, value)),
	registerFromLocation: (fromLocation) => dispatch(ManageUserActions.registerFromLocation(fromLocation)),
    changeMerchantUserPage: (params, user, pageInfo) => dispatch(Actions.changeMerchantUserListPageAction(params, user, pageInfo)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));
 
