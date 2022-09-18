/**
 *
 * GetMerchant Detail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../../common/TextBox';
import SelectField from '../../common/SelectField';
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

class GetMyInformation  extends React.Component  {
	
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
		  this.props.deleteItem(item, this.props.user, this.props.currentIso, this.props.lists, this.props.fromLocation);
		  return;
		}
		 
	}

	
	 render() {
		console.log("User Detail Props", this.props);
		let appMessages = StringUtils.getDisplayMessages(this.props.messages);


		let stateList  = [], isoCodeList = [], salesRepList = [], salesOfficeList = [], subIsoList= [];
		if(this.props.lists &&  this.props.lists.STATES){
			stateList = this.props.lists.STATES.map(function (anItem, index) {
				return <MenuItem value={anItem.code} key={index + 1}>{anItem.value}</MenuItem>;
			});
			isoCodeList = this.props.lists.ISO_LIST.map(function (anItem, index) {
				return <MenuItem value={anItem.ISO_CODE} key={index + 1}>{anItem.ISO_NAME}</MenuItem>;
			});
			isoCodeList.unshift(<MenuItem value={''} key={0}>{''}</MenuItem>);
			subIsoList = this.props.lists.SUB_ISO_LIST.map(function (anItem, index) {
				return <MenuItem value={anItem.Code} key={index + 1}>{anItem.Name}</MenuItem>;
			});
			subIsoList.unshift(<MenuItem value={''} key={0}>{''}</MenuItem>);
			salesOfficeList = this.props.lists.SALES_OFFICE_LIST.map(function (anItem, index) {
				return <MenuItem value={anItem.Code} key={index + 1}>{anItem.Name}</MenuItem>;
			});
			salesOfficeList.unshift(<MenuItem value={''} key={0}>{''}</MenuItem>);
			salesRepList = this.props.lists.SALES_AGENT_LIST.map(function (anItem, index) {
				return <MenuItem value={anItem.Code} key={index + 1}>{anItem.Name}</MenuItem>;
			});
			salesRepList.unshift(<MenuItem value={''} key={0}>{''}</MenuItem>);
			
		}
 
		const userLevelCodeList = this.props.lists.USER_LEVEL_CODE.map(function (anItem, index) {
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
									<h4 className="card-description">User Access</h4>
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
								

								<div className="col-md-12 pt-3">
									<h4 className="card-description">Permissions Information</h4>
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>ISO:</b>&nbsp; {StringUtils.getOrganizationName(this.props.currentUser.Permissions.iso_id, this.props.lists.ISO_ID_LIST)}										 	
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Sub ISO:</b>&nbsp; {StringUtils.getOrganizationName(this.props.currentUser.Permissions.sub_iso_id, this.props.lists.SUB_ISO_ID_LIST)}										 
								</div>
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Sales Office:</b>&nbsp; {StringUtils.getOrganizationName(this.props.currentUser.Permissions.sales_office_id, this.props.lists.SALES_AGENT_ID_LIST)}	
								</div>		
								<div className="col-xl-3 col-lg-4 col-md-4">
									<b>Sales Rep:</b>&nbsp; {StringUtils.getOrganizationName(this.props.currentUser.Permissions.sales_agent_id, this.props.lists.SALES_AGENT_ID_LIST)}	
								</div>
								
								
													
							</div> 
							<Row><Col md={'12'}>&nbsp;</Col></Row>  
							<Row>
								<Col md="3"><Button variant="contained" color="primary" type="submit"   className="col-md-12"> Save </Button></Col>
								<Col md="9">&nbsp;</Col>
							</Row>
			
			
			
			
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

GetMyInformation.propTypes = {
  displayWarning: PropTypes.func,
};

export default withRouter(GetMyInformation);

