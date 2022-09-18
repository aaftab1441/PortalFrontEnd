/**
 *
 * GetIsoParameters Detail
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
 import Modal from '@mui/material/Modal';
 import * as AppConstants from '/utilities/constants';
 import * as StringUtils from '/utilities/string';
 import MenuItem from '@mui/material/MenuItem';
 import DataTable from 'react-data-table-component';
 import { Row, Col,Form} from 'react-bootstrap'; 
 import { Button } from '@mui/material';
 import { withRouter} from "next/router";
 import { TabPanel }  from '/components/common/TabPanel';
 // import styled from 'styled-components';
 import { confirm } from "react-confirm-box";
 import Box from '@mui/material/Box';
 import reactReferer from 'react-referer';
 function a11yProps(index) {
   return {
     id: `simple-tab-${index}`,
     'aria-controls': `simple-tabpanel-${index}`,
   };
 }
 
 const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: '70%',
     bgcolor: 'background.paper',
     border: '2px solid #000',
     boxShadow: 24,
     p: 4,
   };
 
 class GetIsoParametersAccess  extends React.Component  {
     
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
         const result = await confirm("Are you sure you want to delete this user's access?", options);
         if (result) {
           this.props.deleteAccess(item, this.props.user, this.props.currentIsoParameter, this.props.lists, AppConstants.ISO_PARAMETERS_MAINTAIN_DETAIL_PATH);
           return;
         }
          
     }
 
     
      render() {
         console.log("User Detail Props", this.props);
      
             
         let appMessages = StringUtils.getDisplayMessages(this.props.messages);
 
 
         let stateList  = [], isoCodeList = [], salesRepList = [], salesOfficeList = [], subIsoList= [];
         if(this.props.lists &&  this.props.lists.STATES){
             stateList = this.props.lists.STATES.map(function (anItem, index) {
                 return <MenuItem value={anItem.code} key={index + 1}>{anItem.value}</MenuItem>;
             });
              
             
         }
  
         const userLevelCodeList = this.props.lists.ISO_PARAMETERS_ACCESS_LEVELS.map(function (anItem, index) {
             return <MenuItem value={anItem.code} key={index}>{anItem.value}</MenuItem>;
         });
         
      
      
         console.log(reactReferer.referer());
         return (
             <Modal
                 open={this.props.openUserAccess}
                 onClose={this.props.closeUserIsoParametersAccess}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description"
             >
                 <Box sx={style}>
                     <Row>
                         <div className="col-lg-12">
                             
                                 <div className="row">
                                 <div className="col-12" id="search">
                                     <div className="row">
                                         <div className="col-lg-6 col-md-6">
                                             <h4>ISO PARAMETERS ACCESS INFORMATION</h4>
                                         </div>
                                         <div className="col-lg-6 col-md-6 text-right">					
                                             
                                         </div>
                                     </div>
                                 <ValidatorForm onSubmit={(data) => this.props.processForm(this.props.currentUser, this.props.user, this.props.lists)}>
                                     
                                     {appMessages && appMessages.length > 0  && <div id="error" className="btn-outline-danger">{appMessages}</div>}
                                     <Paper>
                                     <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="primary" variant="scrollable" scrollButtons="auto"
                                         textColor="primary">
                                         <Tab label="ISO Parameters Information" {...a11yProps(0)} disableRipple/>
                                         
                                     </Tabs>
                                     <TabPanel value={this.state.value} index={0}>
                                     
                                     <div className="row">
                                         <div className="col-md-12">
                                             <h4 className="card-description">ISO Parameters Information</h4>
                                         </div>
                                         <div className="col-xl-5 col-lg-6 col-md-6">
                                     <b>ISO Code:</b><br /> {this.props.currentIsoParameter.ISO_Code}
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>VI Settle Fee:</b><br /> {this.props.currentIsoParameter.VI_Settle_Fee}
                                 </div>
                                 <div className="col-xl-2 col-lg-2 col-md-2">
                                     <b>VI Return Fee:</b><br /> {this.props.currentIsoParameter.VI_Return_Fee} 
                                 </div>
                                 <div className="col-xl-5 col-lg-6 col-md-6">
                                     <b>MC Settle Fee:</b><br /> {this.props.currentIsoParameter.MC_Settle_Fee}
                                 </div>
                                 <div className="col-xl-5 col-lg-6 col-md-6">
                                     <b>MC Return Fee:</b><br /> {this.props.currentIsoParameter.MC_Return_Fee}
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DS Settle Fee:</b><br /> {this.props.currentIsoParameter.DS_Settle_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DS Return Fee:</b><br /> {this.props.currentIsoParameter.DS_Return_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>AX Settle Fee:</b><br /> {this.props.currentIsoParameter.AX_Settle_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>AX Return Fee:</b><br /> {this.props.currentIsoParameter.AX_Return_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Pin Debit Settle Fee:</b><br /> {this.props.currentIsoParameter.Pin_Debit_Settle_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>EBT Settle Fee:</b><br /> {this.props.currentIsoParameter.EBT_Settle_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>VI Auth Fee:</b><br /> {this.props.currentIsoParameter.VI_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>MC Auth Fee:</b><br /> {this.props.currentIsoParameter.MC_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DS Auth Fee:</b><br /> {this.props.currentIsoParameter.DS_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>AX Auth Fee:</b><br /> {this.props.currentIsoParameter.AX_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>VI Decline Auth Fee:</b><br /> {this.props.currentIsoParameter.VI_Decline_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>MC Decline Auth Fee:</b><br /> {this.props.currentIsoParameter.MC_Decline_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DS Decline Auth Fee:</b><br /> {this.props.currentIsoParameter.DS_Decline_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>AX Decline Auth Fee:</b><br /> {this.props.currentIsoParameter.AX_Decline_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Voice Auth Fee:</b><br /> {this.props.currentIsoParameter.Voice_Auth_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>AVS Fee:</b><br /> {this.props.currentIsoParameter.AVS_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>CVV Fee:</b><br /> {this.props.currentIsoParameter.CVV_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Batch Fee:</b><br /> {this.props.currentIsoParameter.Batch_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Chargeback Fee:</b><br /> {this.props.currentIsoParameter.Chargeback_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Retrieval Fee:</b><br /> {this.props.currentIsoParameter.Retrieval_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>ACH Reject Fee:</b><br /> {this.props.currentIsoParameter.ACH_Reject_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Bank Acquring Volume Fee:</b><br /> {this.props.currentIsoParameter.Bank_Acquring_Volume_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Statement Mthly Fee:</b><br /> {this.props.currentIsoParameter.Statement_Mthly_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>PCI Mthly Fee:</b><br /> {this.props.currentIsoParameter.PCI_Mthly_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Debit Mthly Fee:</b><br /> {this.props.currentIsoParameter.Debit_Mthly_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Acct Setup Fee:</b><br /> {this.props.currentIsoParameter.Acct_Setup_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>Annual Fee:</b><br /> {this.props.currentIsoParameter.Annual_Fee}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DateTime Added:</b><br /> {this.props.currentIsoParameter.DateTime_Added}							
                                 </div>
                                 <div className="col-xl-3 col-lg-4 col-md-4">
                                     <b>DateTime Updated:</b><br /> {this.props.currentIsoParameter.DateTime_Updated}							
                                 </div>  
                                         
                                                             
                                     </div> 			
                                         
                                     <Row><Col md={'12'}>&nbsp;</Col></Row>  
                                     <Row>
                                         <Col md="3"><Button variant="contained" color="primary" type="button" onClick={() => this.props.closeUserMerchantAccess()}  className="col-md-12">Close</Button></Col>
                                         <Col md="3">{this.props.currentIsoParameter && this.props.currentIsoParameter.AutoIdent1 && 
                                         <Button variant="contained" color="secondary" type="button" onClick={() => this.deleteItem(this.props.currentUser, this.props.user, this.props.currentIsoParameter, this.props.lists)}  className="col-md-12"> Delete Access </Button>
                                         }
                                             {this.props.currentIsoParameter && !this.props.currentIsoParameter.AutoIdent1 && <Button variant="contained" color="primary" type="button"  onClick={() => this.props.enableAccess(this.props.currentUser, this.props.user, this.props.currentIsoParameter, this.props.lists)} className="col-md-12"> Enable Access </Button>}
                                             &nbsp;
                                         </Col>
                                         <Col md="3"> 
                                         &nbsp;
                                         
                                         </Col>
                                     </Row>
                 
                     
                     
                     
                                     </TabPanel>
                                             
                                                     
                                 </Paper>
                             </ValidatorForm>
                 
                             </div>
                                     
                                     
                                     
                                     
                                 </div>
                             </div>
                         </Row>
                     </Box>				 
             </Modal>
         );
     }
 }
 
 GetIsoParametersAccess.propTypes = {
   displayWarning: PropTypes.func,
 };
 
 export default withRouter(GetIsoParametersAccess);
 
 