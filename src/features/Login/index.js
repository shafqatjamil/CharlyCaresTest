import { connect } from 'react-redux';
import { Dimmer, Form, Header, Loader } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import { Paragraph } from 'Components/Text';
import { Redirect } from 'react-router-dom';
import BasicButtons from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Error from 'Components/Error';
import ErrorMessage from 'Components/ErrorMessage';
import FacebookButton from 'Components/Buttons/Facebook';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import React, { Component, Fragment } from 'react';
import VisibilityIcon from 'Components/VisibilityIcon';

import { getAuthStatus } from '../../data/auth/selectors';
import { getLoadingStatus, getErrors } from './selectors';
import { onErrorConfirm } from '../../ui/actions';
import { onLoginReq } from '../../data/user/actions';
import LineDivider from './components/LineDivider';
import loginSchema from './formSchema';

class Login extends Component {
  state = {
    isPasswordVisible: false,
  };

  onPasswordVisibilityChange = () => {
    this.setState(prevState => {
      return {
        isPasswordVisible: !prevState.isPasswordVisible,
      };
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.isAuthenticated !== this.props.isAuthenticated ||
      nextProps.isLoading !== this.props.isLoading ||
      nextProps.errors !== this.props.errors ||
      nextState.isPasswordVisible !== this.state.isPasswordVisible
    ) {
      return true;
    }
    return false;
  }

  responseFacebook = res => {
    console.log(res);
  };

  render() {
    if (this.props.isAuthenticated === true) {
      return <Redirect to="/booking" />;
    }
    return (
      <Layout onNavBack={this.props.history.goBack}>
        <Dimmer active={this.props.isLoading}>
          <Loader size="large"> Checking credentials... </Loader>
        </Dimmer>
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <CustomRow>
          <CustomColumn width={16}>
            <CustomRow>
              <Header as="h3">
                <FormattedMessage id="login.family.header" />
              </Header>
            </CustomRow>
            <CustomRow paddingTop="0.375em">
              <Paragraph fontSize="0.9375em">
                <FormattedMessage id="login.family.description" />
              </Paragraph>
            </CustomRow>
            <CustomRow paddingTop="1.75em">
              <FacebookButton callback={this.responseFacebook}>
                <FormattedMessage id="login.family.facebookBtn" />
              </FacebookButton>
            </CustomRow>
            <CustomRow paddingTop="2em">
              <CustomColumn width={16}>
                <LineDivider>
                  <FormattedMessage id="login.family.lineDividerText" />
                </LineDivider>
              </CustomColumn>
            </CustomRow>
            <Formik
              validationSchema={loginSchema}
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={this.props.onLoginReq}
              render={({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
              }) => {
                return (
                  <Fragment>
                    <CustomRow paddingTop="2em">
                      <CustomColumn width={16}>
                        <Form>
                          <Form.Field>
                            <Label>
                              <FormattedMessage id="login.family.email" />
                            </Label>
                            <CustomInput
                              hasError={
                                errors.email && touched.email
                                  ? touched.email === true && errors.email
                                    ? true
                                    : false
                                  : false
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="email"
                              autoComplete="username"
                              value={values.email}
                              type="email"
                              transparent
                            />
                            <FieldError
                              errors={errors}
                              touched={touched}
                              field="email"
                              render={() => (
                                <ErrorMessage> {errors.email} </ErrorMessage>
                              )}
                            />
                          </Form.Field>
                          <Form.Field>
                            <Label>
                              <FormattedMessage id="login.family.password" />
                            </Label>
                            <CustomInput
                              hasError={
                                errors.password && touched.password
                                  ? touched.password === true && errors.password
                                    ? true
                                    : false
                                  : false
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="password"
                              value={values.password}
                              type={
                                this.state.isPasswordVisible
                                  ? 'text'
                                  : 'password'
                              }
                              transparent
                              autoComplete="current-password"
                              action={
                                errors.password && touched.password ? null : (
                                  <VisibilityIcon
                                    visible={this.state.isPasswordVisible}
                                    onIconClick={
                                      this.onPasswordVisibilityChange
                                    }
                                  />
                                )
                              }
                            />
                            <FieldError
                              errors={errors}
                              touched={touched}
                              field="password"
                              render={() => (
                                <ErrorMessage> {errors.password} </ErrorMessage>
                              )}
                            />
                          </Form.Field>
                        </Form>
                      </CustomColumn>
                    </CustomRow>
                    <CustomRow paddingTop="1.25em">
                      <CustomColumn width={16}>
                        <BasicButtons onClick={handleSubmit} primary fluid>
                          <FormattedMessage id="login.family.loginBtn" />
                        </BasicButtons>
                      </CustomColumn>
                    </CustomRow>
                  </Fragment>
                );
              }}
            />
            <CustomRow textAlign="center" paddingTop="1.25em">
              <CustomLink to="/password-recovery">
                <FormattedMessage id="login.family.forgotPassword" />
              </CustomLink>
            </CustomRow>
            <CustomRow textAlign="center" paddingTop="1.25em">
              <FormattedMessage id="login.family.noAccount" />
              <CustomLink to="/">
                <FormattedMessage id="login.family.createAccount" />
              </CustomLink>
            </CustomRow>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  isAuthenticated: getAuthStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onLoginReq: data => {
    return dispatch(onLoginReq(data));
  },
  onErrorConfirm: () => dispatch(onErrorConfirm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
