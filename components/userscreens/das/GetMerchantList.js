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
import {  getDisplayMessages, getMessage, getValue  } from '../../utilities/string';
import {AGENT, REJECTED_AGENT} from "../../utilities/string";

// import styled from 'styled-components';

function GetMerchantList(props) {
  let userList = [];
  let count = 0;
  let startCount = 0;
  if(props.agents ){
    count = props.agents.length;
    if(count > 0){
      startCount = 1;
    }
    if(props.searchMsccOrg && props.searchMsccOrg.length > 0 ){
      userList = props.agents.map(function (anItem, index) {
        console.log(anItem);
        return <tr className="result_row"  key={{index}}>
          <td colSpan="5">
            <table style={{border:'none'}}  key={"agent_table_" + {index}}>
              <tbody key={"agent_table_body_" + {index}}>
              <tr>
                <td style={{width:'20%',textAlign:'left',paddingLeft:'0'}}>
                  <a onClick={() => props.navigateToUrl(OWNER_SINGLE_AGENT_PATH, {currentPatient: anItem})}>{anItem.Organization.legalName}</a>
                  &nbsp;
                </td>
                <td style={{width:'20%',textAlign:'left',paddingLeft:'0'}}>{anItem.Organization.addrL1}</td>
                <td style={{width:'20%',textAlign:'left',paddingLeft:'0'}}>{anItem.Organization.baseJuris}&nbsp;</td>
                <td style={{width:'15%',textAlign:'left',paddingLeft:'0'}}>{anItem.Organization.phn} {anItem.Organization.phnExt}</td>
                <td style={{width:'15%',textAlign:'left'}}>{anItem.Agent.mrecRole}&nbsp;</td>

              </tr>

              </tbody>
            </table>
          </td>
        </tr>;

      });
    }else {


      userList = props.agents.map(function (anItem, index) {
        let organization = anItem.Organization;
        organization.Relationship = anItem.Relationship;

        return <tr className="result_row"  key={{index}}>
          <td colSpan="6">
            <table style={{border:'none'}}  key={"agent_table_" + {index}}>
              <tbody key={"agent_table_body_" + {index}}>
              <tr>
                <td style={{width:'20%',textAlign:'left',paddingLeft:'0'}}>
                  <a onClick={() => props.navigateToUrl(OWNER_SINGLE_AGENT_PATH, {currentPatient: anItem, })}>{anItem.Organization.legalName}</a>
                  &nbsp;
                </td>
                <td style={{width:'20%',textAlign:'left',paddingLeft:'0'}}>{anItem.Organization.addrL1}</td>
                <td style={{width:'15%',textAlign:'left',paddingLeft:'0'}}>{anItem.Organization.baseJuris}&nbsp;</td>
                <td style={{width:'10%',textAlign:'left',paddingLeft:'0'}}>{anItem.Organization.phn} {anItem.Organization.phnExt}</td>
                <td style={{width:'15%',textAlign:'left'}}>{anItem.Agent.mrecRole}&nbsp;</td>
                <td style={{width:'15%',textAlign:'left'}}>{/.*APPROVED_AGENT.*/.test(anItem.Agent.mrecRole)? 'ACTIVE': 'INACTIVE'}&nbsp;</td>

              </tr>

              </tbody>
            </table>
          </td>
        </tr>;

      });
    }

  }
  console.log("Agent List", userList);
  let appMessages = getDisplayMessages(props.messages);
  return (
    <div className="content clearfix">
      <div className="content-outer">
        <div className="ifta-content-outer">
          <ValidatorForm onSubmit={(data) => props.GetMerchantList(data)}>
          <div className="content-inner">
            <div className="ifta-section clearfix">
              <h4 className="green" style={{marginBottom:'8px',paddingLeft:'8px'}}>
                Agents
              </h4>
              <div className="row ifta-section-row large">
                <div className="col-md-10 large">
                  <TextBox
                    value={getValue(props.searchMsccOrg)}
                    onChange={props.handleItemChange}
                    validators={[]}
                    
                    errorMessages={[]}
                    inputProps={{
                      name: 'searchMsccOrg',
                      id: 'searchMsccOrg',
                      type: 'text',
                      placeholder: 'Enter agent\'s full organization number',
                    }}
                  />

                </div>
                <div className={"col-md-2"}>
                  <button type="submit"  className={'green action-right'} style={{width: '100%'}}>
                    <span>FINISHED, GO!</span>
                    <span>
                        <i className={"fa fa-arrow-right"}/>
                      </span>
                  </button>
                </div>

              </div>

              <br style={{clear: 'both'}}/>
              <table style={{border:'none'}}>
                <tbody><tr bordercolor="#774700">
                  <td width="20%" style={{textAlign: 'right'}}>
                    <span className="form-label" style={{fontSize: '14px', fontWeight: 'bold', color: '#55606e'}}>
                      Viewing:&nbsp;</span>
                    <span style={{fontSize: '14px'}}>{startCount}-{count}</span></td>
                  <td width="20%" style={{textAlign: 'center'}}>
                    &nbsp;&nbsp;</td>
                </tr>
                </tbody></table>
            </div>
            <div id="searchErrorMessage" className="error">
            </div>
            {props.searchMsccOrg && props.searchMsccOrg.length > 0 &&
            <table className="ifta-table" style={{marginTop:'8px'}}>
              <thead>
              <tr>
                <th style={{width:'20%',textAlign:'left'}}>Name</th>
                <th style={{width:'20%',textAlign:'left'}}>Address</th>
                <th style={{width:'20%',textAlign:'left'}}>Email</th>
                <th style={{width:'15%',textAlign:'left'}}>Phone</th>
                <th style={{width:'15%',textAlign:'left'}}>Role</th>
              </tr>
              </thead>
              <tbody id="fbody">
              {userList}



              </tbody>
            </table>
            }
            {(!props.searchMsccOrg || props.searchMsccOrg.length == 0) &&
            <table className="ifta-table" style={{marginTop:'8px'}}>
              <thead>
              <tr>
                <th style={{width:'20%',textAlign:'left'}}>Name</th>
                <th style={{width:'20%',textAlign:'left'}}>Address</th>
                <th style={{width:'15%',textAlign:'left'}}>Email</th>
                <th style={{width:'10%',textAlign:'left'}}>Phone</th>
                <th style={{width:'15%',textAlign:'left'}}>Role</th>
                <th style={{width:'15%',textAlign:'left'}}>Relationship</th>
              </tr>
              </thead>
              <tbody id="fbody">
              {userList}



              </tbody>
            </table>
            }
          </div>
        </ValidatorForm>

        </div>

      </div>
    </div>
  );
}

GetMerchantList.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetMerchantList;
