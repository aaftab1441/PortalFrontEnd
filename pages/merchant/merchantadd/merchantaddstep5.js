/**
 *
 * MerchantAddStep5
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { compose } from 'redux';
import { push } from 'connected-react-router';

import { withRouter } from "next/router";



import Footer from "../../../components/common/GetFooter";
import Header from "../../../components/common/GetHeader";

import Loading from "../../../components/common/Loading";

import GetMerchantAddStep5 from "../../../components/commonscreens/merchant/GetMerchantAddStep5";
import Navbar from "../../../components/common/GetNavbar";

import Sidebar from "../../../components/common/GetSidebar";
import SettingsPanel from "../../../components/common/GetSettingsPanel";


import * as Actions from "../../../redux/actions/usercontainers/common/merchantadd/merchantaddstep5/action";
import * as Constants from "../../../redux/actions/usercontainers/common/merchantadd/merchantaddstep5/constants";
import * as AppConstants from "../../../utilities/constants";

class MerchantAddStep5 extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getFees(this.props.user);
	}

	render() {
		console.log("MerchantAddStep5 Index", this.props);
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
								<GetMerchantAddStep5 {...this.props} />

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

MerchantAddStep5.propTypes = {
	dispatch: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	user: PropTypes.object,
	task: PropTypes.string,
	lists: PropTypes.object,
	moveToUrl: PropTypes.string,
	handleItemChange: PropTypes.func,
	handleMultiSelectChange: PropTypes.func,
	navigateToUrl: PropTypes.func,
	addMerchantStep5: PropTypes.func,
	saveFees: PropTypes.func,
	templates: PropTypes.array,
	handleDateChange: PropTypes.func,
	changeState: PropTypes.number,
	selectedTemplateId: PropTypes.string,
	merchantId: PropTypes.number,
};

const mapStateToProps = (state) => {
	return {
		task: state.merchantAddStep5.task,
		loading: state.merchantAddStep5.loading,
		messages: state.central.messages,
		moveToUrl: state.merchantAddStep5.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		navigationParams: state.merchantAddStep5.navigationParams,
		templates: state.merchantAddStep5.templates,
		changeState: state.merchantAddStep5.changeState,
		selectedTemplateId: state.merchantAddStep5.selectedTemplateId,
		merchantId: state.merchantAddStep4.merchantId,
	}
};

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		resetTask: () => dispatch(Actions.resetTaskAction()),
		performReturn: () => dispatch(Actions.performReturnAction()),
		addMerchantStep5: (selectedTemplateId, templates, merchantId) => dispatch(Actions.addMerchantStep5(selectedTemplateId, templates, merchantId)),
		saveFees: (fees, event) => dispatch(Actions.saveFees(fees, event)),
		navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
		handleItemChange: (evt, checked) => dispatch(Actions.handleItemChange(evt.target.name, evt.target.value, checked)),
		handleDateChange: (name, value, container) => dispatch(Actions.handleDateChangeAction(name, value, container)),
		handleMultiSelectChange: (name, value) => dispatch(Actions.handleMultiSelectChangeAction(name, value)),
		getFees: (user) => dispatch(Actions.getFeesAction(user)),
	};
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantAddStep5));

