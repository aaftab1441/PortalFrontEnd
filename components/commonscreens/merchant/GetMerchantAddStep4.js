import React from "react";
import PropTypes from "prop-types";
import { ValidatorForm } from "react-material-ui-form-validator";
import TextBox from "../../common/TextBox";
import SelectField from "../../common/SelectField";
import ValidatedDatePicker from "../../common/ValidatedDatePicker";
import * as StringUtils from "../../../utilities/string";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import EditIcon from "@mui/icons-material/Edit";
import DialogTitle from "@mui/material/DialogTitle";
import StepLabel from "@mui/material/StepLabel";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NumberFormat from "react-number-format";
import { Row, Col, Form } from "react-bootstrap";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import "bootstrap/dist/css/bootstrap.min.css";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TabPanel } from "/components/common/TabPanel";

// import styled from 'styled-components';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function GetMerchantAddStep4(props) {
  let stateList = [];
  let appMessages = StringUtils.getDisplayMessages(props.messages);
  let yesNoList = [];
  let existingterminalmanufacturerList = [];
  let pmtgatewayList = [];
  let sellproductareaList = [];
  let sellingtypeList = [];
  let typeofaccountList = [];
  let whoenterscreditcardinfoList = [];
  let merchantpcicompliantList = [];
  let posmanufacturerList = [];
  let softwareList = [];
  let previousprocessorterminatedreasonList = [];
  let selectedcardsList = [];
  let replacerefundList = [];
  let warranteeguaranteetypeList = [];
  let customer_chargedList = [];
  let daystosubmittransactionsList = [];
  let mktingmethodList = [];
  let merchanttypeList = [];
  let seasonalmonthsList = [];
  let cardpaymentonList = [];
  let documentTypeList = [];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
  };

  let feeTemplates = [];

  if (props.templates) {
    feeTemplates = props.templates.map(function (anItem, index) {
      return (
        <MenuItem value={anItem.id} key={index}>
          {anItem.name}
        </MenuItem>
      );
    });
  }

  let dynamicUI;

  if (props.templates) {
    let selectedTemplate = props.templates.find((obj) => {
      return obj.id === props.selectedTemplateId;
    });
    if (selectedTemplate) {
      dynamicUI = selectedTemplate.categories.map((category, indexO) => (
        <div key={indexO}>
          <Row>
            <Col>{category.name}</Col>
            <br />
            <br />
          </Row>
          {arrayChunk(category.fees, 3).map((fees, i) => (
            <Row key={indexO + "_" + i}>
              <div className="col-md-12 form-group">
                <Row>
                  {fees.map((fee, index) => (
                    <Col md={4} key={indexO + "_" + index}>
                      <label>
                        {fee.description} (Low: {fee.lowValue} High:{" "}
                        {fee.highValue})
                      </label>
                      <TextBox
                        value={fee.defaultValue}
                        onChange={props.handleItemChange}
                        validators={[]}
                        type="range"
                        errorMessages={["REQUIRED"]}
                        placeholder=""
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: `${
                            fee.name + "-" + category.id + "-" + fee.id
                          }`,
                          id: `${fee.name + "_" + category.id + "_" + fee.id}`,
                          placeholder: "",
                          type: "text",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </Row>
          ))}
        </div>
      ));
    }
  }

  if (props.lists && props.lists.STATUS) {
    stateList = props.lists.STATES.map(function (anItem, index) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.SEASONAL_MONTHS_LIST) {
    seasonalmonthsList = props.lists.SEASONAL_MONTHS_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem key={index} value={anItem.code}>
          <Checkbox
            checked={props.location.seasonalmonths?.indexOf(anItem.code) > -1}
          />
          <ListItemText primary={anItem.value} />
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.MERCHANT_TYPE_LIST) {
    merchanttypeList = props.lists.MERCHANT_TYPE_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem key={index} value={anItem.code}>
          <Checkbox
            checked={props.location.merchanttype?.indexOf(anItem.code) > -1}
          />
          <ListItemText primary={anItem.value} />
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.MARKETING_METHODS_LIST) {
    mktingmethodList = props.lists.MARKETING_METHODS_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem key={index} value={anItem.code}>
          <Checkbox
            checked={props.location.mktingmethod?.indexOf(anItem.code) > -1}
          />
          <ListItemText primary={anItem.value} />
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.YES_NO_LIST) {
    yesNoList = props.lists.YES_NO_LIST.map(function (anItem, index) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.TYPE_OF_ACCOUNT_LIST) {
    typeofaccountList = props.lists.TYPE_OF_ACCOUNT_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.SELLING_TYPE_LIST) {
    sellingtypeList = props.lists.SELLING_TYPE_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.SELL_PRODUCT_AREA_LIST) {
    sellproductareaList = props.lists.SELL_PRODUCT_AREA_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.SELECTED_CARDS_LIST) {
    selectedcardsList = props.lists.SELECTED_CARDS_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem key={index} value={anItem.code}>
          <Checkbox
            checked={props.location.selectedcards?.indexOf(anItem.code) > -1}
          />
          <ListItemText primary={anItem.value} />
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.REPLACE_REFUND_LIST) {
    replacerefundList = props.lists.REPLACE_REFUND_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.WARRANTEE_GUARANTEE_TYPE_LIST) {
    warranteeguaranteetypeList = props.lists.WARRANTEE_GUARANTEE_TYPE_LIST.map(
      function (anItem, index) {
        return (
          <MenuItem value={anItem.code} key={index}>
            {anItem.value}
          </MenuItem>
        );
      }
    );
  }
  if (props.lists && props.lists.CUSTOMER_CHARGED_LIST) {
    customer_chargedList = props.lists.CUSTOMER_CHARGED_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.DAYS_TO_SUBMIT_TRANSACTIONS_LIST) {
    daystosubmittransactionsList =
      props.lists.DAYS_TO_SUBMIT_TRANSACTIONS_LIST.map(function (
        anItem,
        index
      ) {
        return (
          <MenuItem value={anItem.code} key={index}>
            {anItem.value}
          </MenuItem>
        );
      });
  }
  if (props.lists && props.lists.CARD_PAYMENT_ON_LIST) {
    cardpaymentonList = props.lists.CARD_PAYMENT_ON_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.PREVIOUS_PROCESSOR_TERMINATED_REASON_LIST) {
    previousprocessorterminatedreasonList =
      props.lists.PREVIOUS_PROCESSOR_TERMINATED_REASON_LIST.map(function (
        anItem,
        index
      ) {
        return (
          <MenuItem value={anItem.code} key={index}>
            {anItem.value}
          </MenuItem>
        );
      });
  }
  if (props.lists && props.lists.WHO_ENTERS_CREDIT_CARD_INFO_LIST) {
    whoenterscreditcardinfoList =
      props.lists.WHO_ENTERS_CREDIT_CARD_INFO_LIST.map(function (
        anItem,
        index
      ) {
        return (
          <MenuItem value={anItem.code} key={index}>
            {anItem.value}
          </MenuItem>
        );
      });
  }
  if (props.lists && props.lists.POS_MANUFACTURER_LIST) {
    posmanufacturerList = props.lists.POS_MANUFACTURER_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.MERCHANT_PCI_COMPLIANT_LIST) {
    merchantpcicompliantList = props.lists.MERCHANT_PCI_COMPLIANT_LIST.map(
      function (anItem, index) {
        return (
          <MenuItem value={anItem.code} key={index}>
            {anItem.value}
          </MenuItem>
        );
      }
    );
  }
  if (props.lists && props.lists.EXISTING_TERMINAL_MANUFACTURER_LIST) {
    existingterminalmanufacturerList =
      props.lists.EXISTING_TERMINAL_MANUFACTURER_LIST.map(function (
        anItem,
        index
      ) {
        return (
          <MenuItem value={anItem.code} key={index}>
            {anItem.value}
          </MenuItem>
        );
      });
  }
  if (props.lists && props.lists.PAYMENT_GATEWAY_LIST) {
    pmtgatewayList = props.lists.PAYMENT_GATEWAY_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  if (props.lists && props.lists.SOFTWARE_LIST) {
    softwareList = props.lists.SOFTWARE_LIST.map(function (anItem, index) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }
  const documents = props.location.documents.map((anItem, index) => (
    <TableRow key={index}>
      <TableCell>&nbsp;</TableCell>
      <TableCell>{anItem.document_type} </TableCell>
      <TableCell>{anItem.upload_document}</TableCell>
    </TableRow>
  ));

  let button;
  const hasLocations = props.locations.length > 0;
  if (hasLocations) {
    button = (
      <Button
        variant="contained"
        color="success"
        size="small"
        type="submit"
        className="col-md-12"
      >
        {" "}
        Submit Application{" "}
      </Button>
    );
  } else {
    button = (
      <Button
        variant="contained"
        color="success"
        size="small"
        type="submit"
        className="col-md-12"
        disabled={true}
      >
        {" "}
        Submit Application{" "}
      </Button>
    );
  }

  if (props.lists && props.lists.STATUS) {
    documentTypeList = props.lists.DOCUMENT_TYPE_LIST.map(function (
      anItem,
      index
    ) {
      return (
        <MenuItem value={anItem.code} key={index}>
          {anItem.value}
        </MenuItem>
      );
    });
  }

  const columns = [
    {
      name: "DBA Name",
      selector: (row) => row.dbaName,
    },
    {
      name: "Zip Code",
      selector: (row) => row.zipCode,
    },
    {
      name: "Zip State",
      selector: (row) => row.zipState,
    },
    {
      name: "Contact Name",
      selector: (row) => row.name,
    },
    {
      name: "Actions",
      selector: (row) => row.action,
    },
  ];

  const data = [
    {
      dbaName: 1,
      zipCode: "12345",
      name: "Beetlejuice",
      zipState: "1988",
      action: <EditIcon onClick={() => handleClickOpen()}>Edit</EditIcon>,
    },
    {
      dbaName: 1,
      zipCode: "12345",
      name: "Beetlejuice",
      zipState: "1988",
      action: <EditIcon onClick={() => handleClickOpen()}>Edit</EditIcon>,
    },
    {
      dbaName: 1,
      zipCode: "12345",
      name: "Beetlejuice",
      zipState: "1988",
      action: <EditIcon onClick={() => handleClickOpen()}>Edit</EditIcon>,
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12" id="search">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <h4>Location Information</h4>
                    </div>
                    <div className="col-lg-6 col-md-6 text-right"></div>
                  </div>

                  {appMessages && appMessages.length > 0 && (
                    <div id="error" className="btn-outline-danger">
                      {appMessages}
                    </div>
                  )}

                  <Paper>
                    <Stepper activeStep={3} alternativeLabel>
                      <Step key={"General_Information"}>
                        <StepLabel>General Information</StepLabel>
                      </Step>
                      <Step key={"Merchant_Owner"}>
                        <StepLabel>Merchant Owner</StepLabel>
                      </Step>
                      <Step key={"ISO"}>
                        <StepLabel>ISO</StepLabel>
                      </Step>
                      <Step key={"Merchant_Management"}>
                        <StepLabel>Location</StepLabel>
                      </Step>
                      {/* <Step key={'Fee_Disc'}>
												<StepLabel>Fee/Disc</StepLabel>
											</Step> */}
                    </Stepper>
                    <div className="col-md-12 form-group">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          Location Information
                        </div>
                        <div className="col-lg-6 col-md-6 text-right">
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={handleClickOpen}
                          >
                            Add Location
                          </Button>
                        </div>
                      </div>
                      <DataTable
                        columns={columns}
                        data={data}
                        // title={"Batch"}
                        // onRowClicked={(data) => props.viewBatchDetail(data)}
                        // paginationTotalRows={props.currentMerchant.batch.Count}
                        // data={props.currentMerchant.batch.Data}
                        // paginationPerPage={props.currentMerchant.batch.PageSize}
                        // columns={batchColumns} paginationServer={true}
                        // onChangePage={(page, totalRows) => changePage('batch', page)}
                        // paginationRowsPerPageOptions={[10,30,50,100]}
                        // customStyles={customStyles}
                        // onSort={(column, sortDirection) => handleBatchSort('batch', column, sortDirection)} sortServer
                        // onChangeRowsPerPage={(currentRowsPerPage, currentPage) => changeRowsPerPage('batch', currentRowsPerPage, currentPage)} pagination
                      />
                    </div>
                  </Paper>
                  <Row>
                    <Col md="9 text-right"></Col>
                    <Col md="3 text-right">
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        type="submit"
                        className="col-md-12"
                      >
                        {" "}
                        Submit Application{" "}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Location"}</DialogTitle>
        <DialogContent>
          <Tabs
            value={props.locationPanel}
            aria-label="simple tabs example"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
          >
            <Tab label="Location Information" {...a11yProps(0)} disableRipple />
            <Tab
              label="PCI and Payments Compliance"
              {...a11yProps(1)}
              disableRipple
            />
            <Tab label="Equipment" {...a11yProps(2)} disableRipple />
            <Tab label="Business Information" {...a11yProps(3)} disableRipple />
            <Tab
              label="Processing Information"
              {...a11yProps(4)}
              disableRipple
            />
            <Tab label="Document(s) Upload" {...a11yProps(5)} disableRipple />
            <Tab label="Fee/Disc" {...a11yProps(6)} disableRipple />
          </Tabs>
          <TabPanel value={props.locationPanel} index={0}>
            <ValidatorForm
              className="pt-3"
              onSubmit={() => props.updateActiveTab(1)}
            >
              <>
                <Row>
                  <Col>Location Information</Col>
                  <br />
                  <br />
                </Row>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={3}>
                      <label>DBA Name</label>
                      <TextBox
                        value={props.location.name}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["DBA Name is required"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "name",
                          id: "name",
                          placeholder: "DBA Name",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>Address</label>
                      <TextBox
                        value={props.location.address}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Address is required"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "address",
                          id: "address",
                          placeholder: "ADDRESS",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>City</label>
                      <TextBox
                        value={props.location.city}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["City is required"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "city",
                          id: "city",
                          placeholder: "CITY",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>State</label>
                      <SelectField
                        value={props.location.state}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        size="small"
                        errorMessages={["State is required"]}
                        inputProps={{
                          name: "state",
                          id: "state",
                        }}
                      >
                        {stateList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={3}>
                      <label>Zip</label>
                      <TextBox
                        value={props.location.zipcode}
                        onChange={props.handleItemChange}
                        errorMessages={[
                          "ZipCode is required",
                          "ZipCode is invalid",
                        ]}
                        validators={["required", "matchRegexp:^[0-9]{5}$"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "zipcode",
                          id: "zipcode",
                          placeholder: "ZIPCODE",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>Zipcode + Four</label>
                      <TextBox
                        value={props.location.zipcodeplus4}
                        onChange={props.handleItemChange}
                        errorMessages={["ZipCode is invalid"]}
                        validators={["required", "matchRegexp:^[0-9]{5}$"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "zipcodeplus4",
                          id: "zipcodeplus4",
                          placeholder: "ZIPCODE + FOUR",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>Phone</label>
                      <TextBox
                        value={props.location.phone}
                        onChange={props.handleItemChange}
                        errorMessages={[
                          "Phone is required",
                          "Phone is invalid",
                        ]}
                        validators={[
                          "required",
                          "matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$",
                        ]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "phone",
                          id: "phone",
                          placeholder: "PHONE",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>Fax</label>
                      <TextBox
                        value={props.location.fax}
                        onChange={props.handleItemChange}
                        errorMessages={["Fax is invalid"]}
                        validators={[
                          "matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$",
                        ]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "fax",
                          id: "fax",
                          placeholder: "FAX",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Contact Name</label>
                      <TextBox
                        value={props.location.customercontactname}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Name is required"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "customercontactname",
                          id: "customercontactname",
                          placeholder: "CONTACT NAME",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Contact Title</label>
                      <TextBox
                        value={props.location.contacttitle}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Title is required"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "contacttitle",
                          id: "contacttitle",
                          placeholder: "CONTACT TITLE",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Contact Email</label>
                      <TextBox
                        value={props.location.emailaddress}
                        onChange={props.handleItemChange}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "Email is required",
                          "Email is not valid",
                        ]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "emailaddress",
                          id: "emailaddress",
                          placeholder: "CONTACT EMAIL",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <Row></Row>
                <Row>
                  <Col>Banking Information</Col>
                  <br></br>
                </Row>
                <Row></Row>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Use this account for Deposits (Credits)</label>
                      <SelectField
                        value={props.location.bankaccountfordeposit}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        inputProps={{
                          name: "bankaccountfordeposit",
                          id: "bankaccountfordeposit",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Type of Account</label>
                      <SelectField
                        value={props.location.bankaccounttype}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Type is required"]}
                        size="small"
                        inputProps={{
                          name: "bankaccounttype",
                          id: "bankaccounttype",
                        }}
                      >
                        {typeofaccountList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Bank Authorized Signor</label>
                      <TextBox
                        value={props.location.bankauthorizedsignor}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Authorized signor is required"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "bankauthorizedsignor",
                          id: "bankauthorizedsignor",
                          placeholder: "Bank Authorized Signor",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={3}>
                      <label>Bank Name</label>
                      <TextBox
                        value={props.location.bankname}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Bank name is required"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "bankname",
                          id: "bankname",
                          placeholder: "Bank Name",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>Bank City</label>
                      <TextBox
                        value={props.location.bankcity}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "bankcity",
                          id: "bankcity",
                          placeholder: "City",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>Bank State</label>
                      <SelectField
                        value={props.location.bankstate}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "bankstate",
                          id: "bankstate",
                        }}
                      >
                        {stateList}
                      </SelectField>
                    </Col>
                    <Col md={3}>
                      <label>Bank Zip</label>
                      <TextBox
                        value={props.location.bankzipcode}
                        onChange={props.handleItemChange}
                        errorMessages={[
                          "ZipCode is required",
                          "ZipCode is invalid",
                        ]}
                        validators={["required", "matchRegexp:^[0-9]{5}$"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "bankzipcode",
                          id: "bankzipcode",
                          placeholder: "Zip",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={3}>
                      <label>Name on Account</label>
                      <TextBox
                        value={props.location.bankaccountholder}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Name on account is required"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "bankaccountholder",
                          id: "bankaccountholder",
                          placeholder: "Name On Account",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>Contact Name</label>
                      <TextBox
                        value={props.location.bankcontactname}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "bankcontactname",
                          id: "bankcontactname",
                          placeholder: "Contact Name",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>

                    <Col md={3}>
                      <label>Phone</label>
                      <TextBox
                        value={props.location.bankphone}
                        onChange={props.handleItemChange}
                        errorMessages={["Phone is invalid"]}
                        validators={[
                          "matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$",
                        ]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "bankphone",
                          id: "bankphone",
                          placeholder: "Bank Phone Number",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>Fax</label>
                      <TextBox
                        value={props.location.bankfax}
                        onChange={props.handleItemChange}
                        errorMessages={["Fax is invalid"]}
                        validators={[
                          "matchRegexp:^[0-9]{3}-[0-9]{3}-[0-9]{4}$",
                        ]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "bankfax",
                          id: "bankfax",
                          placeholder: "Fax",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Routing (ABA #)</label>
                      <TextBox
                        value={props.location.bankrouting}
                        onChange={props.handleItemChange}
                        errorMessages={[
                          "Routing # is required",
                          "Routing # is invalid",
                        ]}
                        validators={["required", "matchRegexp:^[0-9]{9}$"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "bankrouting",
                          id: "bankrouting",
                          placeholder: "Bank routing Number",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Account #</label>
                      <TextBox
                        value={props.location.bankaccount}
                        onChange={props.handleItemChange}
                        errorMessages={[
                          "Account # is required",
                          "Account # is invalid",
                        ]}
                        validators={["required", "matchRegexp:^[0-9]{9}$"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "bankaccount",
                          id: "bankaccount",
                          placeholder: "Bank Account Number",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col md={11}></Col>
                  <Col md={1} className="text-right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                    >
                      {" "}
                      Next{" "}
                    </Button>
                  </Col>
                </Row>
              </>
            </ValidatorForm>
          </TabPanel>
          <TabPanel value={props.locationPanel} index={1}>
            <ValidatorForm
              className="pt-3"
              onSubmit={() => props.updateActiveTab(2)}
            >
              <>
                <Row>
                  <Col>PCI and Payments Compliance</Col>
                  <br />
                  <br />
                </Row>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>PCI Email Address</label>
                      <TextBox
                        value={props.location.pciemailaddress}
                        onChange={props.handleItemChange}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "Email is required",
                          "Email is not valid",
                        ]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "pciemailaddress",
                          id: "pciemailaddress",
                          placeholder: "PCI Email Address",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Do you store credit card numbers? </label>
                      <SelectField
                        value={props.location.storecreditcards}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Information is required"]}
                        variant="outlined"
                        size="small"
                        inputProps={{
                          name: "storecreditcards",
                          id: "storecreditcards",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>

                    <Col md={4}>
                      <label>
                        Do you use a third party application that transmits or
                        processes card holder data?
                      </label>
                      <SelectField
                        value={props.location.thirdprty}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "thirdprty",
                          id: "thirdprty",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>If yes, please provide program name </label>
                      <TextBox
                        value={props.location.pcinameversion}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "pcinameversion",
                          id: "pcinameversion",
                          placeholder: "Provide Program Name",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Is software PA or PCI DSS compliant? </label>
                      <SelectField
                        value={props.location.softwarepcicompliant}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "softwarepcicompliant",
                          id: "softwarepcicompliant",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>
                        Who enters credit card information into processing
                        system?{" "}
                      </label>
                      <SelectField
                        value={props.location.whoenterscreditcardinfo}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "whoenterscreditcardinfo",
                          id: "whoenterscreditcardinfo",
                        }}
                      >
                        {whoenterscreditcardinfoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Other</label>
                      <TextBox
                        value={props.location.whoenterscreditcardinfoother}
                        onChange={props.handleItemChange}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "whoenterscreditcardinfoother",
                          id: "whoenterscreditcardinfoother",
                          placeholder: "Other",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Is merchant PCI compliant?</label>
                      <SelectField
                        value={props.location.merchantpcicompliant}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Merchant detail is required"]}
                        variant="outlined"
                        size="small"
                        inputProps={{
                          name: "merchantpcicompliant",
                          id: "merchantpcicompliant",
                        }}
                      >
                        {merchantpcicompliantList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Name for PCI Compliance </label>
                      <TextBox
                        value={props.location.namepcicompliant}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "namepcicompliant",
                          id: "namepcicompliant",
                          placeholder: "Name for PCI Compliance",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>
                        If merchant is an e-commerce merchant, is an SSL
                        certificate utilized?
                      </label>
                      <SelectField
                        value={props.location.ecommercesslused}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "ecommercesslused",
                          id: "ecommercesslused",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col md={10}></Col>
                  <Col md={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="button"
                      onClick={() => props.updateActiveTab(0)}
                    >
                      {" "}
                      Back{" "}
                    </Button>
                  </Col>
                  <Col md={1} className="text-right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                    >
                      {" "}
                      Next{" "}
                    </Button>
                  </Col>
                </Row>
              </>
            </ValidatorForm>
          </TabPanel>
          <TabPanel value={props.locationPanel} index={2}>
            <ValidatorForm
              className="pt-3"
              onSubmit={() => props.updateActiveTab(3)}
            >
              <>
                <Row>
                  <Col>Equipment</Col>
                  <br />
                  <br />
                </Row>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Does the merchant use?</label>
                      <SelectField
                        value={props.location.software}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "software",
                          id: "software",
                        }}
                      >
                        {softwareList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Will you need a terminal </label>
                      <SelectField
                        value={props.location.needterminal}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "needterminal",
                          id: "needterminal",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Who is the manufacturer of your terminal </label>
                      <SelectField
                        value={props.location.existingterminalmanufacturer}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "existingterminalmanufacturer",
                          id: "existingterminalmanufacturer",
                        }}
                      >
                        {existingterminalmanufacturerList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Number of Terminals </label>
                      <TextBox
                        value={props.location.num_term}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "num_term",
                          id: "num_term",
                          placeholder: "Number of Terminals",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>
                        Do you use a POS provider to process cards?{" "}
                      </label>
                      <SelectField
                        value={props.location.usepos}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "usepos",
                          id: "usepos",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Who is the POS provider? </label>
                      <SelectField
                        value={props.location.posmanufacturer}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "posmanufacturer",
                          id: "posmanufacturer",
                        }}
                      >
                        {posmanufacturerList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Do you use a Payment Gateway </label>
                      <SelectField
                        value={props.location.usepaymentgateway}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "usepaymentgateway",
                          id: "usepaymentgateway",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>What Payment Gateway is used </label>
                      <SelectField
                        value={props.location.pmtgateway}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "pmtgateway",
                          id: "pmtgateway",
                        }}
                      >
                        {pmtgatewayList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Resturant Tip</label>
                      <TextBox
                        value={props.location.ResturantTip}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "ResturantTip",
                          id: "ResturantTip",
                          placeholder: "Resturant Tip",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}></Col>
                  </Row>
                </div>
                <Row>
                  <Col md={10}></Col>
                  <Col md={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="button"
                      onClick={() => props.updateActiveTab(1)}
                    >
                      {" "}
                      Back{" "}
                    </Button>
                  </Col>
                  <Col md={1} className="text-right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                    >
                      {" "}
                      Next{" "}
                    </Button>
                  </Col>
                </Row>
              </>
            </ValidatorForm>
          </TabPanel>
          <TabPanel value={props.locationPanel} index={3}>
            <ValidatorForm
              className="pt-3"
              onSubmit={() => props.updateActiveTab(4)}
            >
              <>
                <Row>
                  <Col>Business Information</Col>
                  <br />
                  <br />
                </Row>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>B2B Processing % (Business To Business)</label>
                      <TextBox
                        value={props.location.b2bpercent}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "b2bpercent",
                          id: "b2bpercent",
                          format: "formatOption",
                          normalize: "normalizeOption",
                          type: "number",
                          max: 1,
                          max: 100,
                          placeholder: "B2B Processing %",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>B2C Processing % (Business To Consumer) </label>
                      <TextBox
                        value={props.location.b2cpercent}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "b2cpercent",
                          id: "b2cpercent",
                          placeholder: "B2C Processing % ",
                          format: "formatOption",
                          normalize: "normalizeOption",
                          type: "number",
                          min: 1,
                          max: 100,
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Customer Service # (IfMOTO/eCommerce)</label>
                      <TextBox
                        value={props.location.ecommcustomerservice}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "ecommcustomerservice",
                          id: "ecommcustomerservice",
                          placeholder: "Customer Service #",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Do you sell a service or product?</label>
                      <SelectField
                        value={props.location.sellingtype}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "sellingtype",
                          id: "sellingtype",
                        }}
                      >
                        {sellingtypeList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Do you sell</label>
                      <SelectField
                        value={props.location.sellproductarea}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "sellproductarea",
                          id: "sellproductarea",
                        }}
                      >
                        {sellproductareaList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Type of products or services sold</label>
                      <TextBox
                        value={props.location.goodservicetype}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "goodservicetype",
                          id: "goodservicetype",
                          placeholder: "Type of products or services sold",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Card Swipe #</label>
                      <TextBox
                        value={props.location.retailswipedpct}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "retailswipedpct",
                          id: "retailswipedpct",
                          placeholder: "Card Swipe #",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Keyed with signature and imprint % </label>
                      <TextBox
                        value={props.location.retailkeyedpct}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "retailkeyedpct",
                          id: "retailkeyedpct",
                          placeholder: "Keyed with signature and imprint %",
                          format: "formatOption",
                          normalize: "normalizeOption",
                          type: "number",
                          min: 1,
                          max: 100,
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Internet % </label>
                      <TextBox
                        value={props.location.internetpct}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "internetpct",
                          id: "internetpct",
                          placeholder: "Internet %",
                          format: "formatOption",
                          normalize: "normalizeOption",
                          type: "number",
                          min: 1,
                          max: 100,
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>
                        Mail/Phone (Keyed without signature and imprint) %{" "}
                      </label>
                      <TextBox
                        value={props.location.mailorderpct}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "mailorderpct",
                          id: "mailorderpct",
                          placeholder:
                            "Mail/Phone (Keyed without signature and imprint) %	",
                          format: "formatOption",
                          normalize: "normalizeOption",
                          type: "number",
                          min: 1,
                          max: 100,
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>Inbound Calls % </label>
                      <TextBox
                        value={props.location.inboundcalls}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "inboundcalls",
                          id: "inboundcalls",
                          placeholder: "Inbound Calls %	",
                          format: "formatOption",
                          normalize: "normalizeOption",
                          type: "number",
                          min: 1,
                          max: 100,
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>Outbound Calls % </label>
                      <TextBox
                        value={props.location.outboundcalls}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "outboundcalls",
                          id: "outboundcalls",
                          placeholder: "Outbound Calls %	",
                          format: "formatOption",
                          normalize: "normalizeOption",
                          type: "number",
                          min: 1,
                          max: 100,
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      <label>ACH %</label>
                      <TextBox
                        value={props.location.ach}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "ach",
                          id: "ach",
                          placeholder: "ACH %	",
                          format: "formatOption",
                          normalize: "normalizeOption",
                          type: "number",
                          min: 1,
                          max: 100,
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Total %</label>
                      <TextBox
                        value={props.location.totalpct}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "totalpct",
                          id: "totalpct",
                          placeholder: "Total Percentage",
                          format: "formatOption",
                          normalize: "normalizeOption",
                          type: "number",
                          min: 1,
                          max: 100,
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <label>
                        Have merchant or owners/principals ever been terminated
                        from accepting bankcards for the business?
                      </label>
                      <SelectField
                        value={props.location.onmatchlist}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "onmatchlist",
                          id: "onmatchlist",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>If Yes, please explain</label>
                      <TextBox
                        value={props.location.onmatchlistexplain}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "onmatchlistexplain",
                          id: "onmatchlistexplain",
                          placeholder: "Please Explain",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>
                        Does this location currently take Visa/MC/Discover?{" "}
                      </label>
                      <SelectField
                        value={props.location.previouscardaccept}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "previouscardaccept",
                          id: "previouscardaccept",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Current Previous Processor</label>
                      <TextBox
                        value={props.location.previousprocessorterminatedwhom}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "previousprocessorterminatedwhom",
                          id: "previousprocessorterminatedwhom",
                          placeholder: "Current Previous Processor",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={6}>
                      <label>Termination Date</label>
                      <ValidatedDatePicker
                        autoOk
                        className={"date"}
                        variant="outlined"
                        size="small"
                        name={"previousprocessorterminateddate"}
                        id={"previousprocessorterminateddate"}
                        inputFormat="MM/dd/yyyy"
                        value={props.location.previousprocessorterminateddate}
                        onChange={(date) =>
                          props.handleDateChange(
                            "previousprocessorterminateddate",
                            date.toLocaleDateString(),
                            "location"
                          )
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <label>Reason For Leaving</label>
                      <SelectField
                        value={props.location.previousprocessorterminatedreason}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "previousprocessorterminatedreason",
                          id: "previousprocessorterminatedreason",
                        }}
                      >
                        {previousprocessorterminatedreasonList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Previous Statements Available?</label>
                      <SelectField
                        value={props.location.previousstatements}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "previousstatements",
                          id: "previousstatements",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Advertising Methods</label>
                      <div>
                        <Select
                          fullWidth
                          size="small"
                          id="mktingmethod"
                          name="mktingmethod"
                          multiple
                          value={
                            props.location.mktingmethod
                              ? props.location.mktingmethod
                              : []
                          }
                          onChange={(val) => {
                            props.handleMultiSelectChange(
                              "mktingmethod",
                              val.target.value
                            );
                          }}
                          input={<OutlinedInput />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {mktingmethodList}
                        </Select>
                      </div>
                    </Col>
                    <Col md={4}>
                      <label>Advertising Methods Other</label>
                      <TextBox
                        value={props.location.mktingmethodother}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "mktingmethodother",
                          id: "mktingmethodother",
                          placeholder: "Advertising Methods Other",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Merchant Type</label>
                      <div>
                        <Select
                          fullWidth
                          size="small"
                          id="merchanttype"
                          name="merchanttype"
                          multiple
                          value={
                            props.location.merchanttype
                              ? props.location.merchanttype
                              : []
                          }
                          onChange={(val) => {
                            props.handleMultiSelectChange(
                              "merchanttype",
                              val.target.value
                            );
                          }}
                          input={<OutlinedInput />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {merchanttypeList}
                        </Select>
                      </div>
                    </Col>
                    <Col md={4}>
                      <label>Merchant Type Other</label>
                      <TextBox
                        value={props.location.merchanttypeother}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "merchanttypeother",
                          id: "merchanttypeother",
                          placeholder: "Merchant Type Other",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Is your business seasonal </label>
                      <SelectField
                        value={props.location.seasonal}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "seasonal",
                          id: "seasonal",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={6}>
                      <label>
                        If Yes, please check all months in which your merchant
                        account will be active
                      </label>
                      <div>
                        <Select
                          fullWidth
                          size="small"
                          id="seasonalmonths"
                          name="seasonalmonths"
                          multiple
                          value={
                            props.location.seasonalmonths
                              ? props.location.seasonalmonths
                              : []
                          }
                          onChange={(val) => {
                            props.handleMultiSelectChange(
                              "seasonalmonths",
                              val.target.value
                            );
                          }}
                          input={<OutlinedInput />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {seasonalmonthsList}
                        </Select>
                      </div>
                    </Col>
                    <Col md={3}>
                      <label>Process eCommerce Transactions? </label>
                      <SelectField
                        value={props.location.previousecommerce}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "previousecommerce",
                          id: "previousecommerce",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={3}>
                      <label>Do you have a retail location?</label>
                      <SelectField
                        value={props.location.haveretaillocation}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "haveretaillocation",
                          id: "haveretaillocation",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={12}>
                      <label>
                        What descriptor would you like to appear on customers
                        credit card statement (max 24 characters){" "}
                      </label>
                      <TextBox
                        value={props.location.descriptoroncreditstmt}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "descriptoroncreditstmt",
                          id: "descriptoroncreditstmt",
                          placeholder:
                            "What descriptor would you like to appear on customers credit card",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col md={10}></Col>
                  <Col md={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="button"
                      onClick={() => props.updateActiveTab(2)}
                    >
                      {" "}
                      Back{" "}
                    </Button>
                  </Col>
                  <Col md={1} className="text-right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                    >
                      {" "}
                      Next{" "}
                    </Button>
                  </Col>
                </Row>
              </>
            </ValidatorForm>
          </TabPanel>
          <TabPanel value={props.locationPanel} index={4}>
            <ValidatorForm
              className="pt-3"
              onSubmit={() => props.updateActiveTab(5)}
            >
              <>
                <Row>
                  <Col>Processing Information</Col>
                  <br />
                  <br />
                </Row>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Check this box to accept all cards listed</label>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`}>
                          <Form.Check
                            inline
                            label="Visa/MC/Discover/PIN (Debit)"
                            name="acceptallcards"
                            id={`inline-${type}-1`}
                          />
                        </div>
                      ))}
                    </Col>
                    <Col md={4}>
                      <label>
                        If you did not check all cards above, <br></br>
                        select which cards you wish to accept
                      </label>
                      <div>
                        <Select
                          fullWidth
                          size="small"
                          id="selectedcards"
                          name="selectedcards"
                          multiple
                          value={
                            props.location.selectedcards
                              ? props.location.selectedcards
                              : []
                          }
                          onChange={(val) => {
                            props.handleMultiSelectChange(
                              "selectedcards",
                              val.target.value
                            );
                          }}
                          input={<OutlinedInput />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {selectedcardsList}
                        </Select>
                      </div>
                    </Col>
                    <Col md={4}>
                      <label>
                        Does any of your billing or marketing strategy involve
                        negative response or automatic billing?
                      </label>
                      <SelectField
                        value={props.location.mktnegativeresponseorauto}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "mktnegativeresponseorauto",
                          id: "mktnegativeresponseorauto",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Annual Volume</label>
                      <TextBox
                        value={props.location.estimatedannualvolume}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Annual volume is required"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "estimatedannualvolume",
                          id: "estimatedannualvolume",
                          placeholder: "Annual Volume",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Monthly volume</label>
                      <TextBox
                        value={props.location.visamcdiscmaxmonthlyvolume}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "visamcdiscmaxmonthlyvolume",
                          id: "visamcdiscmaxmonthlyvolume",
                          placeholder: "Visa/MC/Disc Maximum Monthly Volume",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Average Ticket</label>
                      <TextBox
                        value={props.location.visamcdiscminavgticket}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "visamcdiscminavgticket",
                          id: "visamcdiscminavgticket",
                          placeholder: "Visa/MC/Disc Minimum Average",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Visa/MC/Disc maximum Average Ticket</label>
                      <TextBox
                        value={props.location.visamcdiscmaxavgticket}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "visamcdiscmaxavgticket",
                          id: "visamcdiscmaxavgticket",
                          placeholder: "Visa/MC/Disc Maximum Avergae Ticket",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Do you currently process AMEX? </label>
                      <SelectField
                        value={props.location.amexsvcreq}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "amexsvcreq",
                          id: "amexsvcreq",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>AMEX SE#</label>
                      <TextBox
                        value={props.location.amexmerchantid}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "amexmerchantid",
                          id: "amexmerchantid",
                          placeholder: "AMEX SE #",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Apply to accept American Express </label>
                      <SelectField
                        value={props.location.acceptamex}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "acceptamex",
                          id: "acceptamex",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Amex Monthly Volume </label>
                      <TextBox
                        value={props.location.amexmonvol}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "amexmonvol",
                          id: "amexmonvol",
                          placeholder: "AMEX Monthly Volume",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Amex Average Ticket </label>
                      <TextBox
                        value={props.location.amexavgtkt}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "amexavgtkt",
                          id: "amexavgtkt",
                          placeholder: "AMEX Average Ticket",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Do you currently process Discover?</label>
                      <SelectField
                        value={props.location.processdiscover}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "processdiscover",
                          id: "processdiscover",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>If yes, what is Discover merchant ID </label>
                      <TextBox
                        value={props.location.discovermerchantid}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "discovermerchantid",
                          id: "discovermerchantid",
                          placeholder: "Discover Merchant ID",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Apply to accept Discover </label>
                      <SelectField
                        value={props.location.acceptdiscover}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "acceptdiscover",
                          id: "acceptdiscover",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Do you currently process EBT? </label>
                      <SelectField
                        value={props.location.ebtsignup}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "ebtsignup",
                          id: "ebtsignup",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>EBT #</label>
                      <TextBox
                        value={props.location.ebtnum}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "ebtnum",
                          id: "ebtnum",
                          placeholder: "EBT #",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>Do you require deposits? </label>
                      <SelectField
                        value={props.location.depositrequired}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "depositrequired",
                          id: "depositrequired",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>If Yes, what % of sale </label>
                      <TextBox
                        value={props.location.depositrequiredpct}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "depositrequiredpct",
                          id: "depositrequiredpct",
                          placeholder: "What % of sale",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>OR Flat fee</label>
                      <TextBox
                        value={props.location.depositrequiredamt}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "depositrequiredamt",
                          id: "depositrequiredamt",
                          placeholder: "OR Flat fee",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>
                        Do you offer product/Service Warranty or Guarantees?
                      </label>
                      <SelectField
                        value={props.location.warranteeguaranteeoffered}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "warranteeguaranteeoffered",
                          id: "warranteeguaranteeoffered",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>If yes, is it</label>
                      <SelectField
                        value={props.location.replacerefund}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "replacerefund",
                          id: "replacerefund",
                        }}
                      >
                        {replacerefundList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>If Refund, select one</label>
                      <SelectField
                        value={props.location.warranteeguaranteetype}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "warranteeguaranteetype",
                          id: "warranteeguaranteetype",
                        }}
                      >
                        {warranteeguaranteetypeList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Other</label>
                      <TextBox
                        value={props.location.refundother}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "refundother",
                          id: "refundother",
                          placeholder: "Other",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>
                        Please list all third party payment processors merchant
                        does business with{" "}
                      </label>
                      <TextBox
                        value={props.location.thirdprty5}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "thirdprty5",
                          id: "thirdprty5",
                          placeholder: "Third Party Payment Processor",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>When is the customers card charged ? </label>
                      <SelectField
                        value={props.location.customer_charged}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "customer_charged",
                          id: "customer_charged",
                        }}
                      >
                        {customer_chargedList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>NEXT DAY FUNDING</label>
                      <SelectField
                        value={props.location.NEXTDAYFUNDING}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "NEXTDAYFUNDING",
                          id: "NEXTDAYFUNDING",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>If yes, please explain </label>
                      <TextBox
                        value={props.location.mktnegativeresponseorautoother}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "mktnegativeresponseorautoother",
                          id: "mktnegativeresponseorautoother",
                          placeholder: "Please Explain",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>
                        Are all of your products/services delivered immediately?{" "}
                      </label>
                      <SelectField
                        value={props.location.immediatedelivery}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "immediatedelivery",
                          id: "immediatedelivery",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>What is Percentage of future delivery? </label>
                      <TextBox
                        value={props.location.futuredeliverypct}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "futuredeliverypct",
                          id: "futuredeliverypct",
                          placeholder: "Percentage of future delivery",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Explanation of Delivery </label>
                      <TextBox
                        value={props.location.deliveryexplanation}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "deliveryexplanation",
                          id: "deliveryexplanation",
                          placeholder: "Explanation of Delivery",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>
                        Do you have a refund policy for
                        Visa/MasterCard/Discover?{" "}
                      </label>
                      <SelectField
                        value={props.location.refundpolicyexist}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "refundpolicyexist",
                          id: "refundpolicyexist",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Please describe your Refund/Return policy </label>
                      <TextBox
                        value={props.location.refundtype}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "refundtype",
                          id: "refundtype",
                          placeholder: "Refund/Return policy",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>
                        If Visa/MasterCard/Discover credit, within how many days
                        do you submit credit transactions?{" "}
                      </label>
                      <SelectField
                        value={props.location.daystosubmittransactions}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "daystosubmittransactions",
                          id: "daystosubmittransactions",
                        }}
                      >
                        {daystosubmittransactionsList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>
                        Does your business charge recurring billings to
                        customers?
                      </label>
                      <SelectField
                        value={props.location.recurringcharge}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "recurringcharge",
                          id: "recurringcharge",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>If Yes, indicate frequency of charges </label>
                      <TextBox
                        value={props.location.recurringchargefrequency}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "recurringchargefrequency",
                          id: "recurringchargefrequency",
                          placeholder: "Indicate frequency of charges",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={3}>
                      <label>Is final payment due before fulfillment </label>
                      <SelectField
                        value={props.location.fulfillmentpaymentbefore}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "fulfillmentpaymentbefore",
                          id: "fulfillmentpaymentbefore",
                        }}
                      >
                        {yesNoList}
                      </SelectField>
                    </Col>
                    <Col md={3}>
                      <label>
                        If yes, how many days before final delivery?{" "}
                      </label>
                      <TextBox
                        value={props.location.fulfillmentpaymentbeforedays}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "fulfillmentpaymentbeforedays",
                          id: "fulfillmentpaymentbeforedays",
                          placeholder: "Days before final delivery",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <label>
                        Visa/MasterCard/Discover card sales are charged to the
                        card on
                      </label>
                      <SelectField
                        value={props.location.cardpaymenton}
                        onChange={props.handleItemChange}
                        variant="outlined"
                        size="small"
                        errorMessages={["Required"]}
                        inputProps={{
                          name: "cardpaymenton",
                          id: "cardpaymenton",
                        }}
                      >
                        {cardpaymentonList}
                      </SelectField>
                    </Col>
                    <Col md={3}>
                      <label>Other (Specify) </label>
                      <TextBox
                        value={props.location.cardpaymentonother}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "cardpaymentonother",
                          id: "cardpaymentonother",
                          placeholder: "Other ( Specify )",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <Row>
                  <label>
                    How long after payment is product delivered or service
                    fulfilled?
                  </label>
                </Row>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={6}>
                      <label>Days to Fulfillment </label>
                      <TextBox
                        value={props.location.daysuntildeliverydays1}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "daysuntildeliverydays1",
                          id: "daysuntildeliverydays1",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <label>% of Volume </label>
                      <TextBox
                        value={props.location.daysuntildeliveryvol1}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "daysuntildeliveryvol1",
                          id: "daysuntildeliveryvol1",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={6}>
                      <label>Days to Fulfillment </label>
                      <TextBox
                        value={props.location.daysuntildeliverydays2}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "daysuntildeliverydays2",
                          id: "daysuntildeliverydays2",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <label>% of Volume </label>
                      <TextBox
                        value={props.location.daysuntildeliveryvol2}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "daysuntildeliveryvol2",
                          id: "daysuntildeliveryvol2",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={6}>
                      <label>Days to Fulfillment </label>
                      <TextBox
                        value={props.location.daysuntildeliverydays3}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "daysuntildeliverydays3",
                          id: "daysuntildeliverydays3",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <label>% of Volume </label>
                      <TextBox
                        value={props.location.daysuntildeliveryvol3}
                        onChange={props.handleItemChange}
                        errorMessages={["REQUIRED"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "daysuntildeliveryvol3",
                          id: "daysuntildeliveryvol3",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                      <label>Total Volume </label>
                      <TextBox
                        value={props.location.daysuntildelivery_total_pct}
                        onChange={props.handleItemChange}
                        validators={["required"]}
                        errorMessages={["Total volume is required"]}
                        variant={"outlined"}
                        size="small"
                        inputProps={{
                          name: "daysuntildelivery_total_pct",
                          id: "daysuntildelivery_total_pct",
                          type: "text",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}></Col>
                  </Row>
                </div>
                <Row>
                  <Col md={10}></Col>
                  <Col md={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="button"
                      onClick={() => props.updateActiveTab(3)}
                    >
                      {" "}
                      Back{" "}
                    </Button>
                  </Col>
                  <Col md={1} className="text-right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                    >
                      {" "}
                      Next{" "}
                    </Button>
                  </Col>
                </Row>
              </>
            </ValidatorForm>
          </TabPanel>
          <TabPanel value={props.locationPanel} index={5}>
            <ValidatorForm
              className="pt-3"
              onSubmit={() => {
                props.addMerchantStep4(props.locations, props.merchantId);
              }}
            >
              <>
                <Row>
                  <Col>Document(s) Upload</Col>
                  <br />
                  <br />
                </Row>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col md={4}>
                      <label>Document Type</label>
                      <SelectField
                        value={props.selectedDocumentType}
                        onChange={props.handleItemChange}
                        validators={[]}
                        errorMessages={[]}
                        variant="outlined"
                        size="small"
                        inputProps={{
                          name: "selectedDocumentType",
                          id: "selectedDocumentType",
                        }}
                      >
                        {documentTypeList}
                      </SelectField>
                    </Col>
                    <Col md={4}>
                      <label>Document</label>
                      <TextBox
                        value={props.document.upload_document}
                        onChange={props.handleFileChange}
                        validators={[]}
                        errorMessages={[]}
                        variant={"outlined"}
                        size="small"
                        InputProps={{
                          accept: ".pdf",
                        }}
                        inputProps={{
                          name: "upload_document",
                          id: "upload_document",
                          placeholder: "DOCUMENT",
                          type: "file",
                          accept: ".pdf",
                          classselector: "h-auto",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <label>&nbsp;</label>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          props.uploadDocument(props.formFile, props.document);
                        }}
                        className="col-md-12"
                      >
                        {" "}
                        Upload{" "}
                      </Button>
                    </Col>
                  </Row>
                </div>
                <div className="col-md-12 form-group">
                  <Row>
                    <Col>UPLOADED DOCUMENTS</Col>
                    <br />
                    <br />
                  </Row>
                  <Row>
                    <div className="col-md-12 form-group">
                      <TableContainer
                        component={Paper}
                        style={{ maxHeight: 400, overflow: "auto" }}
                      >
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>&nbsp;</TableCell>
                              <TableCell>Document Type</TableCell>
                              <TableCell>File Name</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>{documents}</TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </Row>
                </div>
              </>
              <Row>
                <Col md="3">
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    className="col-md-12"
                    onClick={() => props.updateActiveTab(4)}
                  >
                    {" "}
                    Back to last tab{" "}
                  </Button>
                </Col>
                <Col md="3">
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => props.performReturn()}
                    className="col-md-12"
                  >
                    {" "}
                    Return{" "}
                  </Button>
                </Col>
                <Col md="3">
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() =>
                      props.saveLocation(
                        props.locations,
                        props.location,
                        props.lists
                      )
                    }
                    className="col-md-12"
                  >
                    {" "}
                    Save Location{" "}
                  </Button>
                </Col>
              </Row>
            </ValidatorForm>
          </TabPanel>
          <TabPanel value={props.locationPanel} index={6}>
            <ValidatorForm
              className="pt-3"
              onSubmit={(data) =>
                props.addMerchantStep5(
                  props.selectedTemplateId,
                  props.templates,
                  props.merchantId
                )
              }
            >
              <Row>
                <Col>FEES</Col>
                <br />
                <br />
              </Row>
              <Row>
                <div className="col-md-12 form-group">
                  <Col>
                    <label>Fee Templates:</label>
                    <SelectField
                      value={props.selectedTemplateId}
                      onChange={props.handleItemChange}
                      validators={[]}
                      variant="outlined"
                      size="small"
                      errorMessages={[]}
                      inputProps={{
                        name: "selectedTemplateId",
                        id: "selectedTemplateId",
                      }}
                    >
                      {feeTemplates}
                    </SelectField>
                  </Col>
                </div>
              </Row>

              {dynamicUI}

              <div className="row">
                <Col md="3">
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => props.performReturn()}
                    className="col-md-12"
                  >
                    {" "}
                    Return{" "}
                  </Button>
                </Col>
                <Col md="6">&nbsp;</Col>
                <Col md="3">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="col-md-12"
                  >
                    {" "}
                    Save &amp; Continue{" "}
                  </Button>
                </Col>
              </div>
            </ValidatorForm>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={handleClose}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
GetMerchantAddStep4.propTypes = {
  displayWarning: PropTypes.func,
};

export default GetMerchantAddStep4;
