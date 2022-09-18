/**
 *
 * GetMerchant Detail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '/components/common/TextBox';
import ConfirmYesNo from '/components/common/ConfirmYesNo';

import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography  from '@mui/material/Typography';

import { Row, Col } from 'react-bootstrap';
import * as AppConstants from '/utilities/constants';
import * as StringUtils from '/utilities/string';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import DataTable from 'react-data-table-component';
import { TabPanel }  from '/components/common/TabPanel';

import { Button } from '@mui/material';
import {  TextValidator } from 'react-material-ui-form-validator';
// import styled from 'styled-components';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#d3d3d3',
            fontSize: '15px',
            fontWeight: 'bold',
            paddingLeft: '5px', // override the cell padding for data cells
            paddingRight: '5px',
            paddingTop: '5px',
            paddingBottom: '5px',
            whiteSpace: 'wrap',
        },
    },
    headRow: {
        style: {
            minHeight: '31px', // override the row height
        },
    },
    rows: {
        style: {
            minHeight: '31px', // override the row height
        },
    },
    cells: {
        style: {
            paddingLeft: '5px', // override the cell padding for data cells
            paddingRight: '5px',
            paddingTop: '5px',
            paddingBottom: '5px',
        },
    },
}

class GetMerchantDetail extends React.Component {

	

	constructor(props){
		super(props);
		this.state = {value: 0}
		this.handleChange = this.handleChange.bind(this)
	}	
	
	componentDidMount() {
		 
	}

	
	handleChange(event, newValue) {
		this.setState({value: newValue})
	}

	async deleteItem(item){
		const options = {
			render: (message, onConfirm, onCancel) => {
			  return (
				<ConfirmYesNo message={message} onConfirm={onConfirm} onCancel={onCancel} />
			  );
			}
		  };
		const result = await confirm("Are you sure you want to delete this ISO?", options);
		if (result) {
			
			this.props.deleteItem(item, this.props.user);
		  return;
		}
		 
	}

	addUser(){
		this.props.addUser(this.props.user, this.props.lists, this.props.currentMerchant);
		this.props.router.push(AppConstants.MERCHANT_MAINTAIN_USER_ADD_PATH);
	}
	

	viewUser (theUser) {
		this.props.viewUser(theUser, this.props.user, this.props.lists);
		this.props.router.push(AppConstants.MERCHANT_MAINTAIN_USER_ADD_PATH);		
	}

	render(){
		console.log("Merchant Maintain Detail Props", this.props);
		
			
		let appMessages = StringUtils.getDisplayMessages(this.props.messages);


		let stateList  = [];
		if(this.props.lists &&  this.props.lists.STATES){
			stateList = this.props.lists.STATES.map(function (anItem, index) {
				return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
		});

		}
		let itemList = [];
		if(this.props.currentMerchant && this.props.currentMerchant.Users && this.props.currentMerchant.Users.length > 0){
			itemList = this.props.currentMerchant.Users.filter(
			item => 
				(this.props.userSearchParams.emailId.toLowerCase().length == 0 || (this.props.userSearchParams.emailId.toLowerCase().length > 0 && item.Email_ID && item.Email_ID.toLowerCase().includes(this.props.userSearchParams.emailId.toLowerCase()))) && 
				(this.props.userSearchParams.firstName.toLowerCase().length == 0 || (this.props.userSearchParams.firstName.toLowerCase().length > 0 && item.First_Name && item.First_Name.toLowerCase().includes(this.props.userSearchParams.firstName.toLowerCase()))) && 
				(this.props.userSearchParams.lastName.toLowerCase().length == 0 || (this.props.userSearchParams.lastName.toLowerCase().length > 0 && item.Last_Name && item.Last_Name.toLowerCase().includes(this.props.userSearchParams.lastName.toLowerCase()))) && 
				(this.props.userSearchParams.city.toLowerCase().length == 0 || (this.props.userSearchParams.city.toLowerCase().length > 0 && item.City && item.City.toLowerCase().includes(this.props.userSearchParams.city.toLowerCase())) )
			);
		}

		const columns = [
			{ selector: row => row.Email_ID, name: "Email" , sortable: true},
			{ selector: row => row.First_Name, name: "First Name", sortable: true },
			{ selector: row => row.Last_Name, name: "Last Name", sortable: true },
			{ selector: row => row.City, name: "City", sortable: true },
			{ selector: row => row.User_Level_Code, name: "User Access", sortable: true },			
		];
	
		return (
			<div>

			<div className="row">
			<div className="col-lg-12">
				<div className="card">
				<div className="card-body">
					<div className="row">
					<div className="col-12" id="search">
						<div className="row">
							<div className="col-lg-6 col-md-6">
								<h4>Maintain Merchant ({this.props.currentMerchant.Merchant.mm_legal_name})</h4>
							</div>
							<div className="col-lg-6 col-md-6 text-right">					
								<Button variant="contained" color="primary" onClick={() => this.props.router.back()}>Back</Button>
							</div>
						</div>
						
						{appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
						<Paper>
						<Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="primary" variant="scrollable" scrollButtons="auto" textColor="primary">
							<Tab label="Merchant Information" {...a11yProps(0)} disableRipple/>
							<Tab label="Users" {...a11yProps(1)} />
						</Tabs>
						<TabPanel value={this.state.value}  index={0}>
						<ValidatorForm onSubmit={(data) => this.props.processForm(data, this.props.user, this.props.lists)}>
							
							<div className="row">
								<div className="col-md-12">
									<h4 className="card-description">General Information</h4>
								</div>
								<div className="col-xl-5 col-lg-6 col-md-6">
									<b>Legal Name:</b><br /> {this.props.currentMerchant.Merchant.mm_legal_name}
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>MID:</b><br /> {this.props.currentMerchant.Merchant.mm_cust_no}
									
								</div>
								<div className="col-xl-2 col-lg-2 col-md-2">
									<b>ISO Code:</b><br /> {this.props.currentMerchant.Merchant.iso} 
									
								</div>
								<div className="col-xl-5 col-lg-6 col-md-6">
									<b>DBA Name:</b><br /> {this.props.currentMerchant.Merchant.mm_dba_name}
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Phone:</b><br /> {StringUtils.formatPhone(this.props.currentMerchant.Merchant.mm_business_phone)}
								</div>
								
								
								<div className="col-md-12 pt-3">
									<h4 className="card-description">Mailing Address</h4>
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Address 1:</b><br /> {this.props.currentMerchant.Merchant.mm_mail_address}							
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Address 2:</b><br /> {this.props.currentMerchant.Merchant.mm_mail_address_2}							
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>City:</b><br /> {this.props.currentMerchant.Merchant.mm_mail_city}							
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>State:</b><br /> {this.props.currentMerchant.Merchant.mm_mail_state}							
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Zip:</b><br /> {this.props.currentMerchant.Merchant.mm_mail_zip}							
								</div>
								
								
								<div className="col-md-12 pt-3">
									<h4 className="card-description">Billing Address</h4>
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Address 1:</b><br /> {this.props.currentMerchant.Merchant.mm_billing_address}							
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Address 2:</b><br /> {this.props.currentMerchant.Merchant.mm_billing_address_2}							
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>City:</b><br /> {this.props.currentMerchant.Merchant.mm_billing_city}							
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>State:</b><br /> {this.props.currentMerchant.Merchant.mm_billing_state}							
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Zip:</b><br /> {this.props.currentMerchant.Merchant.mm_billing_zip}							
								</div>
								
								
													
							</div>   
							
			
		
		
							</ValidatorForm>
	
						</TabPanel>
						<TabPanel value={this.state.value}  index={1}>
							<Row>
								<Col>
										
									<ValidatorForm className="pt-3" onSubmit={(data) => this.props.getUsers(this.props.userSearchParams, this.props.user, this.props.lists)}>
											<Row>
													<Col md={3}>
														<div className={'pb-10'}>Email </div>
														<TextBox
															value={StringUtils.getValue(this.props.userSearchParams.emailId)}
															onChange={this.props.handleUserSearchChange}
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
													<Col md={3}>
														<div className={'pb-10'}>First Name </div>
														<TextBox
															value={StringUtils.getValue(this.props.userSearchParams.firstName)}
															onChange={this.props.handleUserSearchChange}
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
													<Col md={3}>
														<div className={'pb-10'}>Last Name </div>
														<TextBox
															value={StringUtils.getValue(this.props.userSearchParams.lastName)}
															onChange={this.props.handleUserSearchChange}
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
													<Col md={2}>
														<div className={'pb-10'}>City </div>
														<TextBox
															value={StringUtils.getValue(this.props.userSearchParams.city)}
															onChange={this.props.handleUserSearchChange}
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
													<Col md={1} className="text-bottom text-right" >
													<div className={'pb-10'}>&nbsp; </div>
															<Button variant="contained"  color="primary"  title="Add User" type="button"  className="" onClick={() => this.addUser()}> <i className="ti-plus menu-icon"></i><br /> </Button>
													</Col>
												</Row>		  
										
									</ValidatorForm>
									
									
									<DataTable title={"Users"} onRowClicked={(data) => this.viewUser(data)} data={itemList} columns={columns} pagination/>
									
									</Col>
									
									
									
													
												
												
							</Row>
							<Row>
								
							</Row>
						</TabPanel>
						
											
											
										
					</Paper>
				
				</div>
						
						
						
						
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
		
	);
	}
}

GetMerchantDetail.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetMerchantDetail;

