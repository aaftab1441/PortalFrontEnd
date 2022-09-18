/**
 *
 * GetRegistration
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../common/TextBox';
import SelectField from '../common/SelectField';

import * as AppConstants from '../../utilities/constants';
import MenuItem from '@mui/material/MenuItem';

import { getMessage, getDisplayMessages, getValue } from '../../utilities/string';

function GetRegistration(props) {
	ValidatorForm.addValidationRule('confirmPassword', (value) => {
	    return value == props.user.password;
	  })
	  let appMessages = getDisplayMessages(props.messages);
	console.log("Get Registration", props, props.user);

	return (
		  <div className="app-container app-theme-white body-tabs-shadow">
			  <ValidatorForm onSubmit={(data) => props.processForm(data, props.user, props.lists)}>
			  <div className="app-container">
		            <div className="h-100">
		                <div className="h-100 no-gutters row">
		                    <div className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center col-md-12 col-lg-7">
		                        <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
		                            <div className="app-logo"></div>
		                            <h4>
		                                <div>Welcome,</div>
		                                <span>It only takes a <span className="text-success">few seconds</span> to create your account</span></h4>
		                            <div>
		                            
	                                    <div className="form-row">
	                                        <div className="col-md-4">
	                                            <div className="position-relative form-group"><label htmlFor="firstName" className="">First Name</label><br />
	                                            <TextBox
		                                            value={getValue(props.user.firstName)}
		                                            onChange={props.handleItemChange}
		                                            validators={['required']}
		                                            
		                                            errorMessages={["REQUIRED"]}
		                                            inputProps={{
		                                              name: 'firstName',
		                                              id: 'firstName',
		                                              placeholder: 'First name here...',
		                                              type: 'text',
		                                              className: "form-control"
		                                            }}
		                                          />
	                                          </div>
	                                        </div>
	                                        <div className="col-md-4">
	                                            <div className="position-relative form-group"><label htmlFor="middleName" className="">Middle Name</label><br />
	                                            <TextBox
		                                            value={getValue(props.user.middleName)}
		                                            onChange={props.handleItemChange}
		                                            validators={['required']}
		                                            
		                                            errorMessages={[""]}
		                                            inputProps={{
		                                              name: 'middleName',
		                                              id: 'middleName',
		                                              placeholder: 'Middle name here...',
		                                              type: 'text',
		                                              className: "form-control"
		                                            }}
		                                          />
	                                          </div>
	                                        </div>		
	                                        <div className="col-md-4">
	                                            <div className="position-relative form-group"><label htmlFor="lastName" className="">Last Name</label><br />
	                                            <TextBox
		                                            value={getValue(props.user.lastName)}
		                                            onChange={props.handleItemChange}
		                                            validators={['required']}
		                                            
		                                            errorMessages={["REQUIRED"]}
		                                            inputProps={{
		                                              name: 'lastName',
		                                              id: 'lastName',
		                                              placeholder: 'Last name here...',
		                                              type: 'text',
		                                              className: "form-control"
		                                            }}
		                                          />
	                                          </div>
	                                        </div>		                                        
	                                        <div className="col-md-4">
	                                            <div className="position-relative form-group"><label htmlFor="email" className=""><span className="text-danger">*</span> Email</label><br />
	                                            <TextBox
		                                            value={getValue(props.user.email)}
		                                            onChange={props.handleItemChange}
		                                            validators={['required']}
		                                            
		                                            errorMessages={["REQUIRED"]}
		                                            inputProps={{
		                                              name: 'email',
		                                              id: 'email',
		                                              placeholder: 'Email here ...',
		                                              type: 'text',
		                                              className: "form-control"
		                                            }}
		                                          /></div>
	                                        </div>
	                                        <div className="col-md-4">
	                                            <div className="position-relative form-group"><label htmlFor="password" className="">Password</label> <br />
	                                            <TextBox
		                                            value={getValue(props.user.password)}
		                                            onChange={props.handleItemChange}
		                                            validators={['required']}
		                                            
		                                            errorMessages={["REQUIRED"]}
		                                            inputProps={{
		                                              name: 'password',
		                                              id: 'password',
		                                              placeholder: 'Password here...',
		                                              type: 'password',
		                                              className: "form-control"
		                                            }}
		                                          />
	                                          </div>
	                                        </div>
	                                        <div className="col-md-4">
	                                            <div className="position-relative form-group"><label htmlFor="confirmPassword" className="">Confirm Password</label><br />
	                                            <TextBox
		                                            value={getValue(props.user.confirmPassword)}
		                                            onChange={props.handleItemChange}
		                                            validators={['required', 'confirmPassword']}
		                                            
		                                            errorMessages={["REQUIRED", "MUST MATCH PASSWORD"]}
		                                            inputProps={{
		                                              name: 'confirmPassword',
		                                              id: 'confirmPassword',
		                                              placeholder: 'Confirm password here...',
		                                              type: 'password',
		                                              className: "form-control"
		                                            }}
		                                          />
	                                          </div>
	                                        </div>		                                        
	                                        
	                                    </div>
	                                    {appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
	                                    <div className="mt-4 d-flex align-items-center"><h5 className="mb-0">Already have an account? <a onClick={() => props.navigateToUrl(WELCOME_PATH)} className="text-primary">Sign in</a></h5>
	                                        <div className="ml-auto">
	                                            <button className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg">Create Account</button>
	                                        </div>
	                                    </div> 
		                            </div>
		                        </div>
		                    </div>
		                    <div className="d-lg-flex d-xs-none col-lg-5">
		                        <div className="slider-light">
		                            <div className="slick-slider slick-initialized">
		                                <div>
		                                     
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		        </ValidatorForm>
		</div>
	
		   
  );
}

GetRegistration.propTypes = {};

export default GetRegistration;
