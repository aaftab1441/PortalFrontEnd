/**
 *
 * GetIsoParameters Detail
 *
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import { ValidatorForm } from 'react-material-ui-form-validator';
 import TextBox from '/components/common/TextBox';
 import ConfirmYesNo from '/components/common/ConfirmYesNo';
 
 import Paper from '@mui/material/Paper';
 import Tabs from '@mui/material/Tabs';
 import Tab from '@mui/material/Tab';
 import Box from '@mui/material/Box';
 import Typography  from '@mui/material/Typography';
 
 import { Row, Col } from 'react-bootstrap';
 import * as AppConstants from '/utilities/constants';
 import * as StringUtils from '/utilities/string';
 import CircularProgress from '@mui/material/CircularProgress';
 import MenuItem from '@mui/material/MenuItem';
 import DataTable from 'react-data-table-component';
 import { TabPanel }  from '/components/common/TabPanel';
 
 import { Button } from '@mui/material';
 import {  TextValidator } from 'react-material-ui-form-validator';
 // import styled from 'styled-components';
 function a11yProps(index) {
   return {
     id: `simple-tab-${index}`,
     'aria-controls': `simple-tabpanel-${index}`,
   };
 }
 
 const customStyles = {
     headCells: {
         style: {
             backgroundColor: '#d3d3d3',
             fontSize: '15px',
             fontWeight: 'bold',
             paddingLeft: '5px', // override the cell padding for data cells
             paddingRight: '5px',
             paddingTop: '5px',
             paddingBottom: '5px',
             whiteSpace: 'wrap',
         },
     },
     headRow: {
         style: {
             minHeight: '31px', // override the row height
         },
     },
     rows: {
         style: {
             minHeight: '31px', // override the row height
         },
     },
     cells: {
         style: {
             paddingLeft: '5px', // override the cell padding for data cells
             paddingRight: '5px',
             paddingTop: '5px',
             paddingBottom: '5px',
         },
     },
 }
 
 class GetIsoParametersDetail extends React.Component {
 
     
 
     constructor(props){
         super(props);
         this.state = {value: 0}
         this.handleChange = this.handleChange.bind(this)
     }	
     
     componentDidMount() {
          
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
         const result = await confirm("Are you sure you want to delete these ISO Parameters?", options);
         if (result) {
             
             this.props.deleteItem(item, this.props.user);
           return;
         }
          
     }
 
     addUser(){
         this.props.addUser(this.props.user, this.props.lists, this.props.currentIsoParameter);
         this.props.router.push(AppConstants.ISO_PARAMETERS_MAINTAIN_USER_ADD_PATH);
     }
     
 
     viewUser (theUser) {
         this.props.viewUser(theUser, this.props.user, this.props.lists);
         this.props.router.push(AppConstants.ISO_PARAMETERS_MAINTAIN_USER_ADD_PATH);		
     }
 
     render(){
         console.log("ISO Parameters Maintain Detail Props", this.props);
         
             
         let appMessages = StringUtils.getDisplayMessages(this.props.messages);
 
 
         let stateList  = [];
         if(this.props.lists &&  this.props.lists.STATES){
             stateList = this.props.lists.STATES.map(function (anItem, index) {
                 return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
         });
 
         }
         let itemList = [];
         if(this.props.currentIsoParameter && this.props.currentIsoParameter.Users && this.props.currentIsoParameter.Users.length > 0){
             itemList = this.props.currentIsoParameter.Users.filter(
             item => 
                 (this.props.userSearchParams.emailId.toLowerCase().length == 0 || (this.props.userSearchParams.emailId.toLowerCase().length > 0 && item.Email_ID && item.Email_ID.toLowerCase().includes(this.props.userSearchParams.emailId.toLowerCase()))) && 
                 (this.props.userSearchParams.firstName.toLowerCase().length == 0 || (this.props.userSearchParams.firstName.toLowerCase().length > 0 && item.First_Name && item.First_Name.toLowerCase().includes(this.props.userSearchParams.firstName.toLowerCase()))) && 
                 (this.props.userSearchParams.lastName.toLowerCase().length == 0 || (this.props.userSearchParams.lastName.toLowerCase().length > 0 && item.Last_Name && item.Last_Name.toLowerCase().includes(this.props.userSearchParams.lastName.toLowerCase()))) && 
                 (this.props.userSearchParams.city.toLowerCase().length == 0 || (this.props.userSearchParams.city.toLowerCase().length > 0 && item.City && item.City.toLowerCase().includes(this.props.userSearchParams.city.toLowerCase())) )
             );
         }
 
         const columns = [
             { selector: row => row.Email_ID, name: "Email" , sortable: true},
             { selector: row => row.First_Name, name: "First Name", sortable: true },
             { selector: row => row.Last_Name, name: "Last Name", sortable: true },
             { selector: row => row.City, name: "City", sortable: true },
             { selector: row => row.User_Level_Code, name: "User Access", sortable: true },			
         ];
     
         return (
             <div>
 
             <div className="row">
             <div className="col-lg-12">
                 <div className="card">
                 <div className="card-body">
                     <div className="row">
                     <div className="col-12" id="search">
                         <div className="row">
                             <div className="col-lg-6 col-md-6">
                                 <h4>Maintain ISO Parameters ({this.props.currentIsoParameter.ISO_Parameters.ISO_Code})</h4>
                             </div>
                             <div className="col-lg-6 col-md-6 text-right">					
                                 <Button variant="contained" color="primary" onClick={() => this.props.router.back()}>Back</Button>
                             </div>
                         </div>
                         
                         {appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
                         <Paper>
                         <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="primary" variant="scrollable" scrollButtons="auto" textColor="primary">
                             <Tab label="ISO Parameters Information" {...a11yProps(0)} disableRipple/>
                             <Tab label="Users" {...a11yProps(1)} />
                         </Tabs>
                         <TabPanel value={this.state.value}  index={0}>
                         <ValidatorForm onSubmit={(data) => this.props.processForm(data, this.props.user, this.props.lists)}>
                             
                             <div className="row">
                                 <div className="col-md-12">
                                     <h4 className="card-description">ISO Parameters Information</h4>
                                 </div>
                                 <div className="col-xl-5 col-lg-6 col-md-6">
                                     <b>ISO Code:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.ISO_Code}
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>VI Settle Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.VI_Settle_Fee}
                                 </div>
                                 <div className="col-xl-2 col-lg-2 col-md-2">
                                     <b>VI Return Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.VI_Return_Fee} 
                                 </div>
                                 <div className="col-xl-5 col-lg-6 col-md-6">
                                     <b>MC Settle Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.MC_Settle_Fee}
                                 </div>
                                 <div className="col-xl-5 col-lg-6 col-md-6">
                                     <b>MC Return Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.MC_Return_Fee}
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DS Settle Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.DS_Settle_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DS Return Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.DS_Return_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>AX Settle Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.AX_Settle_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>AX Return Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.AX_Return_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Pin Debit Settle Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.Pin_Debit_Settle_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>EBT Settle Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.EBT_Settle_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>VI Auth Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.VI_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>MC Auth Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.MC_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DS Auth Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.DS_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>AX Auth Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.AX_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>VI Decline Auth Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.VI_Decline_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>MC Decline Auth Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.MC_Decline_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DS Decline Auth Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.DS_Decline_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>AX Decline Auth Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.AX_Decline_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Voice Auth Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.Voice_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>AVS Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.AVS_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>CVV Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.CVV_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Batch Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.Batch_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Chargeback Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.Chargeback_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Retrieval Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.Retrieval_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>ACH Reject Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.ACH_Reject_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Bank Acquring Volume Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.Bank_Acquring_Volume_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Statement Mthly Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.Statement_Mthly_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>PCI Mthly Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.PCI_Mthly_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Debit Mthly Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.Debit_Mthly_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Acct Setup Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.Acct_Setup_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Annual Fee:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.Annual_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DateTime Added:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.DateTime_Added}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DateTime Updated:</b><br /> {this.props.currentIsoParameter.ISO_Parameters.DateTime_Updated}							
                                 </div>                   
                             </div>
                             </ValidatorForm>
                         </TabPanel>
                         <TabPanel value={this.state.value}  index={1}>
                             <Row>
                                 <Col>
                                         
                                     <ValidatorForm className="pt-3" onSubmit={(data) => this.props.getUsers(this.props.userSearchParams, this.props.user, this.props.lists)}>
                                             <Row>
                                                     <Col md={3}>
                                                         <div className={'pb-10'}>Email </div>
                                                         <TextBox
                                                             value={StringUtils.getValue(this.props.userSearchParams.emailId)}
                                                             onChange={this.props.handleUserSearchChange}
                                                             validators={[]}
                                                             className={'col-md-12'}
                                                             m={20}
                                                             errorMessages={["REQUIRED"]}
                                                             variant={'outlined'} size="small"
                                                             inputProps={{
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
                                                             onChange={this.props.handleUserSearchChange}
                                                             validators={[]}
                                                             className={'col-md-12'}
                                                             m={20}
                                                             errorMessages={["REQUIRED"]}
                                                             variant={'outlined'} size="small"
                                                             inputProps={{
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
                                                             onChange={this.props.handleUserSearchChange}
                                                             validators={[]}
                                                             className={'col-md-12'}
                                                             m={20}
                                                             errorMessages={["REQUIRED"]}
                                                             variant={'outlined'} size="small"
                                                             inputProps={{
                                                                 name: 'lastName',
                                                                 id: 'lastName',
                                                                 placeholder: 'Last Name  ...',
                                                                 type: 'text',
                                                                 
                                                             }}
                                                         />
                                     
                                                     </Col>
                                                     <Col md={2}>
                                                         <div className={'pb-10'}>City </div>
                                                         <TextBox
                                                             value={StringUtils.getValue(this.props.userSearchParams.city)}
                                                             onChange={this.props.handleUserSearchChange}
                                                             validators={[]}
                                                             className={'col-md-12'}
                                                             m={20}
                                                             errorMessages={["REQUIRED"]}
                                                             variant={'outlined'} size="small"
                                                             inputProps={{
                                                                 name: 'city',
                                                                 id: 'city',
                                                                 placeholder: 'City  ...',
                                                                 type: 'text',
                                                                 
                                                             }}
                                                         />
                                     
                                                     </Col>
                                                     <Col md={1} className="text-bottom text-right" >
                                                     <div className={'pb-10'}>&nbsp; </div>
                                                             <Button variant="contained"  color="primary"  title="Add User" type="button"  className="" onClick={() => this.addUser()}> <i className="ti-plus menu-icon"></i><br /> </Button>
                                                     </Col>
                                                 </Row>		  
                                         
                                     </ValidatorForm>
                                     
                                     
                                     <DataTable title={"Users"} onRowClicked={(data) => this.viewUser(data)} data={itemList} columns={columns} pagination/>
                                     
                                     </Col>
                                     
                                     
                                     
                                                     
                                                 
                                                 
                             </Row>
                             <Row>
                                 
                             </Row>
                         </TabPanel>
                         
                                             
                                             
                                         
                     </Paper>
                 
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
 
 GetIsoParametersDetail.propTypes = {
   displayWarning: PropTypes.func,
 };
 
 export default GetIsoParametersDetail;
 
 