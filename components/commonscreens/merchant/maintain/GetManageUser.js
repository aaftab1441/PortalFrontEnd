/**
 *
 * GetMerchant Detail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '/components/common/TextBox';
import SelectField from '/components/common/SelectField';
import ConfirmYesNo from '/components/common/ConfirmYesNo';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
 
import * as AppConstants from '/utilities/constants';
import * as StringUtils from '/utilities/string';
import MenuItem from '@mui/material/MenuItem';
import DataTable from 'react-data-table-component';
import { Row, Col,Form} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import GetMerchantAccess from "./GetMerchantAccess";
import { withRouter} from "next/router";
import { TabPanel }  from '/components/common/TabPanel';
// import styled from 'styled-components';
import { confirm } from "react-confirm-box";
import reactReferer from 'react-referer';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class GetManageUser  extends React.Component  {
	
	constructor(props){
		super(props);
		this.state = {value: 0}
		this.handleChange = this.handleChange.bind(this)
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
		const result = await confirm("Are you sure you want to delete this user?", options);
		if (result) {
		  this.props.deleteItem(item, this.props.user, this.props.currentMerchant, this.props.lists, AppConstants.MERCHANT_MAINTAIN_DETAIL_PATH);
		  return;
		}
	}

	getPageDefaults (){
		let pageInfo = {};
		pageInfo['Page'] = this.props.pageInfo.Page;
		pageInfo['PageSize'] = this.props.pageInfo.PageSize;
		pageInfo['SortDirection'] = this.props.pageInfo.SortDirection;
		pageInfo['SortField'] = this.props.pageInfo.SortField;
		return pageInfo;
	}

	changePage(page){
		console.log("Change Page to", page);
		let pageInfo = this.getPageDefaults();
		pageInfo['Page'] = page ;
		this.props.changePage(this.props.merchantSearchParams, this.props.user, pageInfo);
	}

	handleSort (tableName, column, sortDirection)  {
		let pageInfo = this.getPageDefaults(tableName);
		pageInfo['SortField'] = column.sortField;
		pageInfo['SortDirection'] = sortDirection;
		this.props.changePage(this.props.merchantSearchParams, this.props.user, pageInfo);
	}

	changeRowsPerPage ( rowsPerPage, currentPage) {
		let pageInfo = this.getPageDefaults();
		pageInfo['PageSize'] = rowsPerPage;
		pageInfo['Page'] = 1;
		this.props.changePage(this.props.merchantSearchParams, this.props.user, pageInfo);
	}

	doSearch(){
		let pageInfo = this.getPageDefaults();
		pageInfo['Page'] = 1;
		this.props.doSearch(this.props.merchantSearchParams, this.props.user, pageInfo);
	}
 

	handleMerchantSort (column, sortDirection) {
		let params = getPageDefaults(tableName);
		params['SortField'] = column.sortField;
		params['SortDirection'] = sortDirection;
		props.changePage(params, props.user, props.currentMerchant.Merchant);
	};

	handleItemChange(fieldName, fieldValue){
		this.props.handleItemChange(fieldName, fieldValue);
		this.doSearch();
	}

	 render() {
		console.log("User Detail Props", this.props);
		const columns = [
			{ selector: row => row.mm_cust_no, name: "MID" , sortable: true},
			{ selector: row => row.mm_legal_name, name: "Legal Name", sortable: true },
			{ selector: row => row.mm_dba_name, name: "DBA Name", sortable: true },
			{ selector: row => row.mm_location_address, name: "Address", sortable: true },
			{ selector: row => row.mm_location_city, name: "City", sortable: true },
			{ selector: row => row.mm_location_state, name: "State", sortable: true },
			{ selector: row => row.mm_location_zip, name: "Zip", sortable: true },
			{ selector: row => row.User_Level_Code, name: "Access", sortable: true },
			];
			
			const availableColumns = [
			{ selector: row => row.mm_cust_no, name: "MID" , sortable: true},
			{ selector: row => row.mm_legal_name, name: "Legal Name", sortable: true },
			{ selector: row => row.mm_dba_name, name: "DBA Name", sortable: true },
			{ selector: row => row.mm_location_address, name: "Address", sortable: true },
			{ selector: row => row.mm_location_city, name: "City", sortable: true },
			{ selector: row => row.mm_location_state, name: "State", sortable: true },
			{ selector: row => row.mm_location_zip, name: "Zip", sortable: true },
			];
			
		let appMessages = StringUtils.getDisplayMessages(this.props.messages);

		let merchantList = [];
		if(this.props.merchants && this.props.merchants.length > 0){
			merchantList = this.props.merchants.filter(
			item => 
				(this.props.merchantSearchParams.mid.toLowerCase().length == 0 || (this.props.merchantSearchParams.mid.toLowerCase().length > 0 && item.mm_cust_no && item.mm_cust_no.toLowerCase().includes(this.props.merchantSearchParams.mid.toLowerCase()))) && 
				(this.props.merchantSearchParams.legalName.toLowerCase().length == 0 || (this.props.merchantSearchParams.legalName.toLowerCase().length > 0 && item.mm_legal_name && item.mm_legal_name.toLowerCase().includes(this.props.merchantSearchParams.legalName.toLowerCase()))) && 
				(this.props.merchantSearchParams.dbaName.toLowerCase().length == 0 || (this.props.merchantSearchParams.dbaName.toLowerCase().length > 0 && item.mm_location_state && item.mm_location_state.toLowerCase().includes(this.props.merchantSearchParams.dbaName.toLowerCase()))) && 
				(this.props.merchantSearchParams.zip.toLowerCase().length == 0 || (this.props.merchantSearchParams.zip.toLowerCase().length > 0 && item.mm_location_zip && item.mm_location_zip.toLowerCase().includes(this.props.merchantSearchParams.zip.toLowerCase())) )
			);
		}

		let stateList  = [], isoCodeList = [], salesRepList = [], salesOfficeList = [], subIsoList= [];
		if(this.props.lists &&  this.props.lists.STATES){
			stateList = this.props.lists.STATES.map(function (anItem, index) {
				return <MenuItem value={anItem.code} key={index + 1}>{anItem.value}</MenuItem>;
			});
			 
			
		}
 
		const userLevelCodeList = this.props.lists.MERCHANT_ACCESS_LEVELS.map(function (anItem, index) {
			return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
		});
		
	 
	
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
			if(!this.props.currentMerchant.Merchant.password && !value){
				return true;
			}else if (value !== this.props.currentMerchant.Merchant.password) {
				return false;
			}
			return true;
		});
		console.log(reactReferer.referer());
		return (
				<div>
					{this.props.openUserAccess && <GetMerchantAccess {...this.props} />}
				<div className="row">
				<div className="col-lg-12">
					<div className="card">
					<div className="card-body">
						<div className="row">
						<div className="col-12" id="search">
							<div className="row">
								<div className="col-lg-6 col-md-6">
									<h4>User Detail</h4>
								</div>
								<div className="col-lg-6 col-md-6 text-right">					
									
								</div>
							</div>
						<ValidatorForm onSubmit={(data) => this.props.processForm(this.props.currentUser, this.props.user, this.props.lists)}>
							
							{appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
							<Paper>
							<Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="primary" variant="scrollable" scrollButtons="auto"
								textColor="primary">
								<Tab label="User Information" {...a11yProps(0)} disableRipple/>
								<Tab label="Connected Accounts" {...a11yProps(1)} disableRipple/>
								
							</Tabs>
							<TabPanel value={this.state.value} index={0}>
							
							<div className="row">
								<div className="col-md-12">
									<h4 className="card-description">General Information</h4>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4">
									<b>First Name:</b><br />
									<TextBox
													value={StringUtils.getValue(this.props.currentUser.UserDetails.First_Name)}
													onChange={this.props.handleItemChange}
													validators={[]}
													className={'col-md-12'}
													m={20}
													errorMessages={["REQUIRED"]}
													variant={'outlined'} size="small"
													inputProps={{
														name: 'First_Name',
														id: 'First_Name',
														placeholder: 'First Name  ...',
														type: 'text',
														
													}}
												/> 
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4">
									<b>Last Name:</b><br /> 
										<TextBox
											value={StringUtils.getValue(this.props.currentUser.UserDetails.Last_Name)}
											onChange={this.props.handleItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'Last_Name',
												id: 'Last_Name',
												placeholder: 'Last Name  ...',
												type: 'text',
												
											}}
										/>
									
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4">
									<b>Email ID:</b><br />
										<TextBox
												value={StringUtils.getValue(this.props.currentUser.UserDetails.Email_ID)}
												onChange={this.props.handleItemChange}
												validators={[]}
												className={'col-md-12'}
												m={20}
												errorMessages={["REQUIRED"]}
												variant={'outlined'} size="small"
												inputProps={{
													name: 'Email_ID',
													id: 'Email_ID',
													placeholder: 'Email  ...',
													type: 'text',
													
												}}
											/>
									
								</div>
								
								
								
								<div className="col-md-12 pt-3">
									<h4 className="card-description">Mailing Address</h4>
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Address 1:</b><br /> 	<TextBox
												value={StringUtils.getValue(this.props.currentUser.UserDetails.Address)}
												onChange={this.props.handleItemChange}
												validators={[]}
												className={'col-md-12'}
												m={20}
												errorMessages={["REQUIRED"]}
												variant={'outlined'} size="small"
												inputProps={{
													name: 'Address',
													id: 'Address',
													placeholder: 'Address  ...',
													type: 'text',
													
												}}
											/>						
								</div>
								
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>City:</b><br /> <TextBox
												value={StringUtils.getValue(this.props.currentUser.UserDetails.City)}
												onChange={this.props.handleItemChange}
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
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>State:</b><br /> 	
										<SelectField
											value={StringUtils.getValue(this.props.currentUser.UserDetails.ST)}
											onChange={this.props.handleItemChange}
											validators={['required']}											
											variant="outlined" size="small"
											errorMessages={['Required']}
											inputProps={{
											name: 'ST',
											id: 'ST',
											}}
										>
											{stateList}
										</SelectField>
													
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Zip:</b><br /><TextBox
											value={StringUtils.getValue(this.props.currentUser.UserDetails.Zip)}
											onChange={this.props.handleItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'Zip',
												id: 'Zip',
												placeholder: 'Zip  ...',
												type: 'text',
												
											}}
										/>							
								</div>
								
								
								<div className="col-md-12 pt-3">
									<h4 className="card-description">Access</h4>
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Level {StringUtils.getObjectValue(this.props.currentUser.UserDetails.User_Level_Code, 'User_Level_Code', '' )}:</b><br /> 
										<SelectField
													value={StringUtils.getValue(this.props.currentUser.UserDetails.User_Level_Code)}
													onChange={this.props.handleItemChange}
													validators={['required']}											
													variant="outlined" size="small"
													errorMessages={['Required']}
													inputProps={{
													name: 'User_Level_Code',
													id: 'User_Level_Code',
													}}
												>
													{userLevelCodeList}
												</SelectField>					
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Password:</b><br />
										<TextBox
											value={StringUtils.getValue(this.props.currentUser.UserDetails.Passwd)}
											onChange={this.props.handleItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'Passwd',
												id: 'Passwd',
												placeholder: 'Password  ...',
												type: 'password',
												autoComplete : 'off'
												
											}}
										/>							
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Confirm Password:</b><br />
										<TextBox
											value={StringUtils.getValue(this.props.currentUser.UserDetails.ConfirmPasswd)}
											onChange={this.props.handleItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'ConfirmPasswd',
												id: 'ConfirmPasswd',
												placeholder: 'Confirm Password  ...',
												type: 'password',
												autoComplete : 'off'
												
											}}
										/>							
								</div> 
													
							</div> 
							<Row><Col md={'12'}>&nbsp;</Col></Row>  
							<Row>
									<Col md="3"><Button variant="contained" color="primary" type="button" onClick={() => this.props.router.back()}  className="col-md-12">Back</Button></Col>
									<Col md="3">{this.props.currentUser && this.props.currentUser.UserDetails && this.props.currentUser.UserDetails.AutoIdent && 
									<Button variant="contained" color="secondary" type="button" onClick={() => this.deleteItem(this.props.currentUser, this.props.user, this.props.currentIso, this.props.lists, this.props.router.query.referrer)}  className="col-md-12"> Delete </Button>
	 								}&nbsp;</Col>
									<Col md="3">
										<Button variant="contained" color="primary" type="submit"   className="col-md-12"> Save </Button>
									</Col>
								</Row>
			
			
			
			
							</TabPanel>
							<TabPanel value={this.state.value} index={1}>
								<DataTable title={"User's Merchants"}   data={this.props.currentUser.UserMerchants} onRowClicked={(data) => this.props.openUserMerchantAccess(data)} columns={columns} pagination/>
								<h4>Available Merchants</h4>
								<Row>
									<Col>
										<div className={'pb-10'}>Legal Name </div>
										<TextBox
											value={StringUtils.getValue(this.props.merchantSearchParams.legalName)}
											onChange={this.props.handleMerchantSearchItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'legalName',
												id: 'legalName',
												placeholder: 'Legal Name  ...',
												type: 'text',
												
											}}
										/>
					
									</Col>
									<Col>
										<div className={'pb-10'}>DBA Name </div>
										<TextBox
											value={StringUtils.getValue(this.props.merchantSearchParams.dbaName)}
											onChange={this.props.handleMerchantSearchItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'dbaName',
												id: 'dbaName',
												placeholder: 'DBA Name  ...',
												type: 'text',
												
											}}
										/>
					
									</Col>
									<Col>
										<div className={'pb-10'}>MID </div>
										<TextBox
											value={StringUtils.getValue(this.props.merchantSearchParams.mid)}
											onChange={this.props.handleMerchantSearchItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'mid',
												id: 'mid',
												placeholder: 'MID  ...',
												type: 'text',
												
											}}
										/>
					
									</Col>
									<Col>
										<div className={'pb-10'}>Zip </div>
										<TextBox
											value={StringUtils.getValue(this.props.merchantSearchParams.zip)}
											onChange={this.props.handleMerchantSearchItemChange}
											validators={[]}
											className={'col-md-12'}
											m={20}
											errorMessages={["REQUIRED"]}
											variant={'outlined'} size="small"
											inputProps={{
												name: 'zip',
												id: 'Zip',
												placeholder: 'Zip ...',
												type: 'text',
												
											}}
										/>
										
					
									</Col>
									<Col  className="text-bottom">
										<div className={'pb-10'}>&nbsp; </div>
										<Button variant="contained" color="primary"   type="button" onClick={() => this.doSearch()}  className=""> <i className="ti-search menu-icon"></i> <br /></Button>
									</Col>
								</Row>

							 
								
								<DataTable title={"Available Merchants"} onRowClicked={(data) => this.props.openUserMerchantAccess(data)}
									paginationTotalRows={this.props.count} data={this.props.merchantSearchData}
									paginationPerPage={this.props.pageInfo.PageSize} columns={columns} paginationServer={true}
									onChangePage={(page, totalRows) => this.changePage(page)}
									paginationRowsPerPageOptions={[10,30,50,100]}  
									onSort={(column, sortDirection) => this.handleSort(column, sortDirection)} sortServer
									onChangeRowsPerPage={(currentRowsPerPage, currentPage) => this.changeRowsPerPage(currentRowsPerPage, currentPage)} pagination/>	
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

GetManageUser.propTypes = {
  displayWarning: PropTypes.func,
};

export default withRouter(GetManageUser);

