//@flow

import { FormattedMessage, injectIntl } from 'react-intl';
import { Header, Form, Grid } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import CustomInput from 'Components/CustomInput';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import Label from 'Components/Label';
import React, { Component } from 'react';

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
  },
  fourthStepAngel: {
    education: string,
    fieldOfStudy: string,
  },
};

type Props = {
  next: Function,
  values: Values,
  handleChange: Function,
  handleBlur: Function,
  previous: Function,
  onErrorReset: Function,
  submitForm: Function,
  isLoading: boolean,
  errors?: Object,
  intl: Object,
  authenticated: boolean,
};

class FourthStep extends Component<Props> {
  static defaultProps = {
    next: () => {},
    values: {
      firstStepAngel: {
        name: '',
        lastName: '',
        birthdate: '',
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
    },
    handleChange: () => {},
    submitForm: () => {},
  };

  render() {
    const { values, handleChange, handleBlur, intl } = this.props;

    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Header as="h3">
              <FormattedMessage id="signup.angel.fourthStep.header" />
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="0.9375rem">
              <FormattedMessage id="signup.angel.fourthStep.description" />
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Form>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.fourthStep.education" />
                </Label>
                <CustomInput
                  placeholder={intl.formatMessage({
                    id: 'signup.angel.fourthStep.educationPlaceholder',
                  })}
                  type="text"
                  name="fourthStepAngel.education"
                  value={values.fourthStepAngel.education}
                  transparent
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Field>
              <Form.Field>
                <Label>
                  <FormattedMessage id="signup.angel.fourthStep.fieldOfStudy" />
                </Label>
                <CustomInput
                  placeholder={intl.formatMessage({
                    id: 'signup.angel.fourthStep.fieldOfStudyPlaceholder',
                  })}
                  type="text"
                  name="fourthStepAngel.fieldOfStudy"
                  value={values.fourthStepAngel.fieldOfStudy}
                  transparent
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton primary onClick={this.props.next} fluid>
              <FormattedMessage id="signup.angel.fourthStep.btn" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default injectIntl(FourthStep);
