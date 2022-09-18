
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import { Redirect } from "react-router-dom"
import {withRouter} from "next/router";
import NoHeader from "../../components/common/NoHeader";
import Footer from "../../components/common/GetFooter";

import Loading from "../../components/common/Loading";
import GetLogin from "../../components/securityscreens/GetLogin";

import * as Actions from "../../redux/actions/security/login/action";
import * as Constants from "../../redux/actions/security/login/constants";

export function Login(props) {
   
  console.log("Login Task", props);
  if(props.task == Constants.MOVE_TO_URL_ACTION){
    props.resetTask();
    props.router.push(props.moveToUrl);
    return <></>;
  }else {
    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <NoHeader title={'Eagle Processing'} description={'Eagle Processing'} {...props}/>
          <div className="main-panel">
            <div className="content-wrapper">
              <GetLogin {...props} />
            </div>  
            <Loading {...props}/>
            </div>
          <Footer {...props}/>
          </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  task: PropTypes.string,
  lists: PropTypes.object,
  moveToUrl: PropTypes.string,
  handleItemChange: PropTypes.func,
  navigateToUrl: PropTypes.func,
  processForm: PropTypes.func,
  resetTask: PropTypes.func,
  displayWarning: PropTypes.func,
  doRegister: PropTypes.func,
  warningBack: PropTypes.func,
  doExit: PropTypes.func,
  registerVerify: PropTypes.func,
  login: PropTypes.func,
};

const  mapStateToProps = (state) =>{ 
  return { 
    task: state.login.task,
    loading: state.login.login,
    messages: state.central.messages,
    moveToUrl: state.login.moveToUrl,
    lists: state.central.lists,
    user: state.central.user,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleItemChange: (evt, checked) => dispatch(Actions.handleLoginInfoChange(evt.target.name, evt.target.value, checked)),
    processForm: (data) => dispatch(Actions.submitLoginAction(data)),
    resetTask: () => dispatch(Actions.resetTaskAction()),
    displayWarning: () => dispatch(Actions.displayWarningAction()),
    doRegister: () => dispatch(Actions.doRegisterAction()),
    warningBack: () => dispatch(Actions.warningBackAction()),
    doExit: () => dispatch(Actions.doExitAction()),
    registerVerify: (role) => dispatch(Actions.registerVerifyAction(role)),
    login: () => dispatch(Actions.loginAction()),
    navigateToUrl: (url) => dispatch(Actions.moveToUrlAction(url)),
    doForgotPassword: () => dispatch(Actions.doForgotPasswordAction()),  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
