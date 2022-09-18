/**
 *
 * GetLogin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../common/TextBox';
import SelectField from '../common/SelectField';
import { connect } from 'react-redux'

import {  withRouter } from "next/router";
import {  getDisplayMessages, getMessage, getValue } from '../../utilities/string';
// import styled from 'styled-components';

function GetLogin(props) {
   

  let appMessages = getDisplayMessages(props.messages);
   
  return (
	<div>
	<div className="d-flex align-items-center auth px-0">
	  <div className="row w-100 mx-0">
		<div className="col-lg-6 col-md-6 col-sm-10 mx-auto">
		  <div className="auth-form-light text-left py-5 px-4 px-sm-5" style={{width: '100%'}}>
			<div className="brand-logo" style={{textAlign: 'center'}}>
			  <img src={ "/img/logo.png"} alt="logo" />
			</div>
			<h4>Hello! let&apos;s get started</h4>
			<h6 className="font-weight-light">Sign in to continue.</h6>
			<label className="badge badge-danger">{appMessages }</label>
			<ValidatorForm className="pt-3" onSubmit={(data) => props.processForm(props.user, props.lists)}>
				<TextBox
					value={getValue(props.user.emailId)}
					onChange={props.handleItemChange}
					validators={['required']}
					className={'col-md-12'}
					errorMessages={["REQUIRED"]}
					variant={'outlined'}
					inputProps={{
						name: 'emailId',
						id: 'emailId',
						placeholder: 'Email Id  here...',
						type: 'text',
						size:  'lg',
						className: "h-auto"
					}}
					/>
			   <br />
			 
				 
				<TextBox
					value={getValue(props.user.password)}
					onChange={props.handleItemChange}
					validators={['required']}
					className={'col-md-12'}
					errorMessages={["REQUIRED"]}
					variant={'outlined'}
					inputProps={{
						name: 'password',
						id: 'password',
						placeholder: 'Password  here...',
						type: 'password',
						className: "h-auto"
					}}
					/>
			 
			  <div className="mt-3">
				<button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN IN</button>
			  </div>
			  <div className="my-2 d-flex justify-content-between align-items-center">
				<div className="form-check">
				  <label className="form-check-label text-muted">
					<input type="checkbox" className="form-check-input"/>
					<i className="input-helper"></i>
					Keep me signed in
				  </label>
				</div>
				<a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
			  </div>
			 
			   
			</ValidatorForm>
		  </div>
		</div>
	  </div>
	</div>  
  </div>
  );
}

GetLogin.propTypes = {
  displayWarning: PropTypes.func,
};

const  mapStateToProps = (state) =>{
    return {
        user: state.central.user,
        password: state.central.user.password,
		emailId: state.central.user.emailId,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
       


    }
}
export default withRouter (connect(mapStateToProps, mapDispatchToProps)(GetLogin));
