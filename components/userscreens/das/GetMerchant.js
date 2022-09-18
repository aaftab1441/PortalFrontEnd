/**
 *
 * UsdotorVin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../../common/TextBox';
import SelectField from '../../common/SelectField';
import * as AppConstants from '../../utilities/constants';
import {  getDisplayMessages, getMessage } from '../../../utilities/string';
import {APPROVED_ROLE, REJECTED_ROLE} from "../../utilities/string";

// import styled from 'styled-components';

function GetMerchant(props) {

  let appMessages = getDisplayMessages(props.messages);
  return (
    <div className="content clearfix">
      <div className="content-outer">
        <div className="ifta-content-outer">
            <div className="ifta-content-inner small">
              <div className="title-bar">
                Change Agent Access
                <span><i className="fa fa-check-circle"></i></span>
              </div>
              <div className="ifta-section clearfix">
                <div className="row ifta-section-row">
                  <div className="col-md-12 ifta-label">Agent</div>
                </div>
                <div className="row ifta-section-row" style={{marginBottom:'8px'}}>
                  <div className="col-md-4">
                    {props.currentPatient.Organization.legalName}
                  </div>
                </div>
                <div className="row ifta-section-row">
                  <div className="col-md-12 ifta-label">Address</div>
                </div>
                <div className="row ifta-section-row" style={{marginBottom:'8px'}}>
                  <div className="col-md-4">
                    {props.currentPatient.Organization.addrL1} {props.currentPatient.Organization.addrL2}

                  </div>
                </div>
                <div className="row ifta-section-row">
                  <div className="col-md-12 ifta-label">City, Jurisdiction, Postal Code</div>
                </div>
                <div className="row ifta-section-row" style={{marginBottom:'8px'}}>
                  <div className="col-md-4">

                    {props.currentPatient.Organization.city} {props.currentPatient.Organization.jurisdiction}
                    {props.currentPatient.Organization.postalCode}
                  </div>
                </div>

                <div className="row ifta-section-row">
                  <div className="col-md-12 ifta-label">Phone</div>
                </div>
                <div className="row ifta-section-row" style={{marginBottom:'8px'}}>
                  <div className="col-md-4">
                    {props.currentPatient.Organization.phn}
                  </div>
                </div>


                <div className="row ifta-section-row">
                  <div className="col-md-12 ifta-label">Current Role</div>
                </div>
                <div className="row ifta-section-row" style={{marginBottom:'8px'}}>
                  <div className="col-md-4">
                    {props.currentPatient.Agent.mrecRole}
                  </div>
                </div>
                <div className="row ifta-section-row">
                  <div className="col-md-12 ifta-label">Agent Status</div>
                </div>
                <div className="row ifta-section-row" style={{marginBottom:'8px'}}>
                  <div className="col-md-4">
                     
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-3" style={{color:'red',textAlign:'center'}}></div>
                <div className="col-md-3">
                  <button type="button" className={'blue action-left'} style={{width: '100%'}}
                          onClick={() => props.navigateToUrl(OWNER_AGENT_LIST_PATH)}>
              <span>
                <i className={"fa fa-arrow-left"}/>
              </span>
                    <span>RETURN</span>
                  </button>
                </div>
                <div className="col-md-3">
                  <button type="button" className="red" style={{width:'100%'}} data-dismiss="modal" aria-hidden="true"
                          onClick={() => props.handleAgentAccessChange(REJECTED_ROLE)}>REJECT</button>
                </div>
                <div className="col-md-3">
                  <button className="green action-right" style={{width:'100%'}} onClick={() => props.handleAgentAccessChange(APPROVED_ROLE)}>
                    <span>APPROVE</span>
                    <span className="glyphicon glyphicon-arrow-right"></span>
                  </button>
                </div>
              </div>
            </div>

        </div>

      </div>
    </div>
  );
}

GetMerchant.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetMerchant;
