/**
 *
 * GetIsoListDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../../common/TextBox';
import SelectField from '../../common/SelectField';
import * as StringUtils  from '../../../utilities/string';
import DataTable from 'react-data-table-component';
// import styled from 'styled-components';


function GetIsoListDashboard(props) {
 console.log("Admin", props);
  let appMessages = StringUtils.getDisplayMessages(props.messages);
  const merchantCountColumns = [
	{ selector: row => row.ISO_NAME, name: "ISO" , sortable: true},
	{ selector: row => row.ISO_CODE, name: "ISO CODE", sortable: true },
	{ selector: row => row.Merchant_Count, name: "Merchant Count", sortable: true },
	];

const chargeBackColumns = [
	{ selector: row => row.ISO_NAME, name: "ISO" , sortable: true},
	{ selector: row => row.Charge_Back_Count, name: "Charge Back Count", sortable: true },
	];
const transactionColumns = [
	{ selector: row => row.ISO_NAME, name: "ISO" , sortable: true},
	{ selector: row => row.Transaction_Amount, name: "Dollar Volume", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(parseFloat(row.Transaction_Amount)) }},
	{ selector: row => row.Previous_Transaction_Amount, name: "Prior Year Dollar Volume", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(parseFloat(row.Previous_Transaction_Amount)) }},
	
	];
	
    const revenueShareColumns = [
		{ selector: row => row.ISO_NAME, name: "ISO Name" , sortable: true},
		{ selector: row => row.ISO_CODE, name: "ISO Code", sortable: true},
		{ selector: row => row.Total_Assoc_Cost, name: "Total Assoc. Cost", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Assoc_Cost) }},
		{ selector: row => row.Total_Sched_A_Fees, name: "Total Schedule A Fees", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Sched_A_Fees) }},
		{ selector: row => row.Total_Income, name: "Total Income", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Income) }},
		{ selector: row => row.Net_Income, name: "Net Income", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Net_Income) }},
		{ selector: row => row.Revenue_Share, name: "Revenue Share", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Revenue_Share) }},
		{ selector: row => row.DAS_Revenue_Share, name: "DAS Revenue Share", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.DAS_Revenue_Share) }},
		{ selector: row => row.Total_Expense, name: "Total Expenses", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Expense) }},
		{ selector: row => row.Total_Sales_Volume, name: "Total Sales Volume", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Sales_Volume) }},
		{ selector: row => row.Total_Return_Amt, name: "Total Return Amount", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Return_Amt) }},
	   
		];
  return (
	<div>   
		<div className="row">
			<div className="col-12 col-xl-5 mb-4 mb-xl-0 grid-margin">
				<h4 className="font-weight-bold">ISO List Dashboard</h4>
			</div>
		</div>
		 
		
		<div className="row">
			<div className="col-xl-12 grid-margin stretch-card">
				<div className="card">
				<div className="card-body">
					<p className="card-title">Sales Current &amp;  Prior YTD
					</p>
					<p className="text-muted font-weight-light">The total transaction amounts of the current YTD prior YTD.</p>
						<div className="row">
							<div className="col-md-12">
								<DataTable title={"Current & Prior YTD"} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewISODetail(data)} data={props.isoListDashboardData.SalesData} columns={transactionColumns} pagination/>
							</div>
						</div>
					</div>
				</div>
			</div>
			 
		</div>
		
		
	</div>
  );
}

GetIsoListDashboard.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetIsoListDashboard;
