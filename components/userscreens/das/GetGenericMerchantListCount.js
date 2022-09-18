import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../../common/TextBox';
import SelectField from '../../common/SelectField';

import * as AppConstants from '../../../utilities/constants';
import * as StringUtils from '../../../utilities/string';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import DataTable from 'react-data-table-component';
import { Row, Col,Form} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Theme, createStyles, makeStyles } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from "react-datepicker";
import Autocomplete from '@mui/material/Autocomplete';
import {useHistory} from "react-router-dom";
import { withRouter} from "next/router";
import { connect } from 'react-redux'
//import Button from '@mui/material/Button';
// import styled from 'styled-components';
 

function GetGenericMerchantList(props) {
  let stateList = [];
  let count = 0;
  let startCount = 0;

  //const classes = useStyles();
  console.log("Merchant List", props);
  let title = "Active Merchants";
  if(props.currentStatus == "main/active"){
	title = "Active Merchants";
  }else if(props.currentStatus == "main/inactive"){
	title = "Inactive Merchants";
  }else if(props.currentStatus == "main/closed"){
	title = "Closed Merchants";
  }else if(props.currentStatus == "main/all"){
	title = "All Merchants";
  }
  
  const viewIsoMerchants = (data) => {
	let parts = props.currentStatus.split('/');
	let status = "all";
	if(parts.length > 1){
		status = parts[1];
	}
	props.router.push(AppConstants.MERCHANT_LIST_PATH + '?#iso/' + status + '/' + data.ISO_CODE );
  }
  const viewCounts = (status) => {
	props.getMerchantCounts('main/' + status , props.user, props.lists);
  }

  
  let appMessages = StringUtils.getDisplayMessages(props.messages);
  const columns = [
	{ selector: row => row.ISO_NAME , name: "ISO Name" , sortable: true},
	{ selector: row => row.ISO_CODE, name: "ISO Code", sortable: true},
	{ selector: row => row.Merchant_Count, name: "Merchant Count", sortable: true},
	
	];
   return (
		<div>
		  <div className="row">
			<div className="col-lg-12">
			  <div className="card">
				<div className="card-body">
				  <div className="row">
					<div className="col-12" id="search">
						<h4>{props.title} </h4>
						<Row>
							<div className="col-md-3 grid-margin stretch-card">
								<div className="card">
								 
									<div className="card-body link"  onClick={() => viewCounts('all')}>
									<p className="card-title text-md-center text-xl-left">Total Merchants</p>
									<div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
										<h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{StringUtils.formatWholeNumber(props.allData.TotalCount)}</h3>
										<i className="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
									</div>  
									</div>
								 
								</div>
							</div>
							<div className="col-md-3 grid-margin stretch-card">
								<div className="card">
								<div className="card-body link"  onClick={() => viewCounts('active')}>
									 
									<p className="card-title text-md-center text-xl-left">Active Merchants</p>
									<div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
										<h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{StringUtils.formatWholeNumber(props.allData.ActiveCount)}</h3>
										<i className="ti-user icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
									</div>  
									 
								</div>
								</div>
							</div>
							<div className="col-md-3 grid-margin stretch-card">
								<div className="card">
								<div className="card-body link" onClick={() => viewCounts('closed')}>
								 
									<p className="card-title text-md-center text-xl-left">Closed Merchants</p>
									<div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
									<h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{StringUtils.formatWholeNumber(props.allData.ClosedCount)}</h3>
									<i className="ti-agenda icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
									</div>  
								 
								</div>
								</div>
							</div>
							<div className="col-md-3 grid-margin stretch-card">
								<div className="card">
								<div className="card-body link" onClick={() => viewCounts('inactive')}>
								 
									<p className="card-title text-md-center text-xl-left">In Active Merchants</p>
									<div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
									<h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{StringUtils.formatWholeNumber(props.allData.InactiveCount)}</h3>
									<i className="ti-layers-alt icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
									</div>  
								 
								</div>
								</div>
							</div>
						</Row>
						
						 
						 
						<Row>
							<DataTable title={title} data={props.isoMerchantList} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => viewIsoMerchants(data)} 
								columns={columns} pagination/>

						</Row>
					 
					
				 
						
					
				</div>
					
				
					
					 
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
  );
}
 

const  mapStateToProps = (state) =>{ 
	return {
		
		lists: state.central.lists,
		user: state.central.user,
		
  
  
	}
  };
  
  const mapDispatchToProps = (dispatch) => {
	return {
	 
	}
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetGenericMerchantList))

