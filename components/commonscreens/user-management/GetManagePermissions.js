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

import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ReactMUIDatatable } from "react-material-ui-datatable";

import * as AppConstants from '/utilities/constants';
import * as StringUtils from '/utilities/string';
import MenuItem from '@mui/material/MenuItem';
import DataTable from 'react-data-table-component';
import { TabPanel }  from '/components/common/TabPanel';
// import styled from 'styled-components';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function GetManagePermissions(props) {
	 console.log("Merchant Detail Props", props);
	const batchColumns = [
		{ selector: "Batch_ID_YYMMDD", name: "Batch Date" , sortable: true, format: (row, index) => {return  StringUtils.formatShortDate(row.Batch_ID_YYMMDD) } },
		{ selector: "Batch_Sale_Amount", name: "Batch Amount", sortable: true  , format: (row, index) => {return  StringUtils.formatNumber(row.Batch_Sale_Amount) } },
		{ selector: "Batch_Return_Amount", name: "Return Amount", sortable: true },
		{ selector: "Batch_Dollars_Transacted", name: "Net Batch", sortable: true  , format: (row, index) => {return  StringUtils.formatNumber(row.Batch_Dollars_Transacted) } },
		{ selector: "Count_Total", name: "Count Total", sortable: true },
		];
		
	const transactionColumns = [
		{ selector: "Batch_ID_YYMMDD", name: "Batch Date" , sortable: true, format: (row, index) => {return  StringUtils.formatShortDate(row.Batch_ID_YYMMDD) } },
		{ selector: "Trans_ID_Number", name: "Trans ID", sortable: true },
		{ selector: "Trans_Type", name: "Type", sortable: true },
		{ selector: "Amount_total", name: "Amount Total", sortable: true , format: (row, index) => {return  StringUtils.formatNumber(row.Amount_total) } },
		{ selector: "Count_Total", name: "Count Total", sortable: true },
		];
	const achHistoryColumns = [
		{ selector: "DATE_ACHACT", name: "Date" , sortable: true, format: (row, index) => {return  StringUtils.formatShortDate(row.DATE_ACHACT) } },
		{ selector: "ach_sum_sales_amount", name: "Sale Amount", sortable: true , format: (row, index) => {return  StringUtils.formatNumber(row.ach_sum_sales_amount) } },
		{ selector: "AMNT_ACHACT", name: "Current Amount", sortable: true  , format: (row, index) => {return  StringUtils.formatNumberWithDecimal(row.AMNT_ACHACT) } },
		{ selector: "ach_sum_return_amount", name: "Return Amount", sortable: true },
		{ selector: "ach_sum_month_fee", name: "Sum Month Fee", sortable: true },
		{ selector: "ach_sum_other", name: "Sum Other", sortable: true },
		{ selector: "ROUTING_NUM_ACHACT", name: "Routing #", sortable: true , format: (row, index) => {return  StringUtils.showOnlyLastFour(row.ROUTING_NUM_ACHACT) } },
		{ selector: "DFI_ACCT_NUM_ACHACT", name: "A/C #", sortable: true, format: (row, index) => {return  StringUtils.showOnlyLastFour(row.DFI_ACCT_NUM_ACHACT) } },
		];
		
  let appMessages = StringUtils.getDisplayMessages(props.messages);


  let stateList  = [];
  if(props.lists &&  props.lists.STATES){
	stateList = props.lists.STATES.map(function (anItem, index) {
		return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
	  });

	}

  const [value, setValue] = React.useState(0);

  const handleChange = function(event, newValue)  {
    setValue(newValue);
  };
  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if(!props.currentMerchant.Merchant.password && !value){
    	  return true;
      }else if (value !== props.currentMerchant.Merchant.password) {
          return false;
      }
      return true;
  });
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
							<h4>Merchant Detail</h4>
						</div>
						<div className="col-lg-6 col-md-6 text-right">					
							<button className="btn btn-primary" onClick={() => props.navigateToUrl(AppConstants.MERCHANT_SEARCH_PATH)}>Back</button>
						</div>
					</div>
				<ValidatorForm onSubmit={(data) => props.processForm(data, props.user, props.lists)}>
					 
		            {appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
					<Paper>
					<Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary" variant="scrollable"
          scrollButtons="auto"
					    textColor="primary">
					    <Tab label="Merchant Information" {...a11yProps(0)} disableRipple/>
					    <Tab label="Batch Summary" {...a11yProps(1)} />
					    <Tab label="Transaction History" {...a11yProps(2)} />
					    <Tab label="ACH History" {...a11yProps(3)} />
						<Tab label="Charge Backs" {...a11yProps(4)} /> 
					  </Tabs>
					<TabPanel value={value} index={0}>
		              
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
							<b>ISO Code:</b><br /> {props.currentMerchant.Merchant.iso}
							
			              </div>
						  <div className="col-xl-5 col-lg-6 col-md-6">
							  <b>DBA Name:</b><br /> {props.currentMerchant.Merchant.mm_dba_name}
			              </div>
			              <div className="col-xl-3 col-lg-4 col-md-4">
							<b>Phone:2</b><br /> {props.currentMerchant.Merchant.mm_business_phone} 1
							
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
				         
				          
 						  		              
				      </div>   
		              
	
	
	
	
		            </TabPanel>
		            <TabPanel value={value} index={1}>
		              <div className={'row'}>
					  	<DataTable title={"Batch"} data={props.currentMerchant.Batches} columns={batchColumns} pagination/>
	                  </div>
		            </TabPanel>
		            <TabPanel value={value} index={2}>
						<div className={'row'}>
					  		<DataTable title={"Transactions"} data={props.currentMerchant.Transactions} columns={transactionColumns} pagination/>
	                  	</div>
		            </TabPanel>
		            <TabPanel value={value} index={3}>
						<div className={'row'}>
					  		<DataTable title={"ACH history"} data={props.currentMerchant.ACH_History} columns={achHistoryColumns} pagination/>
	                  	</div>
		            </TabPanel>					
		            <TabPanel value={value} index={4}>
						<div className={'row'}>
					  		<DataTable title={"Charge Backs"} data={props.currentMerchant.ChargeBacks} columns={transactionColumns} pagination/>
	                  	</div>
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

GetManagePermissions.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetManagePermissions;

