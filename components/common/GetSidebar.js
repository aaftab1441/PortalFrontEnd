/**
 *
 * GetSidebar
 *
 */

import React, { memo, Component } from 'react';

import { Helmet } from 'react-helmet';
import Link from 'next/link'
import { Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppConstants from '../../utilities/constants';
import * as CentralActions from '../../redux/actions/central/action';
import * as UserActions from '../../redux/actions/usermanagement/manageuser/action';

import { getValue, getBaseUrl } from '../../utilities/string';
import { Collapse } from 'react-bootstrap';
import { withRouter} from "next/router";
//import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
class GetSidebar  extends Component  {
  
  state = {};
   
  constructor(props){
		super(props);
    
    
	}

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      //Object.keys(this.state).forEach(i => {
     //   this.setState({[i]: false});
      //});
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  addUser(url){
    this.props.addUser();
    this.props.registerFromLocation(AppConstants.USER_LIST_PATH);
    this.props.router.push(url);
  }

  navigate(url){
    console.log("Nav:", url);
    this.props.router.push(url);
    //, url, {shallow: false});
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path: AppConstants.MERCHANT_PATH, state: 'merchant'},
      {path: AppConstants.ISOPARAMETERS_PATH, state: 'isoparametersMenu'},
      {path: AppConstants.RESIDUALS_PATH, state: 'residualsMenu'},
      {path: AppConstants.TICKETS_PATH, state: 'ticketsMenu'},
      {path: AppConstants.SUPPORT_PATH, state: 'supportMenu'},
      {path: AppConstants.MY_PROFILE_PATH, state: 'myProfileMenu'},
      {path: AppConstants.LEADS_PATH, state: 'leadsMenu'},
      {path: AppConstants.EQUIPMENT_ORDERS_PATH, state: 'equipmentOrdersMenu'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
      {path:'/general-pages', state: 'generalPagesMenuOpen'},
      {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className={ this.isPathActive(AppConstants.DASHBOARD_PATH) ? 'nav-item active' : 'nav-item' }>
            <a className="nav-link" onClick={() => this.navigate(AppConstants.DASHBOARD_PATH)}><>
              <i className="ti-home menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </></a>
          </li>
          {this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code != "MERCHANT" && 
            <li className={ this.isPathActive(AppConstants.MERCHANT_SEARCH_PATH) ? 'nav-item active' : 'nav-item' } >
              <a className="nav-link" onClick={() => this.navigate(AppConstants.MERCHANT_SEARCH_PATH)}>
                <i className="ti-search menu-icon"></i>
                <span className="menu-title">Merchant Search</span>
              </a>
            </li>
          }
          {this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code != "MERCHANT" && 
            <li className={ this.isPathActive(AppConstants.MERCHANT_PATH) ? 'nav-item active' : 'nav-item' }>
              <div className={ this.state.merchantMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('merchantMenu')} data-toggle="collapse">
                <i className="ti-layout menu-icon"></i>
                <span className="menu-title"  title="Future Use">Add/Maintain Merchant</span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={ this.state.merchantMenu }>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className={ this.isPathActive(AppConstants.MERCHANT_ADD_STEP_1_PATH) ? 'nav-link active' : 'nav-link' }  onClick={() => this.navigate('/merchant/merchantadd/merchantaddstep1')}><>New Merchant</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive(AppConstants.MERCHANT_MAINTAIN_SEARCH_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.MERCHANT_MAINTAIN_SEARCH_PATH)}><>Merchant Maintenance</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive(AppConstants.MERCHANT_MAINTAIN_USER_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.MERCHANT_MAINTAIN_USER_PATH)}><>Add Merchant User</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive(AppConstants.MERCHANT_MAINTAIN_USER_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.MERCHANT_MAINTAIN_USER_LIST_PATH)}><>Manage Merchant Users</></a></li>
                </ul>
              </Collapse>
            </li>
          }
          {this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code != "MERCHANT" && this.props.user.Permissions.User_Level_Code != "ISO" && 
            <li className={ this.isPathActive(AppConstants.ISOPARAMETERS_PATH) ? 'nav-item active' : 'nav-item' }>
              <div className={ this.state.isoparametersMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('isoparametersMenu')} data-toggle="collapse">
                <i className="ti-layout menu-icon"></i>
                <span className="menu-title"  title="Future Use">ISO Parameters</span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={ this.state.isoparametersMenu }>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className={ this.isPathActive(AppConstants.ISOPARAMETERS_SEARCH_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.ISOPARAMETERS_SEARCH_PATH)}><>Maintenance</></a></li>
                </ul>
              </Collapse>
            </li>
          }
          {false && this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code != "MERCHANT" && 
            <li className={ this.isPathActive(AppConstants.LEADS_PATH) ? 'nav-item active' : 'nav-item' }>
              <div className={ this.state.leadsMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('leadsMenu') } data-toggle="collapse">
                <i className="ti-map menu-icon"></i>
                <span className="menu-title"  title="Future Use">Leads</span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={ this.state.leadsMenu }>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/vector-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/vector-map")}><>UnAssigned Leads</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>Assigned Leads</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>Customers Contacted</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>App Link Emailed</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>Apps Completed</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>App Link Emailed</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>Dead</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>Follow-up Required</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>Manually Enter Lead</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>Import Leads</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>Email Leads</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/maps/simple-map') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/maps/simple-map")}><>Send Emails</></a></li>
                </ul>
              </Collapse>
            </li>       
          }   
          
          {false && <li className={ this.isPathActive(AppConstants.TICKETS_PATH) ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.ticketsMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('ticketsMenu') } data-toggle="collapse">
              <i className="ti-view-list menu-icon"></i>
              <span className="menu-title"  title="Future Use">Tickets</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.ticketsMenu }>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <a className={ this.isPathActive('/advanced-ui/dragula') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/advanced-ui/dragula")}><>Dragula</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/advanced-ui/clipboard') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/advanced-ui/clipboard")}><>Clipboard</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/advanced-ui/context-menu') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/advanced-ui/context-menu")}><>Context menu</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/advanced-ui/sliders') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/advanced-ui/sliders")}><>Sliders</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/advanced-ui/carousel') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/advanced-ui/carousel")}><>Carousel</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/advanced-ui/loaders') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/advanced-ui/loaders")}><>Loaders</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/advanced-ui/tree-view') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/advanced-ui/tree-view")}><>Tree View</></a></li>
              </ul>
            </Collapse>
          </li>

        }
          {false && this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code != "MERCHANT" && 
            <li className={ this.isPathActive(AppConstants.RESIDUALS_PATH) ? 'nav-item active' : 'nav-item' }>
              <div className={ this.state.residualsMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('residualsMenu') } data-toggle="collapse">
                <i className="ti-clipboard menu-icon"></i>
                <span className="menu-title"  title="Future Use">Residuals</span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={ this.state.residualsMenu }>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className={ this.isPathActive('/form-elements/validation') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/form-elements/validation")}><>Total Income</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/form-elements/basic-elements")}><>Assoc Cost</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/form-elements/advanced-elements') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/form-elements/advanced-elements")}><>Schedule A Fees</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/form-elements/wizard') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/form-elements/wizard")}><>Net Income</></a></li>
                  <li className="nav-item"> <a className={ this.isPathActive('/form-elements/wizard') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/form-elements/wizard")}><>Revenue Share</></a></li>
                </ul>
              </Collapse>
            </li>
           }
           {false && this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code != "MERCHANT" && 
          <li className={ this.isPathActive(AppConstants.EQUIPMENT_ORDERS_PATH) ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.equipmentOrdersMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('equipmentOrdersMenu') } data-toggle="collapse">
              <i className="ti-eraser menu-icon"></i>
              <span className="menu-title"  title="Future Use">Equipment Orders</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.equipmentOrdersMenu }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className={ this.isPathActive('/editors/text-editors') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/editors/text-editors")}><>Pending</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/editors/code-editor') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/editors/code-editor")}><>Submitted</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/editors/code-editor') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/editors/code-editor")}><>Deployed</></a></li>
              </ul>
            </Collapse>
          </li>
          }
          {this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code == "MERCHANT" && 
          <li className={ this.isPathActive(AppConstants.REPORTS_PATH) ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.reportsMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('reportsMenu') } data-toggle="collapse">
              <i className="ti-bar-chart-alt menu-icon"></i>
              <span className="menu-title"  title="Future Use">Reports</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.reportsMenu }>
              <ul className="nav flex-column sub-menu">
                {false && <li className="nav-item"> <a className={ this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/charts/chart-js")}><>Authorizations</></a></li>}
                {false && <li className="nav-item"> <a className={ this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/charts/chart-js")}><>Settlement</></a></li>}
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.MERCHANT_DETAIL_PATH + '?batch') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.MERCHANT_DETAIL_PATH + '?batch')}><>Batches</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.MERCHANT_DETAIL_PATH + '?transactions') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.MERCHANT_DETAIL_PATH + '?transactions')}><>Transactions</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.MERCHANT_DETAIL_PATH + '?chargebacks') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.MERCHANT_DETAIL_PATH + '?chargebacks')}><>Chargebacks</></a></li>
                {false && <li className="nav-item"> <a className={ this.isPathActive('/charts/google-charts') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/charts/google-charts")}><>Retrievals</></a></li>}
                {false && <li className="nav-item"> <a className={ this.isPathActive('/charts/sparkline-charts') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/charts/sparkline-charts")}><>Interchange</></a></li>}
                {false && <li className="nav-item"> <a className={ this.isPathActive('/charts/sparkline-charts') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/charts/sparkline-charts")}><>Statements</></a></li>}
              </ul>
            </Collapse>
          </li>
        }
          <li className={ this.isPathActive(AppConstants.MY_PROFILE_PATH) ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.myProfileMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('myProfileMenu') } data-toggle="collapse">
              <i className="ti-layout menu-icon"></i>
              <span className="menu-title">My Profile</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.myProfileMenu }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.MY_INFO_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.MY_INFO_PATH)}><>My Info</></a></li>
              </ul>
            </Collapse>
          </li>
          {this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code == "DAS" && 
          <li className={ this.isPathActive(AppConstants.ORGANIZATIONS_PATH) ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.organizationsMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('organizationsMenu') } data-toggle="collapse">
              <i className="ti-layout menu-icon"></i>
              <span className="menu-title">Organizations</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.organizationsMenu }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.USER_LIST_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.USER_LIST_PATH)}><>Eagle</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_ISOS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_ISOS_PATH)}><>ISOs</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SUB_ISOS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SUB_ISOS_PATH)}><>Sub ISOs</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SALES_OFFICE_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SALES_OFFICE_PATH)}><>Sales Offices</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SALES_AGENTS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SALES_AGENTS_PATH)}><>Sales Agents</></a></li>
              </ul>
            </Collapse>
          </li>
          }
          {this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code == "ISO" && 
          <li className={ this.isPathActive(AppConstants.ORGANIZATIONS_PATH) ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.organizationsMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('organizationsMenu') } data-toggle="collapse">
              <i className="ti-layout menu-icon"></i>
              <span className="menu-title">Organizations</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.organizationsMenu}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_ISOS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_ISOS_PATH)}><>Manage ISO</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SUB_ISOS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SUB_ISOS_PATH)}><>Sub ISOs</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SALES_OFFICE_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SALES_OFFICE_PATH)}><>Sales Offices</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SALES_AGENTS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SALES_AGENTS_PATH)}><>Sales Agents</></a></li>
              </ul>
            </Collapse>
          </li>
          }
          {this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code == "SUB-ISO" && 
          <li className={ this.isPathActive(AppConstants.ORGANIZATIONS_PATH) ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.organizationsMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('organizationsMenu') } data-toggle="collapse">
              <i className="ti-layout menu-icon"></i>
              <span className="menu-title">Organizations</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.organizationsMenu }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SUB_ISOS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SUB_ISOS_PATH)}><>Manage SUB ISO</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SALES_OFFICE_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SALES_OFFICE_PATH)}><>Sales Offices</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SALES_AGENTS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SALES_AGENTS_PATH)}><>Sales Agents</></a></li>
              </ul>
            </Collapse>
          </li>
          }
          {this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code == "SALES-OFFICE" && 
          <li className={ this.isPathActive(AppConstants.ORGANIZATIONS_PATH) ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.organizationsMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('organizationsMenu') } data-toggle="collapse">
              <i className="ti-layout menu-icon"></i>
              <span className="menu-title">Organizations</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.organizationsMenu }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SALES_OFFICE_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SALES_OFFICE_PATH)}><>Manage Sales Office</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SALES_AGENTS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SALES_AGENTS_PATH)}><>Sales Agents</></a></li>
              </ul>
            </Collapse>
          </li>
          }
          {this.props.user && this.props.user.Permissions && this.props.user.Permissions.User_Level_Code == "SALES-AGENT" && 
          <li className={ this.isPathActive(AppConstants.ORGANIZATIONS_PATH) ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.organizationsMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('organizationsMenu') } data-toggle="collapse">
              <i className="ti-layout menu-icon"></i>
              <span className="menu-title">Organizations</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.organizationsMenu }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.LIST_SALES_AGENTS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.LIST_SALES_AGENTS_PATH)}><>Manage Sales Agents</></a></li>
              </ul>
            </Collapse>
          </li>
          }  
          {false && 
          <li className={ this.isPathActive(AppConstants.SUPPORT_PATH) ? 'nav-item active' : 'nav-item' }  > 
            <div className={ this.state.supportMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('supportMenu') } data-toggle="collapse">
              <i className="ti-write menu-icon"></i>
              <span className="menu-title" title="Future Use">Support</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.supportMenu }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className={ this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/icons/mdi")}><>My Tickets</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/icons/flag-icons') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/icons/flag-icons")}><>Open Ticket</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/icons/font-awesome') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/icons/font-awesome")}><>Knowledgebase</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/icons/simple-line') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/icons/simple-line")}><>Announcements</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive('/icons/themify') ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate("/icons/themify")}><>Server Status</></a></li>
              </ul>
            </Collapse>
          </li>
          }    
          <li className={ this.isPathActive(AppConstants.SUPPORT_PATH) ? 'nav-item active' : 'nav-item' }  > 
            <div className={ this.state.documentationMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('documentationMenu') } data-toggle="collapse">
              <i className="ti-write menu-icon"></i>
              <span className="menu-title" title="Future Use">Documentation</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.documentationMenu }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_UNDERWRITING_CRITERIA_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_UNDERWRITING_CRITERIA_PATH)}><>Underwriting Criteria</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_APPLICATION_ENTRY_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_APPLICATION_ENTRY_PATH)}><>Application Entry</></a></li>
                <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_BOARDING_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_BOARDING_PATH)}><>Boarding</></a></li>
                <div className={ this.state.documentationSoarMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('documentationSoarMenu') } data-toggle="collapse">
                  <i className="ti-write menu-icon"></i>
                  <span className="menu-title" title="Future Use">SOAR</span>
                  <i className="menu-arrow"></i>
                </div>
                <Collapse in={ this.state.documentationSoarMenu }>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_SOAR_ADD_MERCHANT_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_SOAR_ADD_MERCHANT_PATH)}><>How to add a merchant on SOAR</></a></li>
                  </ul>
                </Collapse>


                <div className={ this.state.documentationTerminalsMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('documentationTerminalsMenu') } data-toggle="collapse">
                  <i className="ti-write menu-icon"></i>
                  <span className="menu-title" title="Future Use">Terminals</span>
                  <i className="menu-arrow"></i>
                </div>
                <Collapse in={ this.state.documentationTerminalsMenu }>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_AMP_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_AMP_PATH)}><>AMP</></a></li>
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_AMP_8000_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_AMP_8000_PATH)}><>8000</></a></li>
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_AMP_8200_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_AMP_8200_PATH)}><>8200</></a></li>
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_AMP_PAY_AT_THE_PUMP_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_AMP_PAY_AT_THE_PUMP_PATH)}><>Pay at the Pump</></a></li>
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_AMP_KIOSK_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_AMP_KIOSK_PATH)}><>Kiosk</></a></li>
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_AMP_DOWNLOAD_PROCEDURES_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_AMP_DOWNLOAD_PROCEDURES_PATH)}><>Download Procedures</></a></li>
                    </ul>
                    <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_PAX_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_PAX_PATH)}><>PAX</></a></li>
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_PAX_A920_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_PAX_A920_PATH)}><>A920</></a></li>
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_PAX_A800_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_PAX_A800_PATH)}><>A800</></a></li>
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_PAX_S920_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_PAX_S920_PATH)}><>S920</></a></li>
                    </ul>
                    <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_PATH)}><>Ingenico</></a></li>
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_TETRA_APP_SUMMARY_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_TETRA_APP_SUMMARY_PATH)}><>Ingenico Tetra app Summar</></a></li>
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_EBT_QRG_TSYS_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_EBT_QRG_TSYS_PATH)}><>Tetra EBT QRG TSYS</></a></li>
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_TETRA_RESTAURANT_QRG_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_TETRA_RESTAURANT_QRG_PATH)}><>Tetra Restaurant QRG</></a></li>
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_TETRA_RETAIL_QRG_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_TETRA_RETAIL_QRG_PATH)}><>Tetra Retail QRG</></a></li>
                      <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_TERMINALS_PAX_S920_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_TERMINALS_INGENICO_TETRA_OVERVIEW_PATH)}><>Tetra Overview</></a></li>
                    </ul>
                  </ul>
                   
                </Collapse>

                <div className={ this.state.documentatioPOSMenu ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('documentatioPOSMenu') } data-toggle="collapse">
                  <i className="ti-write menu-icon"></i>
                  <span className="menu-title" title="Future Use">Point Of Sale</span>
                  <i className="menu-arrow"></i>
                </div>
                <Collapse in={ this.state.documentatioPOSMenu }>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_POINT_OF_SALE_FLAT_ZERO_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_POINT_OF_SALE_FLAT_ZERO_PATH)}><>Flatzero</></a></li>
                    <li className="nav-item"> <a className={ this.isPathActive(AppConstants.DOCUMENTATION_POINT_OF_SALE_SOFT_POINT_PATH) ? 'nav-link active' : 'nav-link' } onClick={() => this.navigate(AppConstants.DOCUMENTATION_POINT_OF_SALE_SOFT_POINT_PATH)}><>Softpoint</></a></li>
                  </ul>
              </Collapse>
                

              </ul>
            </Collapse>
          </li>    
          <li className={ this.isPathActive('/notifications') ? 'nav-item active' : 'nav-item' } onClick={() => this.props.logout()}>
            <a className={ 'nav-link' } href={'#'}><>
              <i className="ti-bell menu-icon"></i>
              <span className="menu-title">Logout</span>
             </></a>
          </li>          

          
           
        
          
           
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.router.asPath.startsWith(path);
  }

  componentDidMount() {
    this.props.getConfig();
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

const  mapStateToProps = (state) =>{ 
  return {
      lists: state.central.lists,
      user: state.central.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: bindActionCreators(CentralActions.logoutAction, dispatch),
      addUser: bindActionCreators(UserActions.addUser, dispatch),
      registerFromLocation: bindActionCreators(UserActions.registerFromLocation, dispatch),
      getConfig: () => dispatch(CentralActions.loadListsAndConfig()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetSidebar))
