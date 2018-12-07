import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomInput from 'Components/CustomInput';
import CustomRow from 'Components/CustomRow';
import ErrorMessage from 'Components/ErrorMessage';
import FieldError from 'Components/FieldError';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import React from 'react';

import { firstStepAngel } from '../../Wizard/Angel/formSchema';
import { onNextStep } from '../../../utils';

const FirstStep = ({
  values,
  next,
  previous,
  handleChange,
  errors,
  setErrors,
  touched,
  handleBlur,
  setTouched,
  user,
}) => {
  return (
    <Layout onNavBack={previous}>
      <CustomRow>
        <CustomColumn width={16}>
          <Header as="h3">
            {/* <FormattedMessage id="signup.angel.firstStep.header" /> */}
          </Header>
          <Form>
            <Form.Field>
              <Label>
                <FormattedMessage id="signup.angel.firstStep.firstName" />
              </Label>
              <CustomInput
                hasError={
                  errors.firstStepAngel && touched.firstStepAngel
                    ? touched.firstStepAngel.name && errors.firstStepAngel.name
                      ? true
                      : false
                    : false
                }
                type="text"
                name="firstStepAngel.name"
                value={values.firstStepAngel.name}
                transparent
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FieldError
                errors={errors}
                touched={touched}
                field="firstStepAngel.name"
                render={() => (
                  <ErrorMessage>{errors.firstStepAngel.name}</ErrorMessage>
                )}
              />
            </Form.Field>
            <Form.Field>
              <Label>
                <FormattedMessage id="signup.angel.firstStep.lastName" />
              </Label>
              <CustomInput
                hasError={
                  errors.firstStepAngel && touched.firstStepAngel
                    ? touched.firstStepAngel.lastName &&
                      errors.firstStepAngel.lastName
                      ? true
                      : false
                    : false
                }
                type="text"
                name="firstStepAngel.lastName"
                value={values.firstStepAngel.lastName}
                onChange={handleChange}
                transparent
                onBlur={handleBlur}
              />
              <FieldError
                errors={errors}
                touched={touched}
                field="firstStepAngel.lastName"
                render={() => (
                  <ErrorMessage>{errors.firstStepAngel.lastName}</ErrorMessage>
                )}
              />
            </Form.Field>
            <Form.Field>
              <Label>
                <FormattedMessage id="signup.angel.firstStep.birthdate" />
              </Label>
              <CustomInput
                hasError={
                  errors.firstStepAngel && touched.firstStepAngel
                    ? touched.firstStepAngel.birthdate &&
                      errors.firstStepAngel.birthdate
                      ? true
                      : false
                    : false
                }
                type="date"
                name="firstStepAngel.birthdate"
                value={values.firstStepAngel.birthdate}
                onChange={handleChange}
                transparent
                onBlur={handleBlur}
              />
              <FieldError
                errors={errors}
                touched={touched}
                field="firstStepAngel.birthdate"
                render={() => (
                  <ErrorMessage>{errors.firstStepAngel.birthdate}</ErrorMessage>
                )}
              />
            </Form.Field>
          </Form>
        </CustomColumn>
      </CustomRow>
      <Grid.Row verticalAlign="middle">
        <CustomColumn width={16}>
          <BasicButton
            primary={
              touched.firstStepAngel &&
              !errors.firstStepAngel &&
              Object.keys(touched.firstStepAngel).length > 0
            }
            onClick={onNextStep('firstStepAngel')({
              schema: firstStepAngel,
              values,
              setErrors,
              setTouched,
              next,
              fields: ['name', 'lastName', 'birthdate'],
            })}
            fluid
          >
            <FormattedMessage id="signup.angel.firstStep.btn" />
          </BasicButton>
        </CustomColumn>
      </Grid.Row>
    </Layout>
  );
};

export default FirstStep;
