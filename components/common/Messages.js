/**
 *
 * Messages
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Messages({messages}) {
  if(messages && messages.general && messages.general.length > 0){
    let messageList =  "";
    if(messages && messages.general && messages.general.length > 0){
      messageList = messages.general.map((item, index) => <div key={index} className={"text-danger"}>{item} </div>
      );
    }

    return (
      <div className={"clearfix"}>{messageList}</div>
    );
  }else {
    return <div />;
  }
}

Messages.propTypes = {};

export default Messages;
