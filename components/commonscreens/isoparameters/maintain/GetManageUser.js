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
 import ConfirmYesNo from '/components/common/ConfirmYesNo';
 import Paper from '@mui/material/Paper';
 import Tabs from '@mui/material/Tabs';
 import Tab from '@mui/material/Tab';
  
 import * as AppConstants from '/utilities/constants';
 import * as StringUtils from '/utilities/string';
 import MenuItem from '@mui/material/MenuItem';
 import DataTable from 'react-data-table-component';
 import { Row, Col,Form} from 'react-bootstrap'; 
 import { Button } from '@mui/material';
 import GetIsoParametersAccess from "./GetIsoParametersAccess";
 import { withRouter} from "next/router";
 import { TabPanel }  from '/components/common/TabPanel';
 // import styled from 'styled-components';
 import { confirm } from "react-confirm-box";
 import reactReferer from 'react-referer';
 function a11yProps(index) {
   return {
     id: `simple-tab-${index}`,
     'aria-controls': `simple-tabpanel-${index}`,
   };
 }
 
 class GetManageUser  extends React.Component  {
     
     constructor(props){
         super(props);
         this.state = {value: 0}
         this.handleChange = this.handleChange.bind(this)
     }	
 
     handleChange(event, newValue) {
         this.setState({value: newValue})
     }
 
     async deleteItem(item){
         const options = {
             render: (message, onConfirm, onCancel) => {
               return (
                 <ConfirmYesNo message={message} onConfirm={onConfirm} onCancel={onCancel} />
               );
             }
           };
         const result = await confirm("Are you sure you want to delete this user?", options);
         if (result) {
           this.props.deleteItem(item, this.props.user, this.props.currentIsoParameter, this.props.lists, AppConstants.ISO_PARAMETERS_MAINTAIN_DETAIL_PATH);
           return;
         }
          
     }
 
     
      render() {
         console.log("User Detail Props", this.props);
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
             
             const availableColumns = [
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
             
         let appMessages = StringUtils.getDisplayMessages(this.props.messages);
 
         let IsoparametersList = [];
         if(this.props.Isoparameters && this.props.Isoparameters.length > 0){
            IsoparametersList = this.props.Isoparameters.filter(
             item => 
                 (this.props.IsoParametersSearchParams.ISO_Code.toLowerCase().length == 0 || (this.props.IsoParametersSearchParams.ISO_Code.toLowerCase().length > 0 && item.ISO_Code && item.ISO_Code.toLowerCase().includes(this.props.IsoParametersSearchParams.ISO_Code.toLowerCase()))) && 
                 (this.props.IsoParametersSearchParams.VI_Settle_Fee.toLowerCase().length == 0 || (this.props.IsoParametersSearchParams.VI_Settle_Fee.toLowerCase().length > 0 && item.VI_Settle_Fee && item.VI_Settle_Fee.toLowerCase().includes(this.props.IsoParametersSearchParams.VI_Settle_Fee.toLowerCase()))) && 
                 (this.props.IsoParametersSearchParams.MC_Settle_Fee.toLowerCase().length == 0 || (this.props.IsoParametersSearchParams.MC_Settle_Fee.toLowerCase().length > 0 && item.MC_Settle_Fee && item.MC_Settle_Fee.toLowerCase().includes(this.props.IsoParametersSearchParams.MC_Settle_Fee.toLowerCase()))) && 
                 (this.props.IsoParametersSearchParams.DS_Settle_Fee.toLowerCase().length == 0 || (this.props.IsoParametersSearchParams.DS_Settle_Fee.toLowerCase().length > 0 && item.DS_Settle_Fee && item.DS_Settle_Fee.toLowerCase().includes(this.props.IsoParametersSearchParams.DS_Settle_Fee.toLowerCase())) )
                 
                  
             );
         }
 
         let stateList  = [], isoCodeList = [], salesRepList = [], salesOfficeList = [], subIsoList= [];
         if(this.props.lists &&  this.props.lists.STATES){
             stateList = this.props.lists.STATES.map(function (anItem, index) {
                 return <MenuItem value={anItem.code} key={index + 1}>{anItem.value}</MenuItem>;
             });
              
             
         }
  
         const userLevelCodeList = this.props.lists.ISO_PARAMETERS_ACCESS_LEVELS.map(function (anItem, index) {
             return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
         });
         
      
     
         ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
             if(!this.props.currentIsoParameter.Isoparameters.password && !value){
                 return true;
             }else if (value !== this.props.currentIsoParameter.Isoparameters.password) {
                 return false;
             }
             return true;
         });
         console.log(reactReferer.referer());
         return (
                 <div>
                     {this.props.openUserAccess && <GetIsoParametersAccess {...this.props} />}
                 <div className="row">
                 <div className="col-lg-12">
                     <div className="card">
                     <div className="card-body">
                         <div className="row">
                         <div className="col-12" id="search">
                             <div className="row">
                                 <div className="col-lg-6 col-md-6">
                                     <h4>User Detail</h4>
                                 </div>
                                 <div className="col-lg-6 col-md-6 text-right">					
                                     
                                 </div>
                             </div>
                         <ValidatorForm onSubmit={(data) => this.props.processForm(this.props.currentUser, this.props.user, this.props.lists)}>
                             
                             {appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
                             <Paper>
                             <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="primary" variant="scrollable" scrollButtons="auto"
                                 textColor="primary">
                                 <Tab label="User Information" {...a11yProps(0)} disableRipple/>
                                 <Tab label="Connected Accounts" {...a11yProps(1)} disableRipple/>
                                 
                             </Tabs>
                             <TabPanel value={this.state.value} index={0}>
                             
                             <div className="row">
                                 <div className="col-md-12">
                                     <h4 className="card-description">General Information</h4>
                                 </div>
                                 <div className="col-xl-4 col-lg-4 col-md-4">
                                     <b>First Name:</b><br />
                                     <TextBox
                                                     value={StringUtils.getValue(this.props.currentUser.UserDetails.First_Name)}
                                                     onChange={this.props.handleItemChange}
                                                     validators={[]}
                                                     className={'col-md-12'}
                                                     m={20}
                                                     errorMessages={["REQUIRED"]}
                                                     variant={'outlined'} size="small"
                                                     inputProps={{
                                                         name: 'First_Name',
                                                         id: 'First_Name',
                                                         placeholder: 'First Name  ...',
                                                         type: 'text',
                                                         
                                                     }}
                                                 /> 
                                 </div>
                                 <div className="col-xl-4 col-lg-4 col-md-4">
                                     <b>Last Name:</b><br /> 
                                         <TextBox
                                             value={StringUtils.getValue(this.props.currentUser.UserDetails.Last_Name)}
                                             onChange={this.props.handleItemChange}
                                             validators={[]}
                                             className={'col-md-12'}
                                             m={20}
                                             errorMessages={["REQUIRED"]}
                                             variant={'outlined'} size="small"
                                             inputProps={{
                                                 name: 'Last_Name',
                                                 id: 'Last_Name',
                                                 placeholder: 'Last Name  ...',
                                                 type: 'text',
                                                 
                                             }}
                                         />
                                     
                                 </div>
                                 <div className="col-xl-4 col-lg-4 col-md-4">
                                     <b>Email ID:</b><br />
                                         <TextBox
                                                 value={StringUtils.getValue(this.props.currentUser.UserDetails.Email_ID)}
                                                 onChange={this.props.handleItemChange}
                                                 validators={[]}
                                                 className={'col-md-12'}
                                                 m={20}
                                                 errorMessages={["REQUIRED"]}
                                                 variant={'outlined'} size="small"
                                                 inputProps={{
                                                     name: 'Email_ID',
                                                     id: 'Email_ID',
                                                     placeholder: 'Email  ...',
                                                     type: 'text',
                                                     
                                                 }}
                                             />
                                     
                                 </div>
                                 
                                 
                                 
                                 <div className="col-md-12 pt-3">
                                     <h4 className="card-description">Mailing Address</h4>
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Address 1:</b><br /> 	<TextBox
                                                 value={StringUtils.getValue(this.props.currentUser.UserDetails.Address)}
                                                 onChange={this.props.handleItemChange}
                                                 validators={[]}
                                                 className={'col-md-12'}
                                                 m={20}
                                                 errorMessages={["REQUIRED"]}
                                                 variant={'outlined'} size="small"
                                                 inputProps={{
                                                     name: 'Address',
                                                     id: 'Address',
                                                     placeholder: 'Address  ...',
                                                     type: 'text',
                                                     
                                                 }}
                                             />						
                                 </div>
                                 
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>City:</b><br /> <TextBox
                                                 value={StringUtils.getValue(this.props.currentUser.UserDetails.City)}
                                                 onChange={this.props.handleItemChange}
                                                 validators={[]}
                                                 className={'col-md-12'}
                                                 m={20}
                                                 errorMessages={["REQUIRED"]}
                                                 variant={'outlined'} size="small"
                                                 inputProps={{
                                                     name: 'City',
                                                     id: 'City',
                                                     placeholder: 'City  ...',
                                                     type: 'text',
                                                     
                                                 }}
                                             />						
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>State:</b><br /> 	
                                         <SelectField
                                             value={StringUtils.getValue(this.props.currentUser.UserDetails.ST)}
                                             onChange={this.props.handleItemChange}
                                             validators={['required']}											
                                             variant="outlined" size="small"
                                             errorMessages={['Required']}
                                             inputProps={{
                                             name: 'ST',
                                             id: 'ST',
                                             }}
                                         >
                                             {stateList}
                                         </SelectField>
                                                     
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Zip:</b><br /><TextBox
                                             value={StringUtils.getValue(this.props.currentUser.UserDetails.Zip)}
                                             onChange={this.props.handleItemChange}
                                             validators={[]}
                                             className={'col-md-12'}
                                             m={20}
                                             errorMessages={["REQUIRED"]}
                                             variant={'outlined'} size="small"
                                             inputProps={{
                                                 name: 'Zip',
                                                 id: 'Zip',
                                                 placeholder: 'Zip  ...',
                                                 type: 'text',
                                                 
                                             }}
                                         />							
                                 </div>
                                 
                                 
                                 <div className="col-md-12 pt-3">
                                     <h4 className="card-description">Access</h4>
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Level {StringUtils.getObjectValue(this.props.currentUser.UserDetails.User_Level_Code, 'User_Level_Code', '' )}:</b><br /> 
                                         <SelectField
                                                     value={StringUtils.getValue(this.props.currentUser.UserDetails.User_Level_Code)}
                                                     onChange={this.props.handleItemChange}
                                                     validators={['required']}											
                                                     variant="outlined" size="small"
                                                     errorMessages={['Required']}
                                                     inputProps={{
                                                     name: 'User_Level_Code',
                                                     id: 'User_Level_Code',
                                                     }}
                                                 >
                                                     {userLevelCodeList}
                                                 </SelectField>					
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Password:</b><br />
                                         <TextBox
                                             value={StringUtils.getValue(this.props.currentUser.UserDetails.Passwd)}
                                             onChange={this.props.handleItemChange}
                                             validators={[]}
                                             className={'col-md-12'}
                                             m={20}
                                             errorMessages={["REQUIRED"]}
                                             variant={'outlined'} size="small"
                                             inputProps={{
                                                 name: 'Passwd',
                                                 id: 'Passwd',
                                                 placeholder: 'Password  ...',
                                                 type: 'password',
                                                 autoComplete : 'off'
                                                 
                                             }}
                                         />							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Confirm Password:</b><br />
                                         <TextBox
                                             value={StringUtils.getValue(this.props.currentUser.UserDetails.ConfirmPasswd)}
                                             onChange={this.props.handleItemChange}
                                             validators={[]}
                                             className={'col-md-12'}
                                             m={20}
                                             errorMessages={["REQUIRED"]}
                                             variant={'outlined'} size="small"
                                             inputProps={{
                                                 name: 'ConfirmPasswd',
                                                 id: 'ConfirmPasswd',
                                                 placeholder: 'Confirm Password  ...',
                                                 type: 'password',
                                                 autoComplete : 'off'
                                                 
                                             }}
                                         />							
                                 </div> 
                                                     
                             </div> 
                             <Row><Col md={'12'}>&nbsp;</Col></Row>  
                             <Row>
                                     <Col md="3"><Button variant="contained" color="primary" type="button" onClick={() => this.props.router.back()}  className="col-md-12">Back</Button></Col>
                                     <Col md="3">{this.props.currentUser && this.props.currentUser.UserDetails && this.props.currentUser.UserDetails.AutoIdent && 
                                     <Button variant="contained" color="secondary" type="button" onClick={() => this.deleteItem(this.props.currentUser, this.props.user, this.props.currentIso, this.props.lists, this.props.router.query.referrer)}  className="col-md-12"> Delete </Button>
                                      }&nbsp;</Col>
                                     <Col md="3">
                                         <Button variant="contained" color="primary" type="submit"   className="col-md-12"> Save </Button>
                                     </Col>
                                 </Row>
             
             
             
             
                             </TabPanel>
                             <TabPanel value={this.state.value} index={1}>
                                 <DataTable title={"User's ISO Parameters"}   data={this.props.currentUser.UserISOParameters} onRowClicked={(data) => this.props.openUserISOParametersAccess(data)} columns={columns} pagination/>
                                 <h4>Available ISO Parameters</h4>
                                 <Row>
                                     <Col md={3}>
                                         <div className={'pb-10'}>ISO Code </div>
                                         <TextBox
                                             value={StringUtils.getValue(this.props.IsoParametersSearchParams.ISO_Code)}
                                             onChange={this.props.handleISOParameterSearchItemChange}
                                             validators={[]}
                                             className={'col-md-12'}
                                             m={20}
                                             errorMessages={["REQUIRED"]}
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
                                             onChange={this.props.handleISOParameterSearchItemChange}
                                             validators={[]}
                                             className={'col-md-12'}
                                             m={20}
                                             variant={'outlined'} size="small"
                                             inputProps={{
                                                 name: 'VI_Settle_Fee',
                                                 id: 'VI_Settle_Fee',
                                                 placeholder: 'VI Settle Fee  ...',
                                                 type: 'numeric',
                                                 
                                             }}
                                         />
                     
                                     </Col>
                                     <Col md={3}>
                                         <div className={'pb-10'}>MC Settle Fee </div>
                                         <TextBox
                                             value={StringUtils.getValue(this.props.IsoParametersSearchParams.MC_Settle_fee)}
                                             onChange={this.props.handleISOParameterSearchItemChange}
                                             validators={[]}
                                             className={'col-md-12'}
                                             m={20}
                                             variant={'outlined'} size="small"
                                             inputProps={{
                                                 name: 'MC_Settle_fee',
                                                 id: 'MC_Settle_fee',
                                                 placeholder: 'MC Settle Fee  ...',
                                                 type: 'numeric',
                                                 
                                             }}
                                         />
                     
                                     </Col>
                                     <Col md={3}>
                                         <div className={'pb-10'}>DS Settle Fee </div>
                                         <TextBox
                                             value={StringUtils.getValue(this.props.IsoParametersSearchParams.DS_Settle_Fee)}
                                             onChange={this.props.handleISOParameterSearchItemChange}
                                             validators={[]}
                                             className={'col-md-12'}
                                             m={20}
                                             variant={'outlined'} size="small"
                                             inputProps={{
                                                 name: 'DS_Settle_Fee',
                                                 id: 'DS_Settle_Fee',
                                                 placeholder: 'DS Settle Fee   ...',
                                                 type: 'numeric',
                                                 
                                             }}
                                         />
                     
                                     </Col>
                                 
                                 </Row>
 
                                 <DataTable title={''} onRowClicked={(data) => this.props.openUserISOParametersAccess(data)} data={IsoparametersList} columns={availableColumns} pagination/>
                             </TabPanel>			
                                             
                         </Paper>
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
 }
 
 GetManageUser.propTypes = {
   displayWarning: PropTypes.func,
 };
 
 export default withRouter(GetManageUser);
 
 