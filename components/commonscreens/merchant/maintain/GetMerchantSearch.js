import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '/components/common/TextBox';
import SelectField from '/components/common/SelectField';
import * as AppConstants from '/utilities/constants';
import * as StringUtils from '/utilities/string';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTable from 'react-data-table-component';
import { Row, Col,Form} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
//import Button from '@mui/material/Button';
// import styled from 'styled-components';

class GetMerchantSearch  extends React.Component  {

	constructor(props){
		super(props);
		this.state = {value: 0}
	}	
	
	componentDidMount(){
		this.doSearch();
	}
	
	getPageDefaults (){
		let pageInfo = {};
		pageInfo['Page'] = this.props.pageInfo.Page;
		pageInfo['PageSize'] = this.props.pageInfo.PageSize;
		pageInfo['SortDirection'] = this.props.pageInfo.SortDirection;
		pageInfo['SortField'] = this.props.pageInfo.SortField;
		return pageInfo;
	}

	changePage(page){
		console.log("Change Page to", page);
		let pageInfo = this.getPageDefaults();
		pageInfo['Page'] = page ;
		this.props.changePage(this.props.merchantSearchParams, this.props.user, pageInfo);
	}

	handleSort (tableName, column, sortDirection)  {
		let params = this.getPageDefaults(tableName);
		params['SortField'] = column.sortField;
		params['SortDirection'] = sortDirection;
		this.props.changePage(this.props.merchantSearchParams, this.props.user, pageInfo);
	}

	changeRowsPerPage ( rowsPerPage, currentPage) {
		let params = this.getPageDefaults();
		params['PageSize'] = rowsPerPage;
		params['Page'] = 1;
		this.props.changePage(this.props.merchantSearchParams, this.props.user, pageInfo);
	}
	
	doSearch(){
		let pageInfo = this.getPageDefaults();
		pageInfo['Page'] = 1;
		this.props.doSearch(this.props.merchantSearchParams, this.props.user, pageInfo);
	}

	doChange(it){
		console.log(it);
	}
	
	render(){
		 
		const columns = [
		{ selector: row => row.mm_cust_no, name: "MID" , sortable: true},
		{ selector: row => row.mm_legal_name, name: "Legal Name", sortable: true },
		{ selector: row => row.mm_dba_name, name: "DBA Name", sortable: true },
		{ selector: row => row.mm_mail_address, name: "Address", sortable: true },
		{ selector: row => row.mm_mail_city, name: "City", sortable: true },
		{ selector: row => row.mm_mail_state, name: "State", sortable: true },
		{ selector: row => row.mm_mail_zip, name: "Zip", sortable: true },
		];
	   
	  	console.log("Merchant List", this.props);
	  	let appMessages = StringUtils.getDisplayMessages(this.props.messages);
		return (
				<div>
				<div className="row">
					<div className="col-lg-12">
					<div className="card">
						<div className="card-body">
						<div className="row">
							<div className="col-12" id="search">
								<h4>Maintain Merchant Search</h4>
							<ValidatorForm className="pt-3" onSubmit={(data) => this.doSearch(data)}>
									<Row>
											<Col md={3}>
												<div className={'pb-10'}>Legal Name </div>
												<TextBox
													value={this.props.merchantSearchParams.legalName}
													onChange={(evt) => this.props.handleItemChange('legalName', evt.target.value)}  
													validators={[]}
													className={'col-md-12'}
													m={20}
													errorMessages={["REQUIRED"]}
													variant={'outlined'} size="small"
													inputprops={{
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
													onChange={(evt) => this.props.handleItemChange('dbaName', evt.target.value)}  
													validators={[]}
													className={'col-md-12'}
													m={20}
													errorMessages={["REQUIRED"]}
													variant={'outlined'} size="small"
													inputprops={{
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
													onChange={(evt) => this.props.handleItemChange('mid', evt.target.value)}  
													validators={[]}
													className={'col-md-12'}
													m={20}
													errorMessages={["REQUIRED"]}
													variant={'outlined'} size="small"
													inputprops={{
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
													value={StringUtils.getValue(this.props.merchantSearchParams.ownerLastName)}
													onChange={(evt) => this.props.handleItemChange('ownerLastName', evt.target.value)}  
													validators={[]}
													className={'col-md-12'}
													m={20}
													errorMessages={["REQUIRED"]}
													variant={'outlined'} size="small"
													inputprops={{
														name: 'ownerLastName',
														id: 'ownerLastName',
														placeholder: 'Owner Last Name  ...',
														type: 'text',
														
													}}
												/>
							
											</Col>
											<Col md={1} className="text-bottom">
													<div className={'pb-10'}>&nbsp; </div>
													<Button variant="contained" color="primary"   type="submit"  className=""> <i className="ti-search menu-icon"></i> <br /></Button>
											</Col>
										</Row>		  
								
							</ValidatorForm>
							
								<DataTable title={"Results"} onRowClicked={(data) => this.props.viewMerchant(data, this.props.user)}
									paginationTotalRows={this.props.count} data={this.props.merchantSearchData}
									paginationPerPage={this.props.pageInfo.PageSize} columns={columns} paginationServer={true}
									onChangePage={(page, totalRows) => this.changePage(page)}
									paginationRowsPerPageOptions={[10,30,50,100]}  
									onSort={(column, sortDirection) => this.handleSort(column, sortDirection)} sortServer
									onChangeRowsPerPage={(currentRowsPerPage, currentPage) => this.changeRowsPerPage(currentRowsPerPage, currentPage)} pagination/>						
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


GetMerchantSearch.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetMerchantSearch;

