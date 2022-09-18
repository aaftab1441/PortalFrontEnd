/**
 *
 * NoHeader
 *
 */

 import React, { memo } from 'react';
 import { red } from '@mui/material/colors';
 import { ValidatorComponent } from "react-material-ui-form-validator";
 import { DatePicker } from '@mui/x-date-pickers';
 import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
 import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
 import TextField from '@mui/material/TextField';
 const red300 = red['500'];
 const style = {
   right: 0,
   fontSize: '12px',
   color: red300,
   position: 'absolute',
   marginTop: '-25px',
   borderRadius: '0px',
   padding: '10px',
 };
 
 class ValidatedDatePicker extends ValidatorComponent {
 
   renderValidatorComponent() {
     const {
       errorMessages,
       validators,
       requiredError,
       helperText,
       validatorListener,
       ...rest
     } = this.props;
     const { isValid } = this.state;
 
     return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          {...rest}   
          error={!isValid}   
          helperText={(!isValid && this.getErrorMessage()) || helperText}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
 
       </LocalizationProvider>
     );
   }
 
   errorText() {
     const { isValid } = this.state;
 
     if (isValid) {
       return null;
     }
 
     return (
       <div style={style}>
         {this.getErrorMessage()}
       </div>
     );
   }
 }
 
 ValidatedDatePicker.propTypes = {};
 
 export default memo(ValidatedDatePicker);