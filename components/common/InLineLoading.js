/**
 *
 * Loading
 *
 */

import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Box from '@mui/material/Box';

class InLineLoading extends CircularProgress {

 render(props) {
   
 
  return (
	<Box>
		<CircularProgress {...props}/> Loading
    </Box>
  );
}

}

InLineLoading.propTypes = {};

export default InLineLoading;
