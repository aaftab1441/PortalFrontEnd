import {Component, React} from "react";
import {useSelector} from "react-redux";
import {Col, Container, Row, Table} from "react-bootstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from "next/router";
import DataTable from 'react-data-table-component';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';
import * as StringUtils from '/utilities/string';
import * as Utils from "/utilities/util";
import MenuItem from "@mui/material/MenuItem";
import HistoryActions from "/redux/actions/risk/history/action";
import MerchantReserveActions from "/redux/actions/risk/merchant-reserve/action";
class MerchantRiskSection extends Component {
    constructor(props){
      super(props)
      
    }
    
    view13MonthHistory(){
        if(this.props.currentObjectType == "DAS" || this.props.currentObjectType == "EAGLE"){
            this.props.getRiskHistory(this.props.currentObject, this.props.currentObjectType, this.props.user);
        }else if(this.props.currentObjectType == "ISO"){
            this.props.getRiskHistory(this.props.currentObject, this.props.currentObjectType, this.props.user);
        }else if(this.props.currentObjectType == "MERCHANT"){
            this.props.getRiskHistory(this.props.currentObject, this.props.currentObjectType, this.props.user);
        }
            
    }

     
    viewMerchantReserve(){
        this.props.getMerchantReserve(this.props.currentObject, this.props.currentObjectType, this.props.user);            
    }

    render(){
        console.log("Risk", this.props);
        return (
            <>
                <Row>
                    <Col md={9}>&nbsp;</Col> 
                    <Col md={1} className={'p-0'}>Today</Col> 
                    <Col md={2} className={'p-0'}>History</Col> 
                </Row>
                <Row>
                    <Col md={3} className={'mt-2'}>Merchant Reserves</Col> 
                    <Col md={1}><IconButton color="primary" aria-label=""  onClick={() => this.viewMerchantReserve()}><CircleIcon /></IconButton></Col> 
                    <Col md={1}>&nbsp;</Col>
                    <Col md={4} className={'mt-2'}>Suspended Transactions</Col> 
                    <Col md={1}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                    <Col md={2}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                </Row>
                <Row>
                    <Col md={3} className={'mt-2'}>Merchant Exposure</Col> 
                    <Col md={1}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                    <Col md={1}>&nbsp;</Col>
                    <Col md={4} className={'mt-2'}>Duplicate Transactions</Col> 
                    <Col md={1}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                    <Col md={2}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                </Row>
                <Row>
                    <Col md={3} className={'mt-2'}>Variance Report</Col> 
                    <Col md={1}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                    <Col md={1}>&nbsp;</Col>
                    <Col md={4} className={'mt-2'}>High Transactions</Col> 
                    <Col md={1}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                    <Col md={2}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                </Row>
                <Row>
                    <Col md={3} className={'mt-2'}>13 Month History</Col> 
                    <Col md={1}><IconButton color="primary" aria-label="" onClick={() => this.view13MonthHistory()}><CircleIcon /></IconButton></Col> 
                    <Col md={1}>&nbsp;</Col>
                    <Col md={4} className={'mt-2'}>Multiple Transactions</Col> 
                    <Col md={1}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                    <Col md={2}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                </Row>
                <Row>
                    <Col md={3} className={'mt-2'}></Col> 
                    <Col md={1}>&nbsp;</Col> 
                    <Col md={1}>&nbsp;</Col>
                    <Col md={4} className={'mt-2'}>ACH Rejects</Col> 
                    <Col md={1}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                    <Col md={2}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                </Row>
                <Row>
                    <Col md={4} className={'mt-2'}>&nbsp;</Col> 
                    <Col md={1}>&nbsp;</Col>
                    <Col md={4} className={'mt-2'}>Credit Transactions</Col> 
                    <Col md={1}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                    <Col md={2}><IconButton color="default" aria-label=""><CircleIcon /></IconButton></Col> 
                </Row>
            </>
        );
    
    }
 
}


MerchantRiskSection.propTypes = {
    currentObject: PropTypes.object,
    currentObjectType: PropTypes.object,
 
 };
  
  const  mapStateToProps = (state) =>{ 
     return { 
          
         
     }
 };
  
  function mapDispatchToProps(dispatch) {
    return {
      dispatch,
      getRiskHistory: (data, dataType, user) => dispatch(HistoryActions.getRiskHistory(data, dataType, user)),
      getMerchantReserve: (data, dataType, user) => dispatch(MerchantReserveActions.getMerchantReserve(data, dataType, user)),
      
    };
  }
   
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantRiskSection));
  

   