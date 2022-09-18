
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from "next/router";
import { compose } from 'redux';
import { push } from 'connected-react-router';

import NoHeader from "../../components/common/NoHeader";
import Footer from "../../components/common/GetFooter";

import Loading from "/components/common/Loading";
//import GetPasswordReset from "components/SecurityScreens/GetPasswordReset";


export function PasswordReset(props) {
  console.log("PasswordReset Task", props);
  if(props.task == MOVE_TO_URL_ACTION){
    props.resetTask();
    this.props.router.push(this.props.moveToUrl);
    return (
      <></>
    );
  }else {
    return (
      <div className="container-scroller">
        
      </div>
    );
  }
}

PasswordReset.propTypes = {
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
    login: state.isoDashboard.PasswordReset(),
    task: state.isoDashboard.task,
    loading: state.isoDashboard.loading,
    messages: state.central.messages,
    moveToUrl: state.isoDashboard.MoveToUrl(),
    lists: state.central.lists,
    user: state.central.user,
  }
};
 
export default withRouter(connect(mapStateToProps, null)(PasswordReset));
 