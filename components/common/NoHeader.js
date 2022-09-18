/**
 *
 * NoHeader
 *
 */

import React, { memo } from 'react';

import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import * as AppConstants from '../../utilities/constants';
import { getValue, getBaseUrl } from '../../utilities/string';

function NoHeader(props) {
	console.log("NO", props);
  return (
    
      <Helmet>
        <title>{props.title}</title>
        <meta name="description" content={props.description}/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta httpEquiv="content-type" content="text/html;charset=UTF-8"/>
        <link rel="icon" href={AppConstants.BASE_HOST_URL + "images/favicon.ico"} type="image/x-icon" />
        {
          !/.*3000.*/.test(window.location.href) && !/.*summary*/.test(window.location.href) &&
          <base href={AppConstants.BASE_HOST_URL} />
        }

        <link href={AppConstants.BASE_HOST_URL + "css/main.css"} rel="stylesheet"></link>

      </Helmet>
         

 


  );
}

NoHeader.propTypes = {};

export default memo(NoHeader);
