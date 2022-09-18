/**
 *
 * GetNavbar
 *
 */

import React, { memo, Component } from 'react';
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {  withRouter } from "next/router";
import* as AppConstants from '../../utilities/constants';
import { getValue, getBaseUrl } from '../../utilities/string';

class GetNavbar  extends Component  {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }

  render(){
      return (
          <>
            <Helmet>
              <title>{this.props.title}</title>
              <meta name="description" content={this.props.description}/>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
              <meta httpEquiv="content-type" content="text/html;charset=UTF-8"/>
              <link rel="icon" href={AppConstants.BASE_HOST_URL + "images/favicon.ico"} type="image/x-icon" />
              {
                !/.*3000.*/.test(window.location.href) && !/.*summary*/.test(window.location.href) &&
                <base href={AppConstants.BASE_HOST_URL} />
              }

              <link href={AppConstants.BASE_HOST_URL + "css/main.css"} rel="stylesheet"></link>

            </Helmet>
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
              <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <span className="navbar-brand brand-logo mr-5"  onClick={() => this.props.router.push("/dashboard")}><img src={'/img/logo.png'} className="mr-2" alt="logo" style={{height: '70px'}}/></span>
                <span className="navbar-brand brand-logo-mini" onClick={() => this.props.router.push("/dashboard")}><img src={'/img/logo-mini.svg'} alt="logo" /></span>
              </div>
              <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-end">
                <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
                  <span className="ti-layout-grid2"></span>
                </button>
                <ul className="navbar-nav mr-lg-2">
                  <li className="nav-item nav-search d-none d-lg-block">
                     
                  </li>
                </ul>
                <ul className="navbar-nav navbar-nav-right">
                  <li className="nav-item mr-1">
                     
                  </li>
                  <li className="nav-item">
                     
                  </li>
                  <li className="nav-item nav-profile">
                     
                  </li>
                  <li className="nav-item nav-settings d-none d-lg-block">
                    
                  </li>
                </ul>
                
              </div>
            </nav>
          </>    

    


      );
  }
}

GetNavbar.propTypes = {};



const  mapStateToProps = (state) =>{
  return {
      user: state.central.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
     


  }
}
export default withRouter (connect(mapStateToProps, mapDispatchToProps)(GetNavbar));