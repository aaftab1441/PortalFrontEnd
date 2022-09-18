import React from "react";
import {useSelector} from "react-redux";
import {Col, Container, Row, Table} from "react-bootstrap";
import DataTable from 'react-data-table-component';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import * as StringUtils from '../../utilities/string';
import {formatDate, formatDateTime, naIfEmpty, translate} from "../../utilities/util";
import MenuItem from "@mui/material/MenuItem";
 
 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ChargeBackDetail(props) {
    const [chargeBackTab, setInspectionTabValue] = React.useState(0);

    const handleInspectionTabChange = (event, newValue) => {
        setInspectionTabValue(newValue);
    };
    const handleClose = () => {
        console.log("close");
        props.closeChargeBackDetail();
    }
     
    let chargeBack = props.chargeBackDetail;
    console.log("Charge Back:", chargeBack);
    return (
        <Modal
            open={props.openChargeBackDetail}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Row className={'mb-2'}>
                    <Col md={11} className={'text-center'}><h4>Charge Back Detail</h4></Col>
                    <Col md={1}>
                        <Button  color="secondary" variant="contained"  onClick={() => {props.closeChargeBackDetail()}}>Close</Button>
                    </Col>
                </Row>
                

                    <Row>
                        <Col md={12}>
                            <Table striped>
                                <tbody>
                                <tr>
                                    <td>Charge Back Date</td>
                                    <td>{StringUtils.formatYYYYMMDDDate(chargeBack.Transaction_Date)}</td>
                                    <td>Transaction Amount</td>
                                    <td>{StringUtils.formatChargeBackNumber(chargeBack.Transaction_Amount)}</td>
                                    <td>Transaction ID</td>
                                    <td>{StringUtils.naIfEmpty(chargeBack.Transaction_ID)}</td>
                                </tr>
                                <tr>
                                    <td>TID </td>
                                    <td>{StringUtils.naIfEmpty(chargeBack.TID)}</td>
                                    <td>Validation Code</td>
                                    <td>{StringUtils.naIfEmpty(chargeBack.Validation_Code)}</td>
                                    <td>Card</td>
                                    <td>{StringUtils.naIfEmpty(chargeBack.Cardholder_Account_Number)}</td>
                                </tr>                                 
                                 <tr>
                                     <td>Auth Code</td>
                                    <td>{StringUtils.naIfEmpty(chargeBack.Auth_Code)}</td>
                                    <td>Dispute Date</td>
                                    <td>{StringUtils.formatYYYYMMDDDate(chargeBack.Dispute_Date)}</td>
                                    <td>Dispute Type</td>
                                    <td>{StringUtils.naIfEmpty(chargeBack.Dispute_Type)}</td>
                                </tr>
                                
                                <tr>
                                    <td>Description</td>
                                    <td colSpan={5}>{StringUtils.naIfEmpty(chargeBack.Description)}</td>
                                     
                                </tr>
                                
                                 

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                 
                    
            </Box>

        </Modal>
    )
}