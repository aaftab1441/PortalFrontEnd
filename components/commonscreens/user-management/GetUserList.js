import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm} from 'react-material-ui-form-validator';
import TextBox from '../../common/TextBox';
import SelectField from '../../common/SelectField';

import * as AppConstants from '/utilities/constants';
import * as StringUtils from '/utilities/string';
import DataTable from 'react-data-table-component';
import { Row, Col,Form} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import { withRouter} from "next/router";

//import Button from '@mui/material/Button';
// import styled from 'styled-components';

function GetUserList(props) {
  let userList = [];
  let count = 0;
  let startCount = 0;
  let title = '';
  console.log("Get Merchant List", props);
  title = 'User List';
 
  const viewUser = (theUser) => {
	props.registerFromLocation(AppConstants.USER_LIST_PATH);
	props.viewUser(theUser, props.user);
	props.router.push(AppConstants.MANAGE_USER_PATH);
	
  }

  const addUser = () => {
	props.registerFromLocation(AppConstants.USER_LIST_PATH);
	props.addUser(props.user);
	props.router.push(AppConstants.ADD_USER_PATH);
}

  if(props && props.userList && props.userList.length > 0){
	  userList = props.userList;
  }
  const columns = [
	{ selector: row => row.Email_ID, name: "Email" , sortable: true},
	{ selector: row => row.First_Name, name: "First Name", sortable: true },
	{ selector: row => row.Last_Name, name: "Last Name", sortable: true },
	//{ selector: row => row.iso, name: "ISO Code", sortable: true },
	{ selector: row => row.User_Level_Code, name: "User Access", sortable: true },
	
	];
	
  console.log("Merchant List", props);
  let appMessages = StringUtils.getDisplayMessages(props.messages);
  return (
		  <div>
		  <div className="row">
			<div className="col-lg-12">
			  <div className="card">
				<div className="card-body">
				  <div className="row">
					<div className="col-12" id="search"> 
					<ValidatorForm className="pt-3" onSubmit={(data) => props.getUsers(props.userSearchParams, props.user, props.lists)}>
							<Row>
									<Col>
										<div className={'pb-10'}>Email </div>
										<TextBox
											value={StringUtils.getValue(props.userSearchParams.emailId)}
											onChange={props.handleItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'emailId',
												id: 'emailId',
												placeholder: 'Email  ...',
												type: 'text',
												
											}}
										/>
					
									</Col>
									<Col>
										<div className={'pb-10'}>First Name </div>
										<TextBox
											value={StringUtils.getValue(props.userSearchParams.firstName)}
											onChange={props.handleItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'firstName',
												id: 'firstName',
												placeholder: 'First Name  ...',
												type: 'text',
												
											}}
										/>
					
									</Col>
									<Col>
										<div className={'pb-10'}>Last Name </div>
										<TextBox
											value={StringUtils.getValue(props.userSearchParams.lastName)}
											onChange={props.handleItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'lastName',
												id: 'lastName',
												placeholder: 'Last Name  ...',
												type: 'text',
												
											}}
										/>
					
									</Col>
									<Col>
										<div className={'pb-10'}>City </div>
										<TextBox
											value={StringUtils.getValue(props.userSearchParams.city)}
											onChange={props.handleItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'city',
												id: 'city',
												placeholder: 'City  ...',
												type: 'text',
												
											}}
										/>
					
									</Col>
									<Col className="text-bottom" ><br />
						  					<Button variant="contained" color="primary" size="small" type="submit"  className=""> <br /><i className="ti-search menu-icon"></i> </Button>
											<Button variant="contained"  color="primary" size="small" type="button"  className="ml-3" onClick={() => addUser()}> <br /><i className="ti-plus menu-icon"></i> </Button>
									</Col>
									 
								</Row>		  
						 
					  </ValidatorForm>
					 
					 
					  <DataTable title={title} onRowClicked={(data) => viewUser(data)} data={userList} columns={columns} pagination/>
					  
					</div>
					 
					
					
					 
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
  );
}

GetUserList.propTypes = {
  displayWarning: PropTypes.func,
};

export default withRouter(GetUserList);

