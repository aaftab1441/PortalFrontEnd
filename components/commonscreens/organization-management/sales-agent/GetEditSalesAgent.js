/**
 *
 * GetMerchant Detail
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '/components/common/TextBox';
import ConfirmYesNo from '/components/common/ConfirmYesNo';
import SelectField from '/components/common/SelectField';

import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as UserActions from '/redux/actions/usermanagement/manageuser/action';
import * as AppConstants from '/utilities/constants';
import * as StringUtils from '/utilities/string';
import MenuItem from '@mui/material/MenuItem';
import DataTable from 'react-data-table-component';
import { Row, Col,Form} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import { withRouter} from "next/router";
import { TabPanel }  from '/components/common/TabPanel';
import { confirm } from "react-confirm-box";
import * as Actions from "/redux/actions/organization-management/sales-agent/action";
// import styled from 'styled-components';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class GetEditSalesAgent extends React.Component {

	

	constructor(props){
		super(props);
		 
	}	
	
	componentDidMount() {
		 
	}

	 

	async deleteItem(item){
		const options = {
			render: (message, onConfirm, onCancel) => {
			  return (
				<ConfirmYesNo message={message} onConfirm={onConfirm} onCancel={onCancel} />
			  );
			}
		  };
		const result = await confirm("Are you sure you want to delete this Sales Agent?", options);
		if (result) {
			
			this.props.deleteItem(item, this.props.user);
		  return;
		}
		 
	}

	addUser(){
		this.props.registerFromLocation(AppConstants.VIEW_SALES_OFFICE_PATH);
		this.props.addUser(this.props.user, this.props.lists, this.props.currentSalesAgent);
		this.props.router.push(AppConstants.ADD_USER_PATH);
	}
	

	viewUser (theUser) {
		this.props.registerFromLocation(AppConstants.VIEW_SALES_OFFICE_PATH);
		this.props.viewUser(theUser, this.props.user, this.props.lists);
		this.props.router.push(AppConstants.MANAGE_USER_PATH);		
	}

	render(){
		console.log("Get Edit ISO", this.props);
  		let appMessages = StringUtils.getDisplayMessages(this.props.messages);

		let stateList  = [], isoCodeList = [], statusList = [], subIsoList= [];
		const columns = [
			{ selector: row => row.Email_ID, name: "Email" , sortable: true},
			{ selector: row => row.First_Name, name: "First Name", sortable: true },
			{ selector: row => row.Last_Name, name: "Last Name", sortable: true },
			{ selector: row => row.City, name: "City", sortable: true },
			{ selector: row => row.User_Level_Code, name: "User Access", sortable: true },
			
			];

		if(this.props.lists &&  this.props.lists.STATUS_LIST){
			if(this.props.lists.STATUS_LIST){
					statusList = this.props.lists.STATUS_LIST.map(function (anItem, index) {
					return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
				});
			}
			if(this.props.lists.STATES){
				stateList = this.props.lists.STATES.map(function (anItem, index) {
					return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
				}); 
			} 
		} 
		
		let itemList = [];
		if(this.props.currentSalesAgent && this.props.currentSalesAgent.Users && this.props.currentSalesAgent.Users.length > 0){
			itemList = this.props.currentSalesAgent.Users.filter(
			item => 
				(this.props.userSearchParams.emailId.toLowerCase().length == 0 || (this.props.userSearchParams.emailId.toLowerCase().length > 0 && item.Email_ID && item.Email_ID.toLowerCase().includes(this.props.userSearchParams.emailId.toLowerCase()))) && 
				(this.props.userSearchParams.firstName.toLowerCase().length == 0 || (this.props.userSearchParams.firstName.toLowerCase().length > 0 && item.First_Name && item.First_Name.toLowerCase().includes(this.props.userSearchParams.firstName.toLowerCase()))) && 
				(this.props.userSearchParams.lastName.toLowerCase().length == 0 || (this.props.userSearchParams.lastName.toLowerCase().length > 0 && item.Last_Name && item.Last_Name.toLowerCase().includes(this.props.userSearchParams.lastName.toLowerCase()))) && 
				(this.props.userSearchParams.city.toLowerCase().length == 0 || (this.props.userSearchParams.city.toLowerCase().length > 0 && item.City && item.City.toLowerCase().includes(this.props.userSearchParams.city.toLowerCase())) )
				
				 
			);

		}
		let userLevelCode = this.props.user.UserDetail ?   this.props.user.UserDetail.User_Level_Code : "";
		let restrictedInfoDisabled = this.props.user.UserDetail &&  this.props.user.UserDetail.User_Level_Code == "SALES-AGENT" ;
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
									<h4>Sales Agent </h4>
								</div>
								<div className="col-lg-6 col-md-6 text-right">					
									
								</div>
							</div>
							<ValidatorForm onSubmit={(data) => this.props.processForm(this.props.currentSalesAgent, this.props.user, this.props.lists)}>
								
								{appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
								<Paper>
								<Tabs value={this.props.panel} onChange={this.props.handlePanelChange} aria-label="simple tabs example" indicatorColor="primary" variant="scrollable" scrollButtons="auto"
									textColor="primary">
									<Tab label="Sales Agent Information" {...a11yProps(0)} disableRipple/>
									<Tab label="Users " {...a11yProps(0)} disableRipple/>
									
								</Tabs>
								<TabPanel value={this.props.panel} index={0}>
									
									<div className="row">
										<div className="col-md-12">
											<h4 className="card-description">General Information</h4>
										</div>
										<div className="col-xl-4 col-lg-4 col-md-4">
											<b>First Name:</b><br />
											<TextBox
												value={StringUtils.getValue(this.props.currentSalesAgent.Detail.First_Name)} onChange={this.props.handleEditItemChange} validators={[]}
												className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
												inputProps={{ name: 'First_Name', id: 'First_Name', placeholder: 'First Name  ...', type: 'text', }}
											/> 
										</div>
										<div className="col-xl-4 col-lg-4 col-md-4">
											<b>Middle Name:</b><br /> 
											<TextBox
												value={StringUtils.getValue(this.props.currentSalesAgent.Detail.Middle_Name)} onChange={this.props.handleEditItemChange} validators={[]}
												className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
												inputProps={{ name: 'Middle_Name', id: 'Middle_Name', placeholder: 'Middle Name  ...', type: 'text', }}
											/>
											
										</div>

										<div className="col-xl-4 col-lg-4 col-md-4">
											<b>Last Name:</b><br /> 
											<TextBox
												value={StringUtils.getValue(this.props.currentSalesAgent.Detail.Last_Name)} onChange={this.props.handleEditItemChange} validators={[]}
												className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
												inputProps={{ name: 'Last_Name', id: 'Last_Name', placeholder: 'Last Name  ...', type: 'text', }}
											/>
											
										</div>

										<div className="col-xl-4 col-lg-4 col-md-4">
											<b>Active Status:</b><br /> 
											<SelectField
												value={StringUtils.getValue(this.props.currentSalesAgent.Detail.Active_status_code)} onChange={this.props.handleEditItemChange} validators={['required']}											
												variant="outlined" size="small" errorMessages={['Required']} disabled={restrictedInfoDisabled} 
												inputProps={{ name: 'Active_status_code', id: 'Active_status_code', }}
											>
												{statusList}
											</SelectField>
												
											
										</div>
										<div className="col-xl-4 col-lg-4 col-md-4">
											<b>Code:</b><br />
											<TextBox
												value={StringUtils.getValue(this.props.currentSalesAgent.Detail.Code)} onChange={this.props.handleEditItemChange} validators={[]}
												className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"  disabled={restrictedInfoDisabled} 
												inputProps={{ name: 'Code', id: 'Code', placeholder: 'Sales Agent Code  ...', type: 'text', }}
											/>
											
										</div>
										
										
										
										<div className="col-md-12 pt-3">
											<h4 className="card-description">Mailing Address</h4>
										</div>
										<div className="col-xl-3 col-lg-3 col-md-4">
											<b>Street Address:</b><br /> 
											<TextBox
												value={StringUtils.getValue(this.props.currentSalesAgent.Detail.Street_Address)} onChange={this.props.handleEditItemChange} validators={[]}
												className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
												inputProps={{ name: 'Street_Address', id: 'Street_Address', placeholder: 'Street Address  ...', type: 'text', }}
											/>
											
										</div>
										<div className="col-xl-3 col-lg-3 col-md-4">
											<b>City:</b><br />
											<TextBox
													value={StringUtils.getValue(this.props.currentSalesAgent.Detail.City)} onChange={this.props.handleEditItemChange} validators={[]}
													className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
													inputProps={{ name: 'City', id: 'City', placeholder: 'City  ...', type: 'text', }}
												/>
											
										</div>
										<div className="col-xl-3 col-lg-3 col-md-4">
											<b>State:</b><br /> 	
											<SelectField
												value={StringUtils.getValue(this.props.currentSalesAgent.Detail.State)} onChange={this.props.handleEditItemChange} validators={['required']}											
												variant="outlined" size="small" errorMessages={['Required']}
												inputProps={{ name: 'State', id: 'State', }}
											>
												{stateList}
											</SelectField>
															
										</div>
										<div className="col-xl-3 col-lg-3 col-md-4">
											<b>Zip:</b><br />
											<TextBox
												value={StringUtils.getValue(this.props.currentSalesAgent.Detail.ZIP)} onChange={this.props.handleEditItemChange} validators={[]}
												className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
												inputProps={{ name: 'ZIP', id: 'ZIP', placeholder: 'Zip  ...', type: 'ZIP', }}
											/>							
										</div>
										
										
										<div className="col-md-12 pt-3">
											<h4 className="card-description">Contact </h4>
										</div>
										
										<div className="col-xl-3 col-lg-3 col-md-4">
											<b>Email:</b><br />
												<TextBox
													value={StringUtils.getValue(this.props.currentSalesAgent.Detail.Email_ID)} onChange={this.props.handleEditItemChange} validators={[]}
													className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
													inputProps={{ name: 'Email_ID', id: 'Email_ID', placeholder: 'Email   ...', type: 'text', }}
												/>							
										</div>
										<div className="col-xl-3 col-lg-3 col-md-4">
											<b>Main Phone:</b><br />
												<TextBox
													value={StringUtils.getValue(this.props.currentSalesAgent.Detail.Main_Phone)} onChange={this.props.handleEditItemChange} validators={[]}
													className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
													inputProps={{ name: 'Main_Phone', id: 'Main_Phone', placeholder: 'Main Phone   ...', type: 'text', }}
												/>							
										</div>
										<div className="col-xl-3 col-lg-3 col-md-4">
											<b>Cell Phone:</b><br />
												<TextBox
													value={StringUtils.getValue(this.props.currentSalesAgent.Detail.Cell_Phone)} onChange={this.props.handleEditItemChange} validators={[]}
													className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
													inputProps={{ name: 'Cell_Phone', id: 'Cell_Phone', placeholder: 'Cell Phone   ...', type: 'text',  }}
												/>							
										</div>
										

										<div className="col-md-12 pt-3">
											<h4 className="card-description">Update Information</h4>
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>Date Added:</b> {StringUtils.getValue(this.props.currentSalesAgent.Detail.DateTime_Added)}
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>Date Updated:</b> {StringUtils.getValue(this.props.currentSalesAgent.Detail.DateTime_Updated)}
										</div>
										
										 		
										</div>
										
									 
									<Row><Col md={'12'}>&nbsp;</Col></Row>  
									<Row>
										<Col md="3"><Button variant="contained"   type="button" onClick={() => this.props.router.back()}  className="col-md-12">Back</Button></Col>
										<Col md="3">{this.props.currentSalesAgent.Detail && this.props.currentSalesAgent.Detail.AutoIdent && userLevelCode != "SALES-AGENT" && 
											<Button variant="contained" color="error" type="button" onClick={() => this.deleteItem(this.props.currentSalesAgent)}  className="col-md-12">Delete</Button>}</Col>
										<Col md="3">&nbsp;</Col>
										<Col md="3">
											<Button variant="contained" color="success" type="submit"   className="col-md-12"> Save </Button>
										</Col>
									</Row>
				
									 
				
				
								</TabPanel>
								<TabPanel value={this.props.panel} index={1}>
									 
									<div className="row">
										<div className="col-12" id="search"> 
											
											<Row>
												<Col md={3}>
													<div className={'pb-10'}>Email </div>
													<TextBox
														value={StringUtils.getValue(this.props.userSearchParams.emailId)} onChange={this.props.handleUserSearchChange} validators={[]}
														className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
														inputProps={{ name: 'emailId', id: 'emailId', placeholder: 'Email  ...', type: 'text', }}
													/>
								
												</Col>
												<Col md={3}>
													<div className={'pb-10'}>First Name </div>
													<TextBox
														value={StringUtils.getValue(this.props.userSearchParams.firstName)} onChange={this.props.handleUserSearchChange} validators={[]}
														className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
														inputProps={{ name: 'firstName', id: 'firstName', placeholder: 'First Name  ...', type: 'text', }}
													/>
								
												</Col>
												<Col md={3}>
													<div className={'pb-10'}>Last Name </div>
													<TextBox
														value={StringUtils.getValue(this.props.userSearchParams.lastName)} onChange={this.props.handleUserSearchChange} validators={[]}
														className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
														inputProps={{ name: 'lastName', id: 'lastName', placeholder: 'Last Name  ...', type: 'text', }}
													/>
								
												</Col>
												<Col md={2}>
													<div className={'pb-10'}>City </div>
													<TextBox
														value={StringUtils.getValue(this.props.userSearchParams.city)} onChange={this.props.handleUserSearchChange} validators={[]}
														className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
														inputProps={{ name: 'city', id: 'city', placeholder: 'City  ...', type: 'text', }}
													/>
								
												</Col>
												<Col md={1} className="text-bottom text-right">
													<div className={'pb-10'}>&nbsp; </div>
													<Button variant="contained" color="primary"  type="button"  onClick={() => this.addUser()} className=""> <i className="ti-plus menu-icon"></i> <br /></Button>
												</Col>
											</Row> 
										
											<DataTable title={"Users"} onRowClicked={(data) => this.viewUser(data)} data={itemList} columns={columns} pagination/>
										
										</div>
										
										
										
										
									</div>
											 
								</TabPanel>
												
												
							</Paper>
						</ValidatorForm>
		
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

GetEditSalesAgent.propTypes = {
  displayWarning: PropTypes.func,
}; 

const  mapStateToProps = (state) =>{ 
	return { 
		panel: state.salesAgentOrganizationManagement.panel,
	}
};
  
function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handlePanelChange: (evt, newPanel) => dispatch(Actions.handlePanelChange(newPanel)),
	};
}
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetEditSalesAgent));
   