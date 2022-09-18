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

 
 
 import Footer from "../../components/common/GetFooter";
 import Header from "../../components/common/GetHeader";
 
 import Loading from "../../components/common/Loading";
 import GetMerchantDetail from "../../components/commonscreens/GetMerchantDetail";
 import Navbar from "../../components/common/GetNavbar";
 
 import Sidebar from "../../components/common/GetSidebar";
 import SettingsPanel from "../../components/common/GetSettingsPanel";
 
 import * as Actions  from "../../redux/actions/usercontainers/common/merchantdetail/action";
 import * as Constants  from "../../redux/actions/usercontainers/common/merchantdetail/constants";
 
 import * as IsoActions from "/redux/actions/usercontainers/das/isolistdashboard/action";
 
 class MerchantDetail extends React.PureComponent {
	 constructor(props){
		 super(props);
	 }
 
	 componentDidMount(){
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
   openTransactionDetail: PropTypes.bool,
   openBatchDetail: PropTypes.bool,
   openACHDetail: PropTypes.bool,
   openChargeBackDetail: PropTypes.bool,
   transactionDetail: PropTypes.object,
   batchDetail: PropTypes.object,
   aCHDetail: PropTypes.object,
   chargeBackDetail: PropTypes.object,

};
 
 const  mapStateToProps = (state) =>{ 
	return { 
		task: state.merchantDetail.task,
		loading: state.merchantDetail.loading,
		messages: state.central.messages,
		moveToUrl: state.merchantDetail.movetourl,
		lists: state.central.lists,
		user: state.central.user,
		currentMerchant: state.central.currentMerchant,
		merchantDetailData: state.merchantDetail.merchantdetaildata,
		changeState: state.merchantDetail.changeState, 
		openTransactionDetail: state.merchantDetail.openTransactionDetail,
		openBatchDetail: state.merchantDetail.openBatchDetail,
		openACHDetail: state.merchantDetail.openACHDetail,
		openChargeBackDetail: state.merchantDetail.openChargeBackDetail, 
		transactionDetail: state.merchantDetail.transactionDetail,
		batchDetail: state.merchantDetail.batchDetail,
		aCHDetail: state.merchantDetail.aCHDetail,
		chargeBackDetail: state.merchantDetail.chargeBackDetail, 
		itemSearch: state.merchantDetail.itemSearch, 
		changeState: state.merchantDetail.changeState,

		sectionLoading: state.merchantDetail.sectionLoading,
		
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
	 viewTransactionDetail: (data) => dispatch(Actions.viewTransactionDetail(data)),  
	 viewBatchDetail: (data) => dispatch(Actions.viewBatchDetail(data)),  
	 viewACHDetail: (data) => dispatch(Actions.viewACHDetail(data)),  
	 viewChargeBackDetail: (data) => dispatch(Actions.viewChargeBackDetail(data)),  
	 handleSearchChange: (name, value, container) => dispatch(Actions.handleSearchChangeAction(name, value, container)),  
	 
	 closeTransactionDetail: () => dispatch(Actions.closeTransactionDetail()),  
	 closeBatchDetail: () => dispatch(Actions.closeBatchDetail()),  
	 closeACHDetail: () => dispatch(Actions.closeACHDetail()),  
	 closeChargeBackDetail: () => dispatch(Actions.closeChargeBackDetail()), 
	 viewISODetail: (iso) => dispatch(IsoActions.viewISODetailAction(iso)), 
	 exportChargeBacks: (params, user, merchant) => dispatch(Actions.exportChargeBacks(params, user, merchant)), 
	 viewStatement: (params, user, merchant) => dispatch(Actions.viewStatement(params, user, merchant)), 
	 
	 
   };
 }
  
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantDetail));
 
