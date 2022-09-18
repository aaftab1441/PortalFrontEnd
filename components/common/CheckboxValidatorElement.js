/**
 *
 * CheckboxValidatorElement
 *
 */

import React, { memo } from 'react';
import { red } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { ValidatorComponent } from 'react-material-ui-form-validator';

const red300 = red['500'];

const style = {
    right: 0,
    fontSize: '12px',
    color: red300,
    position: 'absolute',
    marginTop: '-25px',
};

class CheckboxValidatorElement extends ValidatorComponent {

    render() {
        const { errorMessages, validators, requiredError, value, ...rest } = this.props;

        return (
            <div>
                <Checkbox
                    {...rest}
                    ref={(r) => { this.input = r; }}
                />
                {this.errorText()}
            </div>
        );
    }

    detachFromForm(form){

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

export default memo(CheckboxValidatorElement);
