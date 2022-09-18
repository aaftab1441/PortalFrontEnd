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

function GetFooter({title, description, section, props}) {

  return (
    <div className={'row'} >
     
    </div>

  );
}

GetFooter.propTypes = {};

export default memo(GetFooter);
