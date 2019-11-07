import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import loggerFactory from '@alias/logger';

import { createSubscribedElement } from '../UnstatedUtils';
import { toastSuccess, toastError } from '../../util/apiNotification';

import AppContainer from '../../services/AppContainer';

import GrowiArchiveSection from './ImportData/GrowiArchiveSection';

const logger = loggerFactory('growi:importer');

class AppSettingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleInputValue = this.handleInputValue.bind(this);
  }

  render() {
    return (
      {/* <div class="row">
      <div class="col-md-3">
        {% include './widget/menu.html' with {current: 'app'} %}
      </div>
      <div class="col-md-9">

        <form action="/_api/admin/settings/app" method="post" class="form-horizontal" id="appSettingForm" role="form">
        <fieldset>
          <legend>{{ t('App settings') }}</legend>
          <div class="form-group">
            <label for="settingForm[app:title]" class="col-xs-3 control-label">{{ t('app_setting.Site Name') }}</label>
            <div class="col-xs-6">
              <input class="form-control"
                    id="settingForm[app:title]"
                    type="text"
                    name="settingForm[app:title]"
                    value="{{ getConfig('crowi', 'app:title') | default('') }}"
                    placeholder="GROWI">
              <p class="help-block">{{ t("app_setting.sitename_change") }}</p>
            </div>
          </div>

          <div class="form-group">
            <label for="settingForm[app:confidential]" class="col-xs-3 control-label">{{ t('app_setting.Confidential name') }}</label>
            <div class="col-xs-6">
              <input class="form-control"
                    id="settingForm[app:confidential]"
                    type="text"
                    name="settingForm[app:confidential]"
                    value="{{ getConfig('crowi', 'app:confidential') | default('') }}"
                    placeholder="{{ t('app_setting. ex&rpar;: internal use only') }}">
              <p class="help-block">{{ t("app_setting.header_content") }}</p>
            </div>
          </div>

          <div class="form-group">
            <label class="col-xs-3 control-label">{{ t('app_setting.Default Language for new users') }}</label>
            <div class="col-xs-6">
              <div class="radio radio-primary radio-inline">
                  <input type="radio"
                        id="radioLangEn"
                        name="settingForm[app:globalLang]"
                        value="{{ consts.language.LANG_EN_US }}"
                        {% if getConfig('crowi', 'app:globalLang') == consts.language.LANG_EN_US %}checked="checked"{% endif %}>
                  <label for="radioLangEn">{{ t('English') }}</label>
              </div>
              <div class="radio radio-primary radio-inline">
                  <input type="radio"
                        id="radioLangJa"
                        name="settingForm[app:globalLang]"
                        value="{{ consts.language.LANG_JA }}"
                        {% if getConfig('crowi', 'app:globalLang') == consts.language.LANG_JA %}checked="checked"{% endif %}>
                  <label for="radioLangJa">{{ t('Japanese') }}</label>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="col-xs-3 control-label">{{ t('app_setting.File Uploading') }}</label>
            <div class="col-xs-6">
              <div class="checkbox checkbox-info">
                <input type="checkbox"
                      id="cbFileUpload"
                      name="settingForm[app:fileUpload]"
                      value="1"
                      {% if getConfig('crowi', 'app:fileUpload') %}checked{% endif %}
                      {% if not fileUploadService.getIsUploadable() %}disabled="disabled"{% endif %}>
                <label for="cbFileUpload">
                  {{ t("app_setting.enable_files_except_image") }}
                </label>
              </div>

                <p class="help-block">
                  {{ t("app_setting.enable_files_except_image") }}<br>
                  {{ t("app_setting.attach_enable") }}
                </p>
            </div>
          </div>

          <div class="form-group">
            <div class="col-xs-offset-3 col-xs-6">
              <input type="hidden" name="_csrf" value="{{ csrf() }}">
              <button type="submit" class="btn btn-primary">{{ t('app_setting.Update') }}</button>
            </div>
          </div>
        </fieldset>
        </form>

        <form action="/_api/admin/settings/siteUrl" method="post" class="form-horizontal" id="siteUrlSettingForm" role="form">
          <fieldset>
            <legend>{{ t('Site URL settings') }}</legend>
            <p class="well">{{ t('app_setting.Site URL desc') }}</p>
            {% if !getConfig('crowi', 'app:siteUrl') %}
              <p class="alert alert-danger"><i class="icon-exclamation"></i> {{ t('app_setting.Site URL warn') }}</p>
            {% endif %}

            <div class="col-xs-offset-3">
              <table class="table settings-table">
                <colgroup>
                  <col class="from-db">
                  <col class="from-env-vars">
                </colgroup>
                <thead>
                <tr><th>Database</th><th>Environment variables</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input class="form-control"
                            type="text"
                            name="settingForm[app:siteUrl]"
                            value="{{ getConfigFromDB('crowi', 'app:siteUrl') | default('') }}"
                            placeholder="e.g. https://my.growi.org">
                      <p class="help-block">{{ t("app_setting.siteurl_help") }}</p>
                    </td>
                    <td>
                      <input class="form-control"
                            type="text"
                            value="{{ getConfigFromEnvVars('crowi', 'app:siteUrl') | default('') }}"
                            readonly>
                      <p class="help-block">
                        {{ t("app_setting.Use env var if empty", "APP_SITE_URL") }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="form-group">
              <div class="col-xs-offset-3 col-xs-6">
                <input type="hidden" name="_csrf" value="{{ csrf() }}">
                <button type="submit" class="btn btn-primary">{{ t('app_setting.Update') }}</button>
              </div>
            </div>
          </fieldset>
        </form>


        <form action="/_api/admin/settings/mail" method="post" class="form-horizontal" id="mailSettingForm" role="form">
        <fieldset>
        <legend>{{ t('app_setting.Mail settings') }}</legend>
        <p class="well">{{ t("app_setting.SMTP_used") }} {{ t("app_setting.SMTP_but_AWS") }}<br>{{ t("app_setting.neihter_of") }}</p>

          <div class="form-group">
            <label for="settingForm[mail.from]" class="col-xs-3 control-label">{{ t('app_setting.From e-mail address') }}</label>
            <div class="col-xs-6">
              <input class="form-control"
                    id="settingForm[mail.from]"
                    type="text"
                    name="settingForm[mail:from]"
                    placeholder="{{ t('eg') }} mail@growi.org"
                    value="{{ getConfig('crowi', 'mail:from') | default('') }}">
            </div>
          </div>

          <div class="form-group">
            <label class="col-xs-3 control-label">{{ t('app_setting.SMTP settings') }}</label>
            <div class="col-xs-4">
              <label>{{ t('app_setting.Host') }}</label>
              <input class="form-control"
                    type="text"
                    name="settingForm[mail:smtpHost]"
                    value="{{ getConfig('crowi', 'mail:smtpHost') | default('') }}">
            </div>
            <div class="col-xs-2">
              <label>{{ t('app_setting.Port') }}</label>
              <input class="form-control"
                    type="text"
                    name="settingForm[mail:smtpPort]"
                    value="{{ getConfig('crowi', 'mail:smtpPort') | default('') }}">
            </div>
          </div>

          <div class="form-group">
            <div class="col-xs-3 col-xs-offset-3">
              <label>{{ t('app_setting.User') }}</label>
              <input class="form-control"
                    type="text"
                    name="settingForm[mail:smtpUser]"
                    value="{{ getConfig('crowi', 'mail:smtpUser') | default('') }}">
            </div>
            <div class="col-xs-3">
              <label>{{ t('Password') }}</label>
              <input class="form-control"
                    type="password"
                    name="settingForm[mail:smtpPassword]"
                    value="{{ getConfig('crowi', 'mail:smtpPassword') | default('') }}">
            </div>
          </div>

          <div class="form-group">
            <div class="col-xs-offset-3 col-xs-6">
              <input type="hidden" name="_csrf" value="{{ csrf() }}">
              <button type="submit" class="btn btn-primary">{{ t('app_setting.Update') }}</button>
            </div>
          </div>

        </fieldset>
        </form>

        <form action="/_api/admin/settings/aws" method="post" class="form-horizontal" id="awsSettingForm" role="form">
        <fieldset>
        <legend>{{ t('app_setting.AWS settings') }}</legend>
          <p class="well">{{ t("app_setting.AWS_access") }}<br>
          {{ t("app_setting.No_SMTP_setting") }}<br>
            <br>

            <span class="text-danger"><i class="ti-unlink"></i> {{ t("app_setting.change_setting") }}</span>
          </p>

          <div class="form-group">
            <label for="settingForm[app:region]" class="col-xs-3 control-label">{{ t('app_setting.region') }}</label>
            <div class="col-xs-6">
              <input class="form-control"
                    id="settingForm[app:region]"
                    type="text"
                    name="settingForm[aws:region]"
                    placeholder="例: ap-northeast-1"
                    value="{{ getConfig('crowi', 'aws:region') | default('') }}">
            </div>
          </div>

          <div class="form-group">
            <label for="settingForm[aws:customEndpoint]" class="col-xs-3 control-label">{{ t('app_setting.custom endpoint') }}</label>
            <div class="col-xs-6">
              <input class="form-control"
                    id="settingForm[aws:customEndpoint]"
                    type="text"
                    name="settingForm[aws:customEndpoint]"
                    placeholder="例: http://localhost:9000"
                    value="{{ getConfig('crowi', 'aws:customEndpoint') | default('') }}">
                    <p class="help-block">{{ t("app_setting.custom_endpoint_change") }}</p>
            </div>
          </div>

          <div class="form-group">
            <label for="settingForm[aws:bucket]" class="col-xs-3 control-label">{{ t('app_setting.bucket name') }}</label>
            <div class="col-xs-6">
              <input class="form-control"
                    id="settingForm[aws:bucket]"
                    type="text"
                    name="settingForm[aws:bucket]"
                    placeholder="例: crowi"
                    value="{{ getConfig('crowi', 'aws:bucket') | default('') }}">
            </div>
          </div>

          <div class="form-group">
            <label for="settingForm[aws:accessKeyId]" class="col-xs-3 control-label">Access Key ID</label>
            <div class="col-xs-6">
              <input class="form-control"
                    id="settingForm[aws:accessKeyId]"
                    type="text"
                    name="settingForm[aws:accessKeyId]"
                    value="{{ getConfig('crowi', 'aws:accessKeyId') | default('') }}">
            </div>

          </div>

          <div class="form-group">
            <label for="settingForm[aws:secretAccessKey]" class="col-xs-3 control-label">Secret Access Key</label>
            <div class="col-xs-6">
              <input class="form-control"
                    id="settingForm[aws:secretAccessKey]"
                    type="text"
                    name="settingForm[aws:secretAccessKey]"
                    value="{{ getConfig('crowi', 'aws:secretAccessKey') | default('') }}">
            </div>
          </div>

          <div class="form-group">
            <div class="col-xs-offset-3 col-xs-6">
              <input type="hidden" name="_csrf" value="{{ csrf() }}">
              <button type="submit" class="btn btn-primary">{{ t('app_setting.Update') }}</button>
            </div>
          </div>

        </fieldset>
        </form>

        <form action="/_api/admin/settings/plugin" method="post" class="form-horizontal" id="pluginSettingForm" role="form">
        <fieldset>
        <legend>{{ t('app_setting.Plugin settings') }}</legend>
          <p class="well">{{ t('app_setting.Enable plugin loading') }}</p>

          <div class="form-group">
            <label class="col-xs-3 control-label">{{ t('app_setting.Load plugins') }}</label>
            <div class="col-xs-6">

              <div class="btn-group btn-toggle" data-toggle="buttons">
                <label class="btn btn-default btn-rounded btn-outline {% if getConfig('crowi', 'plugin:isEnabledPlugins') %}active{% endif %}" data-active-class="primary">
                  <input name="settingForm[plugin:isEnabledPlugins]"
                        value="true"
                        type="radio"
                        {% if true === getConfig('crowi', 'plugin:isEnabledPlugins') %}checked{% endif %}>
                  ON
                </label>
                <label class="btn btn-default btn-rounded btn-outline {% if !getConfig('crowi', 'plugin:isEnabledPlugins') %}active{% endif %}" data-active-class="default">
                  <input name="settingForm[plugin:isEnabledPlugins]"
                        value="false"
                        type="radio"
                        {% if !getConfig('crowi', 'plugin:isEnabledPlugins') %}checked{% endif %}>
                  OFF
                </label>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-xs-offset-3 col-xs-6">
              <input type="hidden" name="_csrf" value="{{ csrf() }}">
              <button type="submit" class="btn btn-primary">{{ t('app_setting.Update') }}</button>
            </div>
          </div>

        </fieldset>
        </form>

      </div>
    </div>

    <script>
      $('#appSettingForm, #siteUrlSettingForm, #mailSettingForm, #awsSettingForm, #pluginSettingForm').each(function() {
        $(this).submit(function()
        {
          function showMessage(formId, msg, status) {
            $('#' + formId + ' .alert').remove();

            if (!status) {
              status = 'success';
            }
            var $message = $('<p class="alert"></p>');
            $message.addClass('alert-' + status);
            $message.html(msg.replace(/\n/g, '<br>'));
            $message.insertAfter('#' + formId + ' legend');

            if (status == 'success') {
              setTimeout(function()
              {
                $message.fadeOut({
                  complete: function() {
                    $message.remove();
                  }
                });
              }, 5000);
            }
          }

          var $form = $(this);
          var $id = $form.attr('id');
          var $button = $('button', this);
          $button.attr('disabled', 'disabled');
          var jqxhr = $.post($form.attr('action'), $form.serialize(), function(data)
            {
              if (data.status) {
                showMessage($id, '更新しました');
              } else {
                showMessage($id, data.message, 'danger');
              }
            })
            .fail(function() {
              showMessage($id, 'エラーが発生しました', 'danger');
            })
            .always(function() {
              $button.prop('disabled', false);
          });
          return false;
        });
      });
    */}
      /**
      * The following script sets the class name 'unused' to the cell in from-env-vars column
      * when the value of the corresponding cell from the database is not empty.
      * It is used to indicate that the system does not use a value from the environment variables by setting a css style.
      *
      * TODO The following script is duplicated from saml.html. It is desirable to integrate those in the future.
      */
    //   $('.settings-table tbody tr').each(function(_, element) {
    //     const inputElemFromDB      = $('td:nth-of-type(1) input[type="text"], td:nth-of-type(1) textarea', element);
    //     const inputElemFromEnvVars = $('td:nth-of-type(2) input[type="text"], td:nth-of-type(2) textarea', element);

    //     // initialize
    //     addClassToUnusedInputElemFromEnvVars(inputElemFromDB, inputElemFromEnvVars);

    //     // set keyup event handler
    //     inputElemFromDB.keyup(function () { addClassToUnusedInputElemFromEnvVars(inputElemFromDB, inputElemFromEnvVars) });
    //   });

    //   function addClassToUnusedInputElemFromEnvVars(inputElemFromDB, inputElemFromEnvVars) {
    //     if (inputElemFromDB.val() === '') {
    //       inputElemFromEnvVars.parent().removeClass('unused');
    //     }
    //     else {
    //       inputElemFromEnvVars.parent().addClass('unused');
    //     }
    //   };
    // </script>
    );
  }

}

AppSettingPage.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
};


/**
 * Wrapper component for using unstated
 */
const ImportDataPageWrapper = (props) => {
  return createSubscribedElement(AppSettingPage, props, [AppContainer]);
};


export default withTranslation()(AppSettingPageWrapper);
