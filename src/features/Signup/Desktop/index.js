import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import CustomLink from 'Components/CustomLink';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import NoPadding from 'Components/NoPadding';
import Loader from 'Components/Loader';
import DesktopError from 'Components/DesktopError';
import FacebookButton from 'Components/Buttons/Facebook';
import React, { Component } from 'react';

import {
  getFacebookData,
  getLoadingStatus,
  getErrors,
  getWithEmail,
} from '../selectors';
import {
  onEmailSignup,
  onEmailSignupReset,
  onFacebookSignup,
  onFacebookSuccess,
  onFacebookFailure,
  onErrorReset,
} from '../actions';

import {
  FamilyEmailSignupWizard,
  AngelEmailSignupWizard,
} from './components/Wizard';

class Signup extends Component {
  responseFacebook = loginRes => {
    this.props.onFacebookSignup();
    window.FB.api(
      '/me',
      { fields: 'context.fields(mutual_friends)' },
      apiRes => {
        if (apiRes.error) {
          this.props.onFacebookFailure(apiRes.error);
        }
        if (apiRes && !apiRes.error) {
          const data = Object.assign({}, loginRes, apiRes);
          this.props.onFacebookSuccess(data);
        }
      }
    );
  };

  render() {
    if (
      (this.props.withEmail && this.props.match.params.user === 'family') ||
      (this.props.facebookData && this.props.match.params.user === 'family')
    ) {
      return (
        <FamilyEmailSignupWizard
          facebookData={this.props.facebookData}
          user={this.props.match.params.user}
          onBack={this.props.onEmailSignUpReset}
        />
      );
    } else if (
      (this.props.withEmail && this.props.match.params.user === 'angel') ||
      (this.props.facebookData && this.props.match.params.user === 'angel')
    ) {
      return (
        <AngelEmailSignupWizard
          facebookData={this.props.facebookData}
          user={this.props.match.params.user}
          onBack={this.props.onEmailSignUpReset}
        />
      );
    } else {
      return (
        <DesktopWelcomeLayout withLogo>
          <DesktopError
            errors={this.props.errors}
            onErrorConfirm={this.props.onErrorReset}
          />
          {this.props.isLoading && <Loader />}
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} textAlign="center">
              <Header as="h3">
                <FormattedMessage
                  id={`signup.${this.props.match.params.user}.header`}
                />
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} textAlign="center">
              <InlineText fontSize="0.9375rem" light>
                <FormattedMessage
                  id={`signup.${this.props.match.params.user}.advise`}
                />
              </InlineText>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} textAlign="center">
              <FacebookButton callback={this.responseFacebook}>
                <FormattedMessage
                  id={`signup.${this.props.match.params.user}.facebookBtn`}
                />
              </FacebookButton>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row as={NoPadding} textAlign="center">
            <InlineText fontSize="0.9375rem" light>
              <FormattedMessage
                id={`signup.${this.props.match.params.user}.or`}
              />
            </InlineText>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} textAlign="center">
              <BasicButton
                color="#6baebe"
                outline="#6baebe"
                onClick={this.props.onEmailSignUp}
                fluid
              >
                <FormattedMessage
                  id={`signup.${this.props.match.params.user}.emailBtn`}
                />
              </BasicButton>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} textAlign="center">
              <InlineText fontSize="0.9375rem" light>
                <FormattedMessage
                  id={`signup.${this.props.match.params.user}.haveAcc`}
                />
              </InlineText>
              <CustomLink
                fontSize="0.9375rem"
                onMouseOver={this.props.preloadLogin}
                to="/login"
              >
                <FormattedMessage
                  id={`signup.${this.props.match.params.user}.logIn`}
                />
              </CustomLink>
            </Grid.Column>
          </Grid.Row>
        </DesktopWelcomeLayout>
      );
    }
  }
}

const mapStateToProps = state => ({
  facebookData: getFacebookData(state),
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  withEmail: getWithEmail(state),
});

const mapDispatchToProps = dispatch => ({
  onEmailSignUp: () => dispatch(onEmailSignup()),
  onEmailSignUpReset: () => dispatch(onEmailSignupReset()),
  onFacebookSignup: () => dispatch(onFacebookSignup()),
  onFacebookSuccess: data => dispatch(onFacebookSuccess(data)),
  onFacebookFailure: err => dispatch(onFacebookFailure(err)),
  onErrorReset: () => dispatch(onErrorReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
