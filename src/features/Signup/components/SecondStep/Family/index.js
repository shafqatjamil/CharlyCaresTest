import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import CustomLink from 'Components/CustomLink';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import CustomRow from 'Components/CustomRow';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import Toggle from 'Components/Toggle';
import VisibilityIcon from 'Components/VisibilityIcon';
import React from 'react';

import { onNextStep } from '../../../utils';
import { secondStepFamily } from '../../Wizard/Family/formSchema';

export default class SecondStep extends React.PureComponent {
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
              <FormattedMessage id="signup.family.secondStep.header" />
            </Header>
          </Grid.Column>
          <Grid.Column width={16} as="p">
            <FormattedMessage id="signup.family.secondStep.description" />
          </Grid.Column>
          <Grid.Column width={16}>
            <Form>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.family.secondStep.email" />
                </Label>
                <CustomInput
                  hasError={
                    this.props.errors.secondStepFamily &&
                    this.props.touched.secondStepFamily
                      ? this.props.touched.secondStepFamily.email &&
                        this.props.errors.secondStepFamily.email
                        ? true
                        : false
                      : false
                  }
                  value={values.secondStepFamily.email}
                  onChange={this.props.handleChange}
                  name="secondStepFamily.email"
                  type="email"
                  onBlur={this.props.handleBlur}
                  transparent
                />
                <FieldError
                  errors={this.props.errors}
                  touched={this.props.touched}
                  field="secondStepFamily.email"
                  render={() => {
                    return (
                      <ErrorMessage>
                        {this.props.errors.secondStepFamily.email}
                      </ErrorMessage>
                    );
                  }}
                />
              </Form.Field>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.family.secondStep.password" />
                </Label>
                <CustomInput
                  hasError={
                    this.props.errors.secondStepFamily &&
                    this.props.touched.secondStepFamily
                      ? this.props.touched.secondStepFamily.password &&
                        this.props.errors.secondStepFamily.password
                        ? true
                        : false
                      : false
                  }
                  value={values.secondStepFamily.password}
                  onChange={this.props.handleChange}
                  name="secondStepFamily.password"
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
                  field="secondStepFamily.password"
                  render={() => {
                    return (
                      <ErrorMessage>
                        {this.props.errors.secondStepFamily.password}
                      </ErrorMessage>
                    );
                  }}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
          <CustomColumn width={12}>
            <InlineText fontSize="0.875em">
              <FormattedMessage id="signup.family.secondStep.agree" />
            </InlineText>{' '}
            <CustomLink fontSize="0.875em" to="/">
              <FormattedMessage id="signup.family.secondStep.terms" />
            </CustomLink>{' '}
          </CustomColumn>
          <CustomColumn width={4} textAlign="right">
            <Toggle
              value={values.secondStepFamily.terms}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              name="secondStepFamily.terms"
            />
          </CustomColumn>
          <CustomColumn width={12}>
            <InlineText fontSize="0.875em">
              <FormattedMessage id="signup.family.secondStep.agree" />
            </InlineText>{' '}
            <CustomLink fontSize="0.875em" to="/">
              <FormattedMessage id="signup.family.secondStep.privacy" />
            </CustomLink>{' '}
          </CustomColumn>
          <CustomColumn width={4} textAlign="right">
            <Toggle
              value={values.secondStepFamily.privacy}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              name="secondStepFamily.privacy"
            />
          </CustomColumn>
          <CustomColumn width={16}>
            <FieldError
              errors={this.props.errors}
              touched={this.props.touched}
              field="secondStepFamily.terms"
              render={() => {
                return (
                  <ErrorMessage>
                    {this.props.errors.secondStepFamily.terms}
                  </ErrorMessage>
                );
              }}
            />
          </CustomColumn>
          <CustomColumn width={16}>
            <FieldError
              errors={this.props.errors}
              touched={this.props.touched}
              field="secondStepFamily.privacy"
              render={() => {
                return (
                  <ErrorMessage>
                    {this.props.errors.secondStepFamily.privacy}
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
                this.props.touched.secondStepFamily &&
                !this.props.errors.secondStepFamily &&
                Object.keys(this.props.touched.secondStepFamily).length > 0
              }
              onClick={onNextStep('secondStepFamily')({
                schema: secondStepFamily,
                values,
                setErrors,
                setTouched,
                next,
                fields: ['email', 'password', 'terms'],
              })}
              fluid
            >
              <FormattedMessage id="signup.family.secondStep.btn" />
            </BasicButton>
          </CustomColumn>
        </Grid.Row>
      </Layout>
    );
  }
}
