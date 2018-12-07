import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import Toggle from 'Components/Toggle';
import VisibilityIcon from 'Components/VisibilityIcon';

import { onNextStep } from '../../../utils';
import { secondStepAngel } from '../../Wizard/Angel/formSchema';

export default class SecondStep extends Component {
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

  render() {
    const { values, setErrors, setTouched, next } = this.props;

    return (
      <Layout onNavBack={this.props.previous}>
        <CustomRow>
          <Grid.Column width={16}>
            <Header>
              <FormattedMessage id="signup.angel.secondStep.header" />
            </Header>
          </Grid.Column>
          <Grid.Column width={16} as="p">
            <FormattedMessage id="signup.angel.secondStep.description" />
          </Grid.Column>
          <Grid.Column width={16}>
            <Form>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.secondStep.email" />
                </Label>
                <CustomInput
                  hasError={
                    this.props.errors.secondStepAngel &&
                    this.props.touched.secondStepAngel
                      ? this.props.touched.secondStepAngel.email &&
                        this.props.errors.secondStepAngel.email
                        ? true
                        : false
                      : false
                  }
                  value={values.secondStepAngel.email}
                  onChange={this.props.handleChange}
                  name="secondStepAngel.email"
                  type="email"
                  onBlur={this.props.handleBlur}
                  transparent
                />
                <FieldError
                  errors={this.props.errors}
                  touched={this.props.touched}
                  field="secondStepAngel.email"
                  render={() => {
                    return (
                      <ErrorMessage>
                        {this.props.errors.secondStepAngel.email}
                      </ErrorMessage>
                    );
                  }}
                />
              </Form.Field>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.secondStep.password" />
                </Label>
                <CustomInput
                  hasError={
                    this.props.errors.secondStepAngel &&
                    this.props.touched.secondStepAngel
                      ? this.props.touched.secondStepAngel.password &&
                        this.props.errors.secondStepAngel.password
                        ? true
                        : false
                      : false
                  }
                  value={values.secondStepAngel.password}
                  onChange={this.props.handleChange}
                  name="secondStepAngel.password"
                  type={this.state.isPasswordVisible ? 'text' : 'password'}
                  onBlur={this.props.handleBlur}
                  transparent
                  action={
                    <VisibilityIcon
                      hasError={
                        this.props.errors.secondStepAngel &&
                        this.props.touched.secondStepAngel
                          ? this.props.touched.secondStepAngel.password &&
                            this.props.errors.secondStepAngel.password
                            ? true
                            : false
                          : false
                      }
                      visible={this.state.isPasswordVisible}
                      onIconClick={this.onPasswordVisibilityChange}
                    />
                  }
                />
                <FieldError
                  errors={this.props.errors}
                  touched={this.props.touched}
                  field="secondStepAngel.password"
                  render={() => {
                    return (
                      <ErrorMessage>
                        {this.props.errors.secondStepAngel.password}
                      </ErrorMessage>
                    );
                  }}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
          <CustomColumn width={12} verticalAlign="middle">
            <InlineText fontSize="0.875em">
              <FormattedMessage id="signup.angel.secondStep.agreeWith" />
            </InlineText>{' '}
            <CustomLink fontSize="0.875em" to="/">
              <FormattedMessage id="signup.angel.secondStep.termsAndConditions" />
            </CustomLink>{' '}
          </CustomColumn>
          <CustomColumn width={4} verticalAlign="middle">
            <Toggle
              value={values.secondStepAngel.terms}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              name="secondStepAngel.terms"
            />
          </CustomColumn>
          <CustomColumn width={16} verticalAlign="middle">
            <FieldError
              errors={this.props.errors}
              touched={this.props.touched}
              field="secondStepAngel.terms"
              render={() => {
                return (
                  <ErrorMessage>
                    {this.props.errors.secondStepAngel.terms}
                  </ErrorMessage>
                );
              }}
            />
          </CustomColumn>
          <CustomColumn width={12} verticalAlign="middle">
            <InlineText fontSize="0.875em">
              <FormattedMessage id="signup.angel.secondStep.agreeWith" />
            </InlineText>{' '}
            <CustomLink fontSize="0.875em" to="/">
              <FormattedMessage id="signup.angel.secondStep.privacyPolicy" />
            </CustomLink>{' '}
          </CustomColumn>
          <CustomColumn width={4} verticalAlign="middle">
            <Toggle
              value={values.secondStepAngel.privacy}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              name="secondStepAngel.privacy"
            />
          </CustomColumn>
          <CustomColumn width={16} verticalAlign="middle">
            <FieldError
              errors={this.props.errors}
              touched={this.props.touched}
              field="secondStepAngel.privacy"
              render={() => {
                return (
                  <ErrorMessage>
                    {this.props.errors.secondStepAngel.privacy}
                  </ErrorMessage>
                );
              }}
            />
          </CustomColumn>
        </CustomRow>
        <Grid.Row verticalAlign="middle">
          <CustomColumn width={16}>
            <BasicButton
              primary={
                this.props.touched &&
                this.props.errors &&
                this.props.touched.secondStepAngel &&
                !this.props.errors.secondStepAngel
                  ? true
                  : false
              }
              onClick={onNextStep('secondStepAngel')({
                schema: secondStepAngel,
                values,
                setErrors,
                setTouched,
                next,
                fields: ['email', 'password', 'terms', 'privacy'],
              })}
              fluid
            >
              <FormattedMessage id="signup.angel.secondStep.btn" />
            </BasicButton>
          </CustomColumn>
        </Grid.Row>
      </Layout>
    );
  }
}
