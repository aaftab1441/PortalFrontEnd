
import {styled} from "@mui/system";
import {SelectValidator} from "react-material-ui-form-validator";

const SelectField = styled(SelectValidator)(() => ({
    '& fieldset': {
        borderRadius: '0px',
        borderWidth: '1px',

    },
    '&.MuiFormControl-root': {
        width: '100%',
		height: '40px',
		padding: '0px',
		margin: '0px'
    }
}));
export default SelectField;