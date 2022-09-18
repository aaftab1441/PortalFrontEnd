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
import {  getDisplayMessages, getMessage, getValue, uuidv4, formatDate } from '../../utilities/string';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import styled from 'styled-components';

function GetSubPatientList(props) {

  let userList = [];
  let count = 0;
  let startCount = 0;
  
  //console.log("Patient List", props);
  let appMessages = getDisplayMessages(props.messages);
  return (
		  <div className="app-main__outer">
			<div className="app-main__inner">
				<div className="app-page-title">
					<div className="page-title-wrapper">
						<div className="page-title-heading">
							<div className="page-title-icon">
								<i className="pe-7s-car icon-gradient bg-mean-fruit">
								</i>
							</div>
							<div>Other Device Users</div>
						</div> 						 
					</div>
				</div>
				<ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
	                <li className="nav-item">
	                    <button type='button' role="tab" className="nav-link active" id="tab-0" onClick={() => props.addSubPatient()} style={{border: '0px'}}>
	                        <span>Add Device User</span>
	                    </button>
	                </li>
	            </ul>
	            
				<Paper>
			      <Table>
			        <TableHead>
			          <TableRow>
			            <TableCell>First Name</TableCell>
			            <TableCell>Middle Name</TableCell>
			            <TableCell>Last Name</TableCell>
			            <TableCell>Date of Birth</TableCell>
			            <TableCell align="right">Action</TableCell>
			          </TableRow>
			        </TableHead>
			        <TableBody>
			          {props.patients.map((row, index) => (
			            <TableRow key={index}>
			              <TableCell component="th" scope="row">{row.first_name}</TableCell>
			              <TableCell>{row.middle_name}</TableCell>
			              <TableCell>{row.last_name}</TableCell>
			              <TableCell>{formatDate(row.date_of_birth)}</TableCell>
			              <TableCell align="right" onClick={() => props.editPatient(row)}>Edit</TableCell>
			            </TableRow>
			          ))}
			        </TableBody>
			      </Table>
			    </Paper>
				 
			</div>
			<div className="app-wrapper-footer">
				<div className="app-footer">
					<div className="app-footer__inner">
						 
						 
					</div>
				</div>
			</div>
		</div>
  );
}

GetSubPatientList.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetSubPatientList;
