/**
 *
 * ConfirmDelete
 *
 */

import React, { useState, useEffect } from 'react';

import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import styled from 'styled-components';



function ConfirmDelete(props) {
  const [open, setOpen] = React.useState(true );

	  
  const handleClose = () => {
    props.close(false);
  };
 
  const handleCloseConfirm = () => {
     props.close(false);
	  props.confirm();
  };
  
 return (
	    <div>
	      <Dialog
	        open={props.open}
	        onClose={handleClose}
	        aria-labelledby="alert-dialog-title"
	        aria-describedby="alert-dialog-description"
	      >
	        <DialogTitle id="alert-dialog-title">{"Confirm delete?"}</DialogTitle>
	        <DialogContent>
	          <DialogContentText id="alert-dialog-description">
	            Continue with delete?
	          </DialogContentText>
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={handleCloseConfirm} color="primary">
	            Yes
	          </Button>
	          <Button onClick={handleClose} color="primary" autoFocus>
	            No
	          </Button>
	        </DialogActions>
	      </Dialog>
	    </div>
	  );
	}
ConfirmDelete.propTypes = {};

export default ConfirmDelete;
