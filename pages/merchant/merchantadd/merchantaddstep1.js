/**
 *
 * MerchantAddStep1
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from "next/router";



import Footer from "../../../components/common/GetFooter";
import Header from "../../../components/common/GetHeader";

import Loading from "../../../components/common/Loading";

import GetMerchantAddStep1 from "../../../components/commonscreens/merchant/GetMerchantAddStep1";
import Navbar from "../../../components/common/GetNavbar";

import Sidebar from "../../../components/common/GetSidebar";
import SettingsPanel from "../../../components/common/GetSettingsPanel";


import * as Actions from "../../../redux/actions/usercontainers/common/merchantadd/merchantaddstep1/action";
import * as Constants from "../../../redux/actions/usercontainers/common/merchantadd/merchantaddstep1/constants";
import * as AppConstants from "../../../utilities/constants";

class MerchantAddStep1 extends React.PureComponent {
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
								<GetMerchantAddStep1 {...this.props} />

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

MerchantAddStep1.propTypes = {
	dispatch: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	user: PropTypes.object,
	task: PropTypes.string,
	lists: PropTypes.object,
	moveToUrl: PropTypes.string,
	handleItemChange: PropTypes.func,
	handleAutoCompleteChange: PropTypes.func,
	doSearch: PropTypes.func,
	navigateToUrl: PropTypes.func,
	saveMerchant: PropTypes.func,
	merchant: PropTypes.object,
	changeState: PropTypes.number,
};

const mapStateToProps = (state) => {
	return {
		task: state.merchantAddStep1.task,
		loading: state.merchantAddStep1.loading,
		messages: state.central.messages,
		moveToUrl: state.merchantAddStep1.moveToUrl,
		lists: state.central.lists,
		user: state.central.user,
		navigationParams: state.merchantAddStep1.navigationParams,
		merchant: state.merchantAddStep1.merchant,
		changeState: state.merchantAddStep1.changeState,
	}
};

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		resetTask: () => dispatch(Actions.resetTaskAction()),
		saveMerchant: (merchant) => dispatch(Actions.saveMerchantAction(merchant)),
		navigateToUrl: (url, params) => dispatch(Actions.moveToUrlAction(url, params)),
		handleItemChange: (evt, checked) => dispatch(Actions.handleItemChangeAction(evt.target.name, evt.target.value, checked)),
		handleAutoCompleteChange: (name, value) => dispatch(Actions.handleAutoCompleteChange(name, value)),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantAddStep1));

