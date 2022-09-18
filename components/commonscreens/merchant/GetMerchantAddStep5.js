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

function GetMerchantAddStep5(props) {

	const arrayChunk = (arr, n) => {
		const array = arr.slice();
		const chunks = [];
		while (array.length) chunks.push(array.splice(0, n));
		return chunks;
	};

	let feeTemplates = [];

	if (props.templates) {
		feeTemplates = props.templates.map(function (anItem, index) {
			return <MenuItem value={anItem.id} key={index}>{anItem.name}</MenuItem>;
		});
	}

	let dynamicUI;

	if (props.templates) {

		let selectedTemplate = props.templates.find(obj => {
			return obj.id === props.selectedTemplateId
		})
		if (selectedTemplate) {

			dynamicUI = selectedTemplate.categories.map((category, indexO) => (
				<div key={indexO}>
					<Row>
						<Col>{category.name}</Col>
						<br /><br />
					</Row>
					{arrayChunk(category.fees, 3).map((fees, i) => (
						<Row key={indexO + '_' + i}>
							<div className='col-md-12 form-group'>
								<Row>
									{fees.map((fee, index) => (
										<Col md={4} key={indexO + '_' + index}>
											<label >{fee.description} (Low: {fee.lowValue} High: {fee.highValue})</label>
											<TextBox
												value={(fee.defaultValue)}
												onChange={props.handleItemChange}
												validators={[]}
												type="range"
												errorMessages={["REQUIRED"]}
												placeholder=""
												variant={'outlined'} size="small"
												inputProps={{
													name: `${fee.name + '-' + category.id + '-' + fee.id}`,
													id: `${fee.name + '_' + category.id + '_' + fee.id}`,
													placeholder: '',
													type: 'text',
												}}
											/>
										</Col>
									))}
								</Row>
							</div>
						</Row>
					))}
				</div>
			))
		}
	}

	return (
		<div>
			<div className="row">
				<div className="col-lg-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-12" id="search">
									<h4>Merchant Add</h4>
									<Stepper activeStep={4} alternativeLabel>

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
									<ValidatorForm className="pt-3" onSubmit={(data) => props.addMerchantStep5(props.selectedTemplateId, props.templates, props.merchantId)}>
										<Row>
											<Col>FEES</Col>
											<br /><br />
										</Row>
										<Row>
											<div className='col-md-12 form-group'>
												<Col>
													<label>Fee Templates:</label>
													<SelectField
														value={(props.selectedTemplateId)}
														onChange={props.handleItemChange}
														validators={[]}
														variant="outlined" size="small"
														errorMessages={[]}
														inputProps={{
															name: 'selectedTemplateId',
															id: 'selectedTemplateId',
														}}
													>
														{feeTemplates}
													</SelectField>
												</Col>
											</div>
										</Row>

										{dynamicUI}

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
			</div >
		</div >
	);
}

GetMerchantAddStep5.propTypes = {
	displayWarning: PropTypes.func,
};

export default GetMerchantAddStep5;

