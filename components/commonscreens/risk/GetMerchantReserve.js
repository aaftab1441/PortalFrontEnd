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
 
import * as AppConstants from '/utilities/constants';
import * as StringUtils from '/utilities/string';
import MenuItem from '@mui/material/MenuItem';
import { Row, Col,Form} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import { withRouter} from "next/router";
import { TabPanel }  from '/components/common/TabPanel';
// import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTable from 'react-data-table-component';

class GetMerchantReserve  extends React.Component  {
	
	constructor(props){
		super(props);
		this.state = {value: 0}		
	}	
 
	submitForm(){

	}

	 render() {
		let appMessages = StringUtils.getDisplayMessages(this.props.messages); 
	  	console.log("Proops", this.props);
		let columns = [
			{ selector: row => row.Merchant_Number, name: "MID" , sortable: true },
			{ selector: row => row.mm_dba_name, name: "DBA", sortable: true},
			{ selector: row => row.mm_legal_name, name: "Legal Name", sortable: true},
			{ selector: row => row.Reserves, name: "Reserve", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Reserves) }},
			{ selector: row => row.Held, name: "Held", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Held) }},
			{ selector: row => row.Released, name: "Released", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Released) }},
			{ selector: row => row.Balance, name: "Balance", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Balance) }},
			{ selector: row => row.MRAB_Stamp_YMD, name: "Date", sortable: true, format: (row, index) => {return  StringUtils.formatShortDate(row.MRAB_Stamp_YMD) }},
			 
			];
			let allRows = [];
			if(this.props.data && this.props.data.length > 0){
				let tempRows = this.props.data;
				tempRows.reverse();
				for(let i = 0; i < tempRows.length; i++){
					allRows.push(tempRows[i]);
				}				
	
			}
			if(this.props.orgType == "MERCHANT" ){
				columns = [
					{ selector: row => row.Reserves, name: "Reserve", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Reserves) }},
					{ selector: row => row.Held, name: "Held", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Held) }},
					{ selector: row => row.Released, name: "Released", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Released) }},
					{ selector: row => row.Balance, name: "Balance", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Balance) }},
					{ selector: row => row.MRAB_Stamp_YMD, name: "Date", sortable: true, format: (row, index) => {return  StringUtils.formatShortDate(row.MRAB_Stamp_YMD) }},
					 
					];
			}
			let title = '', code = '';
			if(this.props.orgType == "DAS" || this.props.orgType == "EAGLE"){
				title = 'Eagle';
				code = this.props.org.ISO_CODE;
			}else if(this.props.orgType == "ISO"){
				title = this.props.org.ISO_NAME;
				code = this.props.org.ISO_CODE;
			}else if(this.props.orgType == "MERCHANT"){
				title = this.props.org.mm_dba_name;
				code = this.props.org.mm_cust_no;
			}
			let data = [];
			if(this.props.data && this.props.data.length > 0){
				data = this.props.data.filter(
				item => 
					(this.props.merchantReserveParams.mid.toLowerCase().length == 0 || (this.props.merchantReserveParams.mid.toLowerCase().length > 0 && item.hb_merch_no && item.hb_merch_no.toLowerCase().includes(this.props.merchantReserveParams.mid.toLowerCase()))) && 
					(this.props.merchantReserveParams.legalName.toLowerCase().length == 0 || (this.props.merchantReserveParams.legalName.toLowerCase().length > 0 && item.mm_legal_name && item.mm_legal_name.toLowerCase().includes(this.props.merchantReserveParams.legalName.toLowerCase()))) && 
					(this.props.merchantReserveParams.dbaName.toLowerCase().length == 0 || (this.props.merchantReserveParams.dbaName.toLowerCase().length > 0 && item.mm_dba_name && item.mm_dba_name.toLowerCase().includes(this.props.merchantReserveParams.dbaName.toLowerCase()))) 
				);
			}
			console.log("Title", title);
		return (
			<div>
		  <div className="row">
			<div className="col-lg-12">
			  <div className="card">
				<div className="card-body">
				  <div className="row">
					<div className="col-12" id="search">
						 
						<h4>Merchant Reserve: {title} ({code})</h4>
							<ValidatorForm className="pt-3" onSubmit={(data) => this.submitForm()}>
								{this.props.orgType != "MERCHANT" && <Row>
									<Col md={4}>
										<div className={'pb-10'}>MID </div>
										<TextBox
											value={StringUtils.getValue(this.props.merchantReserveParams.mid)}
											onChange={this.props.handleParamChange}
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
									<Col md={4}>
										<div className={'pb-10'}>Legal Name </div>
										<TextBox
											value={StringUtils.getValue(this.props.merchantReserveParams.legalName)}
											onChange={this.props.handleParamChange}
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
									<Col md={4}>
										<div className={'pb-10'}>DBA Name </div>
										<TextBox
											value={StringUtils.getValue(this.props.merchantReserveParams.dbaName)}
											onChange={this.props.handleParamChange}
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
								</Row>}
								</ValidatorForm>
							<DataTable title={""} data={data} columns={columns}  pagination/>
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

GetMerchantReserve.propTypes = {
  displayWarning: PropTypes.func,
};

export default withRouter(GetMerchantReserve);

