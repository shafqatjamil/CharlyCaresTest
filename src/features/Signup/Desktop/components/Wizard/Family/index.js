//@flow

import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Wizard, Steps, Step } from 'react-albus';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
import API from '../api';
import React, { Component } from 'react';
import type { Dispatch } from 'redux';

import { FirstStepFamily } from '../../FirstStep';
import { FourthStepFamily } from '../../FourthStep';
import { getAuthStatus } from '../../../../../../data/auth/selectors';
import { getErrors, getLoadingStatus } from '../../../../../../ui/selectors';
import { onErrorConfirm } from '../../../../../../ui/actions';
import { onFamilySignupReq } from '../../../../../../data/user/actions';
import { SecondStepFamily } from '../../SecondStep';
import { ThirdStepFamily } from '../../ThirdStep';
import formSchema from './formSchema';
import LanguageSelectionStep from '../../LanguageSelectionStep';
import type { PayloadFamily } from '../../../../../data/user/actions';
import OutsideService from '../../OutsideService';

type Props = {
  onBack: Function,
  onSignup: Function,
  errorReset: Function,
  isLoading: boolean,
  apiErrors: Object,
  authenticated: boolean,
  history: Object,
  user: string,
  facebookData: {
    first_name: string,
    last_name: string,
    email: string,
    locale: string,
    gender: string,
  },
};

let initialValues = {
  firstStepFamily: {
    name: '',
    lastName: '',
  },
  secondStepFamily: {
    email: '',
    password: '',
    terms: false,
    privacy : false,
  },
  thirdStepFamily: {
    postalCode: '',
    streetNumber: '',
    landCode: '+31',
    phone: '',
  },
  fourthStepFamily: {
    children: [],
  },
  fourthBStepFamily: {
    languages: {
      dutch: false,
      english: false,
      french: false,
      german: false,
      spanish: false,
      italian: false,
    },
  },
};

class FamilyEmailSignupWizard extends Component<Props> {
  static defaultProps = {
    onBack: () => {},
  };

  state = {
    isLoading: false,
    city: null,
  };

  onFormSubmit = ({
    firstStepFamily,
    secondStepFamily,
    thirdStepFamily,
    fourthStepFamily,
    fourthBStepFamily,
  }): void => {
    const data: PayloadFamily = {
      locale: this.props.facebookData
        ? this.props.facebookData.locale
        : 'en_GB',
      email: secondStepFamily.email,
      password: secondStepFamily.password,
      password_confirmation: secondStepFamily.password,
      postalcode: thirdStepFamily.postalCode,
      phone: thirdStepFamily.phone,
      first_name: firstStepFamily.name,
      last_name: firstStepFamily.lastName,
      street_number: thirdStepFamily.streetNumber,
      city: 'Amsterdam',
      street_name: 'Wijde Kapelsteeg',
      gender: this.props.facebookData
        ? this.props.facebookData.gender
        : 'female',
      confirmation_link:
        'https://app.charlycares.com/#/angels-signup/step4/{confirmation_link}',
      kids: fourthStepFamily.children.map(child => {
        return child.birthDate;
      }),
      languages: fourthBStepFamily.languages,
    };

    this.props.onSignup(data);
  };

  checkIsCityInServiceRange = (values, push, next) => {
    // if city not in range push to out of service screen
    API.checkPostalCode({
      postalcode: values.thirdStepFamily.postalCode,
    }).then(res => {
      this.setState({
        isLoading: false,
      });
      if (res.data && res.data.active === false) {
        return push('outsideService');
      } else {
        next();
      }
    });
  };

  initPostalCodeCheck = (values, push, next) => () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.checkIsCityInServiceRange(values, push, next);
      }
    );
  };

  render() {
    if (this.props.authenticated === true) {
      return <Redirect to="/no-membership" />;
    }
    if (this.props.facebookData) {
      initialValues = mergeDeepRight(initialValues, {
        firstStepFamily: {
          name: this.props.facebookData.first_name,
          lastName: this.props.facebookData.last_name,
        },
        secondStepFamily: {
          email: this.props.facebookData.email,
          password: '',
          terms: false,
        },
      });
    }
    return (
      <Formik
        validationSchema={formSchema}
        initialValues={initialValues}
        onSubmit={this.onFormSubmit}
        render={({
          values,
          handleChange,
          errors,
          touched,
          setErrors,
          handleBlur,
          setTouched,
          setFieldValue,
          submitForm,
          setFieldError,
          setFieldTouched,
        }) => {
          return (
            <Wizard
              render={({ step, replace, push }) => (
                <TransitionGroup component={null}>
                  <CSSTransition
                    mountOnEnter={true}
                    unmountOnExit={true}
                    classNames="fade"
                    key={step.id}
                    timeout={{
                      enter: 200,
                      exit: 0,
                    }}
                  >
                    <Steps>
                      <Step
                        id="firstStep"
                        render={({ next }) => (
                          <FirstStepFamily
                            handleChange={handleChange}
                            values={values}
                            next={next}
                            previous={this.props.onBack}
                            setErrors={setErrors}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            setTouched={setTouched}
                          />
                        )}
                      />
                      <Step
                        id="secondStep"
                        render={({ next, previous }) => (
                          <SecondStepFamily
                            handleChange={handleChange}
                            values={values}
                            next={next}
                            previous={previous}
                            setErrors={setErrors}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            setTouched={setTouched}
                          />
                        )}
                      />
                      <Step
                        id="thirdStep"
                        render={({ next, previous }) => (
                          <ThirdStepFamily
                            handleChange={handleChange}
                            values={values}
                            next={next}
                            previous={previous}
                            setErrors={setErrors}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            setTouched={setTouched}
                            setFieldError={setFieldError}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            initPostalCodeCheck={this.initPostalCodeCheck(
                              values,
                              push,
                              next
                            )}
                            isCheckingCode={this.state.isLoading}
                          />
                        )}
                      />
                      <Step
                        id="fourthStep"
                        render={({ next, previous }) => (
                          <FourthStepFamily
                            handleChange={handleChange}
                            values={values}
                            next={next}
                            previous={previous}
                            setErrors={setErrors}
                            errors={errors}
                            setFieldValue={setFieldValue}
                          />
                        )}
                      />
                      <Step
                        id="fourthBStep"
                        render={({ next, previous }) => (
                          <LanguageSelectionStep
                            userRole="family"
                            handleChange={handleChange}
                            values={values}
                            touched={touched}
                            previous={previous}
                            errors={errors}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            submitForm={submitForm}
                          />
                        )}
                      />
                      <Step
                        id="outsideService"
                        render={() => (
                          <OutsideService
                            city={this.state.city}
                            replaceStep={replace}
                          />
                        )}
                      />
                    </Steps>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
          );
        }}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  errorReset: () => dispatch(onErrorConfirm()),
  onSignup: data => dispatch(onFamilySignupReq(data)),
});

const mapStateToProps = state => ({
  authenticated: getAuthStatus(state),
  apiErrors: getErrors(state),
  isLoading: getLoadingStatus(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyEmailSignupWizard);
