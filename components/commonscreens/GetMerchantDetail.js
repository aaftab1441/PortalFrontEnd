/**
 *
 * GetMerchant Detail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../common/TextBox';
import ValidatedDatePicker from '../common/ValidatedDatePicker';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography  from '@mui/material/Typography';

import { Row, Col   } from 'react-bootstrap';
import * as AppConstants from '../../utilities/constants';
import * as StringUtils from '../../utilities/string';
import * as Utils from '../../utilities/util';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import DataTable from 'react-data-table-component';
import { TabPanel }  from '../common/TabPanel';
import TransactionDetail from './TransactionDetail';
import BatchDetail from './BatchDetail';
import ACHDetail from './ACHDetail';
import ChargeBackDetail from './ChargeBackDetail';
import { Button } from '@mui/material';
import {  TextValidator } from 'react-material-ui-form-validator';
import { ResponsiveLine } from "@nivo/line";
import {withRouter} from "next/router";
import MerchantRiskSection from "/components/commonscreens/risk/MerchantRiskSection";
import { SettingsBackupRestoreOutlined } from '@mui/icons-material';
// import styled from 'styled-components';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#d3d3d3',
            fontSize: '15px',
            fontWeight: 'bold',
            paddingLeft: '5px', // override the cell padding for data cells
            paddingRight: '5px',
            paddingTop: '5px',
            paddingBottom: '5px',
            whiteSpace: 'wrap',
        },
    },
    headRow: {
        style: {
            minHeight: '31px', // override the row height
        },
    },
    rows: {
        style: {
            minHeight: '31px', // override the row height
        },
    },
    cells: {
        style: {
            paddingLeft: '5px', // override the cell padding for data cells
            paddingRight: '5px',
            paddingTop: '5px',
            paddingBottom: '5px',
        },
    },
}

function GetMerchantDetail(props) {
	 console.log("Merchant Detail Props", props);
	const batchColumns = [
		{ selector: row => row.DATE_ACHACT, name: "Batch Date" , sortable: true, format: (row, index) => {return  StringUtils.formatShortDate(row.DATE_ACHACT) } },
		{ selector: row => row.AMNT_ACHACT, name: "Sales", sortable: true,  format: (row, index) => {return  StringUtils.formatMoney(Utils.f(row.AMNT_ACHACT)/100 
		- Utils.f(row.ach_sum_chbk_amount) + Utils.f(row.ach_sum_net_released) - Utils.f(row.ach_sum_net_held) - Utils.f(row.ach_sum_cbrv_amount) 
		+ Utils.f(row.ach_sum_cash_disc_amnt) - Utils.f(row.ach_sum_month_fee)) } },
		{ selector: row => row.ach_sum_return_amount, name: "Credit", sortable: true },
		{ selector: row => row.ach_sum_sales_amount, name: "Net Batch", sortable: true  , format: (row, index) => {return  StringUtils.formatMoney(Utils.f(row.AMNT_ACHACT)/100 
		- Utils.f(row.ach_sum_chbk_amount) + Utils.f(row.ach_sum_net_released) - Utils.f(row.ach_sum_net_held) - Utils.f(row.ach_sum_cbrv_amount) 
		+ Utils.f(row.ach_sum_cash_disc_amnt) - Utils.f(row.ach_sum_month_fee)) } },
		];
		
	const transactionColumns = [
		{ selector: row => row.tran_date_hf, name: "Date" , sortable: true, format: (row, index) => {return  StringUtils.formatCDate(row.tran_date_hf) } },
		{ selector: row => row.trans_type_hf, name: "Type", sortable: true, format: (row, index) => {return  StringUtils.translate( row.trans_type_hf, props.lists.TRANSACTION_TYPE) } },
		{ selector: row => row.tran_amnt_hf, name: "Amount Total", sortable: true , format: (row, index) => {return  StringUtils.formatNumber(row.tran_amnt_hf) } },
		{ selector: row => row.card_no_hf, name: "Card", sortable: true },
		];

	const chargeBackColumns = [
			{ selector: row => row.Dispute_Date, name: "Date" , sortable: true, format: (row, index) => {return  StringUtils.formatYYYYMMDDDate(row.Dispute_Date) } },
			{ selector: row => row.Dispute_Type, name: "Type", sortable: true },
			{ selector: row => row.Transaction_Amount, name: "Amount Total", sortable: true , format: (row, index) => {return  StringUtils.formatChargeBackNumber(row.Transaction_Amount) } },
			{ selector: row => row.Cardholder_Account_Number, name: "Card", sortable: true },
			];
	const achHistoryColumns = [
		{ selector: row => row.DATE_ACHACT, name: "Date" , sortable: true, format: (row, index) => {return  StringUtils.formatShortDate(row.DATE_ACHACT) } },
		{ selector: row => row.AMNT_ACHACT, name: "Batch $", sortable: true  ,  format: (row, index) => {return  StringUtils.formatMoney(Utils.f(row.ach_sum_sales_amount) 
		- Utils.f(row.ach_sum_return_amount) + Utils.f(row.ach_sum_cash_disc_amnt) ) } },
		{ selector: row => row.ach_sum_chbk_amount, name: "Chargebacks", sortable: true , format: (row, index) => {return  StringUtils.formatMoney(Utils.f(row.ach_sum_chbk_amount)) } },
		{ selector: row => row.ach_sum_net_released, name: "Released Sales", sortable: true, format: (row, index) => {return  StringUtils.formatMoney(Utils.f(row.ach_sum_net_released)) } },
		{ selector: row => row.ach_sum_net_held, name: "Held Sales", sortable: true, format: (row, index) => {return  StringUtils.formatMoney(Utils.f(row.ach_sum_net_held)) } },
		{ selector: row => row.ach_sum_cbrv_amount, name: "Reserve", sortable: true, format: (row, index) => {return  StringUtils.formatMoney(Utils.f(row.ach_sum_cbrv_amount)) } },
		{ selector: row => row.ach_sum_cash_disc_amnt, name: "Cash discount", sortable: true, format: (row, index) => {return  StringUtils.formatMoney(Utils.f(row.ach_sum_cash_disc_amnt)) } },
		{ selector: row => row.ach_sum_month_fee, name: "Fees", sortable: true, format: (row, index) => {return  StringUtils.formatMoney(Utils.f(row.ach_sum_month_fee)) } },
		{ selector: row => row.AMNT_ACHACT, name: "Deposit", sortable: true  , format: (row, index) => {return  StringUtils.formatNumberWithDecimal(Utils.f(row.AMNT_ACHACT)) } },
		];
		
	let appMessages = StringUtils.getDisplayMessages(props.messages);

	const statementColumns = [
		{ selector: row => row.Billing_Year, name: "Year" , sortable: true },
		{ selector: row => row.Billing_Month, name: "Month", sortable: true },
		];

	let stateList  = [];
	if(props.lists &&  props.lists.STATES){
		stateList = props.lists.STATES.map(function (anItem, index) {
			return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
	  });

	}
	let tabValue = 0;
	if(/.*batch.*/.test(props.router.asPath)){
		tabValue = 2;
	}else if(/.*transaction.*/.test(props.router.asPath)){
		tabValue = 3;
	}else if(/.*charge.*/.test(props.router.asPath)){
		tabValue = 5;
	}
  	const [value, setValue] = React.useState(tabValue);
		
	const getPageDefaults = function(tableName){
		let pageInfo = {};
		pageInfo['Page'] = props.currentMerchant[tableName]['Page'];
		pageInfo['PageSize'] = props.currentMerchant[tableName]['PageSize'];
		pageInfo['SortDirection'] = props.currentMerchant[tableName]['SortDirection'];
		pageInfo['SortField'] = props.currentMerchant[tableName]['SortField'];
		pageInfo['Name'] = tableName;
		pageInfo['Search'] = props.itemSearch[tableName];
		console.log("Item Search", props.itemSearch);
		return pageInfo;
	}
 	const changePage = function(tableName, page) {
		let pageInfo = getPageDefaults(tableName);
		pageInfo['Page'] = page;
		props.changePage(pageInfo, props.user, props.currentMerchant.Merchant);
 	}

	const gotoISO = function(event, iso)  {
		if(props.user && props.user.Permissions && props.user.Permissions.User_Level_Code){
			if(props.user.Permissions.User_Level_Code == "DAS" || props.user.Permissions.User_Level_Code == "EAGLE"){
				props.viewISODetail({ISO_CODE: props.currentMerchant.Merchant.iso_code});
				props.router.push(AppConstants.DAS_ISO_DASHBOARD_PATH);
			} else {
				props.router.push(AppConstants.DASHBOARD_PAGE);
			}
		}
		console.log("ISO:", props.currentMerchant.Merchant.iso_code, props.user);
	};

	const handleChange = function(event, newValue)  {
		setValue(newValue);
	};

	
	const changeRowsPerPage  = (tableName, rowsPerPage, currentPage) => {
		let params = getPageDefaults(tableName);
		params['PageSize'] = rowsPerPage;
		params['Page'] = 1;
		props.changePage(params, props.user, props.currentMerchant.Merchant);
	};

	const handleTransactionSort  = (tableName, column, sortDirection) => {
		let params = getPageDefaults(tableName);
		params['SortField'] = column.sortField;
		params['SortDirection'] = sortDirection;
		props.changePage(params, props.user, props.currentMerchant.Merchant);
	};

 
	const handleBatchSort  = (tableName, column, sortDirection) => {
		let params = getPageDefaults(tableName);
		params['SortField'] = column.sortField;
		params['SortDirection'] = sortDirection;
		props.changePage(params, props.user, props.currentMerchant.Merchant);
	};
	
	const handleACHSort  = (tableName, column, sortDirection) => {
		let params = getPageDefaults(tableName);
		params['SortField'] = column.sortField;
		params['SortDirection'] = sortDirection;
		props.changePage(params, props.user, props.currentMerchant.Merchant);
	};
	
	const handleChargeBackSort  = (tableName, column, sortDirection) => {
		let params = getPageDefaults(tableName);
		params['SortField'] = column.sortField;
		params['SortDirection'] = sortDirection;
		props.changePage(params, props.user, props.currentMerchant.Merchant);
	};


  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if(!props.currentMerchant.Merchant.password && !value){
    	  return true;
      }else if (value !== props.currentMerchant.Merchant.password) {
          return false;
      }
      return true;
  });
  
  let YTDSalesReportData = [
	{
		data: props.currentMerchant.CurrentYTD,
		id: 'Current',
		color: '#ffc100',
	},
	{
	  data: props.currentMerchant.PreviousYTD,
	  id: 'Previous',
	  color: '#f5a623',
		
	}];
	let YTDTransactionReportData = [
	  {
		  data: props.currentMerchant.CurrentYTDTransactions,
		  id: 'Current',
		  color: '#ffc100',
	  },
	  {
		data: props.currentMerchant.PreviousYTDTransactions,
		id: 'Previous',
		color: '#f5a623',
		  
	  }];

   let YTDChargeBacksReportData = [
	{
		data: props.currentMerchant.CurrentYTDChargeBacks,
		id: 'Current',
		color: '#ffc100',
	},
	{
	  data: props.currentMerchant.PreviousYTDChargeBacks,
	  id: 'Previous',
	  color: '#f5a623',
		
	}];

  return (
		<div>
			<TransactionDetail {...props} />
			<BatchDetail {...props} />
			<ACHDetail {...props} />
			<ChargeBackDetail {...props} />

		<div className="row">
		<div className="col-lg-12">
			<div className="card">
			<div className="card-body">
				<div className="row">
				<div className="col-12" id="search">
					<div className="row">
						<div className="col-lg-6 col-md-6">
							<h4>Merchant Detail</h4>
						</div>
						<div className="col-lg-6 col-md-6 text-right">					
							<Button variant="contained" color="primary" onClick={() => props.router.back()}>Back</Button>
						</div>
					</div>
				<ValidatorForm onSubmit={(data) => props.processForm(data, props.user, props.lists)}>
					 
		            {appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
					<Paper>
					<Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary" variant="scrollable" scrollButtons="auto" textColor="primary">
						<Tab label="Summary" {...a11yProps(0)} disableRipple/>
					    <Tab label="Merchant Information" {...a11yProps(1)} disableRipple/>
					    <Tab label="Batch Summary" {...a11yProps(2)} />
					    <Tab label="Transaction History" {...a11yProps(3)} />
					    <Tab label="ACH History" {...a11yProps(4)} />
						<Tab label="Charge Backs" {...a11yProps(5)} /> 
						<Tab label="Statements" {...a11yProps(6)} /> 
					  </Tabs>
					  <TabPanel value={value} index={0}>
					  
						<div> 
						 
						<div className="row">
							<div className="col-12 col-xl-12 grid-margin">
								<div className="d-flex align-items-center justify-content-between flex-wrap">
								<div className="border-right pr-4 mb-3 mb-xl-0">
									<p className="text-muted">Sales</p>
									<h4 className="mb-0 font-weight-bold">${StringUtils.formatNumber(props.currentMerchant.CurrentYTDSales)} </h4>
								</div>
								<div className="border-right pr-4 mb-3 mb-xl-0">
									<p className="text-muted">Previous 6 Months Sales</p>
									<h4 className="mb-0 font-weight-bold">${StringUtils.formatNumber(props.currentMerchant.PreviousYTDSales)}</h4>
								</div>
								<div className="border-right pr-4 mb-3 mb-xl-0">
									<p className="text-muted">Month&apos;s Charge Backs</p>
									<h4 className="mb-0 font-weight-bold">{StringUtils.formatWholeNumber(props.currentMerchant.ChargeBackCount)}</h4>
								</div>
								<div className="pr-3 mb-3 mb-xl-0">
									<p className="text-muted">Current Month&apos;s Transactions</p>
									<h4 className="mb-0 font-weight-bold">{StringUtils.formatWholeNumber(props.currentMerchant.TransactionCount)}</h4>
								</div>
								              
								</div>
							</div>
						</div>
						
						
						<div className="row">
						<div className="col-md-6 grid-margin stretch-card">
							<div className="card">
							<div className="card-body">
								<Row>
									<Col className="card-title">Sales Current Year Prior 6 Months vs Previous Year 6 Months</Col>
									<Col className="text-right">
										</Col>
								
								</Row>
								<p className="text-muted font-weight-light">The total transaction amounts of the current year prior six months vs the previous year prior six months.</p>
									{Utils.salesDataChecker(YTDSalesReportData) && <ResponsiveLine                   
										data={YTDSalesReportData}
										xScale={{  format: "%Y%m%d", type: 'time',  min: 'auto',  max: 'auto', stacked: false  }}
										yScale={{ type: 'linear', min: 'auto',  max: 'auto', stacked: false, reverse: false }}
										useMesh={true}
										curve={'cardinal'}
										height="401"
										tooltip={d => {  return '$' + d.point.data.yFormatted;}}
										axisLeft={{
										format: ">-$,.0s",                        
										}}
										axisBottom={{
										orient: 'bottom',
										legend: 'Date',
										legendOffset: 36,
										format: "%m/%d",
										legendPosition: 'middle',
										tickValues: "every 1 month",
										}}
										yFormat= {(value) => {return StringUtils.formatNumber(value)}}
										xFormat={(value) => {return StringUtils.formatNoSeparatorDate(value)}}
										margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
										legends={[
										{
											anchor: 'top-right',
											direction: 'column', 
											justify: false,
											translateX: 100,
											translateY: 0,
											itemsSpacing: 0,
											itemDirection: 'left-to-right',
											itemWidth: 80,
											itemHeight: 20,
											itemOpacity: 0.75,
											symbolSize: 12,
											symbolShape: 'circle',
											symbolBorderColor: 'rgba(0, 0, 0, .5)',
											effects: [
												{
													on: 'hover',
													style: {
														itemBackground: 'rgba(0, 0, 0, .03)',
														itemOpacity: 1
													}
												}
											]
										}
									]}
										
									/>}
								</div>
							</div>
						</div>
						<div className="col-md-6 grid-margin stretch-card">
							<div className="card">
							<div className="card-body">
								<Row>
									<Col className="card-title">Transactions</Col>
									<Col className="text-right">
									</Col>
								
								</Row>
								
								<p className="text-muted font-weight-light">Transactions</p>
								
								{Utils.salesDataChecker(YTDTransactionReportData) && <ResponsiveLine                   
										data={YTDTransactionReportData}
										xScale={{  format: "%Y%m%d", type: 'time',  min: 'auto',  max: 'auto', stacked: false  }}
										yScale={{ type: 'linear', min: 'auto',  max: 'auto', stacked: false, reverse: false }}
										useMesh={true}
										curve={'cardinal'}
										height="401"
										tooltip={d => {  return  d.point.data.yFormatted;}}
										axisLeft={{
										format: ">-,.0s",                        
										}}
										axisBottom={{
										orient: 'bottom',
										legend: 'Date',
										legendOffset: 36,
										format: "%m/%d",
										legendPosition: 'middle',
										tickValues: "every 1 month",
										}}
										yFormat= {(value) => {return StringUtils.formatNumber(value)}}
										xFormat={(value) => {return StringUtils.formatNoSeparatorDate(value)}}
										margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
										legends={[
										{
											anchor: 'top-right',
											direction: 'column', 
											justify: false,
											translateX: 100,
											translateY: 0,
											itemsSpacing: 0,
											itemDirection: 'left-to-right',
											itemWidth: 80,
											itemHeight: 20,
											itemOpacity: 0.75,
											symbolSize: 12,
											symbolShape: 'circle',
											symbolBorderColor: 'rgba(0, 0, 0, .5)',
											effects: [
												{
													on: 'hover',
													style: {
														itemBackground: 'rgba(0, 0, 0, .03)',
														itemOpacity: 1
													}
												}
											]
										}
									]}
										
									/>}
							</div>
							
							</div>
						</div>
						</div>
						<div className="row">
						
						<div className="col-md-6 grid-margin stretch-card">
							<div className="card">
							<div className="card-body">
								<Row>
									<Col className="card-title">Charge Backs For Current Year Prior 6 Months vs Previous Year </Col>
									<Col className="text-right">
									</Col>                  
								</Row>
								
								{Utils.salesDataChecker(YTDChargeBacksReportData) && <ResponsiveLine                   
									data={YTDChargeBacksReportData}
									xScale={{  format: "%Y%m%d", type: 'time',  min: 'auto',  max: 'auto', stacked: false  }}
									yScale={{ type: 'linear', min: 'auto',  max: 'auto', stacked: false, reverse: false }}
									useMesh={true}
									curve={'cardinal'}
									height="401"
									tooltip={d => {  return  d.point.data.yFormatted;}}
									axisLeft={{
										format: ">-$,.0s",                        
									}}
									axisBottom={{
										orient: 'bottom',
										legend: 'Date',
										legendOffset: 36,
										format: "%m/%d",
										legendPosition: 'middle',
										tickValues: "every 1 month",
									}}
									yFormat= {(value) => {return StringUtils.formatNumber(value)}}
									xFormat={(value) => {return StringUtils.formatNoSeparatorDate(value)}}
									margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
									legends={[
										{
											anchor: 'top-right',
											direction: 'column', 
											justify: false,
											translateX: 100,
											translateY: 0,
											itemsSpacing: 0,
											itemDirection: 'left-to-right',
											itemWidth: 80,
											itemHeight: 20,
											itemOpacity: 0.75,
											symbolSize: 12,
											symbolShape: 'circle',
											symbolBorderColor: 'rgba(0, 0, 0, .5)',
											effects: [
												{
													on: 'hover',
													style: {
														itemBackground: 'rgba(0, 0, 0, .03)',
														itemOpacity: 1
													}
												}
											]
										}
									]}
									
									/>}
								</div>
							</div>
						</div>
						
						<div className="col-md-6 grid-margin stretch-card">
							<div className="card">
							{<div className="card-body">
								<Row>
									<Col>
										<span className="card-title">Risk</span><br />
										<span className="text-muted small-font">Items in gray buttons will be available in the near future.</span><br />
									</Col>
									<Col md={3} className="text-right p-0">
									
									</Col>
								</Row>
								<MerchantRiskSection currentObject={props.currentMerchant.Merchant} currentObjectType={'MERCHANT'} {...props}/>

							</div>}
							
							</div>
						</div>
						</div>
						
						<div className="row">        
						<div className="col-md-12 grid-margin stretch-card">
							<div className="card">
							<div className="card-body">
								
							</div>
							</div>
						</div>
						</div>
						
					</div>

					  </TabPanel>

					<TabPanel value={value} index={1}>
		              
		              <div className="row">
					  	<div className="col-md-12">
						  	<h4 className="card-description">General Information</h4>
						  </div>
			              <div className="col-xl-5 col-lg-6 col-md-6">
						  	<b>Legal Name:</b><br /> {props.currentMerchant.Merchant.mm_legal_name}
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>MID:</b><br /> {props.currentMerchant.Merchant.mm_cust_no}
							
			              </div>
						  <div className="col-xl-2 col-lg-2 col-md-2">
							<b>ISO Code:</b><br /><span onClick={() => gotoISO()}> {props.currentMerchant.Merchant.iso_code} </span>
							
			              </div>
						  <div className="col-xl-5 col-lg-6 col-md-6">
							  <b>DBA Name:</b><br /> {props.currentMerchant.Merchant.mm_dba_name}
			              </div>
			              <div className="col-xl-3 col-lg-4 col-md-4">
							<b>Phone:</b><br /> {StringUtils.formatPhone(props.currentMerchant.Merchant.mm_business_phone)}
			              </div>
			               
						  
						  <div className="col-md-12 pt-3">
						  	<h4 className="card-description">Mailing Address</h4>
						  </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>Address 1:</b><br /> {props.currentMerchant.Merchant.mm_mail_address}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>Address 2:</b><br /> {props.currentMerchant.Merchant.mm_mail_address_2}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>City:</b><br /> {props.currentMerchant.Merchant.mm_mail_city}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>State:</b><br /> {props.currentMerchant.Merchant.mm_mail_state}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>Zip:</b><br /> {props.currentMerchant.Merchant.mm_mail_zip}							
			              </div>
				         
				          
						  <div className="col-md-12 pt-3">
						  	<h4 className="card-description">Billing Address</h4>
						  </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>Address 1:</b><br /> {props.currentMerchant.Merchant.mm_billing_address}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>Address 2:</b><br /> {props.currentMerchant.Merchant.mm_billing_address_2}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>City:</b><br /> {props.currentMerchant.Merchant.mm_billing_city}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>State:</b><br /> {props.currentMerchant.Merchant.mm_billing_state}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>Zip:</b><br /> {props.currentMerchant.Merchant.mm_billing_zip}							
			              </div>
				         
				          <div className="col-md-12 pt-3">
						  	<h4 className="card-description">Contact Information</h4>
						  </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>First Name:</b><br /> {props.currentMerchant.Merchant.mm_owner_first_1}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>Middle Initial:</b><br /> {props.currentMerchant.Merchant.mm_owner_mi_1}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b>Last Name:</b><br /> {props.currentMerchant.Merchant.mm_owner_last_1}							
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b></b><br />  						
			              </div>
						  <div className="col-xl-3 col-lg-4 col-md-4">
							<b></b><br />  						
			              </div>
 						  		              
				      </div>   
		              
	
	
	
		            </TabPanel>
		            <TabPanel value={value} index={2}>
						<Row>
							<Col md={3} >
								<ValidatedDatePicker
									autoOk className={"date"}
									variant="outlined" size="small" 
									name={'batchStartDate'}
									id={'batchStartDate'}
									label="Start Date"
									validators={[]}
									errorMessages={[]}
									format='MM/dd/yyyy'
									value={props.itemSearch.batch.batchStartDate}
									placeholder={'Start Date'}
									onChange={(date) => props.handleSearchChange('batchStartDate', date, 'batch')}
									/> 
							</Col>
							<Col md={3} >
								<ValidatedDatePicker
									autoOk className={"date"}
									variant="outlined" size="small" 
									name={'batchEndDate'}
									id={'batchEndDate'}
									label="End Date"
									validators={[]}
									errorMessages={[]}
									format='MM/dd/yyyy'
									value={props.itemSearch.batch.batchEndDate}
									placeholder={'End Date'}
									onChange={(date) => props.handleSearchChange('batchEndDate', date, 'batch')}
									/> 
							</Col>
							<Col md={2}>
								{props.sectionLoading.batch  && 
									<Box display='flex' justifyContent='center' alignItems='center'>
										<CircularProgress color="secondary"  size={30}  />
										<Typography position='absolute' className="ml-2">Loading</Typography>
									</Box>
								}
							</Col>
							<Col md={3} >  &nbsp;</Col>
							<Col md={1} className="text-bottom" >
								<Button variant="contained"  color="primary"  type="button"  className="" onClick={() => changePage('batch', 1)}> <i className="ti-search menu-icon"></i>  &nbsp;SEARCH </Button>										
							</Col>
						</Row>
						<Row>
							<DataTable title={"Batch"} onRowClicked={(data) => props.viewBatchDetail(data)}
								paginationTotalRows={props.currentMerchant.batch.Count} data={props.currentMerchant.batch.Data}
								paginationPerPage={props.currentMerchant.batch.PageSize} columns={batchColumns} paginationServer={true}
								onChangePage={(page, totalRows) => changePage('batch', page)}
								paginationRowsPerPageOptions={[10,30,50,100]} customStyles={customStyles} 
								onSort={(column, sortDirection) => handleBatchSort('batch', column, sortDirection)} sortServer
								onChangeRowsPerPage={(currentRowsPerPage, currentPage) => changeRowsPerPage('batch', currentRowsPerPage, currentPage)} pagination/>
	                  	</Row>
		            </TabPanel>
		            <TabPanel value={value} index={3}>
					<Row>
							<Col md={3} >
								<ValidatedDatePicker
									autoOk className={"date"}
									variant="outlined" size="small" 
									name={'transactionStartDate'}
									id={'transactionStartDate'}
									label="Start Date"
									validators={[]}
									errorMessages={[]}
									format='MM/dd/yyyy'
									value={props.itemSearch.transactions.transactionStartDate}
									placeholder={'Start Date'}
									onChange={(date) => props.handleSearchChange('transactionStartDate', date, 'transactions')}
									/> 
							</Col>
							<Col md={3} >
								<ValidatedDatePicker
									autoOk className={"date"}
									variant="outlined" size="small" 
									name={'transactionEndDate'}
									id={'transactionEndDate'}
									label="End Date"
									validators={[]}
									errorMessages={[]}
									format='MM/dd/yyyy'
									value={props.itemSearch.transactions.transactionEndDate}
									placeholder={'End Date'}
									onChange={(date) => props.handleSearchChange('transactionEndDate', date, 'transactions')}
									/> 
							</Col>
							<Col md={3} > 
								<TextBox
									value={StringUtils.getValue(props.itemSearch.transactions.transactionCard)}
									onChange={(evt) => props.handleSearchChange('transactionCard', evt.target.value, 'transactions')}  
									validators={[]}
									className={'col-md-12'}
									m={20}
									errorMessages={[]}
									variant={'outlined'}  
									inputProps={{
										name: 'transactionCard',
										id: 'transactionCard',
										placeholder: 'Card ...',
										type: 'text',
										
									}}
								/>
							</Col>
							<Col md={2}>
								{props.sectionLoading.transactions  && 
									<Box display='flex' justifyContent='center' alignItems='center'>
										<CircularProgress color="secondary"  size={30} />
										<Typography position='absolute' className="ml-2">Loading</Typography>
									</Box>
								}
							</Col>							
							<Col md={1} className="text-bottom" >
								<Button variant="contained"  color="primary"  type="button"  className="" onClick={() => changePage('transactions', 1)}> <i className="ti-search menu-icon"></i>  &nbsp;SEARCH </Button>										
							</Col>

							
						</Row>
						<Row>
							  <DataTable title={"Transactions"} onRowClicked={(data) => props.viewTransactionDetail(data)}
                                   paginationTotalRows={props.currentMerchant.transactions.Count} data={props.currentMerchant.transactions.Data}
                                   paginationPerPage={props.currentMerchant.transactions.PageSize} columns={transactionColumns} paginationServer={true}
                                   onChangePage={(page, totalRows) => changePage('transactions', page)}
                                   paginationRowsPerPageOptions={[10,30,50,100]} customStyles={customStyles} 
								   onSort={(column, sortDirection) => handleBatchSort('batch', column, sortDirection)} sortServer
                                   onChangeRowsPerPage={(currentRowsPerPage, currentPage) => changeRowsPerPage('transactions', currentRowsPerPage, currentPage)} pagination/>

	                  	</Row>
		            </TabPanel>
		            <TabPanel value={value} index={4}>
						<Row>
							<Col md={3} >
								<ValidatedDatePicker
									autoOk className={"date"}
									variant="outlined" size="small" 
									name={'achStartDate'}
									id={'achStartDate'}
									label="Start Date"
									validators={[]}
									errorMessages={[]}
									format='MM/dd/yyyy'
									value={props.itemSearch.ach.achStartDate}
									placeholder={'Start Date'}
									onChange={(date) => props.handleSearchChange('achStartDate', date, 'ach')}
									/> 
							</Col>
							<Col md={3} >
								<ValidatedDatePicker
									autoOk className={"date"}
									variant="outlined" size="small" 
									name={'achEndDate'}
									id={'achEndDate'}
									label="End Date"
									validators={[]}
									errorMessages={[]}
									format='MM/dd/yyyy'
									value={props.itemSearch.ach.achEndDate}
									placeholder={'End Date'}
									onChange={(date) => props.handleSearchChange('achEndDate', date, 'ach')}
									/> 
							</Col>
							<Col md={2}>
								{props.sectionLoading.ach  && 
									<Box display='flex' justifyContent='center' alignItems='center'>
										<CircularProgress color="secondary"  size={30} />
										<Typography position='absolute' className="ml-2">Loading</Typography>
									</Box>
								}
							</Col>
							<Col md={3} >  &nbsp;</Col>
							<Col md={1} className="text-bottom" >
								<Button variant="contained"  color="primary"  type="button"  className="" onClick={() => changePage('ach', 1)}> <i className="ti-search menu-icon"></i>  &nbsp;SEARCH </Button>										
							</Col>
						</Row>
						<Row>
							<DataTable title={"ACH history"} onRowClicked={(data) => props.viewACHDetail(data)}
                                   paginationTotalRows={props.currentMerchant.ach.Count} data={props.currentMerchant.ach.Data}
                                   paginationPerPage={props.currentMerchant.ach.PageSize} columns={achHistoryColumns} paginationServer={true}
                                   onChangePage={(page, totalRows) => changePage('ach', page)}
                                   paginationRowsPerPageOptions={[10,30,50,100]} customStyles={customStyles} 
								   onSort={(column, sortDirection) => handleACHSort('batch', column, sortDirection)} sortServer
                                   onChangeRowsPerPage={(currentRowsPerPage, currentPage) => changeRowsPerPage('ach', currentRowsPerPage, currentPage)} pagination/>
							 
	                  	</Row>
		            </TabPanel>					
		            <TabPanel value={value} index={5}>
						<Row>
							<Col md={2} >
								<ValidatedDatePicker
									autoOk className={"date"}
									variant="outlined" size="small" 
									name={'chargebacksStartDate'}
									id={'chargebacksStartDate'}
									label="Start Date"
									validators={[]}
									errorMessages={[]}
									format='MM/dd/yyyy'
									value={props.itemSearch.chargebacks.chargebacksStartDate}
									placeholder={'Start Date'}
									onChange={(date) => props.handleSearchChange('chargebacksStartDate', date, 'chargebacks')}
									/> 
							</Col>
							<Col md={2} >
								<ValidatedDatePicker
									autoOk className={"date"}
									variant="outlined" size="small" 
									name={'chargebacksEndDate'}
									id={'chargebacksEndDate'}
									label="End Date"
									validators={[]}
									errorMessages={[]}
									format='MM/dd/yyyy'
									value={props.itemSearch.chargebacks.chargebacksEndDate}
									placeholder={'End Date'}
									onChange={(date) => props.handleSearchChange('chargebacksEndDate', date, 'chargebacks')}
									/> 
							</Col>
							<Col md={3} > 
								<TextBox
									value={StringUtils.getValue(props.itemSearch.chargebacks.chargebacksCard)}
									onChange={(evt) => props.handleSearchChange('chargebacksCard', evt.target.value, 'chargebacks')}  
									validators={[]}  
									className={'col-md-12'}
									m={20}
									errorMessages={[]}
									variant={'outlined'}  
									inputProps={{
										name: 'chargebacksCard',
										id: 'chargebacksCard',
										placeholder: 'Card ...',
										type: 'text',
										
									}}
								/>
							</Col>
							<Col md={3}>
								{props.sectionLoading.chargebacks  && 
									<Box display='flex' justifyContent='center' alignItems='center'>
										<CircularProgress color="secondary"  size={30} />
										<Typography position='absolute' className="ml-2">Loading</Typography>
									</Box>
								}
							</Col>
							 
							<Col md={1} className="text-bottom" >
								<Button variant="contained"  color="primary"  type="button"  className="" onClick={() => changePage('chargebacks', 1)}> <i className="ti-search menu-icon" ></i> &nbsp;SEARCH </Button>										
							</Col>
						</Row>
						<div className="row" >
							<Col className="pt-1">
								<Button variant="contained" size="small" color="primary"  type="button"  className="" onClick={() => props.exportChargeBacks(props.itemSearch.chargebacks, props.user, props.currentMerchant.Merchant)}> Export</Button>										
							</Col>
							<Col>&nbsp;</Col>
							<Col className="pt-1">
								<Button variant="contained"  size="small"  color="primary"  type="button"  className="" onClick={() => window.open('https://client.chargebackhelp.com/login', '_blank')}> To work chargeback reduction click here </Button>										
								<br />
								<Button variant="contained" size="small" color="primary"  type="button"  className="mt-2" onClick={() => window.open('https://www.merlinkdrs.com/', '_blank')}> To work your chargeback click here</Button>										
							</Col>
						</div>
						<Row>
					  		  <DataTable title={"Charge Backs"} onRowClicked={(data) => props.viewChargeBackDetail(data)}
                                   paginationTotalRows={props.currentMerchant.chargebacks.Count} data={props.currentMerchant.chargebacks.Data}
                                   paginationPerPage={props.currentMerchant.chargebacks.PageSize} columns={chargeBackColumns} paginationServer={true}
                                   onChangePage={(page, totalRows) => changePage('chargebacks', page)}
                                   paginationRowsPerPageOptions={[10,30,50,100]} customStyles={customStyles} 
								   onSort={(column, sortDirection) => handleACHSort('batch', column, sortDirection)} sortServer
                                   onChangeRowsPerPage={(currentRowsPerPage, currentPage) => changeRowsPerPage('chargebacks', currentRowsPerPage, currentPage)} pagination/>
	                  	</Row>
		            </TabPanel>					
					<TabPanel value={value} index={6}>
						 
						<Row>
					  		  <DataTable title={"Statements"} onRowClicked={(data) => props.viewStatement(data, props.user, props.currentMerchant.Merchant)}
                                   columns={statementColumns} data={props.currentMerchant.statements} pagination/>
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

GetMerchantDetail.propTypes = {
  displayWarning: PropTypes.func,
};


export default withRouter(GetMerchantDetail);