/**
 *
 * MerchantAddStep2
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

import GetMerchantAddStep2 from "../../../components/commonscreens/merchant/GetMerchantAddStep2";
import Navbar from "../../../components/common/GetNavbar";

import Sidebar from "../../../components/common/GetSidebar";
import SettingsPanel from "../../../components/common/GetSettingsPanel";


import * as Actions from "../../../redux/actions/usercontainers/common/merchantadd/merchantaddstep2/action";
import * as Constants from "../../../redux/actions/usercontainers/common/merchantadd/merchantaddstep2/constants";
import * as AppConstants from "../../../utilities/constants";

class MerchantAddStep2 extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
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
								<GetMerchantAddStep2 {...this.props} />

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

MerchantAddStep2.propTypes = {
	dispatch: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	user: PropTypes.object,
	task: PropTypes.string,
	lists: PropTypes.object,
	moveToUrl: PropTypes.string,
	handleItemChange: PropTypes.func,
	navigateToUrl: PropTypes.func,
	saveOwners: PropTypes.func,
	owners: PropTypes.array,
	changeState: PropTypes.number,
	addOwner: PropTypes.func,
	merchantId: PropTypes.number
};

const mapStateToProps = (state) => {
	return {
		task: state.merchantAddStep2.task,
		loading: state.merchantAddStep2.loading,
		messages: state.central.messages,
		moveToUrl: state.merchantAddStep2.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		owners: state.merchantAddStep2.owners,
		addOwner: state.merchantAddStep2.addOwner,
		changeState: state.merchantAddStep2.changeState,
		merchantId: state.merchantAddStep1.merchant.id
	}
};

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		resetTask: () => dispatch(Actions.resetTaskAction()),
		performReturn: () => dispatch(Actions.performReturnAction()),
		addOwner: () => dispatch(Actions.addOwnerAction()),
		saveOwners: (owners, merchantId) => dispatch(Actions.saveOwnersAction(owners, merchantId)),
		navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
		handleItemChange: (evt, index) => dispatch(Actions.handleItemChangeAction(evt.target.name, evt.target.value, index)),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantAddStep2));

