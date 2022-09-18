/**
 *
 * NoHeader
 *
 */

import React, { memo } from 'react';


import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as AppConstants from '../../utilities/constants';
import { getValue, getBaseUrl } from '../../utilities/string';


export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any,
  value: PropTypes.any,
};

export default memo(TabPanel);
