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



import GetFooter from "../../../components/common/GetFooter";
import GetHeader from "../../../components/common/GetHeader";
import { withRouter} from "next/router";
import Loading from "../../../components/common/Loading";
import GetMerchantList from "../../../components/commonscreens/GetMerchantList";
import Navbar from "../../../components/common/GetNavbar";

import Sidebar from "../../../components/common/GetSidebar";
import SettingsPanel from "../../../components/common/GetSettingsPanel";
 

import * as Actions  from "../../../redux/actions/usercontainers/common/genericmerchantlist/action";
import * as Constants  from "../../../redux/actions/usercontainers/common/genericmerchantlist/constants";
import * as AppConstants  from "../../../utilities/constants";

class MerchantList extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let parts = this.props.router.asPath.split('#');
		if(parts.length > 0){
			this.props.getMerchants(parts[1], this.props.user, this.props.lists, this.props.merchantSearchParams);
		}		
	}
	
	render(){
	  console.log("MerchantSearch Index", this.props);
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
			  <GetHeader title={'Eagle Processing Merchant List'} description={'Eagle Processing Merchant Merchant List'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetMerchantList {...this.props} />
			 
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

MerchantList.propTypes = {
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
  genericMerchantListData: PropTypes.object,
  genericMerchantListParams: PropTypes.object,
  allData: PropTypes.object,
  changeState: PropTypes.number,
  merchantSearchParams: PropTypes.object,
   
};

const  mapStateToProps = (state) =>{ 
	return { 
		task: state.genericMerchantList.task,
		loading: state.genericMerchantList.loading,
		messages: state.central.messages,
		moveToUrl: state.genericMerchantList.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		genericMerchantListData: state.central.genericMerchantListData,
		searchType: state.genericMerchantList.searchType,  
		data: state.genericMerchantList.data,
		allData: state.genericMerchantList.allData,
		changeState: state.genericMerchantList.changeState,
		merchantSearchParams: state.genericMerchantList.merchantSearch,
		
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetTask: () => dispatch(Actions.resetTaskAction()),
	viewMerchant: (data) => dispatch(Actions.viewMerchantAction(data)),
	getMerchants: (searchType, user, lists, searchParams) => dispatch(Actions.getMerchantsAction(searchType, user, lists, searchParams)),
    navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
	handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantList));
 
