/**
 *
 * GetPasswordReset
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../common/TextBox';
import SelectField from '../common/SelectField';

import {getValue, getDisplayMessages, getMessage, testPassword } from '../../utilities/string';
import * as AppConstants from '../../utilities/constants';

// import styled from 'styled-components';

function GetPasswordReset(props) {
  const securityQuestionList = [];
  let appMessages = getDisplayMessages(props.messages);
  console.log(typeof appMessages);
  ValidatorForm.addValidationRule('questionsMustBeUnique', (value) => {

    if (props.user.registerQuestion1 && props.user.registerQuestion2 && props.user.registerQuestion3 &&
      (props.user.registerQuestion1 == props.user.registerQuestion2 ||
        props.user.registerQuestion3 == props.user.registerQuestion2 ||
        props.user.registerQuestion2 == props.user.registerQuestion3 )) {
      return false;
    }
    return true;
  });

  ValidatorForm.addValidationRule('passwordStrong', (value) => {
    return testPassword(value);
  });

  ValidatorForm.addValidationRule('confirmPassword', (value) => {
    return value == props.user.resetPassword;
  })

  return (
    <div className="content">
      <p>&nbsp;</p><p>&nbsp;</p>
      <div className="division">

        <div className="row" style={{maxWidth:'1200px', margin:'0 auto', position:'relative'}}>
          <div className="col-md-3"></div>
          <div className="col-md-6">

            <ValidatorForm onSubmit={(data) => props.processForm(data, props.user, props.lists)}>

               

            </ValidatorForm>
          </div>
        </div>
      </div>
    </div>
  );
}


GetPasswordReset.propTypes = {};

export default GetPasswordReset;
