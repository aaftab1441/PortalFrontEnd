import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm} from 'react-material-ui-form-validator';
import TextBox from '/components/common/TextBox';
import SelectField from '/components/common/SelectField';

import * as AppConstants from '/utilities/constants';
import * as StringUtils from '/utilities/string';
import DataTable from 'react-data-table-component';
import { Row, Col,Form} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import { withRouter} from "next/router";

//import Button from '@mui/material/Button';
// import styled from 'styled-components';
const conditionalRowStyles = [
	{
	  when: row => row.MerchantCount == 0,
	  style: {
		color: 'red',
	  },
	} 
  ];

class GetUserList  extends React.Component  {

	constructor(props){
		super(props);
		this.state = {value: 0}
	}	
	viewUser(theUser) {
		this.props.registerFromLocation(AppConstants.USER_LIST_PATH);
		this.props.viewUser(theUser, this.props.user, this.props.lists);
		this.props.router.push(AppConstants.MERCHANT_MAINTAIN_USER_PATH);	
	}

	addUser() {
		this.props.registerFromLocation(AppConstants.USER_LIST_PATH);
		this.props.addUser(this.props.user);
		this.props.router.push(AppConstants.MERCHANT_ADD_USER_PATH);	
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
		this.props.changeMerchantUserPage(this.props.userSearchParams, this.props.user, pageInfo);
	}

	handleSort (tableName, column, sortDirection)  {
		let params = this.getPageDefaults(tableName);
		params['SortField'] = column.sortField;
		params['SortDirection'] = sortDirection;
		this.props.changeMerchantUserPage(this.props.userSearchParams, this.props.user, pageInfo);
	}

	changeRowsPerPage ( rowsPerPage, currentPage) {
		let params = this.getPageDefaults();
		params['PageSize'] = rowsPerPage;
		params['Page'] = 1;
		this.props.changeMerchantUserPage(this.props.userSearchParams, this.props.user, pageInfo);
	}
	
	doSearch(){
		let pageInfo = this.getPageDefaults();
		pageInfo['Page'] = 1;
		this.props.doSearch(this.props.userSearchParams, this.props.user, pageInfo);
	}


	render() {
		let userList = [];
		let count = 0;
		let startCount = 0;
		let title = '';
		console.log("Get Merchant List", this.props);
		title = 'User List';
		


		if(this.props && this.props.userList && this.props.userList.length > 0){
			userList = this.props.userList;
		}

		const columns = [
			{ selector: row => row.Email_ID, name: "Email" , sortable: true},
			{ selector: row => row.First_Name, name: "First Name", sortable: true },
			{ selector: row => row.Last_Name, name: "Last Name", sortable: true },	
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
								<ValidatorForm className="pt-3" onSubmit={(data) => this.props.getUsers(this.props.userSearchParams, this.props.user, this.getPageDefaults())}>
									<Row>
										<Col md={3}>
											<div className={'pb-10'}>Email </div>
											<TextBox
												value={StringUtils.getValue(this.props.userSearchParams.emailId)}
												onChange={(evt) => this.props.handleItemChange('emailId', evt.target.value)}
												validators={[]}
												className={'col-md-12'}
												m={20}
												errorMessages={["REQUIRED"]}
												variant={'outlined'} size="small"
												inputprops={{
													name: 'emailId',
													id: 'emailId',
													placeholder: 'Email  ...',
													type: 'text',
													
												}}
											/>
						
										</Col>
										<Col md={3}>
											<div className={'pb-10'}>First Name </div>
											<TextBox
												value={StringUtils.getValue(this.props.userSearchParams.firstName)}
												onChange={(evt) => this.props.handleItemChange('firstName', evt.target.value)}
												validators={[]}
												className={'col-md-12'}
												m={20}
												errorMessages={["REQUIRED"]}
												variant={'outlined'} size="small"
												inputprops={{
													name: 'firstName',
													id: 'firstName',
													placeholder: 'First Name  ...',
													type: 'text',
													
												}}
											/>
						
										</Col>
										<Col md={3}>
											<div className={'pb-10'}>Last Name </div>
											<TextBox
												value={StringUtils.getValue(this.props.userSearchParams.lastName)}
												onChange={(evt) => this.props.handleItemChange('lastName', evt.target.value)}
												validators={[]}
												className={'col-md-12'}
												m={20}
												errorMessages={["REQUIRED"]}
												variant={'outlined'} size="small"
												inputprops={{
													name: 'lastName',
													id: 'lastName',
													placeholder: 'Last Name  ...',
													type: 'text',
													
												}}
											/>
						
										</Col>
										<Col md={1} className="text-bottom" >&nbsp;</Col>
										<Col md={1} className="text-bottom" >
											<div className={'pb-10'}>&nbsp;</div>
											<Button variant="contained" color="primary" type="submit"  className=""> <i className="ti-search menu-icon"></i> <br /></Button>
										</Col>
										<Col md={1} className="text-bottom" >
											<div className={'pb-10'}>&nbsp;</div>
											<Button variant="contained" color="primary" type="button"  className="" onClick={() => this.addUser()}> <i className="ti-plus menu-icon"></i> <br /></Button>
										</Col>
									</Row>	
							</ValidatorForm>
							
							
								<DataTable title={title} onRowClicked={(data) => this.viewUser(data)}
									paginationTotalRows={this.props.count} data={userList}
									paginationPerPage={this.props.pageInfo.PageSize} columns={columns} paginationServer={true}
									onChangePage={(page, totalRows) => this.changePage(page)} conditionalRowStyles={conditionalRowStyles} 
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

GetUserList.propTypes = {
  displayWarning: PropTypes.func,
};

export default withRouter(GetUserList);

