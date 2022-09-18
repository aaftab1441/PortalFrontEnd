/**
 *
 * Header
 *
 */

import React from 'react';

import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { getValue, translate } from '../../utilities/string';
import * as AppConstants from '../../utilities/constants';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "next/router";
import PropTypes from 'prop-types';
// import styled from 'styled-components';

class Header extends React.Component {

	  constructor(props){
		  super(props);
	  }	
	  
	  componentDidMount() {
		  let allMenuItems = {data: false, admin: false};
		  this.setState({menu: allMenuItems});
	  }

	  toggle(menuItem){
		 let allMenuItems = this.state.menu;
		 allMenuItems[menuItem] = !allMenuItems[menuItem];
		 this.setState({menu: allMenuItems});
		 this.props.router.push(AppConstants.DASHBOARD_PAGE);
	  }
	  
	  render() {
	 
		if(!this.props.user || !this.props.user.UserDetail || !this.props.user.UserDetail.User_Level_Code){
			this.props.router.push(AppConstants.LOGIN_PATH);
			return (
				<></>);
		}else {
			
		  return (
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

			       
					<Loading {...this.props}/>

			      </Helmet>
				   );
	  	}
			         
 
			    

		 
	  }
	}


const  mapStateToProps = (state) =>{  
	return {
		user: state.central.user,
			
	}
}


const mapDispatchToprops = (dispatch) => {
	return {
			

	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToprops)(Header))