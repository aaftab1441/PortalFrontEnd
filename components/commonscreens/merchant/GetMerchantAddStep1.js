import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../../common/TextBox';
import SelectField from '../../common/SelectField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Row, Col } from 'react-bootstrap';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import "bootstrap/dist/css/bootstrap.min.css";

function GetMerchantAddStep1(props) {

	let stateList = [];
	if (props.lists && props.lists.STATES) {
		stateList = props.lists.STATES.map(function (anItem) {
			return anItem.value;
		});
	}

	let sicList = [];
	if (props.lists && props.lists.SIC_CODES) {
		sicList = props.lists.SIC_CODES;
	}
	let ownershipList = []
	if (props.lists && props.lists.OWNERSHIP_TYPE_LIST) {
		ownershipList = props.lists.OWNERSHIP_TYPE_LIST.map(function (anItem, index) {
			return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
		});
	}
	let legalbankruptcyList = []
	if (props.lists && props.lists.LEGAL_BANKRUPTCY_LIST) {
		legalbankruptcyList = props.lists.LEGAL_BANKRUPTCY_LIST.map(function (anItem, index) {
			return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
		});
	}

	return (
		<div>
			<div className="row">
				<div className="col-lg-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-12" id="search">
									<Stepper activeStep={0} alternativeLabel>
										<Step key={'General_Information'}>
											<StepLabel>General Information</StepLabel>
										</Step>
										<Step key={'Merchant_Owner'}>
											<StepLabel>Merchant Owner</StepLabel>
										</Step>
										<Step key={'ISO'}>
											<StepLabel>ISO</StepLabel>
										</Step>
										<Step key={'Merchant_Management'}>
											<StepLabel>Location</StepLabel>
										</Step>
										{/* <Step key={'Fee_Disc'}>
											<StepLabel>Fee/Disc</StepLabel>
										</Step> */}
									</Stepper>
									<ValidatorForm className="pt-3" onSubmit={() => { props.saveMerchant(props.merchant) }}>
										<Row>
											<Col>Legal Information</Col>
											<br /><br />
										</Row>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={3} >
													<label>Legal Name</label>
													<TextBox
														validators={['required']}
														errorMessages={['Legal name is required']}
														value={props.merchant.legalname}
														onChange={props.handleItemChange}
														variant={'outlined'}
														size="small"
														inputProps={{
															name: 'legalname',
															id: 'legalname',
															placeholder: 'Legal Name',
															type: 'text',
														}}
													/>
												</Col>
												<Col md={3} >
													<label>Address</label>
													<TextBox
														value={(props.merchant.legaladdress)}
														onChange={props.handleItemChange}
														validators={['required']}
														errorMessages={['Address is required']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'legaladdress',
															id: 'legaladdress',
															placeholder: 'Address',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={3} >
													<label>City</label>
													<TextBox
														value={(props.merchant.legalcity)}
														onChange={props.handleItemChange}
														validators={['required']}
														errorMessages={['City is required']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'legalcity',
															id: 'legalcity',
															placeholder: 'Legal City',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={3}>
													<label>State</label>
													<Autocomplete
														size="small"
														options={stateList}
														className={'col-md-12'}
														getOptionLabel={(option) => option}
														onChange={(event, value) => props.handleAutoCompleteChange("legalstate", value)}
														renderInput={(params) => <TextBox
															{...params} variant="outlined"
															errorMessages={['State is required']}
															validators={['required']}
															name="legalstate"
															value={props.merchant.legalstate}
														/>}
													/>
												</Col>
											</Row>
										</div>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={2} >
													<label>Zip</label>
													<TextBox
														value={(props.merchant.legalzipcode)}
														onChange={props.handleItemChange}
														errorMessages={['ZipCode is required', 'ZipCode is invalid']}
														validators={['required', 'matchRegexp:^[0-9]{5}$']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'legalzipcode',
															id: 'legalzipcode',
															placeholder: 'Zip',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={2} >
													<label>Zip + Four</label>
													<TextBox
														value={(props.merchant.legalzipcodeplus4)}
														onChange={props.handleItemChange}
														errorMessages={['ZipCode is invalid']}
														validators={['matchRegexp:^[0-9]{5}$']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'legalzipcodeplus4',
															id: 'legalzipcodeplus4',
															placeholder: 'ZipCode + Four',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={4} >
													<label>Phone</label>
													<TextBox
														value={(props.merchant.legalphone)}
														onChange={props.handleItemChange}
														errorMessages={['Phone is required', 'Phone is invalid']}
														validators={['required', 'matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'legalphone',
															id: 'legalphone',
															placeholder: 'Phone',
															type: 'text',
														}}
													/>
												</Col>
												<Col md={4} >
													<label>Fax</label>
													<TextBox
														value={(props.merchant.legalfax)}
														onChange={props.handleItemChange}
														errorMessages={['Fax is required', 'Fax is invalid']}
														validators={['required', 'matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'legalfax',
															id: 'legalfax',
															placeholder: 'Fax',
															type: 'text',

														}}
													/>

												</Col>
											</Row>
										</div>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={4} >
													<label>Email</label>
													<TextBox
														value={(props.merchant.emailaddress)}
														onChange={props.handleItemChange}
														validators={['required', 'isEmail']}
														errorMessages={['Email is required', 'Email is not valid']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'emailaddress',
															id: 'emailaddress',
															placeholder: 'Email',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={4} >
													<label>Website Address</label>
													<TextBox
														value={(props.merchant.website)}
														onChange={props.handleItemChange}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'website',
															id: 'website',
															placeholder: 'Website Address',
															type: 'text',

														}}
													/>

												</Col>

												<Col md={4} >
													<label>Federal Tax ID</label>
													<TextBox
														value={(props.merchant.federalid)}
														onChange={props.handleItemChange}
														errorMessages={['Federal Tax ID is invalid']}
														validators={['matchRegexp:^[0-9]{3}-[0-9]{2}-[0-9]{4}$']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'federalid',
															id: 'federalid',
															placeholder: 'Federal Tax ID',
															type: 'text',

														}}
													/>

												</Col>
											</Row>
										</div>
										<div className="col-md-12 form-group">
											<Row>

												<Col md={3}>
													<label>State</label>
													<Autocomplete
														size="small"
														options={stateList}
														className={'col-md-12'}
														getOptionLabel={(option) => option}
														onChange={(event, value) => props.handleAutoCompleteChange("stateofincorporation", value)}
														renderInput={(params) => <TextBox
															{...params} variant="outlined"
															errorMessages={['State is required']}
															validators={['required']}
															name="stateofincorporation"
															value={props.merchant.stateofincorporation}
														/>}
													/>
												</Col>
												<Col md={3}>
													<label>Date Of Incorporation (MM/DD/YYYY)</label>

													<TextBox
														value={(props.merchant.dateofincorporation)}
														onChange={props.handleItemChange}
														validators={['required']}
														errorMessages={["Date is required"]}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'dateofincorporation',
															id: 'dateofincorporation',
															placeholder: '',
															type: 'date',

														}} />


												</Col>
												<Col md={3}>
													<label>How long in present business years?</label>
													<TextBox
														value={(props.merchant.howlongdba)}
														onChange={props.handleItemChange}
														errorMessages={['Bussiness Years required', 'Input is invalid, Should be number']}
														validators={['required', 'matchRegexp:^[0-9]$']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'howlongdba',
															id: 'howlongdba',
															placeholder: 'BUSINESS YEARS',
															type: 'text',

														}}
													/>

												</Col>

												<Col md={3}>
													<label>Ownership Type</label>
													<SelectField
														value={(props.merchant.ownershiptype)}
														onChange={props.handleItemChange}
														variant="outlined" size="small"
														validators={['required']}
														errorMessages={["Type is required"]}
														inputProps={{
															name: 'ownershiptype',
															id: 'ownershiptype',
														}}
													>
														{ownershipList}
													</SelectField>
												</Col>
											</Row>

										</div>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={4}>
													<label>MCC / SIC </label>

													<Autocomplete
														id="mm_irs_sic_code"
														size="small"
														options={sicList}
														getOptionLabel={(option) => option.sic_code + " - " + option.sic_desc}
														renderInput={(params) => <TextBox
															// validators={['required']}
															// errorMessages={["MCC is required"]} 
															{...params} variant="outlined" />}
													/>
												</Col>
												<Col md={4} >
													<label>No of Locations</label>
													<TextBox
														value={(props.merchant.locationnumber)}
														onChange={props.handleItemChange}
														variant={'outlined'} size="small"
														validators={['required']}
														errorMessages={["Number is required"]}
														inputProps={{
															name: 'locationnumber',
															id: 'locationnumber',
															placeholder: 'No of Locations',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={4}>
													<label>Have merchant or owners/principals ever filed?</label>
													<SelectField
														value={(props.merchant.legalbankruptcy)}
														onChange={props.handleItemChange}
														variant="outlined" size="small"
														validators={['required']}
														errorMessages={["Number is required"]}
														inputProps={{
															name: 'legalbankruptcy',
															id: 'legalbankruptcy',
														}}
													>
														{legalbankruptcyList}
													</SelectField>
												</Col>
											</Row>
										</div>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={6} >
													<label>If yes please explain</label>
													<TextBox
														value={(props.merchant.legalbankruptcyexplain)}
														onChange={props.handleItemChange}

														variant={'outlined'} size="small"
														inputProps={{
															name: 'legalbankruptcyexplain',
															id: 'legalbankruptcyexplain',
															placeholder: 'PLEASE EXPLAIN',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={6} >
													<label>If yes Date of Discharge(MM/DD/YYYY)</label>
													<TextBox
														value={(props.merchant.bankruptcydischargedate)}
														onChange={props.handleItemChange}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'bankruptcydischargedate',
															id: 'bankruptcydischargedate',
															placeholder: '',
															type: 'date',

														}} />

												</Col>

											</Row>
										</div>
										<Row></Row>
										<Row>
											<Col>Business References</Col>
											<br /><br />
										</Row>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={6} >
													<label>Business Reference 1</label></Col>
												<Col md={6} >
													<label>Business Reference 2</label></Col>
												<Row></Row>
												<Row></Row>
												<Col md={5} >
													<label>Company Name</label>
													<TextBox
														value={(props.merchant.reference1name)}
														onChange={props.handleItemChange}


														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference1name',
															id: 'reference1name',
															placeholder: 'Company Name',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={2} ></Col>
												<Col md={5} >
													<label>Company Name</label>
													<TextBox
														value={(props.merchant.reference2name)}
														onChange={props.handleItemChange}


														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference2name',
															id: 'reference2name',
															placeholder: 'Company Name',
															type: 'text',

														}}
													/>

												</Col>
											</Row>
										</div>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={5} >
													<label>Address</label>
													<TextBox
														value={(props.merchant.reference1address)}
														onChange={props.handleItemChange}


														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference1address',
															id: 'reference1address',
															placeholder: 'Address',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={2} ></Col>
												<Col md={5} >
													<label>Address</label>
													<TextBox
														value={(props.merchant.reference2address)}
														onChange={props.handleItemChange}


														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference2address',
															id: 'reference2address',
															placeholder: 'Address',
															type: 'text',

														}}
													/>

												</Col>
											</Row>
										</div>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={5} >
													<label>Contact</label>
													<TextBox
														value={(props.merchant.reference1companyname)}
														onChange={props.handleItemChange}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference1companyname',
															id: 'reference1companyname',
															placeholder: 'Contact',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={2} ></Col>
												<Col md={5} >
													<label>Contact</label>
													<TextBox
														value={(props.merchant.reference2companyname)}
														onChange={props.handleItemChange}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference2companyname',
															id: 'reference2companyname',
															placeholder: 'Contact',
															type: 'text',

														}}
													/>

												</Col>
											</Row>
										</div>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={5} >
													<label>Title</label>
													<TextBox
														value={(props.merchant.reference1title)}
														onChange={props.handleItemChange}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference1title',
															id: 'reference1title',
															placeholder: 'Title',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={2} ></Col>
												<Col md={5} >
													<label>Title</label>
													<TextBox
														value={(props.merchant.reference2title)}
														onChange={props.handleItemChange}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference2title',
															id: 'reference2title',
															placeholder: 'Title',
															type: 'text',

														}}
													/>

												</Col>
											</Row>
										</div>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={5} >
													<label>Phone</label>
													<TextBox
														value={(props.merchant.reference1phone)}
														onChange={props.handleItemChange}
														errorMessages={['Phone is invalid']}
														validators={['matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference1phone',
															id: 'reference1phone',
															placeholder: 'Phone',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={2} ></Col>
												<Col md={5} >
													<label>Phone</label>
													<TextBox
														value={(props.merchant.reference2phone)}
														onChange={props.handleItemChange}
														errorMessages={['Phone is invalid']}
														validators={['matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference2phone',
															id: 'reference2phone',
															placeholder: 'Phone',
															type: 'text',

														}}
													/>

												</Col>
											</Row>
										</div>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={5} >
													<label>Fax</label>
													<TextBox
														value={(props.merchant.reference1fax)}
														onChange={props.handleItemChange}
														errorMessages={['Fax is invalid']}
														validators={['matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference1fax',
															id: 'reference1fax',
															placeholder: 'Fax',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={2} ></Col>
												<Col md={5} >
													<label>Fax</label>
													<TextBox
														value={(props.merchant.reference2fax)}
														onChange={props.handleItemChange}
														errorMessages={['Fax is invalid']}
														validators={['matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$']}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference2fax',
															id: 'reference2fax',
															placeholder: 'Fax',
															type: 'text',

														}}
													/>

												</Col>
											</Row>
										</div>
										<div className="col-md-12 form-group">
											<Row>
												<Col md={5} >
													<label>Account #</label>
													<TextBox
														value={(props.merchant.reference1account)}
														onChange={props.handleItemChange}


														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference1account',
															id: 'reference1account',
															placeholder: 'Account',
															type: 'text',

														}}
													/>

												</Col>
												<Col md={2} ></Col>
												<Col md={5} >
													<label>Account #</label>
													<TextBox
														value={(props.merchant.reference2account)}
														onChange={props.handleItemChange}
														variant={'outlined'} size="small"
														inputProps={{
															name: 'reference2account',
															id: 'reference2account',
															placeholder: 'Account',
															type: 'text',

														}}
													/>

												</Col>
											</Row>
										</div>
										<div className="row">
											<Col md={9} >
											</Col>
											<Col md={3}>
												<Button variant="contained" color="primary" type="submit" className="col-md-12 btn-block"> Save &amp; Continue </Button>
											</Col>
										</div>
									</ValidatorForm>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div >
		</div >
	);
}

GetMerchantAddStep1.propTypes = {
	displayWarning: PropTypes.func,
};

export default GetMerchantAddStep1;

