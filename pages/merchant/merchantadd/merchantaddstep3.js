/**
 *
 * MerchantAddStep3
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

import GetMerchantAddStep3 from "../../../components/commonscreens/merchant/GetMerchantAddStep3";
import Navbar from "../../../components/common/GetNavbar";

import Sidebar from "../../../components/common/GetSidebar";
import SettingsPanel from "../../../components/common/GetSettingsPanel";


import * as Actions from "../../../redux/actions/usercontainers/common/merchantadd/merchantaddstep3/action";
import * as Constants from "../../../redux/actions/usercontainers/common/merchantadd/merchantaddstep3/constants";
import * as AppConstants from "../../../utilities/constants";

class MerchantAddStep3 extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		console.log("MerchantAddStep3 Index", this.props);
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
								<GetMerchantAddStep3 {...this.props} />

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

MerchantAddStep3.propTypes = {
	dispatch: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	user: PropTypes.object,
	task: PropTypes.string,
	moveToUrl: PropTypes.string,
	handleItemChange: PropTypes.func,
	doSearch: PropTypes.func,
	navigateToUrl: PropTypes.func,
	saveIsoInfo: PropTypes.func,
	isoInfo: PropTypes.object,
	changeState: PropTypes.number,
	merchantId: PropTypes.number,
};

const mapStateToProps = (state) => {
	return {
		task: state.merchantAddStep3.task,
		loading: state.merchantAddStep3.loading,
		messages: state.central.messages,
		moveToUrl: state.merchantAddStep3.moveToUrl,
		user: state.central.user,
		navigationParams: state.merchantAddStep3.navigationParams,
		isoInfo: state.merchantAddStep3.isoInfo,
		saveIsoInfo: state.merchantAddStep3.saveIsoInfo,
		changeState: state.merchantAddStep3.changeState,
		merchantId: state.merchantAddStep2.merchantId
	}
};

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		resetTask: () => dispatch(Actions.resetTaskAction()),
		performReturn: () => dispatch(Actions.performReturnAction()),
		saveIsoInfo: (isoInfo, merchantId) => dispatch(Actions.saveIsoInfoAction(isoInfo, merchantId)),
		navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
		handleItemChange: (evt, checked) => dispatch(Actions.handleItemChangeAction(evt.target.name, evt.target.value, checked)),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantAddStep3));