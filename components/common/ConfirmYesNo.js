/**
 *
 * NoHeader
 *
 */

import React, { memo } from 'react';

import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import * as AppConstants from '../../utilities/constants';
import { getValue, getBaseUrl } from '../../utilities/string';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmYesNo(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
     
      
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onConfirm}>Yes</Button>
          <Button onClick={props.onCancel} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
   
  );
}
 