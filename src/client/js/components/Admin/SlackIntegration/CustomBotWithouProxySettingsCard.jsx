import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';


const CustomBotWithouProxySettomgSlackCard = (props) => {
  return (
  <>

    <p>{props.currentBotType}</p>
    <p>{props.slackWorkSpaceNameWithoutProxy}</p>
    <p>{props.siteName}</p>

  </>
  );
};

CustomBotWithouProxySettomgSlackCard.PropTypes = {
  currentBotType: PropTypes.string,
  slackWorkSpaceNameWithoutProxy: PropTypes.string,
  siteName: PropTypes.string,
}

export default CustomBotWithouProxySettomgSlackCard;
