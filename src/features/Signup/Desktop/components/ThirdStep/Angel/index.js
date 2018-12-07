//@flow

import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import { isValidNumber } from 'libphonenumber-js';
import BasicButton from 'Components/Buttons/Basic';
import { Paragraph } from 'Components/Text';
import CustomInput from 'Components/CustomInput';
import ErrorMessage from 'Components/ErrorMessage';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import LandCodes from '../components/LandCodes';
import React, { Component } from 'react';

import { onNextStep } from '../../../../utils';
import { thirdStepAngel } from '../../Wizard/Angel/formSchema';

type Values = {
  firstStepAngel: {
    name: string,
    lastName: string,
    birthdate: string,
  },
  secondStepAngel: {
    email: string,
    password: string,
    terms: boolean,
  },
  thirdStepAngel: {
    postalCode: string,
    streetNumber: string,
    phone: string,
    landCode: string,
  },
};

type Error = {
  thirdStepAngel?: {
    postalCode?: string,
    streetNumber?: string,
    phone?: string,
    landCode?: string,
  },
};

type Props = {
  next: Function,
  values: Values,
  handleChange: Function,
  previous: Function,
  errors: Error,
  setErrors: Function,
  touched: Object,
  handleBlur: Function,
  setTouched: Function,
  setFieldValue: Function,
  setFieldTouched: Function,
};

type State = {
  landCodes: Array<{
    key: string,
    value: string,
    text: string,
  }>,
};

export default class ThirdStep extends Component<Props, State> {
  state = {
    landCodes: [
      { key: 'NL', text: 'NL (+31)', value: '+31' },
      { key: 'US', text: 'US (+1)', value: '+1' },
      { key: 'GB', text: 'GB (+44)', value: '+44' },
    ],
  };

  static defaultProps = {
    next: () => {},
    values: {
      firstStepAngel: {
        name: '',
        lastName: '',
      },
      secondStepAngel: {
        email: '',
        password: '',
        terms: false,
      },
      thirdStepAngel: {
        postalCode: '',
        streetNumber: '',
        landCode: '+31',
        phone: '',
      },
      fourthStepAngel: {
        children: [],
      },
    },
    handleChange: () => {},
    setFieldValue: () => {},
    setFieldTouched: () => {},
  };

  isFullPhoneNotValid(values: Object) {
    return !isValidNumber(
      values.thirdStepAngel.landCode + values.thirdStepAngel.phone
    );
  }

  loadMoreAndSearch = (
    values: Array<{
      key: string,
      value: string,
      text: string,
    }>,
    data: string
  ) => {
    if (this.state.landCodes.length === 3) {
      import('../country.json').then(r => {
        this.setState({
          landCodes: r,
        });
      });
    }
    return values.filter(value => {
      return (
        value.text.toLowerCase().includes(data) || value.text.includes(data)
      );
    });
  };

  render() {
    const {
      setErrors,
      setTouched,
      next,
      values,
      previous,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldTouched,
      initPostalCodeCheck,
    } = this.props;

    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="signup.angel.thirdStep.header1" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="0.9375rem">
              <FormattedMessage id="signup.angel.thirdStep.description1" />
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Form>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.angel.thirdStep.postalCode" />
                      </Label>
                      <CustomInput
                        hasError={
                          errors.thirdStepAngel && touched.thirdStepAngel
                            ? touched.thirdStepAngel.postalCode &&
                              errors.thirdStepAngel.postalCode
                              ? true
                              : false
                            : false
                        }
                        value={values.thirdStepAngel.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="thirdStepAngel.postalCode"
                        type="text"
                        transparent
                      />
                      <FieldError
                        errors={errors}
                        touched={touched}
                        field="thirdStepAngel.postalCode"
                        render={() => (
                          <ErrorMessage>
                            {errors.thirdStepAngel &&
                              errors.thirdStepAngel.postalCode}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.angel.thirdStep.streetNumber" />
                      </Label>
                      <CustomInput
                        hasError={
                          errors.thirdStepAngel && touched.thirdStepAngel
                            ? touched.thirdStepAngel.streetNumber &&
                              errors.thirdStepAngel.streetNumber
                              ? true
                              : false
                            : false
                        }
                        value={values.thirdStepAngel.streetNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="thirdStepAngel.streetNumber"
                        type="text"
                        transparent
                      />
                      <FieldError
                        errors={errors}
                        touched={touched}
                        field="thirdStepAngel.streetNumber"
                        render={() => (
                          <ErrorMessage>
                            {errors.thirdStepAngel &&
                              errors.thirdStepAngel.streetNumber}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Form>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.angel.thirdStep.landCode" />
                      </Label>

                      <LandCodes
                        icon={null}
                        search={this.loadMoreAndSearch}
                        basic
                        name="thirdStepAngel.landCode"
                        error={
                          errors.thirdStepAngel && touched.thirdStepAngel
                            ? touched.thirdStepAngel.landCode &&
                              errors.thirdStepAngel.landCode
                              ? true
                              : false
                            : false
                        }
                        fluid
                        onChange={(e, data) => {
                          setFieldValue('thirdStepAngel.landCode', data.value);
                          setFieldTouched('thirdStepAngel.landCode', true);
                        }}
                        value={values.thirdStepAngel.landCode}
                        options={this.state.landCodes}
                      />
                      <FieldError
                        errors={errors}
                        touched={touched}
                        field="thirdStepAngel.landCode"
                        render={() => (
                          <ErrorMessage>
                            {errors.thirdStepAngel &&
                              errors.thirdStepAngel.landCode}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Form.Field width={16}>
                      <Label>
                        <FormattedMessage id="signup.angel.thirdStep.phone" />
                      </Label>
                      <CustomInput
                        hasError={
                          this.isFullPhoneNotValid(values) &&
                          touched.thirdStepAngel &&
                          touched.thirdStepAngel.phone
                        }
                        value={values.thirdStepAngel.phone}
                        onChange={handleChange}
                        name="thirdStepAngel.phone"
                        type="text"
                        onBlur={handleBlur}
                        transparent
                      />
                      <FieldError
                        additionalCondition={this.isFullPhoneNotValid(values)}
                        additionalConditionErrMsg="Phone is not valid"
                        errors={errors}
                        touched={touched}
                        field="thirdStepAngel.phone"
                        render={additionalConditionErrMsg => (
                          <ErrorMessage>
                            {errors.thirdStepAngel &&
                            errors.thirdStepAngel.phone
                              ? errors.thirdStepAngel.phone
                              : additionalConditionErrMsg &&
                                additionalConditionErrMsg}
                          </ErrorMessage>
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton
              fluid
              primary
              loading={this.props.isCheckingCode}
              disabled={
                errors.thirdStepAngel || this.props.isCheckingCode
                  ? true
                  : false
              }
              onClick={onNextStep('thirdStepAngel')({
                schema: thirdStepAngel,
                setErrors,
                setTouched,
                next,
                values,
                additionalCondition: !this.isFullPhoneNotValid(values),
                postalCodeChecking: initPostalCodeCheck,
                fields: ['postalCode', 'streetNumber', 'landCode', 'phone'],
              })}
            >
              <FormattedMessage id="signup.angel.thirdStep.btn" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}
