import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import { ThemeProvider } from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import FacebookButton from 'Components/Buttons/Facebook';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import {
  getFacebookData,
  getLoadingStatus,
  getErrors,
  getWithEmail,
} from './selectors';
import {
  onEmailSignup,
  onEmailSignupReset,
  onFacebookSignup,
  onFacebookSuccess,
  onFacebookFailure,
  onErrorReset,
} from './actions';
import defaultTheme from '../../themes/default';

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
        <ThemeProvider theme={defaultTheme}>
          <FamilyEmailSignupWizard
            facebookData={this.props.facebookData}
            user={this.props.match.params.user}
            onBack={this.props.onEmailSignUpReset}
          />
        </ThemeProvider>
      );
    } else if (
      (this.props.withEmail && this.props.match.params.user === 'angel') ||
      (this.props.facebookData && this.props.match.params.user === 'angel')
    ) {
      return (
        <ThemeProvider theme={defaultTheme}>
          <AngelEmailSignupWizard
            facebookData={this.props.facebookData}
            user={this.props.match.params.user}
            onBack={this.props.onEmailSignUpReset}
          />
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={defaultTheme}>
          <Layout onNavBack={this.props.history.goBack}>
            <Error
              errors={this.props.errors}
              onErrorConfirm={this.props.onErrorReset}
            />
            {this.props.isLoading && <Loader />}
            
            <Grid.Row />
            <Grid.Row />
            <Grid.Row />
            <Grid.Row />
            <Grid.Row />
            <Grid.Row />
            
            <Grid.Row verticalAlign="bottom">
              <Grid.Column width={16} textAlign="center">
                <Header as="h3">
                  <FormattedMessage
                    id={`signup.${this.props.match.params.user}.header`}
                  />
                </Header>
              </Grid.Column>
            </Grid.Row>
            <div style = {{marginTop : -10,textAlign : 'center'}}>
            <Grid.Row verticalAlign="bottom" >
              <Grid.Column width={16} textAlign="center">
              <div style = {{marginBottom : 15}}>
                <InlineText>
                  <FormattedMessage
                    id={`signup.${this.props.match.params.user}.advise`}
                  />
                </InlineText>
                </div>
              </Grid.Column>
              
              <Grid.Column width={16}>
                <FacebookButton callback={this.responseFacebook}>
                  <FormattedMessage
                    id={`signup.${this.props.match.params.user}.facebookBtn`}
                  />
                </FacebookButton>
              </Grid.Column>
              <Grid.Column width={16} textAlign="center">
              <div style = {{marginBottom : 5,marginTop : 5}}>
                <FormattedMessage
                  id={`signup.${this.props.match.params.user}.or`}
                />
              </div>
              </Grid.Column>
              <Grid.Column width={16}>
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
              <div style = {{marginTop : 5}}>
              <Grid.Column width={16} as="p" textAlign="center">
                <FormattedMessage
                  id={`signup.${this.props.match.params.user}.haveAcc`}
                />
                <CustomLink onMouseOver={this.props.preloadLogin} to="/login">
                  <FormattedMessage
                    id={`signup.${this.props.match.params.user}.logIn`}
                  />
                </CustomLink>
              </Grid.Column>
              </div>
            </Grid.Row>
            </div>
          </Layout>
        </ThemeProvider>
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
