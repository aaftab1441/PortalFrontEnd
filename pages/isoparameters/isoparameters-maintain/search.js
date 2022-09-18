/**
 *
 * IsoParametersMaintainSearch
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
import GetIsoParameterSearch from "../../../components/commonscreens/isoparameters/maintain/GetIsoParametersSearch";
import Navbar from "../../../components/common/GetNavbar";

import Sidebar from "../../../components/common/GetSidebar";
import SettingsPanel from "../../../components/common/GetSettingsPanel";
 

import * as Actions  from "../../../redux/actions/usercontainers/common/isoparametersmaintain/search/action";
import * as Constants  from "../../../redux/actions/usercontainers/common/isoparametersmaintain/search/constants";
import * as AppConstants  from "/utilities/constants";

class IsoParametersMaintainSearch extends React.PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		 
	}
	
	render(){
	  console.log("IsoParametersMaintainSearch Index", this.props);
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
			  <GetHeader title={'Eagle Processing Iso Parameters Search'} description={'Eagle Processing Iso Parameters Search'} {...this.props}/>
		      <Navbar {...this.props} />
			  <div className="container-fluid page-body-wrapper">
			  <Sidebar  {...this.props} />
			  <div className="main-panel">
				<div className="content-wrapper">
					<GetIsoParameterSearch {...this.props} />
			 
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

IsoParametersMaintainSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  task: PropTypes.string,
  lists: PropTypes.object,
  moveToUrl: PropTypes.string,
  handleItemChange: PropTypes.func,
  changeState: PropTypes.number,
  doSearch: PropTypes.func,
  navigateToUrl: PropTypes.func,
  doSearch: PropTypes.func,
  viewIsoParameters: PropTypes.func,   
  isoParametersSearchData: PropTypes.array,
  IsoParametersSearchParams: PropTypes.object,
   
};

const  mapStateToProps = (state) =>{ 
	
	return { 
		task: state.isoParametersMaintainSearch.task,
		loading: state.isoParametersMaintainSearch.loading,
		messages: state.central.messages,
		moveToUrl: state.isoParametersMaintainSearch.moveToUrl,
		changeState: state.isoParametersMaintainSearch.changeState,
		lists: state.central.lists,
		user: state.central.user,
		IsoParametersSearchParams: state.isoParametersMaintainSearch.IsoParametersSearchParams,
		isoParametersSearchData: state.isoParametersMaintainSearch.isoParametersSearchData,
		navigationParams: state.isoParametersMaintainSearch.navigationParams,
		ISO_Code: state.isoParametersMaintainSearch.IsoParametersSearchParams.ISO_Code,
		VI_Settle_Fee: state.isoParametersMaintainSearch.IsoParametersSearchParams.VI_Settle_Fee,
		MC_Settle_Fee: state.isoParametersMaintainSearch.IsoParametersSearchParams.MC_Settle_Fee,
		DS_Settle_Fee: state.isoParametersMaintainSearch.IsoParametersSearchParams.DS_Settle_Fee,

	}
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetTask: () => dispatch(Actions.resetTaskAction()),
	viewMerchant: (data, user) => dispatch(Actions.viewISOParametersAction(data, user)),
    doSearch: (data, user, lists) => dispatch(Actions.getISOParametersSearchDataAction(data, user, lists)),
    navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
	handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IsoParametersMaintainSearch));
 
