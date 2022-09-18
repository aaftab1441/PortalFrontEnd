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
 import GetMerchantDetail from "/components/commonscreens/merchant/maintain/GetMerchantDetail";
 import Navbar from "/components/common/GetNavbar";
 
 import Sidebar from "/components/common/GetSidebar";
 import SettingsPanel from "/components/common/GetSettingsPanel";
 
 import * as Actions  from "/redux/actions/usercontainers/common/merchantmaintain/detail/action";
 import * as Constants  from "/redux/actions/usercontainers/common/merchantmaintain/detail/constants";
 import * as UserActions  from "/redux/actions/usercontainers/common/merchantmaintain/manageuser/action";

 class MerchantDetail extends React.PureComponent {
	 constructor(props){
		 super(props);
	 }
 
	 componentDidMount(){
		//console.log("Merchant", this.props) ;
		this.props.getMerchant(this.props.user, this.props.currentMerchant, this.props.lists);
	 }
	 
	 render(){
	   console.log("MerchantDetail Index", this.props.user, this.props.currentMerchant);
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
					 <GetMerchantDetail {...this.props} />
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
 
 MerchantDetail.propTypes = {
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
   merchantDetailData: PropTypes.object,
   currentMerchant: PropTypes.object,
   changeState: PropTypes.number,
};
 
 const  mapStateToProps = (state) =>{ 
	return { 
		task: state.merchantMaintainDetail.task,
		loading: state.merchantMaintainDetail.loading,
		messages: state.central.messages,
		moveToUrl: state.merchantMaintainDetail.movetourl,
		lists: state.central.lists,
		user: state.central.user,
		currentMerchant: state.merchantMaintainDetail.currentMerchant,
		merchantDetailData: state.merchantMaintainDetail.merchantdetaildata,
		changeState: state.merchantMaintainDetail.changeState, 
		itemSearch: state.merchantMaintainDetail.itemSearch, 
		changeState: state.merchantMaintainDetail.changeState,
		sectionLoading: state.merchantMaintainDetail.sectionLoading,
		userSearchParams: state.merchantMaintainDetail.userSearchParams,
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
	 viewUser: (item, user, lists) => dispatch(UserActions.viewUserAction(item, user, lists)),
	 addUser: (user, lists, currentMerchant) => dispatch(UserActions.addUser(user, lists, currentMerchant)), 
	 changePage: (pageInfo, user, merchant) => dispatch(Actions.changePageAction(pageInfo, user, merchant)),  
	 handleSearchChange: (name, value, container) => dispatch(Actions.handleSearchChangeAction(name, value, container)),  
	 handleUserSearchChange: (evt, checked) => dispatch(Actions.handleUserSearchChange(evt.target.name, evt.target.value, checked)),
	 
	 
   };
 }
  
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantDetail));
 
