import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { createSubscribedElement } from '../../UnstatedUtils';

import AppContainer from '../../../services/AppContainer';
import LdapSecuritySetting from './LdapSecuritySetting';
import LocalSecuritySetting from './LocalSecuritySetting';
import SamlSecuritySetting from './SamlSecuritySetting';
import SecuritySetting from './SecuritySetting';

class SecurityManagement extends React.Component {

  constructor(props) {
    super();

  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <SecuritySetting />

        {/* XSS configuration link */}
        <div className="mb-5">
          <h2 className="border-bottom">{ t('security_setting.xss_prevent_setting') }</h2>
          <div className="text-center">
            <a style={{ fontSize: 'large' }} href="/admin/markdown/#preventXSS">
              <i className="fa-fw icon-login"></i> { t('security_setting.xss_prevent_setting_link') }
            </a>
          </div>
        </div>

        {/* TODO 542~550 reactify-admin */}
        <div className="auth-mechanism-configurations m-t-10">
          <h2 className="border-bottom">{ t('security_setting.Authentication mechanism settings') }</h2>
          <div className="passport-settings">
            <ul className="nav nav-tabs" role="tablist">
              <li className="active">
                <a href="#passport-local" data-toggle="tab" role="tab"><i className="fa fa-users"></i> ID/Pass</a>
              </li>
              <li>
                <a href="#passport-ldap" data-toggle="tab" role="tab"><i className="fa fa-sitemap"></i> LDAP</a>
              </li>
              <li>
                <a href="#passport-saml" data-toggle="tab" role="tab"><i className="fa fa-key"></i> SAML</a>
              </li>
              <li>
                <a href="#passport-oidc" data-toggle="tab" role="tab"><i className="fa fa-openid"></i> OIDC</a>
              </li>
              <li>
                <a href="#passport-basic" data-toggle="tab" role="tab"><i className="fa fa-lock"></i> Basic</a>
              </li>
              <li>
                <a href="#passport-google-oauth" data-toggle="tab" role="tab"><i className="fa fa-google"></i> Google</a>
              </li>
              <li>
                <a href="#passport-github" data-toggle="tab" role="tab"><i className="fa fa-github"></i> GitHub</a>
              </li>
              <li>
                <a href="#passport-twitter" data-toggle="tab" role="tab"><i className="fa fa-twitter"></i> Twitter</a>
              </li>
              <li className="tbd">
                <a href="#passport-facebook" data-toggle="tab" role="tab"><i className="fa fa-facebook"></i> (TBD) Facebook</a>
              </li>
            </ul>
            <div className="tab-content p-t-10">
              <div id="passport-local" className="tab-pane active" role="tabpanel">
                <LocalSecuritySetting />
              </div>
              <div id="passport-ldap" className="tab-pane" role="tabpanel">
                <LdapSecuritySetting />
              </div>
              <div id="passport-saml" className="tab-pane" role="tabpanel">
                <SamlSecuritySetting />
              </div>
              <div id="passport-oidc" className="tab-pane" role="tabpanel">
                {/* TODO GW-545 reactify oidc.html */}
              </div>
              <div id="passport-basic" className="tab-pane" role="tabpanel">
                {/* TODO GW-546 reactify basic.html */}
              </div>
              <div id="passport-google-oauth" className="tab-pane" role="tabpanel">
                {/* TODO GW-547 reactify google-oauth.html */}
              </div>
              <div id="passport-github" className="tab-pane" role="tabpanel">
                {/* TODO GW-548 reactify github.html */}
              </div>
              <div id="passport-twitter" className="tab-pane" role="tabpanel">
                {/* TODO GW-549 reactify twitter.html */}
              </div>
              <div id="passport-facebook" className="tab-pane" role="tabpanel">
                {/* TODO GW-550 reactify facebook.html */}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

}

SecurityManagement.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  csrf: PropTypes.string,
};

const SecurityManagementWrapper = (props) => {
  return createSubscribedElement(SecurityManagement, props, [AppContainer]);
};

export default withTranslation()(SecurityManagementWrapper);
