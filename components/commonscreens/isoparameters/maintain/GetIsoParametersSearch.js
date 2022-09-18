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

class GetIsoParametersSearch  extends React.Component  {

	constructor(props){
		super(props);
		this.state = {value: 0}
	}	
	
	componentDidMount(){
		this.props.doSearch(this.props.IsoParametersSearchParams, this.props.user, this.props.lists);
	}
	render(){
		let userList = [];
		let count = 0;
		let startCount = 0;
		const columns = [
			{ selector: row => row.ISO_Code, name: "ISO Code" , sortable: true},
			{ selector: row => row.VI_Settle_Fee, name: "VI Settle Fee", sortable: true },
			{ selector: row => row.VI_Return_Fee, name: "VI Return Fee", sortable: true },
			{ selector: row => row.MC_Settle_Fee, name: "MC Settle Fee", sortable: true },
			{ selector: row => row.MC_Return_Fee, name: "MC Return Fee", sortable: true },
			{ selector: row => row.DS_Settle_Fee, name: "DS Settle Fee", sortable: true },
			{ selector: row => row.DS_Return_Fee, name: "DS Return Fee", sortable: true },
			{ selector: row => row.AX_Settle_Fee, name: "AX Settle Fee", sortable: true },
			{ selector: row => row.AX_Return_Fee, name: "AX Return Fee", sortable: true },
			{ selector: row => row.Pin_Debit_Settle_Fee, name: "Pin Debit Settle Fee", sortable: true },
			{ selector: row => row.EBT_Settle_Fee, name: "EBT Settle Fee", sortable: true },
			{ selector: row => row.VI_Auth_Fee, name: "VI Auth Fee", sortable: true },
			{ selector: row => row.MC_Auth_Fee, name: "MC Auth Fee", sortable: true },
			{ selector: row => row.DS_Auth_Fee, name: "DS Auth Fee", sortable: true },
			{ selector: row => row.AX_Auth_Fee, name: "AX Auth Fee", sortable: true },
			{ selector: row => row.VI_Decline_Auth_Fee, name: "VI Decline Auth Fee", sortable: true },
			{ selector: row => row.MC_Decline_Auth_Fee, name: "MC Decline Auth Fee", sortable: true },
			{ selector: row => row.DS_Decline_Auth_Fee, name: "DS Decline Auth Fee", sortable: true },
			{ selector: row => row.AX_Decline_Auth_Fee, name: "AX Decline Auth Fee", sortable: true },
			{ selector: row => row.Voice_Auth_Fee, name: "Voice Auth Fee", sortable: true },
			{ selector: row => row.AVS_Fee, name: "AVS Fee", sortable: true },
			{ selector: row => row.CVV_Fee, name: "CVV Fee", sortable: true },
			{ selector: row => row.Batch_Fee, name: "Batch Fee" , sortable: true},
			{ selector: row => row.Chargeback_Fee, name: "Chargeback Fee", sortable: true },
			{ selector: row => row.Retrieval_Fee, name: "Retrieval Fee", sortable: true },
			{ selector: row => row.ACH_Reject_Fee, name: "ACH Reject Fee", sortable: true },
			{ selector: row => row.Bank_Acquring_Volume_Fee, name: "Bank Acquring Volume Fee", sortable: true },
			{ selector: row => row.Statement_Mthly_Fee, name: "Statement Mthly Fee", sortable: true },
			{ selector: row => row.PCI_Mthly_Fee, name: "PCI Mthly Fee", sortable: true },
			{ selector: row => row.Debit_Mthly_Fee, name: "Debit Mthly Fee", sortable: true },
			{ selector: row => row.Acct_Setup_Fee, name: "Acct Setup Fee", sortable: true },
			{ selector: row => row.Annual_Fee, name: "Annual Fee", sortable: true },
			{ selector: row => row.DateTime_Added, name: "DateTime Added", sortable: true },
			{ selector: row => row.DateTime_Updated, name: "DateTime Updated", sortable: true },
			];
		
		console.log("ISO Parameters List", this.props);
		let appMessages = StringUtils.getDisplayMessages(this.props.messages);
		return (
				<div>
				<div className="row">
					<div className="col-lg-12">
					<div className="card">
						<div className="card-body">
						<div className="row">
							<div className="col-12" id="search">
								<h4>ISO Parameters Maintain Search</h4>
							<ValidatorForm className="pt-3" onSubmit={(data) => this.props.doSearch(this.props.IsoParametersSearchParams, this.props.user, this.props.lists)}>
									<Row>
											<Col md={3}>
												<div className={'pb-10'}>ISO Code </div>
												<TextBox
													value={this.props.IsoParametersSearchParams.ISO_Code}
													onChange={this.props.handleItemChange}
													validators={[]}
													className={'col-md-12'}
													m={20}
													variant={'outlined'} size="small"
													inputProps={{
														name: 'ISO_Code',
														id: 'ISO_Code',
														placeholder: 'ISO Code  ...',
														type: 'text',
														
													}}
												/>
							
											</Col>
											<Col md={3}>
												<div className={'pb-10'}>VI Settle Fee </div>
												<TextBox
													value={StringUtils.getValue(this.props.IsoParametersSearchParams.VI_Settle_Fee)}
													onChange={this.props.handleItemChange}
													validators={[]}
													className={'col-md-12'}
													m={20}
													variant={'outlined'} size="small"
													inputProps={{
														name: 'VI_Settle_Fee',
														id: 'VI_Settle_Fee',
														placeholder: 'VI Settle Fee  ...',
														type: 'text',
														
													}}
												/>
							
											</Col>
											<Col md={3}>
												<div className={'pb-10'}>MC Settle Fee </div>
												<TextBox
													value={StringUtils.getValue(this.props.IsoParametersSearchParams.MC_Settle_Fee)}
													onChange={this.props.handleItemChange}
													validators={[]}
													className={'col-md-12'}
													m={20}
													variant={'outlined'} size="small"
													inputProps={{
														name: 'MC_Settle_Fee',
														id: 'MC_Settle_Fee',
														placeholder: 'MC Settle Fee  ...',
														type: 'text',
														
													}}
												/>
							
											</Col>
											<Col md={2}>
												<div className={'pb-10'}>DS Settle Fee </div>
												<TextBox
													value={StringUtils.getValue(this.props.IsoParametersSearchParams.DS_Settle_Fee)}
													onChange={this.props.handleItemChange}
													validators={[]}
													className={'col-md-12'}
													m={20}
													variant={'outlined'} size="small"
													inputProps={{
														name: 'DS_Settle_Fee',
														id: 'DS_Settle_Fee',
														placeholder: 'DS Settle Fee  ...',
														type: 'text',
														
													}}
												/>
							
											</Col>
											<Col md={1} className="text-bottom" >
											<div className={'pb-10'}>&nbsp; </div>
													<Button variant="contained" color="primary" type="submit"  className=""> <i className="ti-search menu-icon"></i> <br /></Button>
											</Col>
										</Row>		  
								
							</ValidatorForm>
							
								<DataTable title={"Results"} onRowClicked={(data) => console.log(this.props.viewIsoParameters(data, this.props.user))} data={this.props.isoParametersSearchData} columns={columns} pagination/>
							
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

GetIsoParametersSearch.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetIsoParametersSearch;

