import { FormattedMessage } from 'react-intl';
import { Grid, Divider, Form } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import Label from 'Components/Label';
import CustomInput from 'Components/CustomInput';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';

class OutsideService extends Component {
  state = {
    errors: null,
    isLoading: false,
    postalCode: '',
    streetNumber: '',
  };

  onLookForCities = () => {
    window.open('http://www.charlycares.com/', '_blank');
  };

  onCheckCity = () => {};

  onInputChange = e => {
    const input = e.currentTarget.getAttribute('name');
    this.setState({
      [input]: e.target.value,
    });
  };

  onNavBack = () => {
    this.props.replaceStep('thirdStep');
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <InlineText bold primaryFont fontSize="20px" lineHeight="30px">
              <FormattedMessage
                id="errors.outservice.header"
                values={{ city: this.props.city }}
              />
            </InlineText>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="15px">
              <FormattedMessage
                id="errors.outservice.descriptionFirst"
                values={{ city: this.props.city }}
              />
            </Paragraph>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton primary fluid onClick={this.onLookForCities}>
              <FormattedMessage id="errors.outservice.buttonTextFirst" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
        {/* <Divider />
        <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Paragraph light fontSize="15px">
              <FormattedMessage id="errors.outservice.descriptionSecond" />
            </Paragraph>
          </Grid.Column>
        </Grid.Row> */}
        {/* <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <Form>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.family.thirdStep.postalCode" />
                      </Label>
                      <CustomInput
                        hasError
                        value={this.state.postalCode}
                        onChange={this.onInputChange}
                        onBlur={() => {}}
                        name="postalCode"
                        type="text"
                        transparent
                      />
                      <FieldError
                                         errors={errors}
                                         touched={touched}
                                         field="thirdStepFamily.postalCode"
                                         render={() => (
                                           <ErrorMessage>
                                             {errors.thirdStepFamily &&
                                               errors.thirdStepFamily.postalCode}
                                           </ErrorMessage>
                                         )}
                                       />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Label>
                        <FormattedMessage id="signup.family.thirdStep.streetNumber" />
                      </Label>
                      <CustomInput
                        hasError
                        value={this.state.streetNumber}
                        onChange={this.onInputChange}
                        onBlur={() => {}}
                        name="streetNumber"
                        type="text"
                        transparent
                      />
                      <FieldError
                                         errors={errors}
                                         touched={touched}
                                         field="thirdStepFamily.streetNumber"
                                         render={() => (
                                           <ErrorMessage>
                                             {errors.thirdStepFamily &&
                                               errors.thirdStepFamily
                                                 .streetNumber}
                                           </ErrorMessage>
                                         )}
                                       />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid.Row> */}
        {/* <Grid.Row columns={1}>
          <Grid.Column computer={8} mobile={16} tablet={16}>
            <BasicButton
              onClick={this.onCheckCity}
              outline="#51a7bc"
              color="#51a7bc"
              fluid
            >
              <FormattedMessage id="errors.outservice.buttonTextSecond" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row> */}
      </DesktopWelcomeLayout>
    );
  }
}

export default OutsideService;
