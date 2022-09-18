import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextBox from '../../common/TextBox';
import SelectField from '../../common/SelectField';
import * as StringUtils from '../../../utilities/string';
import * as Utils from '../../../utilities/util';
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
// import styled from 'styled-components';
import { ProgressBar } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import * as AppConstants from '../../../utilities/constants';
import { Row, Col,Form} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import GetMerchantSelect from './GetMerchantSelect';
import DataTable from 'react-data-table-component';
import RiskSection from "/components/commonscreens/risk/RiskSection";

export class GetMerchantDashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [
        
      ],
      inputValue: '',
    }
    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
 
           
       
  }
  statusChangedHandler(event, id) {

    //const todoIndex = this.state.todos.findIndex( t => t.id === id );
    const todo = {...this.state.todos[id]};
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
        todos: todos
    })
  }

  addTodo (event) {
      event.preventDefault();

      const todos = [...this.state.todos];
      todos.unshift({
          id: todos.length ? todos[todos.length - 1].id + 1 : 1,
          task: this.state.inputValue,
          isCompleted: false
          
      })

      this.setState({
          todos: todos,
          inputValue: ''
      })
  }

  removeTodo (index) {
      const todos = [...this.state.todos];
      todos.splice(index, 1);

      this.setState({
          todos: todos
      })
  }

  inputChangeHandler(event) {
      this.setState({
          inputValue: event.target.value
      });
  }

  
  render () {
     console.log("HERE 1123");
      
      this.YTDSalesReportData = [
        {
            data: this.props.dashboardData.CurrentYTD,
            id: 'Current',
            color: '#ffc100',
        },
        {
          data: this.props.dashboardData.PreviousYTD,
          id: 'Previous',
          color: '#f5a623',
            
        }];
        this.YTDTransactionReportData = [
          {
              data: this.props.dashboardData.CurrentYTDTransactions,
              id: 'Current',
              color: '#ffc100',
          },
          {
            data: this.props.dashboardData.PreviousYTDTransactions,
            id: 'Previous',
            color: '#f5a623',
              
          }];

       
          const riskColumns = [
            { selector: row => row.Date, name: "MM/YY" , sortable: true, format: (row, index) => {return  StringUtils.formatYYMMDate(row.Date) }},
            { selector: row => row.Sales, name: "Sales $$$", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Sales) }},
            { selector: row => row.Transaction_Count, name: "Sales ###", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Transaction_Count) }},
            { selector: row => row.Credit_Sales, name: "Credits $$$", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Credit_Sales) }},
            { selector: row => row.Credit_Transaction_Count, name: "Credits ###", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Credit_Transaction_Count) }},
            { selector: row => row.Credit_Sales, name: "Credits %%%", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Credit_Sales/row.Sales ) }},
            { selector: row => row.ChargeBack_Amount, name: "Chargebacks $$$", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.ChargeBack_Amount) }},
            { selector: row => row.ChargeBack_Count, name: "###", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.ChargeBack_Count) }},
            { selector: row => row.ChargeBack_Count, name: "%%%", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.ChargeBack_Count/row.Transaction_Count) }},
            { selector: row => row.ChargeBack_Count, name: "$%", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.ChargeBack_Amount/row.Sales) }},
            { selector: row => row.Swipe_Count, name: "Swipe %", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Swipe_Count/row.Transaction_Count) }},
            { selector: row => row.Manual_Count, name: "Manual %", sortable: true, format: (row, index) => {return  StringUtils.formatNumber(row.Manual_Count/row.Transaction_Count) }},
             
            ];
          
          this.YTDChargeBacksReportData = [
            {
                data: this.props.dashboardData.CurrentYTDChargeBacks,
                id: 'Current',
                color: '#ffc100',
            },
            {
              data: this.props.dashboardData.PreviousYTDChargeBacks,
              id: 'Previous',
              color: '#f5a623',
                
            }];
    return (
      <div> 
        {this.props.openMerchantSelectList && <GetMerchantSelect {...this.props} />}
        <div className="row">
          <div className="col-12 col-xl-3 mb-4 mb-xl-0 grid-margin">
            <h4 className="font-weight-bold">Hi, Welcome!</h4>
            <h4 className="font-weight-normal mb-0">{this.props.user.UserDetail.First_Name} {this.props.user.UserDetail.Last_Name},</h4>
          </div>
          <div className="col-12 col-xl-9 grid-margin">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="border-right pr-4 mb-3 mb-xl-0">
                <p className="text-muted">Sales</p>
                <h4 className="mb-0 font-weight-bold">${StringUtils.formatNumber(this.props.dashboardData.CurrentYTDSales)} </h4>
              </div>
              <div className="border-right pr-4 mb-3 mb-xl-0">
                <p className="text-muted">Previous 6 Months Sales</p>
                <h4 className="mb-0 font-weight-bold">${StringUtils.formatNumber(this.props.dashboardData.PreviousYTDSales)}</h4>
              </div>
              <div className="border-right pr-4 mb-3 mb-xl-0">
                <p className="text-muted">Month&apos;s Charge Backs</p>
                <h4 className="mb-0 font-weight-bold">{StringUtils.formatNumber(this.props.dashboardData.ChargeBackCount)}</h4>
              </div>
              <div className="pr-3 mb-3 mb-xl-0">
                <p className="text-muted">Current Month&apos;s Transactions</p>
                <h4 className="mb-0 font-weight-bold">{StringUtils.formatNumber(this.props.dashboardData.TransactionCount)}</h4>
              </div>
              {(this.props.dashboardData.MerchantList && this.props.dashboardData.MerchantList.length > 1) && 
                <div className="pr-3 mb-3 mb-xl-0 text-right">
                  <p className="text-muted">Currently viewing: {StringUtils.getCurrentMerchant(this.props.dashboardData.MerchantList, this.props.dashboardData.CurrentMid)} </p>
                  <Button variant="contained" color="primary" size="small" type="button"  onClick={() => this.props.openMerchantList()} className="ml-3"> Change Account</Button>
                </div>
                }               
            </div>
          </div>
        </div>
         
        
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                  <Row>
                    <Col className="card-title">Sales Current Year Prior 6 Months vs Previous Year 6 Months</Col>
                    <Col className="text-right"><Button variant="contained" color="primary" type="button"  onClick={() => this.props.router.push(AppConstants.MERCHANT_DETAIL_PATH)} className="ml-3"> Transaction Detail</Button></Col>
                  
                  </Row>
                  <p className="text-muted font-weight-light">The total transaction amounts of the current year prior six months vs the previous year prior six months.</p>
                    {Utils.salesDataChecker(this.YTDSalesReportData) && <ResponsiveLine                   
                        data={this.YTDSalesReportData}
                        xScale={{  format: "%Y%m%d", type: 'time',  min: 'auto',  max: 'auto', stacked: false  }}
                        yScale={{ type: 'linear', min: 'auto',  max: 'auto', stacked: false, reverse: false }}
                        useMesh={true}
                        curve={'cardinal'}
                        height="401"
                        tooltip={d => {  return '$' + d.point.data.yFormatted;}}
                        axisLeft={{
                          format: ">-$,.0s",                        
                        }}
                        axisBottom={{
                          orient: 'bottom',
                          legend: 'Date',
                          legendOffset: 36,
                          format: "%m/%d",
                          legendPosition: 'middle',
                          tickValues: "every 1 month",
                        }}
                        yFormat= {(value) => {return StringUtils.formatNumber(value)}}
                        xFormat={(value) => {return StringUtils.formatNoSeparatorDate(value)}}
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        legends={[
                          {
                              anchor: 'top-right',
                              direction: 'column', 
                              justify: false,
                              translateX: 100,
                              translateY: 0,
                              itemsSpacing: 0,
                              itemDirection: 'left-to-right',
                              itemWidth: 80,
                              itemHeight: 20,
                              itemOpacity: 0.75,
                              symbolSize: 12,
                              symbolShape: 'circle',
                              symbolBorderColor: 'rgba(0, 0, 0, .5)',
                              effects: [
                                  {
                                      on: 'hover',
                                      style: {
                                          itemBackground: 'rgba(0, 0, 0, .03)',
                                          itemOpacity: 1
                                      }
                                  }
                              ]
                          }
                      ]}
                        
                      />}
                </div>
            </div>
          </div>
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <Row>
                    <Col className="card-title">Transactions</Col>
                    <Col className="text-right">
                      <Button variant="contained" color="primary" type="button"  onClick={() => this.props.router.push(AppConstants.MERCHANT_DETAIL_PATH)} className="ml-3"> Transaction Detail</Button>
                      </Col>
                  
                  </Row>
                
                <p className="text-muted font-weight-light">Transactions</p>
                
                {Utils.salesDataChecker(this.YTDTransactionReportData) && <ResponsiveLine                   
                        data={this.YTDTransactionReportData}
                        xScale={{  format: "%Y%m%d", type: 'time',  min: 'auto',  max: 'auto', stacked: false  }}
                        yScale={{ type: 'linear', min: 'auto',  max: 'auto', stacked: false, reverse: false }}
                        useMesh={true}
                        curve={'cardinal'}
                        height="401"
                        tooltip={d => {  return  d.point.data.yFormatted;}}
                        axisLeft={{
                          format: ">-,.0s",                        
                        }}
                        axisBottom={{
                          orient: 'bottom',
                          legend: 'Date',
                          legendOffset: 36,
                          format: "%m/%d",
                          legendPosition: 'middle',
                          tickValues: "every 1 month",
                        }}
                        yFormat= {(value) => {return StringUtils.formatNumber(value)}}
                        xFormat={(value) => {return StringUtils.formatNoSeparatorDate(value)}}
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        legends={[
                          {
                              anchor: 'top-right',
                              direction: 'column', 
                              justify: false,
                              translateX: 100,
                              translateY: 0,
                              itemsSpacing: 0,
                              itemDirection: 'left-to-right',
                              itemWidth: 80,
                              itemHeight: 20,
                              itemOpacity: 0.75,
                              symbolSize: 12,
                              symbolShape: 'circle',
                              symbolBorderColor: 'rgba(0, 0, 0, .5)',
                              effects: [
                                  {
                                      on: 'hover',
                                      style: {
                                          itemBackground: 'rgba(0, 0, 0, .03)',
                                          itemOpacity: 1
                                      }
                                  }
                              ]
                          }
                      ]}
                        
                      />}
              </div>
               
            </div>
          </div>
        </div>
        <div className="row">
        
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <Row>
                    <Col className="card-title">Charge Backs For Current Year Prior 6 Months vs Previous Year </Col>
                    <Col className="text-right">
                      <Button variant="contained" color="primary" type="button"  onClick={() => this.props.router.push(AppConstants.MERCHANT_DETAIL_PATH)} className="ml-3"> Merchant Detail</Button>
                    </Col>                  
                  </Row>
                  
                  {Utils.salesDataChecker(this.YTDChargeBacksReportData) && <ResponsiveLine                   
                      data={this.YTDChargeBacksReportData}
                      xScale={{  format: "%Y%m%d", type: 'time',  min: 'auto',  max: 'auto', stacked: false  }}
                      yScale={{ type: 'linear', min: 'auto',  max: 'auto', stacked: false, reverse: false }}
                      useMesh={true}
                      curve={'cardinal'}
                      height="401"
                      tooltip={d => {  return  d.point.data.yFormatted;}}
                      axisLeft={{
                        format: ">-$,.0s",                        
                      }}
                      axisBottom={{
                        orient: 'bottom',
                        legend: 'Date',
                        legendOffset: 36,
                        format: "%m/%d",
                        legendPosition: 'middle',
                        tickValues: "every 1 month",
                      }}
                      yFormat= {(value) => {return StringUtils.formatNumber(value)}}
                      xFormat={(value) => {return StringUtils.formatNoSeparatorDate(value)}}
                      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                      legends={[
                        {
                            anchor: 'top-right',
                            direction: 'column', 
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                      
                    />}
                </div>
            </div>
          </div>
          
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
            {false && <div className="card-body">
                <Row>
                    <Col>
                        <span className="card-title">Risk</span><br />
                        <span className="text-muted small-font">Risk</span><br />
                      </Col>
                    <Col md={3} className="text-right p-0">
                      <Button  variant="contained" color="primary" size="small" type="button" onClick={() => this.props.router.push(AppConstants.MERCHANT_RISK_DETAIL_PATH)} className="ml-3"> Risk Detail</Button> 
                    
                    </Col>
                  </Row>
                  <RiskSection currentObject={this.props.user} currentObjectType={'MERCHANT'} {...this.props}/>

              </div>}
              
            </div>
          </div>
        </div>
         
        <div className="row">        
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                 
              </div>
            </div>
          </div>
        </div>
         
      </div>
    );
  }
}
const ListItem = (props) => {
    
  return (
      <li className={(props.isCompleted ? 'completed' : null)}>
          <div className="form-check">
              <label htmlFor="" className="form-check-label"> 
                  <input className="checkbox" type="checkbox" 
                      checked={props.isCompleted} 
                      onChange={props.changed} 
                      /> {props.children} <i className="input-helper"></i>
              </label>
          </div>
          <i className="remove ti-close" onClick={props.remove}></i>
      </li>
  )
};


GetMerchantDashboard.propTypes = {
  displayWarning: PropTypes.func,
};
 

export default GetMerchantDashboard;
 