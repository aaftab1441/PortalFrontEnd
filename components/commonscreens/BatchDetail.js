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

export default function BatchDetail(props) {
    const [batchTab, setInspectionTabValue] = React.useState(0);

    const handleInspectionTabChange = (event, newValue) => {
        setInspectionTabValue(newValue);
    };
    const handleClose = () => {
        console.log("close");
        props.closeBatchDetail();
    }
     
    let batch = props.batchDetail;
    console.log(batch);
    return (
        <Modal
            open={props.openBatchDetail}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Row className={'mb-2'}>
                    <Col md={11} className={'text-center'}><h4>Batch Detail</h4></Col>
                    <Col md={1}>
                        <Button variant="contained" color="secondary"  onClick={() => {props.closeBatchDetail()}}>Close</Button>
                    </Col>
                </Row>
                

                    <Row>
                        <Col md={12}>
                            <Table striped>
                                <tbody>
                                <tr>
                                    <td>Date</td>
                                    <td>{StringUtils.formatShortDate(batch.DATE_ACHACT)}</td>
                                    <td>Net Released</td>
                                    <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(batch.ach_sum_net_released))}</td>
                                    <td>Net Held</td>
                                    <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(batch.ach_sum_net_held))}</td>
                                </tr>
                                <tr>
                                    <td>Refund Amount </td>
                                    <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(batch.ach_sum_refund))}</td>
                                    <td>Return Amount</td>
                                    <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(batch.ach_sum_return_amount))}</td>
                                    <td>Sale Amount</td>
                                    <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(batch.ach_sum_sales_amount))}</td>
                                   
                                </tr>
                                
                                <tr>
                                    <td>Cash Discount Amount</td>
                                    <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(batch.ach_sum_cash_disc_amnt))}</td>
                                    <td>CHBK AMount</td>
                                    <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(batch.ach_sum_chbk_amount))}</td>
                                    <td>Visa Amount</td>
                                    <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(batch.ach_sum_visa_net))}</td>
                                </tr>
                                <tr>
                                    <td>MC Amount</td>
                                    <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(batch.ach_sum_mc_net))}</td>
                                    <td colSpan={4}></td>
                                   
                                </tr>
                                
                                

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                 
                    
            </Box>

        </Modal>
    )
}