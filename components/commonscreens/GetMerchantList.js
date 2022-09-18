import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../common/TextBox';
import SelectField from '../common/SelectField';

import * as AppConstants from '../../utilities/constants';
import * as StringUtils from '../../utilities/string';
import { Row, Col,Form} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
//import Button from '@mui/material/Button';
// import styled from 'styled-components';

function GetMerchantList(props) {
  let userList = [];
  let count = 0;
  let startCount = 0;
  let title = '';
  console.log("Get Merchant List", props);
  if(/.*all.*/.test(props.searchType)){
	  title = 'All Merchants';
  }else if(/.*active.*/.test(props.searchType)){
	title = 'Active Merchants';
}else if(/.*closed.*/.test(props.searchType)){
	title = 'Closed Merchants';
}else if(/.*inactive.*/.test(props.searchType)){
	title = 'Inactive Merchants';
  }
  console.log('Totle', title, props.searchType);
  const columns = [
	{ selector: row => row.mm_cust_no, name: "MID" , sortable: true},
	{ selector: row => row.mm_legal_name, name: "Legal Name", sortable: true },
	{ selector: row => row.mm_dba_name, name: "DBA Name", sortable: true },
	{ selector: row => row.mm_location_address, name: "Address", sortable: true },
	{ selector: row => row.mm_location_city, name: "City", sortable: true },
	{ selector: row => row.mm_location_state, name: "State", sortable: true },
	{ selector: row => row.mm_location_zip, name: "Zip", sortable: true },
	{ selector: row => row.mm_owner_first_1, name: "Owner 1 First Name", sortable: true },
	{ selector: row => row.mm_owner_mi_1, name: "Owner 1 MI" , sortable: true},
	{ selector: row => row.mm_owner_last_1, name: "Owner 1 Last Name", sortable: true },
	];
	
  	console.log("Merchant List", props);
  	let iso = {};
	if(props.allData && props.allData.ISO && props.allData.ISO.length > 0){
		iso = props.allData.ISO[0];
	}
	const viewMerchant = (merchant) => {
		props.viewMerchant(merchant);
		props.router.push(AppConstants.MERCHANT_DETAIL_PATH);
	}
	const viewIsoMerchants = (data) => {
		let parts = props.searchType.split('/');
		let status = "all";
		parts[1] = data;
		let searchType =  parts.join("/");
		props.getMerchants(searchType, props.user, props.lists, props.merchantSearchParams)
	  }

  let appMessages = StringUtils.getDisplayMessages(props.messages);
  let merchantSearchParams = {};
  console.log("Props", props.searchType);
  return (
		  <div>
		  <div className="row">
			<div className="col-lg-12">
			  <div className="card">
				<div className="card-body">
				  <div className="row">
					<div className="col-12" id="search">
						<ValidatorForm className="pt-3" onSubmit={(data) => props.getMerchants(props.searchType, props.user, props.lists, props.merchantSearchParams)}> 
							<h4>{iso.ISO_NAME}: {title}</h4>
							<Row>
								<div className="col-md-3 grid-margin stretch-card">
									<div className="card">
									 
										<div className="card-body link"  onClick={() => viewIsoMerchants('all')}>
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
									<div className="card-body link"  onClick={() => viewIsoMerchants('active')}>
										 
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
									<div className="card-body link" onClick={() => viewIsoMerchants('closed')}>
									 
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
									<div className="card-body link" onClick={() => viewIsoMerchants('inactive')}>
									  
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
								<Col md={3}>
									<div className={'pb-10'}>Legal Name </div>
									<TextBox
										value={StringUtils.getValue(props.merchantSearchParams.legalName)}
										onChange={props.handleItemChange}
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
										value={StringUtils.getValue(props.merchantSearchParams.dbaName)}
										onChange={props.handleItemChange}
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
										value={StringUtils.getValue(props.merchantSearchParams.mid)}
										onChange={props.handleItemChange}
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
								<Col md={2}>
									<div className={'pb-10'}>Owner Last Name </div>
									<TextBox
										value={StringUtils.getValue(props.merchantSearchParams.ownerLastName)}
										onChange={props.handleItemChange}
										validators={[]}
										className={'col-md-12'}
										m={20}
										errorMessages={["REQUIRED"]}
										variant={'outlined'} size="small"
										inputProps={{
											name: 'ownerLastName',
											id: 'ownerLastName',
											placeholder: 'Owner Last Name  ...',
											type: 'text',
											
										}}
									/>
				
								</Col>
								<Col md={1} className="text-bottom" style={{paddingTop: '10px'}}>
										<Button variant="contained" color="primary" size="small" type="submit"  className=""> <i className="ti-search menu-icon"></i> </Button>
								</Col>
							</Row>	
							<DataTable title={''} onRowClicked={(data) => viewMerchant(data)} data={props.data} columns={columns} pagination/>
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

GetMerchantList.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetMerchantList;

