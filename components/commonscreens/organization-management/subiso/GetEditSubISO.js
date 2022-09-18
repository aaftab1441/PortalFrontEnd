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
import * as Actions from "/redux/actions/organization-management/subiso/action";
// import styled from 'styled-components';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class GetEditSubISO extends React.Component {

	

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
		const result = await confirm("Are you sure you want to delete this Sub ISO?", options);
		if (result) {
			
			this.props.deleteItem(item, this.props.user);
		  return;
		}
		 
	}
	addItem(itemType) {
		if (itemType == AppConstants.ITEM_TYPES.SALES_OFFICE) {
			this.props.addSalesOffice(this.props.user, this.props.currentSubIso.Detail.Code, 'SUB-ISO', this.props.currentSubIso.Detail.AutoIdent);
			this.props.router.push(AppConstants.VIEW_SALES_OFFICE_PATH);
		} else if (itemType == AppConstants.ITEM_TYPES.SALES_AGENT) {
			this.props.addSalesAgent(this.props.user, this.props.currentSubIso.Detail.Code, 'SUB-ISO', this.props.currentSubIso.Detail.AutoIdent);
			this.props.router.push(AppConstants.VIEW_SALES_AGENT_PATH);
		}
	}
	
	viewItem(item, itemType) {
		if (itemType == AppConstants.ITEM_TYPES.SALES_OFFICE) {
			this.props.editSalesOffice(this.props.user, item, this.props.currentSubIso.Detail.Code, 'SUB-ISO');
			this.props.router.push(AppConstants.VIEW_SALES_OFFICE_PATH);
		} else if (itemType == AppConstants.ITEM_TYPES.SALES_AGENT) {
			this.props.editSalesAgent(this.props.user, item, this.props.currentSubIso.Detail.Code, 'SUB-ISO');
			this.props.router.push(AppConstants.VIEW_SALES_AGENT_PATH);
		}
	}

	addUser(){
		this.props.registerFromLocation(AppConstants.VIEW_SUB_ISOS_PATH);
		this.props.addUser(this.props.user, this.props.lists, this.props.currentSubIso);
		this.props.router.push(AppConstants.ADD_USER_PATH);
	}
	

	viewUser (theUser) {
		this.props.registerFromLocation(AppConstants.VIEW_SUB_ISOS_PATH);
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
			
		const salesOfficeColumns = [
			{ selector: row => row.Code, name: "Code", sortable: true },
			{ selector: row => row.Name, name: "Name", sortable: true },
			{ selector: row => row.Street_Address, name: "Street Address", sortable: true },
			{ selector: row => row.City, name: "City", sortable: true },
			{ selector: row => row.State, name: "State", sortable: true },
			{ selector: row => row.Active_status_code, name: "Status", sortable: true },
			
		];
		const salesAgentColumns = [
			{ selector: row => row.Code, name: "Code", sortable: true },
			{ selector: row => row.Email_ID, name: "Email", sortable: true },
			{ selector: row => row.First_Name, name: "First Name", sortable: true },
			{ selector: row => row.Last_Name, name: "Last Name", sortable: true },
			{ selector: row => row.City, name: "City", sortable: true },
			{ selector: row => row.Active_status_code, name: "Status", sortable: true },

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
		if(this.props.currentSubIso && this.props.currentSubIso.Users && this.props.currentSubIso.Users.length > 0){
			itemList = this.props.currentSubIso.Users.filter(
			item => 
				(this.props.userSearchParams.emailId.toLowerCase().length == 0 || (this.props.userSearchParams.emailId.toLowerCase().length > 0 && item.Email_ID && item.Email_ID.toLowerCase().includes(this.props.userSearchParams.emailId.toLowerCase()))) && 
				(this.props.userSearchParams.firstName.toLowerCase().length == 0 || (this.props.userSearchParams.firstName.toLowerCase().length > 0 && item.First_Name && item.First_Name.toLowerCase().includes(this.props.userSearchParams.firstName.toLowerCase()))) && 
				(this.props.userSearchParams.lastName.toLowerCase().length == 0 || (this.props.userSearchParams.lastName.toLowerCase().length > 0 && item.Last_Name && item.Last_Name.toLowerCase().includes(this.props.userSearchParams.lastName.toLowerCase()))) && 
				(this.props.userSearchParams.city.toLowerCase().length == 0 || (this.props.userSearchParams.city.toLowerCase().length > 0 && item.City && item.City.toLowerCase().includes(this.props.userSearchParams.city.toLowerCase())) )
				
				 
			);

		}
		let salesOffices = [];
		let salesAgents = [];
		if (this.props.currentSubIso && this.props.currentSubIso.SalesOffices && this.props.currentSubIso.SalesOffices.length > 0) {
			salesOffices = this.props.currentSubIso.SalesOffices.filter(
				item =>
					(this.props.salesOfficeParams.name.toLowerCase().length == 0 || (this.props.salesOfficeParams.name.toLowerCase().length > 0 && item.Name && item.Name.toLowerCase().includes(this.props.salesOfficeParams.name.toLowerCase()))) &&
					(this.props.salesOfficeParams.streetAddress.toLowerCase().length == 0 || (this.props.salesOfficeParams.streetAddress.toLowerCase().length > 0 && item.Street_Address && item.Street_Address.toLowerCase().includes(this.props.salesOfficeParams.streetAddress.toLowerCase()))) &&
					(this.props.salesOfficeParams.city.toLowerCase().length == 0 || (this.props.salesOfficeParams.city.toLowerCase().length > 0 && item.Last_Name && item.City.toLowerCase().includes(this.props.salesOfficeParams.city.toLowerCase()))) &&
					(this.props.salesOfficeParams.state.toLowerCase().length == 0 || (this.props.salesOfficeParams.state.toLowerCase().length > 0 && item.State && item.State.toLowerCase().includes(this.props.salesOfficeParams.state.toLowerCase())))
			);
		}

	 
		if (this.props.currentSubIso && this.props.currentSubIso.SalesAgents && this.props.currentSubIso.SalesAgents.length > 0) {
			salesAgents = this.props.currentSubIso.SalesAgents.filter(
				item =>
					(this.props.salesAgentParams.emailId.toLowerCase().length == 0 || (this.props.salesAgentParams.emailId.toLowerCase().length > 0 && item.Email_ID && item.Email_ID.toLowerCase().includes(this.props.salesAgentParams.emailId.toLowerCase()))) &&
					(this.props.salesAgentParams.firstName.toLowerCase().length == 0 || (this.props.salesAgentParams.firstName.toLowerCase().length > 0 && item.First_Name && item.First_Name.toLowerCase().includes(this.props.salesAgentParams.firstName.toLowerCase()))) &&
					(this.props.salesAgentParams.lastName.toLowerCase().length == 0 || (this.props.salesAgentParams.lastName.toLowerCase().length > 0 && item.Last_Name && item.Last_Name.toLowerCase().includes(this.props.salesAgentParams.lastName.toLowerCase()))) &&
					(this.props.salesAgentParams.city.toLowerCase().length == 0 || (this.props.salesAgentParams.city.toLowerCase().length > 0 && item.City && item.City.toLowerCase().includes(this.props.salesAgentParams.city.toLowerCase())))
	
	
			);
	
		}
		let userLevelCode = this.props.user.UserDetail ?   this.props.user.UserDetail.User_Level_Code : "";
		let restrictedInfoDisabled = this.props.user.UserDetail &&  this.props.user.UserDetail.User_Level_Code == "SUB-ISO" ;
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
									<h4>SUB ISO: {StringUtils.getValue(this.props.currentSubIso.Detail.Name)} ({StringUtils.getValue(this.props.currentSubIso.Detail.Code)}) </h4>
								</div>
								<div className="col-lg-6 col-md-6 text-right">					
									
								</div>
							</div>
							
								
								{appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
								<Paper>
								<Tabs value={this.props.panel} onChange={this.props.handlePanelChange} aria-label="simple tabs example" indicatorColor="primary" variant="scrollable" scrollButtons="auto"
									textColor="primary">
									<Tab label="SUB ISO Information" {...a11yProps(0)} disableRipple/>
									<Tab label="Users " {...a11yProps(0)} disableRipple/>
									<Tab label="Sales Office " {...a11yProps(3)} disableRipple />
									<Tab label="Sales Agents " {...a11yProps(4)} disableRipple />
									
								</Tabs>
								<TabPanel value={this.props.panel} index={0}>
									<ValidatorForm onSubmit={(data) => this.props.processForm(this.props.currentSubIso, this.props.user, this.props.lists)}>
										<div className="row">
											<div className="col-md-12">
												<h4 className="card-description">General Information</h4>
											</div>
											<div className="col-xl-4 col-lg-4 col-md-4">
												<b>Name:</b><br />
												<TextBox
													value={StringUtils.getValue(this.props.currentSubIso.Detail.Name)}
													onChange={this.props.handleEditItemChange}
													validators={[]}
													className={'col-md-12'}
													m={20}
													errorMessages={["REQUIRED"]}
													variant={'outlined'} size="small"
													inputProps={{
														name: 'Name',
														id: 'Name',
														placeholder: ' Name  ...',
														type: 'text',
														
													}}
												/> 
											</div>
											<div className="col-xl-4 col-lg-4 col-md-4">
												<b>Active Status:</b><br /> 
													<SelectField
														value={StringUtils.getValue(this.props.currentSubIso.Detail.Active_status_code)}
														onChange={this.props.handleEditItemChange}
														validators={['required']}											
														variant="outlined" size="small"
														errorMessages={['Required']} disabled={restrictedInfoDisabled} 
														inputProps={{
														name: 'Active_status_code',
														id: 'Active_status_code',
														}}
													>
														{statusList}
													</SelectField>
													
												
											</div>
											<div className="col-xl-4 col-lg-4 col-md-4">
												<b>Code:</b><br />
													<TextBox
														value={StringUtils.getValue(this.props.currentSubIso.Detail.Code)}
														onChange={this.props.handleEditItemChange}
														validators={['required', 'matchRegexp:^[0-9]{4}$']}
														className={'col-md-12'}
														m={20} disabled={restrictedInfoDisabled} 
														errorMessages={["REQUIRED", "MUST BE 4 DIGITS"]}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'Code',
															id: 'Code',
															placeholder: 'Sub ISO Code  ...',
															type: 'text',
														}}
													/>
												
											</div>
											
											
											
											<div className="col-md-12 pt-3">
												<h4 className="card-description">Mailing Address</h4>
											</div>
											<div className="col-xl-3 col-lg-3 col-md-4">
												<b>Street Address:</b><br /> 
													<TextBox
														value={StringUtils.getValue(this.props.currentSubIso.Detail.Street_Address)}
														onChange={this.props.handleEditItemChange}
														validators={[]}
														className={'col-md-12'}
														m={20}
														errorMessages={["REQUIRED"]}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'Street_Address',
															id: 'Street_Address',
															placeholder: 'Street Address  ...',
															type: 'text',
															
														}}
													/>
												
											</div>
											<div className="col-xl-3 col-lg-3 col-md-4">
												<b>City:</b><br />
													<TextBox
															value={StringUtils.getValue(this.props.currentSubIso.Detail.City)}
															onChange={this.props.handleEditItemChange}
															validators={[]}
															className={'col-md-12'}
															m={20}
															errorMessages={["REQUIRED"]}
															variant={'outlined'} size="small"
															inputProps={{
																name: 'City',
																id: 'City',
																placeholder: 'City  ...',
																type: 'text',
																
															}}
														/>
												
											</div>
											<div className="col-xl-3 col-lg-3 col-md-4">
												<b>State:</b><br /> 	
													<SelectField
														value={StringUtils.getValue(this.props.currentSubIso.Detail.State)}
														onChange={this.props.handleEditItemChange}
														validators={['required']}											
														variant="outlined" size="small"
														errorMessages={['Required']}
														inputProps={{
														name: 'State',
														id: 'State',
														}}
													>
														{stateList}
													</SelectField>
																
											</div>
											<div className="col-xl-3 col-lg-3 col-md-4">
												<b>Zip:</b><br /><TextBox
														value={StringUtils.getValue(this.props.currentSubIso.Detail.ZIP)}
														onChange={this.props.handleEditItemChange}
														validators={[]}
														className={'col-md-12'}
														m={20}
														errorMessages={["REQUIRED"]}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'ZIP',
															id: 'ZIP',
															placeholder: 'Zip  ...',
															type: 'ZIP',
															
														}}
													/>							
											</div>
											
											
											<div className="col-md-12 pt-3">
												<h4 className="card-description">Contact </h4>
											</div>
											<div className="col-xl-3 col-lg-3 col-md-4">
												<b>First Name </b><br /> 
												<TextBox
														value={StringUtils.getValue(this.props.currentSubIso.Detail.Contact_First_Name)}
														onChange={this.props.handleEditItemChange}
														validators={[]}
														className={'col-md-12'}
														m={20}
														errorMessages={["REQUIRED"]}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'Contact_First_Name',
															id: 'Contact_First_Name',
															placeholder: 'First Name  ...',
															type: 'text', 
															
														}}
													/>					
											</div>
											<div className="col-xl-3 col-lg-3 col-md-4">
												<b>Last Name:</b><br />
													<TextBox
														value={StringUtils.getValue(this.props.currentSubIso.Detail.Contact_Last_Name)}
														onChange={this.props.handleEditItemChange}
														validators={[]}
														className={'col-md-12'}
														m={20}
														errorMessages={["REQUIRED"]}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'Contact_Last_Name',
															id: 'Contact_Last_Name',
															placeholder: 'Last Name  ...',
															type: 'text', 
															
														}}
													/>							
											</div>
											<div className="col-xl-3 col-lg-3 col-md-4">
												<b>Email:</b><br />
													<TextBox
														value={StringUtils.getValue(this.props.currentSubIso.Detail.Contact_Email_ID)}
														onChange={this.props.handleEditItemChange}
														validators={[]}
														className={'col-md-12'}
														m={20}
														errorMessages={["REQUIRED"]}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'Contact_Email_ID',
															id: 'Contact_Email_ID',
															placeholder: 'Email   ...',
															type: 'text', 
															
														}}
													/>							
											</div>
											<div className="col-xl-3 col-lg-3 col-md-4">
												<b>Main Phone:</b><br />
													<TextBox
														value={StringUtils.getValue(this.props.currentSubIso.Detail.Contact_Main_Phone)}
														onChange={this.props.handleEditItemChange}
														validators={[]}
														className={'col-md-12'}
														m={20}
														errorMessages={["REQUIRED"]}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'Contact_Main_Phone',
															id: 'Contact_Main_Phone',
															placeholder: 'Main Phone   ...',
															type: 'text', 
															
														}}
													/>							
											</div>
											<div className="col-xl-3 col-lg-3 col-md-4">
												<b>Cell Phone:</b><br />
													<TextBox
														value={StringUtils.getValue(this.props.currentSubIso.Detail.Contact_Cell_Phone)}
														onChange={this.props.handleEditItemChange}
														validators={[]}
														className={'col-md-12'}
														m={20}
														errorMessages={["REQUIRED"]}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'Contact_Cell_Phone',
															id: 'Contact_Cell_Phone',
															placeholder: 'Cell Phone   ...',
															type: 'text', 
															
														}}
													/>							
											</div>
											

											<div className="col-md-12 pt-3">
												<h4 className="card-description">Update Information</h4>
											</div>
											<div className="col-xl-3 col-lg-4 col-md-4">
												<b>Date Added:</b> {StringUtils.getValue(this.props.currentSubIso.Detail.DateTime_Added)}
											</div>
											<div className="col-xl-3 col-lg-4 col-md-4">
												<b>Date Updated:</b> {StringUtils.getValue(this.props.currentSubIso.Detail.DateTime_Updated)}
											</div>
											
													
											</div>
											
										
										<Row><Col md={'12'}>&nbsp;</Col></Row>  
										<Row>
											<Col md="3"><Button variant="contained" type="button" onClick={() => this.props.router.back()}  className="col-md-12">Back</Button></Col>
											<Col md="3">{this.props.currentSubIso.Detail && this.props.currentSubIso.Detail.AutoIdent && userLevelCode != "SUB-ISO" && 
												<Button variant="contained" color="error" type="button" onClick={() => this.deleteItem(this.props.currentSubIso)}  className="col-md-12">Delete</Button>}
											</Col>
											<Col md="3">&nbsp;</Col>
											<Col md="3">
												<Button variant="contained" color="success" type="submit"   className="col-md-12"> Save </Button>
											</Col>
										</Row>
				
									</ValidatorForm>
		
				
				
								</TabPanel>
								<TabPanel value={this.props.panel} index={1}>
									<ValidatorForm className="pt-3" onSubmit={(data) => this.doSearch()}>
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
															value={StringUtils.getValue(this.props.userSearchParams.city)} onChange={this.props.handleUserSearchChange} validators={[]} className={'col-md-12'}
															m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
															inputProps={{ name: 'city', id: 'city', placeholder: 'City  ...', type: 'text', }}
														/>

													</Col>
													<Col md={1} className="text-bottom text-right" >
														<div className={'pb-10'}>&nbsp; </div>
														<Button variant="contained" color="primary" size="small" type="button" onClick={() => this.addUser()} className=""> <i className="ti-plus menu-icon"></i> <br /></Button>
													</Col>

												</Row> 
												<DataTable title={"Users"} onRowClicked={(data) => this.viewUser(data)} data={itemList} columns={columns} pagination/> 
											</div> 
										</div>
									</ValidatorForm>	
								</TabPanel>
								<TabPanel value={this.props.panel} index={2}>
									<div className="row">
										<div className="col-12" id="search">
										<ValidatorForm className="pt-3" onSubmit={(data) => this.doSearch()}>
												<Row>
													<Col md={3}>
														<div className={'pb-10'}>Name </div>
														<TextBox
															value={StringUtils.getValue(this.props.salesOfficeParams.name)} onChange={this.props.handleSalesOfficeSearchChange} validators={[]} 
															className={'col-md-12'} m={20} errorMessages={[]} variant={'outlined'} size="small"
															inputProps={{ name: 'name', id: 'name', placeholder: 'Name  ...', type: 'text', }}
														/>

													</Col>
													<Col md={3}>
														<div className={'pb-10'}>Street Address</div>
														<TextBox
															value={StringUtils.getValue(this.props.salesOfficeParams.streetAddress)} onChange={this.props.handleSalesOfficeSearchChange} validators={[]} 
															className={'col-md-12'} m={20} errorMessages={[]} variant={'outlined'} size="small"
															inputProps={{ name: 'streetAddress', id: 'streetAddress', placeholder: 'Street Address   ...', type: 'text', }}
														/>

													</Col>
													<Col md={2}>
														<div className={'pb-10'}>City  </div>
														<TextBox
															value={StringUtils.getValue(this.props.salesOfficeParams.city)} onChange={this.props.handleSalesOfficeSearchChange} validators={[]} 
															className={'col-md-12'} m={20} errorMessages={[]} variant={'outlined'} size="small"
															inputProps={{ name: 'city', id: 'city', placeholder: 'City  ...', type: 'text', }}
														/>

													</Col>
													<Col md={3}>
														<div className={'pb-10'}>State </div>
														<SelectField
															value={StringUtils.getValue(this.props.salesOfficeParams.state)} onChange={this.props.handleSalesOfficeSearchChange} validators={[]}
															variant="outlined" size="small" errorMessages={[]}
															inputProps={{ name: 'state', id: 'state', }}
														>
															{stateList}
														</SelectField>

													</Col>
													<Col md={1} className="text-bottom text-right">
														<div className={'pb-10'}>&nbsp; </div>
														<Button variant="contained" color="primary" size="small" type="button" onClick={() => this.addItem(AppConstants.ITEM_TYPES.SALES_OFFICE)} className=""> <i className="ti-plus menu-icon"></i> <br /></Button>
													</Col>


												</Row>

											</ValidatorForm>
											<DataTable onRowClicked={(data) => this.viewItem(data, AppConstants.ITEM_TYPES.SALES_OFFICE)} data={salesOffices} columns={salesOfficeColumns} pagination />
										</div>
									</div>
								</TabPanel>
								<TabPanel value={this.props.panel} index={3}><div className="row">
									<div className="col-12" id="search">
										<ValidatorForm className="pt-3" onSubmit={(data) => this.doSearch()}>
											<Row>
												<Col md={3}>
													<div className={'pb-10'}>Email </div>
													<TextBox
														value={StringUtils.getValue(this.props.salesAgentParams.emailId)} onChange={this.props.handleSalesAgentSearchChange} validators={[]}
														className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
														inputProps={{ name: 'emailId', id: 'emailId', placeholder: 'Email  ...', type: 'text', }}
													/>

												</Col>
												<Col md={3}>
													<div className={'pb-10'}>First Name </div>
													<TextBox
														value={StringUtils.getValue(this.props.salesAgentParams.firstName)} onChange={this.props.handleSalesAgentSearchChange} validators={[]}
														className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
														inputProps={{ name: 'firstName', id: 'firstName', placeholder: 'First Name  ...', type: 'text', }}
													/>

												</Col>
												<Col md={3}>
													<div className={'pb-10'}>Last Name </div>
													<TextBox
														value={StringUtils.getValue(this.props.salesAgentParams.lastName)} onChange={this.props.handleSalesAgentSearchChange} validators={[]} 
														className={'col-md-12'} m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
														inputProps={{ name: 'lastName', id: 'lastName', placeholder: 'Last Name  ...', type: 'text', }}
													/>

												</Col>
												<Col md={2}>
													<div className={'pb-10'}>City </div>
													<TextBox
														value={StringUtils.getValue(this.props.salesAgentParams.city)} onChange={this.props.handleSalesAgentSearchChange} validators={[]} className={'col-md-12'}
														m={20} errorMessages={["REQUIRED"]} variant={'outlined'} size="small"
														inputProps={{ name: 'city', id: 'city', placeholder: 'City  ...', type: 'text', }}
													/>

												</Col>
												<Col md={1} className="text-bottom text-right" >
													<div className={'pb-10'}>&nbsp; </div>
													<Button variant="contained" color="primary" size="small" type="button" onClick={() => this.addItem(AppConstants.ITEM_TYPES.SALES_AGENT)} className=""> <i className="ti-plus menu-icon"></i> <br /></Button>
												</Col>
											</Row>
										</ValidatorForm>


										<DataTable onRowClicked={(data) => this.viewItem(data, AppConstants.ITEM_TYPES.SALES_AGENT)} data={salesAgents} columns={salesAgentColumns} pagination />
											
									</div>
								</div>
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

GetEditSubISO.propTypes = {
  displayWarning: PropTypes.func,
};


 
  const  mapStateToProps = (state) =>{ 
	  return { 
		panel: state.subIsoOrganizationManagement.panel,
	}
  };
  
  function mapDispatchToProps(dispatch) {
	return {
	  dispatch,
	  handlePanelChange: (evt, newPanel) => dispatch(Actions.handlePanelChange(newPanel)),
	};
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetEditSubISO));
   