/**
 *
 * GetIsoMerchantDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../../common/TextBox';
import SelectField from '../../common/SelectField';
import * as AppConstants from '../../../utilities/constants';
import {  getDisplayMessages, getMessage } from '../../../utilities/string';
import DataTable from 'react-data-table-component';
// import styled from 'styled-components';
import * as StringUtils from '../../../utilities/string';


function GetIsoMerchantDashboard(props) {
 console.log("Admin1", props);
  let appMessages = getDisplayMessages(props.messages);
  const merchantCountColumns = [
	{selector: row => row.mm_legal_name, name: "Legal Name" , sortable: true},
	{selector: row => row.mm_dba_name, name: "DBA Name" , sortable: true},
	{selector: row => row.mm_cust_no, name: "Merchant #", sortable: true },
	];

const chargeBackColumns = [
	{selector: row => row.mm_legal_name, name: "Merchant" , sortable: true},
	{selector: row => row.Charge_Back_Count, name: "Charge Back Count", sortable: true },
	];
const transactionColumns = [
	{selector: row => row.mm_legal_name, name: "Legal Name" , sortable: true},
	{selector: row => row.Transaction_Amount, name: "Transaction Amount", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Transaction_Amount) }},
	{selector: row => row.Previous_Transaction_Amount, name: "Previous Year Transaction Amount", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Previous_Transaction_Amount) }},
	
	];
	
    const revenueShareColumns = [
		{selector: row => row.mm_cust_no, name: "MID" , sortable: true},
		{selector: row => row.mm_dba_name, name: "DBA Name", sortable: true},
		{selector: row => row.Total_Assoc_Cost, name: "Total Assoc. Cost", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Assoc_Cost) }},
		{selector: row => row.Total_Sched_A_Fees, name: "Total Schedule A Fees", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Sched_A_Fees) }},
		{selector: row => row.Total_Income, name: "Total Income", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Income) }},
		{selector: row => row.Net_Income, name: "Net Income", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Net_Income) }},
		{selector: row => row.Revenue_Share, name: "Revenue Share", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Revenue_Share) }},
		{selector: row => row.DAS_Revenue_Share, name: "DAS Revenue Share", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.DAS_Revenue_Share) }},
		{selector: row => row.Total_Expense, name: "Total Expenses", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Expense) }},
		{selector: row => row.Total_Sales_Volume, name: "Total Sales Volume", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Sales_Volume) }},
		{selector: row => row.Total_Return_Amt, name: "Total Return Amount", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Total_Return_Amt) }},
	   
		];
  return (
	<div>   
		<div className="row">
			<div className="col-12 col-xl-5 mb-4 mb-xl-0 grid-margin">
				<h4 className="font-weight-bold">ISO Merchant Dashboard: {props.currentIso.ISO_NAME} </h4>
			</div>
		</div>
		 
		
		<div className="row">
			<div className="col-md-12 grid-margin stretch-card">
				<div className="card">
				<div className="card-body">
					<p className="card-title">Sales Current Year Prior 6 Months vs Previous Year 6 Months
					</p>
					<p className="text-muted font-weight-light">The total transaction amounts of the current year prior six months vs the previous year prior six months.</p>
						<div className="row">
							<div className="col-md-12">
								{props.isoMerchantDashboardData.SalesData && <DataTable title={"Current Year and Previous Year Prior Six Months"} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewMerchantDetail(data)} 
									data={props.isoMerchantDashboardData.SalesData} columns={transactionColumns} pagination/>}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-12 grid-margin stretch-card">
				<div className="card">
				<div className="card-body">
					<p className="card-title">Risk
					</p>
					<p className="text-muted font-weight-light">Risk</p>
					<div className="row">
						
					</div>
				</div>
				
				</div>
			</div>
		</div>
		<div className="row">
			 
			<div className="col-md-12 grid-margin stretch-card">
				<div className="card">
				<div className="card-body">
					<p className="card-title">Revenue Share
					</p>
					<p className="text-muted font-weight-light">Revenue Share</p>
					<div className="row">
						<div className="col-md-12">
						{props.isoMerchantDashboardData && props.isoMerchantDashboardData.RevenueShare && <DataTable title={"Revenue Share"} paginationComponentOptions={{ noRowsPerPage: true }}  data={props.isoMerchantDashboardData.RevenueShare} columns={revenueShareColumns} pagination/>}
						</div>
					</div>
				</div>
				
				</div>
			</div>
		</div>
		<div className="row">
		
			<div className="col-md-12 grid-margin stretch-card">
				<div className="card">
				<div className="card-body">
					<p className="card-title">Charge Backs For Current Year Prior 6 Months vs Previous Year Prior 6 Months
					</p>
					<p className="text-muted font-weight-light">The total charge counts of the current year prior six months vs the previous year prior six months.</p>
					<div className="row">
						<div className="col-md-6">
							<DataTable title={"Current Year Prior Six Months"} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewMerchantDetail(data)} data={props.isoMerchantDashboardData.CurrentYTDChargeBacks} columns={chargeBackColumns} pagination/>
						</div>
						<div className="col-md-6">
						{props.isoMerchantDashboardData && props.isoMerchantDashboardData.PreviousYTDChargeBacks && 
							<DataTable title={"Previous Year Prior Six Months"}  paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewMerchantDetail(data)} data={props.isoMerchantDashboardData.PreviousYTDChargeBacks} columns={chargeBackColumns} pagination/>
						}
						</div>
					</div>
					</div>
				</div>
			</div>
			<div className="col-md-12 grid-margin stretch-card">
				<div className="card">
				<div className="card-body">
					<p className="card-title">Charge Backs Current Month vs Previous 6 Months
					</p>
					<p className="text-muted font-weight-light">The total charge back counts  of the current month vs the previous month to date.</p>
					<div className="row">
						<div className="col-md-6">
							<DataTable title={"Current Year Prior Six Months"} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewMerchantDetail(data)} data={props.isoMerchantDashboardData.ChargeBackCount} columns={chargeBackColumns} pagination/>
						</div>
						<div className="col-md-6">
						{props.isoMerchantDashboardData && props.isoMerchantDashboardData.PreviousMonthChargeBacks && 
							<DataTable title={"Previous Year Prior Six Months"} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewMerchantDetail(data)} data={props.isoMerchantDashboardData.PreviousMonthChargeBacks} columns={chargeBackColumns} pagination/>
						}
						</div>
					</div>
				</div>
			
			</div>
		</div>

		
		
		</div>
		
		<div className="row">
			<div className="col-md-12 grid-margin stretch-card">
				<div className="card">
				<div className="card-body">
					<p className="card-title">Closed Merchants
					</p>
					<p className="text-muted font-weight-light">Number of closed merchants.</p>
					{props.isoMerchantDashboardData && props.isoMerchantDashboardData.ClosedMerchants && 
						<DataTable  data={props.isoMerchantDashboardData.ClosedMerchants} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewMerchantDetail(data)} columns={merchantCountColumns} pagination/>
					}
					</div>
				</div>
			</div>
			 
		 
			<div className="col-md-12 grid-margin stretch-card">
				<div className="card">
				<div className="card-body">
					<p className="card-title">Active Merchants
					</p>
					<p className="text-muted font-weight-light">Number of active merchants.</p>
					{props.isoMerchantDashboardData && props.isoMerchantDashboardData.ClosedMerchants && 
						<DataTable title={""} data={props.isoMerchantDashboardData.ActiveMerchants} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewMerchantDetail(data)} columns={merchantCountColumns} pagination/>
					}
					</div>
				</div>
			</div>
			 
		</div>

		<div className="row">
			<div className="col-md-12 grid-margin stretch-card">
				<div className="card">
				<div className="card-body">
					<p className="card-title">In Active Merchants
					</p>
					<p className="text-muted font-weight-light">Number of inactive merchants.</p>
					{props.isoMerchantDashboardData && props.isoMerchantDashboardData.InActiveMerchants && 
						<DataTable  data={props.isoMerchantDashboardData.InActiveMerchants} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewMerchantDetail(data)} columns={merchantCountColumns} pagination/>
					}
					</div>
				</div>
			</div>
			 
		 
			<div className="col-md-12 grid-margin stretch-card">
				<div className="card">
				<div className="card-body">
					<p className="card-title">Total Merchants
					</p>
					<p className="text-muted font-weight-light">Number of total merchants.</p>
					{props.isoMerchantDashboardData && props.isoMerchantDashboardData.TotalMerchants && 
						<DataTable title={""} data={props.isoMerchantDashboardData.TotalMerchants} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewMerchantDetail(data)} columns={merchantCountColumns} pagination/>
					}
					</div>
				</div>
			</div>
			 
		</div>
		
	</div>
  );
}

GetIsoMerchantDashboard.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetIsoMerchantDashboard;
