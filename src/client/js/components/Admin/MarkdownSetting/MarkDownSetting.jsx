import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { createSubscribedElement } from '../../UnstatedUtils';
import { toastError } from '../../../util/apiNotification';

import AppContainer from '../../../services/AppContainer';
import LineBreakForm from './LineBreakForm';
import PresentationForm from './PresentationForm';
import XssForm from './XssForm';
import AdminMarkDownContainer from '../../../services/AdminMarkDownContainer';

class MarkdownSetting extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isRetrieving: true,
    };

  }

  async componentDidMount() {
    const { adminMarkDownContainer } = this.props;

    try {
      await adminMarkDownContainer.retrieveMarkdownData();
    }
    catch (err) {
      toastError(err);
    }
    this.setState({ isRetrieving: false });

  }

  render() {
    const { t } = this.props;

    if (this.state.isRetrieving) {
      return null;
    }

    return (
      <React.Fragment>
        {/* Line Break Setting */}
        <div className="row mb-5">
          <h2 className="border-bottom">{t('admin:markdown_setting.lineBreak_header')}</h2>
          <p className="well">{t('admin:markdown_setting.lineBreak_desc')}</p>
          <LineBreakForm />
        </div>

        {/* Presentation Setting */}
        <div className="row mb-5">
          <h2 className="border-bottom">{t('admin:markdown_setting.presentation_header')}</h2>
          <p className="well">{t('admin:markdown_setting.presentation_desc')}</p>
          <PresentationForm />
        </div>

        {/* XSS Setting */}
        <div className="row mb-5">
          <h2 className="border-bottom">{t('admin:markdown_setting.xss_header')}</h2>
          <p className="well">{t('admin:markdown_setting.xss_desc')}</p>
          <XssForm />
        </div>
      </React.Fragment>
    );
  }

}

const MarkdownSettingWrapper = (props) => {
  return createSubscribedElement(MarkdownSetting, props, [AppContainer, AdminMarkDownContainer]);
};

MarkdownSetting.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  adminMarkDownContainer: PropTypes.instanceOf(AdminMarkDownContainer).isRequired,

};

export default withTranslation()(MarkdownSettingWrapper);
