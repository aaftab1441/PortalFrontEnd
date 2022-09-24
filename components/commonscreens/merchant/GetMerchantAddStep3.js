import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../../common/TextBox';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Row, Col } from 'react-bootstrap';
import { Button } from '@mui/material';


function GetMerchantAddStep3(props) {

	return (
		<div>
			<div className="row">
				<div className="col-lg-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-12" id="search">
									<h4>ISO INFORMATION</h4>
									<Stepper activeStep={2} alternativeLabel>

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
									<ValidatorForm className="pt-3" onSubmit={() => { props.saveIsoInfo(props.isoInfo, props.merchantId) }}>

										<Row>
											<Col>
												ISO INFORMATION
											</Col>
											<br /><br />
										</Row>
										<Row>
											<Col>
												<p>You can enter 0000s for all fields if there is no sales office or sub iso.</p>
												<br /><br />
											</Col>
										</Row>
										<Row>
											<div className="col-md-12 form-group">
												<Row>
													<Col md={6}>
														<label>ISO Code</label>
														<TextBox
															value={props.isoInfo.iso_code}
															onChange={props.handleItemChange}
															errorMessages={['ISO Code is required', 'ISO Code is invalid']}
															validators={['required', 'matchRegexp:^[0-9]{4}$']}
															variant={'outlined'} size="small"
															inputProps={{
																name: 'iso_code',
																id: 'iso_code',
																placeholder: 'ISO CODE',
																type: 'text',
																classselector: "h-auto"
															}}
														/>
													</Col>
													<Col md={6}>
														<label>Sub ISO</label>
														<TextBox
															value={props.isoInfo.sub_iso_code}
															onChange={props.handleItemChange}
															errorMessages={['Sub ISO Code is required', 'Sub ISO Code is invalid']}
															validators={['required', 'matchRegexp:^[0-9]{4}$']}
															variant={'outlined'} size="small"
															inputProps={{
																name: 'sub_iso_code',
																id: 'sub_iso_code',
																placeholder: 'SUB ISO',
																type: 'text',
																classselector: "h-auto"
															}}
														/>
													</Col>
												</Row>
											</div>
											<div className="col-md-12 form-group">

												<Row>
													<Col md={6}>
														<label>Sales Office</label>
														<TextBox
															value={props.isoInfo.sales_office}
															onChange={props.handleItemChange}
															errorMessages={['Sales Office is required', 'Sales Office is invalid']}
															validators={['required', 'matchRegexp:^[0-9]{4}$']}
															variant={'outlined'} size="small"
															inputProps={{
																name: 'sales_office',
																id: 'sales_office',
																placeholder: 'SALES OFFICE',
																type: 'text',
																classselector: "h-auto"
															}}
														/>
													</Col>
													<Col md={6}>
														<label>Sales Rep Code</label>
														<TextBox
															value={props.isoInfo.sales_rep_code}
															onChange={props.handleItemChange}
															errorMessages={['Sales Rep Code is required', 'Sales Rep Code is invalid']}
															validators={['required', 'matchRegexp:^[0-9]{3}$']}
															variant={'outlined'} size="small"
															inputProps={{
																name: 'sales_rep_code',
																id: 'sales_rep_code',
																placeholder: 'SALES REP CODE',
																type: 'text',
																classselector: "h-auto"
															}}
														/>
													</Col>

												</Row>
											</div>
										</Row>
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

GetMerchantAddStep3.propTypes = {
	displayWarning: PropTypes.func,
};

export default GetMerchantAddStep3;

