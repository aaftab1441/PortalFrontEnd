/**
 *
 * MerchantDetail
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
 import GetIsoParametersDetail from "/components/commonscreens/isoparameters/maintain/GetIsoParametersDetail";
 import Navbar from "/components/common/GetNavbar";
 
 import Sidebar from "/components/common/GetSidebar";
 import SettingsPanel from "/components/common/GetSettingsPanel";
 
 import * as Actions  from "/redux/actions/usercontainers/common/isoparametersmaintain/detail/action";
 import * as Constants  from "/redux/actions/usercontainers/common/isoparametersmaintain/detail/constants";

 class IsoParametersDetail extends React.PureComponent {
	 constructor(props){
		 super(props);
	 }
 
	 componentDidMount(){
		//console.log("IsoParameters", this.props) ;
		this.props.getIsoParameters(this.props.user, this.props.currentIsoParameter, this.props.lists);
	 }
	 
	 render(){
	   console.log("Iso Parameters Detail Index", this.props.user, this.props.currentIsoParameter);
	   if(this.props.task == Constants.MOVE_TO_URL_ACTION){
		 this.props.resetTask();
		 this.props.router.push(this.props.moveToUrl);
		 return (
			<></>
		 );
	   
		 }else {  
		 return (
			 <div className="container-scroller">
			   <Header title={'Eagle Processing Merchant Search'} description={'Eagle Processing Merchant Search'} {...this.props}/>
			   <Navbar {...this.props} />
			   <div className="container-fluid page-body-wrapper">
			   <Sidebar  {...this.props} />
			   <div className="main-panel">
				 <div className="content-wrapper">
					 <GetIsoParametersDetail {...this.props} />
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
 
 IsoParametersDetail.propTypes = {
   dispatch: PropTypes.func.isRequired,
   loading: PropTypes.bool,
   user: PropTypes.object,
   task: PropTypes.string,
   lists: PropTypes.object,
   moveToUrl: PropTypes.string,
   handleItemChange: PropTypes.func,
   doSearch: PropTypes.func,
   navigateToUrl: PropTypes.func,
   getMerchant: PropTypes.func,
   isoParametersDetailData: PropTypes.object,
   currentIsoParameter: PropTypes.object,
   changeState: PropTypes.number,
};
 
 const  mapStateToProps = (state) =>{ 
	return { 
		task: state.isoparametersMaintainDetail.task,
		loading: state.isoparametersMaintainDetail.loading,
		messages: state.central.messages,
		moveToUrl: state.isoparametersMaintainDetail.movetourl,
		lists: state.central.lists,
		user: state.central.user,
		currentIsoParameter: state.isoparametersMaintainDetail.currentIsoParameter,
		isoParametersDetailData: state.isoparametersMaintainDetail.isoParametersDetaildata,
		changeState: state.isoparametersMaintainDetail.changeState, 
		itemSearch: state.isoparametersMaintainDetail.itemSearch, 
		changeState: state.isoparametersMaintainDetail.changeState,
		sectionLoading: state.isoparametersMaintainDetail.sectionLoading,
		userSearchParams: state.isoparametersMaintainDetail.userSearchParams,
	}
};
 
 function mapDispatchToProps(dispatch) {
   return {
	 dispatch,
	 resetTask: () => dispatch(Actions.resetTaskAction()),
	 doSearch: (user, merchant, lists) => dispatch(Actions.getMerchantDetailDataAction(user, merchant, lists)),
	 navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
	 handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
	 getMerchant: (user, merchant) => dispatch(Actions.getMerchantAction(user, merchant)),
	 changePage: (pageInfo, user, merchant) => dispatch(Actions.changePageAction(pageInfo, user, merchant)),  
	 handleSearchChange: (name, value, container) => dispatch(Actions.handleSearchChangeAction(name, value, container)),  
	 handleUserSearchChange: (evt, checked) => dispatch(Actions.handleUserSearchChange(evt.target.name, evt.target.value, checked)),
	 
	 
   };
 }
  
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IsoParametersDetail));
 
