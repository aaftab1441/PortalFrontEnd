/**
 *
 * Loading
 *
 */

import React, { useState } from 'react';
import { Modal,  Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
// import styled from 'styled-components';
import Box from '@mui/material/Box';



function Loading(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
 
  return (
		  <>

      <Modal show={props.loading} onHide={handleClose}>

        <Modal.Body style={{paddingLeft: '40%'}}>
			<Box sx={{ display: 'flex' }}>
				<Row>
					<Col md={3}>
						<CircularProgress />
					</Col>
					<Col md={9} style={{paddingTop: '15px', paddingLeft: '30px'}}>  
						 Loading ...
					</Col>
				</Row>
	    	</Box>	       
        </Modal.Body>

      </Modal>
    </>
  );
}

Loading.propTypes = {};

export default Loading;
