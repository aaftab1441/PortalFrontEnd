import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm} from 'react-material-ui-form-validator';
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
import DataTable from 'react-data-table-component';
import RiskSection from "/components/commonscreens/risk/RiskSection";

 

export class GetIsoDashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [
        {
            id: 1,
            task: 'Level up for Antony',
            isCompleted: false
        },
        {
            id: 2,
            task: 'Follow up of team zilla',
            isCompleted: true
        },
        {
            id: 3,
            task: 'Project meeting with CEO',
            isCompleted: false
        },
        {
            id: 4,
            task: 'Duplicate a project for new customer',
            isCompleted: true
        },
        {
            id: 5,
            task: 'Meeting with Urban Team',
            isCompleted: false
        }
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
    
    this.RevenueShare = [
      { data: Utils.fixDate(this.props.dashboardData.TotalAssoc), id: 'Total Assoc.', color: '#ffc100'},
      { data: Utils.fixDate(this.props.dashboardData.TotalSchedAFees), id: 'Total Sched. A', color: '#5E5D5D'},
      { data: Utils.fixDate(this.props.dashboardData.RevenueShare), id: 'Revenue Share', color: '#5D5D5E'},
      { data: Utils.fixDate(this.props.dashboardData.NetIncome), id: 'Net Income', color: '#DC10D2'},
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
      
      let isoCode = this.props.user.Permissions.iso;
      this.saleDates = Utils.getDates(this.props.dashboardData.CurrentYTD);
    this.chargeBackDates = Utils.getDates(this.props.dashboardData.CurrentYTDChargeBacks);
    console.log("ISO Props", this.props);
    return (
      <div>   
        <div className="row">
          <div className="col-12 col-xl-3 mb-4 mb-xl-0 grid-margin">
            <h4 className="font-weight-bold">Hi, Welcome!</h4>
            <h4 className="font-weight-normal mb-0">{this.props.user.UserDetail.First_Name} {this.props.user.UserDetail.Last_Name},</h4>
          </div>
          <div className="col-12 col-xl-9 grid-margin">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="border-right pr-4 mb-3 mb-xl-0">
                <p className="text-muted">Sales YTD</p>
                <h4 className="mb-0 font-weight-bold">${StringUtils.formatNumber(this.props.dashboardData.CurrentYTDSales)} </h4>
              </div>
              <div className="border-right pr-4 mb-3 mb-xl-0">
                <p className="text-muted">Previous YTD</p>
                <h4 className="mb-0 font-weight-bold">${StringUtils.formatNumber(this.props.dashboardData.PreviousYTDSales)}</h4>
              </div>
              <div className="border-right pr-4 mb-3 mb-xl-0">
                <p className="text-muted">Month&apos;s Charge Backs</p>
                <h4 className="mb-0 font-weight-bold">{StringUtils.formatWholeNumber(this.props.dashboardData.ChargeBackCount)}</h4>
              </div>
              <div className="pr-3 mb-3 mb-xl-0">
                <p className="text-muted">Current Month&apos;s Transactions</p>
                <h4 className="mb-0 font-weight-bold">{StringUtils.formatWholeNumber(this.props.dashboardData.TransactionCount)}</h4>
              </div>
               
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body link" onClick={() => this.props.router.push(AppConstants.MERCHANT_LIST_PATH + "?#iso/all/" + isoCode)}>
                <p className="card-title text-md-center text-xl-left">Total Merchants</p>
                <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                  <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{StringUtils.formatWholeNumber(this.props.dashboardData.TotalMerchants)}</h3>
                  <i className="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                </div>  
                  
              </div>
            </div>
          </div>
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body link" onClick={() => this.props.router.push(AppConstants.MERCHANT_LIST_PATH + "?#iso/active/" + isoCode)}>
                <p className="card-title text-md-center text-xl-left">Active Merchants</p>
                <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                  <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{StringUtils.formatWholeNumber(this.props.dashboardData.ActiveMerchants)}</h3>
                  <i className="ti-user icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                </div>  
                  
              </div>
            </div>
          </div>
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body link" onClick={() => this.props.router.push(AppConstants.MERCHANT_LIST_PATH + "?#iso/closed/" + isoCode)}>
                <p className="card-title text-md-center text-xl-left">Closed Merchants</p>
                <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                  <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{StringUtils.formatWholeNumber(this.props.dashboardData.ClosedMerchants)}</h3>
                  <i className="ti-agenda icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                </div>  
                  
              </div>
            </div>
          </div>
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
                <div className="card-body link" onClick={() => this.props.router.push(AppConstants.MERCHANT_LIST_PATH + "?#iso/inactive/" + isoCode)}>
                  <p className="card-title text-md-center text-xl-left">In Active Merchants</p>
                  <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{StringUtils.formatWholeNumber(this.props.dashboardData.InActiveMerchants)}</h3>
                    <i className="ti-layers-alt icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                  </div>  
                </div>
            </div>
          </div>
        </div>
         
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                  <Row>
                      <Col>
                          <span className="card-title">Sales Current Year Prior 6 Months vs Previous Year 6 Months</span><br />
                          <span className="text-muted small-font">The total transaction amounts of the current year prior six months vs the previous year prior six months.</span><br />
                        </Col>
                      <Col md={3} className="text-right p-0"><Button  variant="contained" color="primary" size="small" type="button" onClick={() => this.props.router.push(AppConstants.ISO_MERCHANT_DASHBOARD_PATH)} className="ml-3"> Merchant List</Button> </Col>
                    </Row>
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
                          tickValues: this.saleDates,
                        }}
                        yFormat= {(value) => {return  StringUtils.formatNumber(value)}}
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
                    <Col>
                        <span className="card-title">Revenue Sharing</span><br />
                        <span className="text-muted small-font">Sharing.</span><br />
                      </Col>
                    <Col md={3} className="text-right p-0"><Button  variant="contained" color="primary" size="small" type="button" onClick={() => this.props.router.push(AppConstants.ISO_MERCHANT_DASHBOARD_PATH)} className="ml-3"> Merchant List</Button> </Col>
                  </Row>
                
                    {Utils.revenueDataChecker(this.RevenueShare) && <ResponsiveLine                   
                      data={this.RevenueShare}
                      xScale={{  format: "%m%d%Y", type: 'time',  min: 'auto',  max: 'auto', stacked: false  }}
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
        </div>
        <div className="row">
        
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                  <Row>
                      <Col>
                          <span className="card-title">Charge Backs For Current Year Prior 6 Months vs Previous Year  </span><br />
                           
                        </Col>
                      <Col md={3} className="text-right p-0"><Button  variant="contained" color="primary" size="small" type="button" onClick={() => this.props.router.push(AppConstants.ISO_MERCHANT_DASHBOARD_PATH)} className="ml-3"> Merchant List</Button> </Col>
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
                        format: ">-,.0s",                        
                      }}
                      axisBottom={{
                        orient: 'bottom',
                        legend: 'Date',
                        legendOffset: 36,
                        format: "%m/%d",
                        legendPosition: 'middle',
                        tickValues: this.chargeBackDates,
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
            { <div className="card-body">
                <Row>
                    <Col>
                        <span className="card-title">Risk</span><br />
                        <span className="text-muted small-font">Items in gray buttons will be available in the near future.</span><br />
                      </Col>
                    <Col md={3} className="text-right p-0">
                    
                    </Col>
                  </Row>
                  <RiskSection currentObject={this.props.user} currentObjectType={'ISO'} {...this.props}/>


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


GetIsoDashboard.propTypes = {
  displayWarning: PropTypes.func,
};
 

export default GetIsoDashboard;
 