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

import { firstStepFamily } from '../../Wizard/Family/formSchema';
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
            <FormattedMessage id="signup.family.firstStep.header" />
          </Header>
          <Form>
            <Form.Field>
              <Label>
                <FormattedMessage id="signup.family.firstStep.firstName" />
              </Label>
              <CustomInput
                hasError={
                  errors.firstStepFamily && touched.firstStepFamily
                    ? touched.firstStepFamily.name &&
                      errors.firstStepFamily.name
                      ? true
                      : false
                    : false
                }
                type="text"
                name="firstStepFamily.name"
                value={values.firstStepFamily.name}
                transparent
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FieldError
                errors={errors}
                touched={touched}
                field="firstStepFamily.name"
                render={() => (
                  <ErrorMessage>{errors.firstStepFamily.name}</ErrorMessage>
                )}
              />
            </Form.Field>
            <Form.Field>
              <Label>
                <FormattedMessage id="signup.family.firstStep.lastName" />
              </Label>
              <CustomInput
                hasError={
                  errors.firstStepFamily && touched.firstStepFamily
                    ? touched.firstStepFamily.lastName &&
                      errors.firstStepFamily.lastName
                      ? true
                      : false
                    : false
                }
                type="text"
                name="firstStepFamily.lastName"
                value={values.firstStepFamily.lastName}
                onChange={handleChange}
                transparent
                onBlur={handleBlur}
              />
              <FieldError
                errors={errors}
                touched={touched}
                field="firstStepFamily.lastName"
                render={() => (
                  <ErrorMessage>{errors.firstStepFamily.lastName}</ErrorMessage>
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
              touched.firstStepFamily &&
              !errors.firstStepFamily &&
              Object.keys(touched.firstStepFamily).length > 0
            }
            onClick={onNextStep('firstStepFamily')({
              schema: firstStepFamily,
              values,
              setErrors,
              setTouched,
              next,
              fields: ['name', 'lastName'],
            })}
            fluid
          >
            <FormattedMessage id="signup.family.firstStep.btn" />
          </BasicButton>
        </CustomColumn>
      </Grid.Row>
    </Layout>
  );
};

export default FirstStep;
