import { FormattedMessage } from 'react-intl';
import { Grid, Form } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';

import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';

import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';

import Label from 'Components/Label';
import Layout from 'Components/Layout';
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
      <Layout navBorder onNavBack={this.onNavBack}>
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              <Grid container>
                <CustomRow padding="2rem 0 1rem 0">
                  <CustomColumn noPadding width={16}>
                    <InlineText
                      bold
                      primaryFont
                      fontSize="20px"
                      lineHeight="30px"
                    >
                      <FormattedMessage
                        id="errors.outservice.header"
                        values={{ city: this.props.city }}
                      />
                    </InlineText>
                  </CustomColumn>

                  <CustomColumn padding="1rem 0 1rem 0" width={16}>
                    <Paragraph light fontSize="15px">
                      <FormattedMessage
                        id="errors.outservice.descriptionFirst"
                        values={{ city: this.props.city }}
                      />
                    </Paragraph>
                  </CustomColumn>

                  <CustomColumn padding="1rem 0 0 0" width={16}>
                    <BasicButton primary fluid onClick={this.onLookForCities}>
                      <FormattedMessage id="errors.outservice.buttonTextFirst" />
                    </BasicButton>
                  </CustomColumn>

                  <CustomColumn
                    padding="0 0 1.25rem 0"
                    textAlign="center"
                    width={16}
                  >
                    <InlineText light fontSize="12px" lineHeight="17px">
                      <FormattedMessage id="errors.outservice.descriptionUnderButton" />
                    </InlineText>
                  </CustomColumn>
                </CustomRow>
              </Grid>

              {/* <Divider />
              <Grid container>
                <CustomRow padding="2rem 0 1rem 0">
                  <CustomColumn noPadding width={16}>
                    <Paragraph light fontSize="15px">
                      <FormattedMessage id="errors.outservice.descriptionSecond" />
                    </Paragraph>
                  </CustomColumn>

                  <CustomColumn padding="2rem 0 1rem 0" width={16}>
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
                  </CustomColumn>
                  <CustomColumn padding="1rem 0 1rem 0" width={16}>
                    <BasicButton
                      onClick={this.onCheckCity}
                      outline="#51a7bc"
                      color="#51a7bc"
                      fluid
                    >
                      <FormattedMessage id="errors.outservice.buttonTextSecond" />
                    </BasicButton>
                  </CustomColumn>
                </CustomRow>
              </Grid> */}
            </CustomColumn>
          </CustomRow>
        </ContentWrapper>
      </Layout>
    );
  }
}

export default OutsideService;
