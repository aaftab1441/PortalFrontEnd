/**
 *
 * LeftNav
 *
 */

import React from 'react';


import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import * as AppConstants from '../../utilities/constants';
import { getValue } from '../../utilities/string';
import {PATIENT_LIST_PATH} from '../../utilities/string';
import PropTypes from 'prop-types';
import AdminLeftNav from 'components/Common/Menus/LeftNavs/AdminLeftNav';
import ResearcherLeftNav from 'components/Common/Menus/LeftNavs/ResearcherLeftNav';
import PatientLeftNav from 'components/Common/Menus/LeftNavs/PatientLeftNav';
import AuthorizedMedicalProfessionalLeftNav from 'components/Common/Menus/LeftNavs/AuthorizedMedicalProfessionalLeftNav';
import MedicalProfessionalLeftNav from 'components/Common/Menus/LeftNavs/MedicalProfessionalLeftNav';
// import styled from 'styled-components';

class LeftNav extends React.Component {

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
	  
  }
  
  render() {
	 
	  return (
		<>
			{/.*ADMIN.*/.test(this.props.user.user_type) &&
	          <AdminLeftNav {...this.props} />
	        }
	        {/.*RESEARCHER.*/.test(this.props.user.user_type) &&
	          <ResearcherLeftNav  {...this.props} />
	        }
	        {/.*PATIENT.*/.test(this.props.user.user_type) &&
	            <PatientLeftNav {...this.props} />
	        }
	        {/.*AUTHORIZED_MEDICAL_PROFESSIONAL.*/.test(this.props.user.user_type) &&
	            <AuthorizedMedicalProfessionalLeftNav {...this.props} />
	        }
	        {/.*MEDICAL_PROFESSIONAL.*/.test(this.props.user.user_type) &&
	            <MedicalProfessionalLeftNav {...this.props} />
	        }
		</>
			 
	
	
	  );
  }
}

LeftNav.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  menu: PropTypes.object,
};

export default LeftNav;
