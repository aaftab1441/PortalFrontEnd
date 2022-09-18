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
import Modal from '@mui/material/Modal';
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
import Box from '@mui/material/Box';
import reactReferer from 'react-referer';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '70%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };

class GetMerchantAccess  extends React.Component  {
	
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
		const result = await confirm("Are you sure you want to delete this user's access?", options);
		if (result) {
		  this.props.deleteAccess(item, this.props.user, this.props.currentMerchant, this.props.lists, AppConstants.MERCHANT_MAINTAIN_DETAIL_PATH);
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
			 
			
		}
 
		const userLevelCodeList = this.props.lists.MERCHANT_ACCESS_LEVELS.map(function (anItem, index) {
			return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
		});
		
	 
	 
		console.log(reactReferer.referer());
		return (
			<Modal
				open={this.props.openUserAccess}
				onClose={this.props.closeUserMerchantAccess}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Row>
						<div className="col-lg-12">
							
								<div className="row">
								<div className="col-12" id="search">
									<div className="row">
										<div className="col-lg-6 col-md-6">
											<h4>MERCHANT ACCESS INFORMATION</h4>
										</div>
										<div className="col-lg-6 col-md-6 text-right">					
											
										</div>
									</div>
								<ValidatorForm onSubmit={(data) => this.props.processForm(this.props.currentUser, this.props.user, this.props.lists)}>
									
									{appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
									<Paper>
									<Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="primary" variant="scrollable" scrollButtons="auto"
										textColor="primary">
										<Tab label="Merchant Information" {...a11yProps(0)} disableRipple/>
										
									</Tabs>
									<TabPanel value={this.state.value} index={0}>
									
									<div className="row">
										<div className="col-md-12">
											<h4 className="card-description">General Information</h4>
										</div>
										<div className="col-xl-5 col-lg-6 col-md-6">
											<b>Legal Name:</b><br /> {this.props.currentMerchant.mm_legal_name}
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>MID:</b><br /> {this.props.currentMerchant.mm_cust_no}
											
										</div>
										<div className="col-xl-2 col-lg-2 col-md-2">
											<b>ISO Code:</b><br /> {this.props.currentMerchant.iso} 
											
										</div>
										<div className="col-xl-5 col-lg-6 col-md-6">
											<b>DBA Name:</b><br /> {this.props.currentMerchant.mm_dba_name}
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>Phone:</b><br /> {StringUtils.formatPhone(this.props.currentMerchant.mm_business_phone)}
										</div>
										
										
										<div className="col-md-12 pt-3">
											<h4 className="card-description">Mailing Address</h4>
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>Address 1:</b><br /> {this.props.currentMerchant.mm_mail_address}							
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>Address 2:</b><br /> {this.props.currentMerchant.mm_mail_address_2}							
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>City:</b><br /> {this.props.currentMerchant.mm_mail_city}							
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>State:</b><br /> {this.props.currentMerchant.mm_mail_state}							
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>Zip:</b><br /> {this.props.currentMerchant.mm_mail_zip}							
										</div>
										
										
										<div className="col-md-12 pt-3">
											<h4 className="card-description">Billing Address</h4>
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>Address 1:</b><br /> {this.props.currentMerchant.mm_billing_address}							
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>Address 2:</b><br /> {this.props.currentMerchant.mm_billing_address_2}							
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>City:</b><br /> {this.props.currentMerchant.mm_billing_city}							
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>State:</b><br /> {this.props.currentMerchant.mm_billing_state}							
										</div>
										<div className="col-xl-3 col-lg-4 col-md-4">
											<b>Zip:</b><br /> {this.props.currentMerchant.mm_billing_zip}							
										</div>
										
										
															
									</div> 			
										
									<Row><Col md={'12'}>&nbsp;</Col></Row>  
									<Row>
										<Col md="3"><Button variant="contained" color="primary" type="button" onClick={() => this.props.closeUserMerchantAccess()}  className="col-md-12">Close</Button></Col>
										<Col md="3">{this.props.currentMerchant && this.props.currentMerchant.AutoIdent1 && 
										<Button variant="contained" color="secondary" type="button" onClick={() => this.deleteItem(this.props.currentUser, this.props.user, this.props.currentMerchant, this.props.lists)}  className="col-md-12"> Delete Access </Button>
										}
											{this.props.currentMerchant && !this.props.currentMerchant.AutoIdent1 && <Button variant="contained" color="primary" type="button"  onClick={() => this.props.enableAccess(this.props.currentUser, this.props.user, this.props.currentMerchant, this.props.lists)} className="col-md-12"> Enable Access </Button>}
											&nbsp;
										</Col>
										<Col md="3"> 
										&nbsp;
										
										</Col>
									</Row>
				
					
					
					
									</TabPanel>
											
													
								</Paper>
							</ValidatorForm>
				
							</div>
									
									
									
									
								</div>
							</div>
						</Row>
					</Box>				 
			</Modal>
		);
	}
}

GetMerchantAccess.propTypes = {
  displayWarning: PropTypes.func,
};

export default withRouter(GetMerchantAccess);

