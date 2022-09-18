/**
 *
 * PointTable
 *
 */

import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from '@mui/material/Button';

function valuetext(value) {
	  return `${value}`;
	}

function copyToClipboard(id) {
    console.log("Here", id);
	if(window.document.getElementById(id) && typeof window.document.getElementById(id).select === "function"){
    	window.document.getElementById(id).select();
        document.execCommand('copy');
    	
    }
  };
  
function PointTable(props) {
  const [value, setValue] = useState(false);
  const [copied, setCopied] = React.useState(false);
  let displayData = [];
  //const [displayData, setDisplayData] = React.useState([] );
  let defaultValue = 400;
  let min = 1;
  let step = 1;
  let max =  Math.ceil(Math.floor(props.data.length / step) / step ) * step;
   
  let originalData = props.data;
   console.log(props);
 
  const handleChange = (event, newValue) => {
	  
	  let tempDisplayData = [];
	  step = newValue;
	  console.log("New value", newValue);
	  for(let i = 0; i < originalData.length; i+= newValue){
		  tempDisplayData.push(originalData[i]);
	  }
	  setDisplayData(tempDisplayData);
  };
  let tempDisplayData = [];
  for(let i = 0; i < originalData.length; i+= step){
	  tempDisplayData.push(originalData[i]);
  }
  displayData = tempDisplayData;
  let renderedData = displayData.map(function (anItem, index) {
	     
	  return  <>{anItem}&nbsp;</>;
      
    });
  console.log(displayData);
  return (
		  <>

       <p style={{'clear': 'both'}}>
      <h5>{props.title}</h5> 
	      <CopyToClipboard text={displayData} 
		      onCopy={() => setCopied(true)}>
	      <Button variant="contained" color="primary">Copy to clipboard</Button>
		    </CopyToClipboard>
		    
      <div className={'col-md-12'}>
	     
		    <div className='col-md-12'>
		  	 
		    <div  style={{'overflow':'scroll', 'width': '900px'}}>
			    <div id={props.title} style={{'overflow-x':'scroll'}, {'white-space': 'nowrap'}}>
			    	{renderedData}
			    </div>
			    </div>
		    </div>	
		  </div>  
	     </p>
    </>
  );
}

PointTable.propTypes = {
	 
};

export default PointTable;
