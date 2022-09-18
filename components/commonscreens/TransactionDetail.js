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

export default function TransactionDetail(props) {
    const [transactionTab, setInspectionTabValue] = React.useState(0);

    const handleInspectionTabChange = (event, newValue) => {
        setInspectionTabValue(newValue);
    };
    const handleClose = () => {
        console.log("close");
        props.closeTransactionDetail();
    }
     
    let transaction = props.transactionDetail;
    console.log(transaction);
    return (
        <Modal
            open={props.openTransactionDetail}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Row className={'mb-2'}>
                    <Col md={11} className={'text-center'}><h4>Transaction Detail</h4></Col>
                    <Col md={1}>
                        <Button  color="secondary" variant="contained" onClick={() => {props.closeTransactionDetail()}}>Close</Button>
                    </Col>
                </Row>
                

                    <Row>
                        <Col md={12}>
                            <Table striped>
                                <tbody>
                                <tr>
                                    <td>Merchant Number</td>
                                    <td>{StringUtils.naIfEmpty(transaction.merch_no_hf)}</td>
                                    <td>DBA Name</td>
                                    <td>{StringUtils.naIfEmpty(props.currentMerchant.Merchant.mm_dba_name)}</td>
                                    <td>Term Number</td>
                                    <td>{StringUtils.zeroPadNumber(transaction.term_no_hf, "0")}</td>
                                </tr>
                                <tr>
                                    <td>Card Number</td>
                                    <td>{StringUtils.naIfEmpty(transaction.card_no_hf)}</td>
                                    <td>Batch Date</td>
                                    <td>{StringUtils.formatYYMMDDDate(transaction.batch_date_hf)}</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Trans Date</td>
                                    <td>{StringUtils.formatCDate(transaction.tran_date_hf)}</td>
                                    <td>Trans Type</td>
                                    <td>{StringUtils.zeroPadNumber(transaction.trans_type_hf, "0")} {StringUtils.translate( transaction.trans_type_hf, props.lists.TRANSACTION_TYPE)}</td>
                                    <td>Transaction Amount</td>
                                    <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(transaction.tran_amnt_hf))}</td>
                                </tr>
                                <tr>
                                    <td>Card Type</td>
                                    <td>{StringUtils.naIfEmpty(transaction.card_type_hf)}</td>
                                    <td>Auth Num</td>
                                    <td>{StringUtils.naIfEmpty(transaction.auth_num_hf)}</td>
                                    <td>Reference #</td>
                                    <td>{StringUtils.naIfEmpty(transaction.acq_ref_no_hf)}</td>
                                </tr>
                                

                                <tr>
                                    <td>Auth Amt</td>
                                    <td colSpan={3}>{StringUtils.formatNumber(StringUtils.naIfEmpty(transaction.auth_amnt_hf))}</td>
                                    <td colSpan={2}>&nbsp;</td>
                                </tr>
                                {props.user &&  props.user.Permissions && props.user.Permissions.User_Level_Code == 'DAS' && 
                                <>
                                    <tr>                                    
                                        <td>AVS Req/Resp</td>
                                        <td>{StringUtils.naIfEmpty(transaction.avs_requested_hf)} / {StringUtils.naIfEmpty(transaction.avs_result_hf)}</td>
                                        <td>Cash Discount Amount</td>
                                        <td>{StringUtils.formatNumber(StringUtils.naIfEmpty(transaction.cash_disc_amnt_hf))}</td>
                                        <td>Cash Discount %</td>
                                        <td>{StringUtils.naIfEmpty(transaction.cash_disc_perc_hf)}</td>
                                    </tr>
                                    <tr>                                    
                                        <td>Cash Discount PIF</td>
                                        <td>{StringUtils.naIfEmpty(transaction.cash_disc_pif_hf)}</td>
                                        <td>MCC</td>
                                        <td>{StringUtils.naIfEmpty(transaction.mcc_hf)}</td>
                                        <td colSpan={2}>&nbsp;</td>
                                    </tr>
                                </>}
                                 

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                 
                    
            </Box>

        </Modal>
    )
}