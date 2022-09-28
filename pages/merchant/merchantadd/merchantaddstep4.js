/**
 *
 * MerchantAddStep4
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from "next/router";



import Footer from "../../../components/common/GetFooter";
import Header from "../../../components/common/GetHeader";

import Loading from "../../../components/common/Loading";

import GetMerchantAddStep4 from "../../../components/commonscreens/merchant/GetMerchantAddStep4";
import Navbar from "../../../components/common/GetNavbar";

import Sidebar from "../../../components/common/GetSidebar";
import SettingsPanel from "../../../components/common/GetSettingsPanel";


import * as Actions from "../../../redux/actions/usercontainers/common/merchantadd/merchantaddstep4/action";
import * as Constants from "../../../redux/actions/usercontainers/common/merchantadd/merchantaddstep4/constants";
import * as AppConstants from "../../../utilities/constants";

class MerchantAddStep4 extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("calling action there")
		this.props.getLocations(this.props.merchantId)

	}

	render() {
		console.log("MerchantAddStep4 Index", this.props);
		if (this.props.task == Constants.MOVE_TO_URL_ACTION) {
			this.props.resetTask();
			this.props.router.push(this.props.moveToUrl);
			return (
				<></>
			);
		} else if (!this.props.user || !this.props.user.UserDetail || !this.props.user.UserDetail.User_Level_Code) {
			this.props.router.push(AppConstants.LOGIN_PATH);
			return (
				<></>);
		} else {
			return (
				<div className="container-scroller">
					<Header title={'Eagle Processing Merchant Information'} description={'Eagle Processing Merchant Information'} {...this.props} />
					<Navbar {...this.props} />
					<div className="container-fluid page-body-wrapper">
						<Sidebar  {...this.props} />
						<div className="main-panel">
							<div className="content-wrapper">
								<GetMerchantAddStep4 {...this.props} />

								<SettingsPanel  {...this.props} />
							</div>
							<Footer  {...this.props} />
						</div>
						<Loading {...this.props} />
					</div>
				</div>
			);
		}
	}
}

MerchantAddStep4.propTypes = {
	dispatch: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	user: PropTypes.object,
	allLocations: PropTypes.array,
	task: PropTypes.string,
	lists: PropTypes.object,
	moveToUrl: PropTypes.string,
	handleItemChange: PropTypes.func,
	handleMultiSelectChange: PropTypes.func,
	navigateToUrl: PropTypes.func,
	addMerchantStep4: PropTypes.func,
	getLocations: PropTypes.func,
	saveLocation: PropTypes.func,
	locations: PropTypes.array,
	location: PropTypes.object,
	handleDateChange: PropTypes.func,
	locationPanel: PropTypes.number,
	changeState: PropTypes.number,
	activeTabKey: PropTypes.string,
	updateActiveTab: PropTypes.func,
	document: PropTypes.object,
	uploadDocument: PropTypes.func,
	selectedDocumentType: PropTypes.string,
	formFile: PropTypes.object,
	handleFileChange: PropTypes.func,
	merchantId: PropTypes.number,
};

const mapStateToProps = (state) => {
	return {
		task: state.merchantAddStep4.task,
		loading: state.merchantAddStep4.loading,
		// allLocations : state.merchantAddStep4.locations,
		messages: state.central.messages,
		moveToUrl: state.merchantAddStep4.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		navigationParams: state.merchantAddStep4.navigationParams,
		locations: state.merchantAddStep4.locations,
		allLocations: state.merchantAddStep4.allLocations,
		location: state.merchantAddStep4.location,
		locationPanel: state.merchantAddStep4.locationPanel,
		changeState: state.merchantAddStep4.changeState,
		activeTabKey: state.merchantAddStep4.activeTabKey,
		document: state.merchantAddStep4.document,
		selectedDocumentType: state.merchantAddStep4.selectedDocumentType,
		formFile: state.merchantAddStep4.formFile,
		merchantId: state.merchantAddStep3.merchantId,
	}
};

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		resetTask: () => dispatch(Actions.resetTaskAction()),
		updateActiveTab: (tabKey) => dispatch(Actions.updateActiveTabAction(tabKey)),
		performReturn: () => dispatch(Actions.performReturnAction()),
		addMerchantStep4: (locations, merchantId) => dispatch(Actions.addMerchantStep4Action(locations, merchantId)),
		getLocations: ( merchantId) => dispatch(Actions.getLocationsAction( merchantId)),
		saveLocation: (locations, location, lists) => dispatch(Actions.saveLocation(locations, location, lists)),
		navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
		handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
		handleDateChange: (name, value, container) => dispatch(Actions.handleDateChangeAction(name, value, container)),
		handleMultiSelectChange: (name, value) => dispatch(Actions.handleMultiSelectChangeAction(name, value)),
		handleFileChange: (evt, checked) => dispatch(Actions.handleFileChangeAction(evt.target.files[0], evt.target.name, evt.target.value, checked)),
		uploadDocument: (formFile, document) => dispatch(Actions.uploadDocumentAction(formFile, document)),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantAddStep4));

