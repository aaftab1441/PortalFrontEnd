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

function GetMerchantAddStep2(props) {
	let stateList = [];
	let citizenshipList = [];

	if (props.lists && props.lists.STATUS) {

		stateList = props.lists.STATES.map(function (anItem, index) {
			return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
		});
	}
	if (props.lists && props.lists.CITIZENSHIP_LIST) {

		citizenshipList = props.lists.CITIZENSHIP_LIST.map(function (anItem, index) {
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
									<h4>OWNER INFORMATION</h4>
									<Stepper activeStep={1} alternativeLabel>

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
										<Step key={'Fee_Disc'}>
											<StepLabel>Fee/Disc</StepLabel>
										</Step>
									</Stepper>
									<ValidatorForm onSubmit={() => { props.saveOwners(props.owners, props.merchantId) }} className="pt-3" >
										<Row>
											<Col md={11}>OWNER(s) INFORMATION</Col>
											<Col md={1}>
												<Button onClick={props.addOwner} className='btn btn-sm'>
													+ Add
												</Button>
											</Col>

											<br /><br />
										</Row>
										{props.owners.map((owner, index) => {
											return (
												<Row key={index}>

													<Col>OWNER {index + 1} INFORMATION</Col>
													<br /><br />

													<div className="col-md-12 form-group">
														<Row>
															<Col md={3} >
																<label>First Name</label>
																<TextBox
																	value={owner.ownerfirstname}
																	validators={index < 1 ? (index > 0) && (owner.ownerfirstname === '') ? [] : ['required'] : []}
																	errorMessages={['First name is required']}
																	variant={'outlined'} size="small"
																	onChange={(event) => props.handleItemChange(event, index)}
																	inputProps={{
																		name: `ownerfirstname${index}`,
																		id: `${index}`,
																		placeholder: 'First Name',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>
															</Col>
															<Col md={3}>
																<label>Middle Name</label>
																<TextBox
																	value={owner.ownermiddlename}
																	onChange={(event) => props.handleItemChange(event, index)}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownermiddlename${index}`,
																		id: `${index}`,
																		placeholder: 'Middle Initial',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>
															</Col>
															<Col md={3}>
																<label>Last Name</label>
																<TextBox
																	value={owner.ownerlastname}
																	validators={(index > 0) && (owner.ownerfirstname === '') ? [] : (index > 0) && (owner.ownerfirstname === '') ? [] : ['required']}
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['Last name is required']}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownerlastname${index}`,
																		id: `${index}`,
																		placeholder: 'Last Name',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>
															</Col>
															<Col md={3}>
																<label>Birth Date (MM/DD/CCYY)</label>

																<TextBox
																	value={(owner.ownerbirthdate)}
																	onChange={(event) => props.handleItemChange(event, index)}
																	validators={(index > 0) && (owner.ownerfirstname === '') ? [] : ['required']}
																	errorMessages={['Date is required']}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownerbirthdate${index}`,
																		id: `${index}`,
																		placeholder: '',
																		type: 'date',

																	}} />


															</Col>

														</Row>
													</div>
													<div className="col-md-12 form-group">
														<Row>
															<Col md={3} >
																<label>Email</label>
																<TextBox
																	value={(owner.owneremail)}
																	size="small"
																	validators={(index > 0) && (owner.ownerfirstname === '') ? [] : ['required', 'required', 'isEmail']}
																	errorMessages={['Email is required', 'Email is not valid']}
																	onChange={(event) => props.handleItemChange(event, index)}
																	variant={'outlined'}
																	inputProps={{
																		name: `owneremail${index}`,
																		id: `${index}`,
																		placeholder: 'Email',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>

															</Col>
															<Col md={3} >
																<label>Home Address</label>
																<TextBox
																	value={(owner.owneraddress)}
																	size="small"
																	validators={(index > 0) && (owner.ownerfirstname === '') ? [] : ['required']}
																	errorMessages={['Address is required']}
																	onChange={(event) => props.handleItemChange(event, index)}
																	variant={'outlined'}
																	inputProps={{
																		name: `owneraddress${index}`,
																		id: `${index}`,
																		placeholder: 'Home Address',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>

															</Col>
															<Col md={3} >
																<label>City</label>
																<TextBox
																	value={(owner.ownercity)}
																	size="small"
																	validators={(index > 0) && (owner.ownerfirstname === '') ? [] : ['required']}
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['City is required']}
																	variant={'outlined'}
																	inputProps={{
																		name: `ownercity${index}`,
																		id: `${index}`,
																		placeholder: 'City',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>

															</Col>
															<Col md={3}>
																<label>State</label>
																<SelectField
																	value={(owner.ownerstate)}
																	validators={(index > 0) && (owner.ownerfirstname === '') ? [] : ['required']}
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['State is required']}
																	variant="outlined" size="small"
																	inputProps={{
																		name: `ownerstate${index}`,
																		id: `${index}`,
																	}}
																>
																	{stateList}
																</SelectField>
															</Col>


														</Row>
													</div>
													<div className="col-md-12 form-group">
														<Row>
															<Col md={3} >
																<label>Zip</label>
																<TextBox
																	value={(owner.ownerzipcode)}
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['ZipCode is required', 'ZipCode # is invalid']}
																	validators={['required', 'matchRegexp:^[0-9]{5}$']}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownerzipcode${index}`,
																		id: `${index}`,
																		placeholder: 'Zip code',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>

															</Col>
															<Col md={3} >
																<label>Zip + Four</label>
																<TextBox
																	value={(owner.ownerzipcodeplusfour)}
																	variant={'outlined'} size="small"
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['ZipCode # is invalid']}
																	validators={['matchRegexp:^[0-9]{5}$']}
																	inputProps={{
																		name: `ownerzipcodeplusfour${index}`,
																		id: `${index}`,
																		placeholder: 'Zip + Four',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>

															</Col>
															<Col md={3} >
																<label>Citizenship</label>
																<SelectField
																	value={(owner.ownercitizenship)}
																	onChange={props.handleItemChange}
																	variant="outlined" size="small"
																	errorMessages={['Required']}
																	inputProps={{
																		name: `ownercitizenship${index}`,
																		id: `${index}`,
																	}}
																>
																	{citizenshipList}
																</SelectField>
															</Col>

															<Col md={3} >
																<label>% Ownership</label>
																<TextBox
																	value={(owner.ownerpercent)}
																	validators={(index > 0) && (owner.ownerfirstname === '') ? [] : ['required']}
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['% is required']}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownerpercent${index}`,
																		id: `${index}`,
																		placeholder: '% Ownership',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>

															</Col>
														</Row>
													</div>
													<div className="col-md-12 form-group">
														<Row>
															<Col md={3} >
																<label>Title</label>
																<TextBox
																	value={(owner.ownertitle)}
																	validators={(index > 0) && (owner.ownerfirstname === '') ? [] : ['required']}
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['Title is required']}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownertitle${index}`,
																		id: `${index}`,
																		placeholder: 'Title',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>

															</Col>
															<Col md={3} >
																<label>Social Security #</label>
																<TextBox
																	value={(owner.ownersocialsecurity)}
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['Social Security # is required', 'Social Security # is invalid']}
																	validators={['matchRegexp:^[0-9]{3}-[0-9]{2}-[0-9]{4}$']}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownersocialsecurity${index}`,
																		id: `${index}`,
																		placeholder: 'Social Security Number',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>
															</Col>
															<Col md={3} >
																<label>Home Phone</label>
																<TextBox
																	value={(owner.ownerhomephone)}
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['Phone is required', 'Phone is invalid']}
																	validators={['matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$']}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownerhomephone${index}`,
																		id: `${index}`,
																		placeholder: 'Home Phone',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>

															</Col>
															<Col md={3} >
																<label>Cell Phone</label>
																<TextBox
																	value={(owner.ownercellphone)}
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['Cell Phone is invalid']}
																	validators={['matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$']}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownercellphone${index}`,
																		id: `${index}`,
																		placeholder: 'Cell Phone',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>

															</Col>

														</Row>
													</div>
													<div className="col-md-12 form-group">
														<Row>
															<Col md={3} >
																<label>Driver License Number</label>
																<TextBox
																	value={(owner.ownerlicense)}
																	validators={(index > 0) && (owner.ownerlicense === '') ? [] : ['required']}
																	onChange={(event) => props.handleItemChange(event, index)}
																	errorMessages={['License Number is required']}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownerlicense${index}`,
																		id: `${index}`,
																		placeholder: 'Title',
																		type: 'text',
																		classselector: "h-auto"
																	}}
																/>

															</Col>
															<Col md={3}>
																<label>Driver&apos;s License State</label>
																<SelectField
																	onChange={(event) => props.handleItemChange(event, index)}
																	value={(owner.ownerlicensestate)}
																	validators={(index > 0) && (owner.ownerfirstname === '') ? [] : ['required']}
																	errorMessages={['State is required']}
																	variant="outlined" size="small"
																	inputProps={{
																		name: `ownerlicensestate${index}`,
																		id: `${index}`,
																	}}
																>
																	{stateList}
																</SelectField>
															</Col>
															<Col md={3} >
																<label>Driver License Expiration Date</label>

																<TextBox
																	value={(owner.ownerlicenseexpiration)}
																	onChange={(event) => props.handleItemChange(event, index)}
																	validators={(index > 0) && (owner.ownerfirstname === '') ? [] : ['required']}
																	errorMessages={['Date is required']}
																	variant={'outlined'} size="small"
																	inputProps={{
																		name: `ownerlicenseexpiration${index}`,
																		id: `${index}`,
																		placeholder: '',
																		type: 'date',

																	}} />
															</Col>
															<Col md={3}>

															</Col>

														</Row>
													</div>
												</Row>)
										})
										}
										<div className="row">
											<Col md="3">
												<Button variant="contained" color="primary" type="button" onClick={() => props.performReturn()} className="col-md-12"> Return </Button>
											</Col>
											<Col md="6">&nbsp;</Col>
											<Col md="3">
												<Button variant="contained" color="primary" type="submit" className="col-md-12"> Save &amp; Continue </Button>
											</Col>
										</div>
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

GetMerchantAddStep2.propTypes = {
	displayWarning: PropTypes.func,
};

export default GetMerchantAddStep2;

