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
import * as Utils from '../../utilities/util';
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

export default function ACHDetail(props) {
    const [achTab, setInspectionTabValue] = React.useState(0);

    const handleInspectionTabChange = (event, newValue) => {
        setInspectionTabValue(newValue);
    };
    const handleClose = () => {
        console.log("close");
        props.closeACHDetail();
    }
     
    let ach = props.aCHDetail;
    console.log(ach);
    return (
        <Modal
            open={props.openACHDetail}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Row className={'mb-2'}>
                    <Col md={11} className={'text-center'}><h4>ACH Detail</h4></Col>
                    <Col md={1}>
                        <Button  color="secondary" variant="contained"  onClick={() => {props.closeACHDetail()}}>Close</Button>
                    </Col>
                </Row>
                

                    <Row>
                        <Col md={12}>
                            <Table striped>
                            <tbody>
                                <tr>
                                    <td>Date</td>
                                    <td>{StringUtils.formatShortDate(ach.DATE_ACHACT)}</td>
                                    <td>Net Released</td>
                                    <td>
                                    {StringUtils.formatNumberWithDecimal(ach.AMNT_ACHACT)} 
                                    </td>
                                    <td>Trace</td>
                                    <td>{StringUtils.naIfEmpty(ach.TRACE_NUM_ACHACT)}</td>
                                </tr>
                                <tr>
                                    <td>Account # </td>
                                    <td>{StringUtils.showOnlyLastFour(ach.DFI_ACCT_NUM_ACHACT)}</td>
                                    <td>Routing</td>
                                    <td>{StringUtils.showOnlyLastFour(ach.ROUTING_NUM_ACHACT)}</td>
                                    <td>Transaction Code</td>
                                    <td>{StringUtils.naIfEmpty(ach.TRANS_CODE_ACHACT)}</td>
                                   
                                </tr>
                               
                                 
 

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                 
                    
            </Box>

        </Modal>
    )
}