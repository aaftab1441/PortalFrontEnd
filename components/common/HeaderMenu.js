/**
 *
 * Loading
 *
 */

import React, { useState } from 'react';

import { Modal} from 'react-bootstrap'; 
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import * as AppConstants from '../../utilities/constants';

// import styled from 'styled-components';

class HeaderMenu  extends React.Component {

	  constructor(props){
		  super(props);
	  }	
	  
	  componentDidMount() {
		  let allMenuItems = {mainMenu: false};
		  this.setState({show: false});
		  this.setState({menu: allMenuItems})
		  
	  }
	  
	  toggle(menuItem){
		 let allMenuItems = this.state.menu;
		 allMenuItems[menuItem] = !allMenuItems[menuItem];
		 this.setState({menu: allMenuItems});
		 
	  }
	  
	  toggleSpec(menuItem, spec){
		 
		  let allMenuItems = this.state.menu;
		 allMenuItems[menuItem] = spec;
		 this.setState({menu: allMenuItems});		  
	  }
	  
	  setShow(newValue){
		 this.setState({show: newValue});		  
	  }
	  
	   
	  render() {
		 
		  return (
    
				  <>
				 
				</>
					 
			  
	  );
	}
}

HeaderMenu.propTypes = {
	show: PropTypes.bool,
	menu: PropTypes.object
		
};


export default HeaderMenu;
 