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
import GetMerchantSearch from "../../../components/commonscreens/GetMerchantSearch";
import Navbar from "../../../components/common/GetNavbar";

import Sidebar from "../../../components/common/GetSidebar";
import SettingsPanel from "../../../components/common/GetSettingsPanel";
 

import * as Actions  from "../../../redux/actions/usercontainers/common/merchantsearch/action";
import * as Constants  from "../../../redux/actions/usercontainers/common/merchantsearch/constants";
import * as AppConstants  from "../../../utilities/constants";

class MerchantSearch extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		 
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
			  <GetHeader title={'Eagle Processing Merchant Search'} description={'Eagle Processing Merchant Search'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetMerchantSearch {...this.props} />
			 
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

MerchantSearch.propTypes = {
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
  merchantSearchData: PropTypes.object,
  merchantSearchParams: PropTypes.object,
};

const  mapStateToProps = (state) =>{ 
	return { 
		task: state.merchantSearch.task,
		loading: state.merchantSearch.loading,
		messages: state.central.messages,
		moveToUrl: state.merchantSearch.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		merchantSearchParams: state.merchantSearch.searchParams,
		merchantSearchData: state.merchantSearch.merchantSearchData,
		navigationParams: state.merchantSearch.navigationParams,  
		pageInfo: state.merchantSearch.pageInfo,
		changeState: state.merchantSearch.changeState,
		count: state.merchantSearch.count,
	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetTask: () => dispatch(Actions.resetTaskAction()),
	viewMerchant: (data, user) => dispatch(Actions.viewMerchantAction(data, user)),
    doSearch: (merchantSearchParams, user, pageInfo) => dispatch(Actions.getMerchantSearchDataAction(merchantSearchParams, user, pageInfo)),
    changePage: (merchantSearchParams, user, pageInfo) => dispatch(Actions.changePage(merchantSearchParams, user, pageInfo)),
	handleItemChange: (name, value) => dispatch(Actions.handleItemChange(name, value)),
	
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantSearch));
 
