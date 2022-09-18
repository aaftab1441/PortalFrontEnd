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

import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
 
import * as AppConstants from '/utilities/constants';
import * as StringUtils from '/utilities/string';
import MenuItem from '@mui/material/MenuItem';
import DataTable from 'react-data-table-component';
import { Row, Col,Form} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import { withRouter} from "next/router";
import { TabPanel }  from '/components/common/TabPanel';
// import styled from 'styled-components';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class GetListSalesAgents extends React.Component {

	constructor(props){
		super(props);
	}	
	
	componentDidMount() {
		 
	}

	doSearch(){
		this.props.getItems(this.props.params, this.props.user);
	}

	viewItem(theItem) {
		this.props.viewItem(theItem, this.props.user, this.props.lists);
		this.props.router.push(AppConstants.VIEW_SALES_AGENT_PATH); 
	}

	addItem() {
		this.props.addItem(this.props.user, this.props.lists);
		this.props.router.push(AppConstants.VIEW_SALES_AGENT_PATH); 
	}

	render(){
		let itemList = [], tempItemList = [];
		let count = 0;
		let startCount = 0;
		let title = '';
		console.log("Get Merchant List", this.props);
		title = 'Sales Agents  List';
		
		let stateList  = [];
		if(this.props.lists &&  this.props.lists.STATES){
			stateList = this.props.lists.STATES.map(function (anItem, index) {
				return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
			});

		}
 
		if(this.props && this.props.itemList && this.props.itemList.length > 0){
			tempItemList = this.props.itemList;
		}
		const columns = [
			{ selector: row => row.Code, name: "Code" , sortable: true},
			{ selector: row => row.First_Name, name: "First Name", sortable: true },
			{ selector: row => row.Last_Name, name: "Last Name", sortable: true },
			{ selector: row => row.Street_Address, name: "Street Address ", sortable: true },
			{ selector: row => row.City, name: "City", sortable: true },
			{ selector: row => row.State, name: "State", sortable: true },
			{ selector: row => row.Active_status_code, name: "Active Status", sortable: true },
			
			];
			itemList = tempItemList.filter(
				item => 
					(this.props.params.streetAddress.toLowerCase().length == 0 || (this.props.params.streetAddress.toLowerCase().length > 0 && item.Street_Address && item.Street_Address.toLowerCase().includes(this.props.params.streetAddress.toLowerCase()))) && 
					(this.props.params.name.toLowerCase().length == 0 || (this.props.params.name.toLowerCase().length > 0 && item.Name && item.Name.toLowerCase().includes(this.props.params.name.toLowerCase()))) && 
					(this.props.params.city.toLowerCase().length == 0 || (this.props.params.city.toLowerCase().length > 0 && item.City && item.City.toLowerCase().includes(this.props.params.city.toLowerCase()))) && 
					(this.props.params.state.toLowerCase().length == 0 || (this.props.params.state.toLowerCase().length > 0 && item.State && item.State.toLowerCase().includes(this.props.params.state.toLowerCase())) )
					
					 
				);
			
		console.log("ISO List", itemList, tempItemList);
		let userLevelCode = this.props.user.UserDetail ?   this.props.user.UserDetail.User_Level_Code : "";
		let appMessages = StringUtils.getDisplayMessages(this.props.messages);
		
		return (
			<div>
				<div className="row">
				<div className="col-lg-12">
					<div className="card">
					<div className="card-body">
						<div className="row">
						<div className="col-12" id="search"> 
							<ValidatorForm className="pt-3" onSubmit={(data) => this.doSearch()}>
								<Row>
										<Col>
											<div className={'pb-10'}>Name </div>
											<TextBox
												value={StringUtils.getValue(this.props.params.name)}
												onChange={this.props.handleItemChange}
												validators={[]}
												className={'col-md-12'}
												m={20}
												errorMessages={[]}
												variant={'outlined'} size="small"
												inputProps={{
													name: 'name',
													id: 'name',
													placeholder: 'Name  ...',
													type: 'text',
													
												}}
											/>
						
										</Col>
										<Col>
											<div className={'pb-10'}>Street Address</div>
											<TextBox
												value={StringUtils.getValue(this.props.params.streetAddress)}
												onChange={this.props.handleItemChange}
												validators={[]}
												className={'col-md-12'}
												m={20}
												errorMessages={[]}
												variant={'outlined'} size="small"
												inputProps={{
													name: 'streetAddress',
													id: 'streetAddress',
													placeholder: 'Street Address   ...',
													type: 'text',
													
												}}
											/>
						
										</Col>
										<Col>
											<div className={'pb-10'}>City  </div>
											<TextBox
												value={StringUtils.getValue(this.props.params.city)}
												onChange={this.props.handleItemChange}
												validators={[]}
												className={'col-md-12'}
												m={20}
												errorMessages={[]}
												variant={'outlined'} size="small"
												inputProps={{
													name: 'city',
													id: 'city',
													placeholder: 'City  ...',
													type: 'text',
													
												}}
											/>
						
										</Col>
										<Col>
											<div className={'pb-10'}>State </div>
											<SelectField
													value={StringUtils.getValue(this.props.params.state)}
													onChange={this.props.handleItemChange}
													validators={[]}											
													variant="outlined" size="small"
													errorMessages={[]}
													inputProps={{
													name: 'state',
													id: 'state',
													}}
												>
													{stateList}
												</SelectField>
						
										</Col>
										{userLevelCode != "SALES-AGENT" && 
										<Col className="text-bottom text-right">
											<div className={'pb-10'}>&nbsp; </div>
											<Button variant="contained" color="primary" size="small" type="button"  onClick={() => this.addItem()} className=""> <i className="ti-plus menu-icon"></i> <br /></Button>
										</Col>
										}
									</Row>		  
							
							</ValidatorForm>
						
						
							<DataTable title={title} onRowClicked={(data) => this.viewItem(data)} data={itemList} columns={columns} pagination/>
							
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

GetListSalesAgents.propTypes = {
  displayWarning: PropTypes.func,
};

export default withRouter(GetListSalesAgents);

