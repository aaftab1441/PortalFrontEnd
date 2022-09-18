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

class GetRiskHistory  extends React.Component  {
	
	constructor(props){
		super(props);
		this.state = {value: 0}		
	}	
 
	 render() {
		let appMessages = StringUtils.getDisplayMessages(this.props.messages); 
	  console.log("Proops", this.props);
		const riskColumns = [
			{ selector: row => row.Date, name: "MM/YY" , sortable: true, format: (row, index) => {return  StringUtils.formatYYMMDate(row.Date) }},
			{ selector: row => row.Sales, name: "Sales $$$", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Sales) }},
			{ selector: row => row.Transaction_Count, name: "Sales ###", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Transaction_Count) }},
			{ selector: row => row.Credit_Sales, name: "Credits $$$", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Credit_Sales) }},
			{ selector: row => row.Credit_Transaction_Count, name: "Credits ###", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Credit_Transaction_Count) }},
			{ selector: row => row.Credit_Sales, name: "Credits %%%", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Credit_Sales/row.Sales ) }},
			{ selector: row => row.ChargeBack_Amount, name: "Chargebacks $$$", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.ChargeBack_Amount) }},
			{ selector: row => row.ChargeBack_Count, name: "###", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.ChargeBack_Count) }},
			{ selector: row => row.ChargeBack_Count, name: "%%%", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.ChargeBack_Count/row.Transaction_Count) }},
			{ selector: row => row.ChargeBack_Count, name: "$%", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.ChargeBack_Amount/row.Sales) }},
			{ selector: row => row.Swipe_Count, name: "Swipe %", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Swipe_Count/row.Transaction_Count) }},
			{ selector: row => row.Manual_Count, name: "Manual %", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Manual_Count/row.Transaction_Count) }},
			 
			];
			let allRows = [];
			if(this.props.riskHistory && this.props.riskHistory.length > 0){
				let tempRows = this.props.riskHistory;
				tempRows.reverse();
				for(let i = 0; i < tempRows.length; i++){
					allRows.push(tempRows[i]);
				}				
	
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
				
			console.log("Title", title);
		return (
			<div>
		  <div className="row">
			<div className="col-lg-12">
			  <div className="card">
				<div className="card-body">
				  <div className="row">
					<div className="col-12" id="search">
						 
						<h4>13 Month History: {title} ({code})</h4>
						<TableContainer component={Paper}>
							<Table sx={{ }} size="small" aria-label="Risk">
								<TableHead>
									<TableRow>
										<TableCell>&nbsp;</TableCell>
										<TableCell align="center" colSpan={2}>Total Sales</TableCell>
										<TableCell align="center" colSpan={2}>Credits</TableCell>
										<TableCell align="center">&nbsp;</TableCell>
										<TableCell align="center" colSpan={2}>Chargebacks</TableCell>
										<TableCell align="right" >Count</TableCell>
										<TableCell align="right">Amount</TableCell>
										<TableCell align="right">Man</TableCell>
									</TableRow>

									<TableRow>
									<TableCell>MM/YY</TableCell>
									<TableCell align="right">$$$</TableCell>
									<TableCell align="right">###</TableCell>
									<TableCell align="right">$$$</TableCell>
									<TableCell align="right">###</TableCell>
									<TableCell align="right">%%%</TableCell>
									<TableCell align="right">$$$</TableCell>
									<TableCell align="right">###</TableCell>
									<TableCell align="right">%%%</TableCell>
									<TableCell align="right">%%%</TableCell>
									<TableCell align="right">%</TableCell>
									</TableRow>
								</TableHead>			  
								<TableBody>
									{allRows.map((row) => (
									<TableRow
										key={row.name}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
										{StringUtils.formatYYMMDate(row.Date)}
										</TableCell>
										<TableCell align="right">{StringUtils.formatWholeNumber(row.Sales)}</TableCell>
										<TableCell align="right">{StringUtils.formatWholeNumber(row.Transaction_Count)}</TableCell>
										<TableCell align="right">{StringUtils.formatWholeNumber(row.Credit_Sales)}</TableCell>
										<TableCell align="right">{StringUtils.formatWholeNumber(row.Credit_Transaction_Count)}</TableCell>
										<TableCell align="right">{StringUtils.formatNumber(row.Credit_Sales/row.Sales)}</TableCell>
										<TableCell align="right">{StringUtils.formatWholeNumber(row.ChargeBack_Amount) }</TableCell>
										<TableCell align="right">{StringUtils.formatWholeNumber(row.ChargeBack_Count) }</TableCell>
										<TableCell align="right">{StringUtils.formatNumber(row.ChargeBack_Count/row.Transaction_Count) }</TableCell>
										<TableCell align="right">{StringUtils.formatNumber(row.ChargeBack_Amount/row.Sales) }</TableCell>
										<TableCell align="right">{StringUtils.formatNumber(row.Manual_Count/row.Transaction_Count) }</TableCell>
									</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
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

GetRiskHistory.propTypes = {
  displayWarning: PropTypes.func,
};

export default withRouter(GetRiskHistory);

