import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Error from 'Components/Error';
import ErrorMessage from 'Components/ErrorMessage';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import { getAuthStatus } from '../../../../data/auth/selectors';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import ErrorSection from './components/ErrorSection';
import HeaderSection from './components/HeaderSection';
import LanguageList from './components/LanguageList';

class LanguageSelectionStep extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props);
    if (
      this.props.authenticated === true &&
      this.props.authenticated !== prevProps.authenticated
    ) {
      this.props.next();
    }
  }

  onLanguageToggle = lang => () => {
    if (this.props.userRole === 'family') {
      this.props.setFieldValue(
        `fourthBStepFamily.languages.${lang}`,
        !this.props.values.fourthBStepFamily.languages[lang]
      );
      this.props.setFieldTouched(`fourthBStepFamily.languages`, true);
    } else {
      this.props.setFieldValue(
        `fourthBStepAngel.languages.${lang}`,
        !this.props.values.fourthBStepAngel.languages[lang]
      );
      this.props.setFieldTouched(`fourthBStepAngel.languages`, true);
    }
  };

  render() {
    return (
      <Layout onNavBack={this.props.previous}>
        <Error
          errors={this.props.apiErrors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.props.isLoading ? <Loader /> : null}
        <CustomRow>
          <CustomColumn>
            <HeaderSection userRole={this.props.userRole} />
            {this.props.userRole === 'family' ? (
              <LanguageList
                selectedLanguages={
                  this.props.values && this.props.values.fourthBStepFamily
                    ? this.props.values.fourthBStepFamily.languages
                    : null
                }
                onLanguageSelect={this.onLanguageToggle}
              />
            ) : (
              <LanguageList
                selectedLanguages={
                  this.props.values && this.props.values.fourthBStepAngel
                    ? this.props.values.fourthBStepAngel.languages
                    : null
                }
                onLanguageSelect={this.onLanguageToggle}
              />
            )}

            <ErrorSection>
              {this.props.errors &&
              this.props.touched &&
              this.props.touched.fourthBStepFamily &&
              this.props.errors.fourthBStepFamily &&
              this.props.errors.fourthBStepFamily.languages &&
              this.props.touched.fourthBStepFamily.languages ? (
                <ErrorMessage>
                  {this.props.errors.fourthBStepFamily.languages}
                </ErrorMessage>
              ) : null}
              {this.props.errors &&
              this.props.touched &&
              this.props.touched.fourthBStepAngel &&
              this.props.errors.fourthBStepAngel &&
              this.props.errors.fourthBStepAngel.languages &&
              this.props.touched.fourthBStepAngel.languages ? (
                <ErrorMessage>
                  {this.props.errors.fourthBStepAngel.languages}
                </ErrorMessage>
              ) : null}
            </ErrorSection>
            <BasicButton
              primary
              fluid
              disabled={
                (this.props.errors && this.props.errors.fourthBStepAngel) ||
                (this.props.errors && this.props.errors.fourthBStepFamily)
                  ? true
                  : false
              }
              onClick={this.props.submitForm}
            >
              <FormattedMessage id="signup.fourthBStep.btn" />
            </BasicButton>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    isLoading: getLoadingStatus(state),
    apiErrors: getErrors(state),
    authenticated: getAuthStatus(state),
  }),
  {
    onErrorConfirm,
  }
)(withRouter(LanguageSelectionStep));
