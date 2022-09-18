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


	
	 render() {
		console.log("User Detail Props", this.props);
	 
			
		let appMessages = StringUtils.getDisplayMessages(this.props.messages);


		let stateList  = [], isoCodeList = [], salesRepList = [], salesOfficeList = [], subIsoList= [];
		if(this.props.lists &&  this.props.lists.STATES){
			stateList = this.props.lists.STATES.map(function (anItem, index) {
				return <MenuItem value={anItem.code} key={index + 1}>{anItem.value}</MenuItem>;
			});
			 
			
		}
		let merchantList = [];
		if(this.props.dashboardData && this.props.dashboardData.MerchantList && this.props.dashboardData.MerchantList.length > 0){
			merchantList = this.props.dashboardData.MerchantList.filter(
			item => 
				(this.props.merchantSearchParams.mid.toLowerCase().length == 0 || (this.props.merchantSearchParams.mid.toLowerCase().length > 0 && item.mm_cust_no && item.mm_cust_no.toLowerCase().includes(this.props.merchantSearchParams.mid.toLowerCase()))) && 
				(this.props.merchantSearchParams.legalName.toLowerCase().length == 0 || (this.props.merchantSearchParams.legalName.toLowerCase().length > 0 && item.mm_legal_name && item.mm_legal_name.toLowerCase().includes(this.props.merchantSearchParams.legalName.toLowerCase()))) && 
				(this.props.merchantSearchParams.dbaName.toLowerCase().length == 0 || (this.props.merchantSearchParams.dbaName.toLowerCase().length > 0 && item.mm_location_state && item.mm_location_state.toLowerCase().includes(this.props.merchantSearchParams.dbaName.toLowerCase()))) && 
				(this.props.merchantSearchParams.zip.toLowerCase().length == 0 || (this.props.merchantSearchParams.zip.toLowerCase().length > 0 && item.mm_location_zip && item.mm_location_zip.toLowerCase().includes(this.props.merchantSearchParams.zip.toLowerCase())) )
				
				 
			);
		}
			const columns = [
				{ selector: row => row.mm_cust_no, name: "MID" , sortable: true},
				{ selector: row => row.mm_legal_name, name: "Legal Name", sortable: true },
				{ selector: row => row.mm_dba_name, name: "DBA Name", sortable: true },
				{ selector: row => row.mm_mail_address, name: "Address", sortable: true },
				{ selector: row => row.mm_mail_city, name: "City", sortable: true },
				{ selector: row => row.mm_mail_state, name: "State", sortable: true },
				{ selector: row => row.mm_mail_zip, name: "Zip", sortable: true },
				];
			   
		console.log(reactReferer.referer());
		return (
			<Modal
				open={this.props.openMerchantSelectList}
				onClose={this.props.closeMerchantList}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
				<ValidatorForm className="pt-3" >
					<Row>
						<Col className={'text-left'}><h4>Click Merchant Account</h4></Col>
					</Row>
					<Row>

										<Col md={3}>
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
										<Col md={3}>
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
										<Col md={3}>
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
										<Col md={3}>
											<div className={'pb-10'}>Owner Last Name </div>
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
													placeholder: 'Zip   ...',
													type: 'text',
													
												}}
											/>
						
										</Col>
									
									</Row>

									<DataTable title={''} onRowClicked={(data) => this.props.selectMerchant(this.props.user, data)} data={merchantList} columns={columns} pagination/>
									<Row>
										<Col md="3"><Button variant="contained" color="primary" type="button" onClick={() => this.props.closeMerchantList()}  className="col-md-12">Close</Button></Col>
										<Col md="3"> &nbsp;</Col>
										<Col md="3"> &nbsp;</Col>
									</Row>
						</ValidatorForm>
					</Box>				 
			</Modal>
		);
	}
}

GetMerchantAccess.propTypes = {
  displayWarning: PropTypes.func,
};

export default withRouter(GetMerchantAccess);

