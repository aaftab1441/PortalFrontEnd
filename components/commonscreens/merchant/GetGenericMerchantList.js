import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../common/TextBox';
import SelectField from '../common/SelectField';

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
import {useHistory} from "react-router-dom";
import { actionChannel } from 'redux-saga/effects';
//import Button from '@mui/material/Button';
// import styled from 'styled-components';
 

function GetGenericMerchantList(props) {
  let stateList = [];
  let count = 0;
  let startCount = 0;

  //const classes = useStyles();
  console.log("Merchant List", props);
  let title = "Active Merchants";
  if(props.status == "A"){
	title = "Active Merchants";
  }else if(props.status == "I"){
	title = "Inactive Merchants";
  }else if(props.status == "C"){
	title = "Closed Merchants";
  }else if(props.status == "T"){
	title = "All Merchants";
  }
  const history = useHistory();
  let irsTaxList  = [];
  let appMessages = StringUtils.getDisplayMessages(props.messages);
  const columns = [
	{ selector: "mm_cust_no", name: "MID" , sortable: true},
	{ selector: "mm_legal_name", name: "Legal Name", sortable: true},
	{ selector: "mm_dba_name", name: "DBA Name", sortable: true },
	{ selector: "mm_location_address", name: "Address", sortable: true },
	{ selector: "mm_location_address_2", name: "Address 2", sortable: true },
	{ selector: "mm_location_city", name: "City", sortable: true },
	{ selector: "mm_location_state", name: "State", sortable: true },
	{ selector: "mm_location_zip", name: "Zip", sortable: true },
   
	];
	let iso = {};
	if(props.allData && props.allData.ISO && props.allData.ISO.length > 0){
		iso = props.allData.ISO[0];
	}
	console.log("ISO Name", iso);
   return (
		<div>
		  <div className="row">
			<div className="col-lg-12">
			  <div className="card">
				<div className="card-body">
				  <div className="row">
					<div className="col-12" id="search">
						
						<h4>{iso.ISO_NAME}: {props.title}</h4>
						 
						<Row>
							<DataTable title={title} data={props.data} paginationComponentOptions={{ noRowsPerPage: true }} onRowClicked={(data) => props.viewMerchant(data)} 
								columns={columns} pagination/>

						</Row>
					 
					
					<div className="row">
						<Col md="9"></Col>
						<Col md="3">
							<Button variant="contained" color="primary" type="button" onClick={() => history.goBack()}  className="col-md-12"> Back </Button>
						</Col>
					</div>
						
					
				</div>
					
				
					
					 
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
  );
}

GetGenericMerchantList.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetGenericMerchantList;

