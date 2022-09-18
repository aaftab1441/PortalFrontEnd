
import {styled} from "@mui/system";
import {  TextValidator } from 'react-material-ui-form-validator';

const TextBox = styled(TextValidator)(() => ({
    '& fieldset': {
        borderRadius: '0px',
        borderWidth: '1px',
        
    },
    '.MuiFormControl-root': {
        width: '100%',
    },
}));

export default TextBox;
