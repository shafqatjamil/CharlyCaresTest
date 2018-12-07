//@flow
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Wizard, Steps, Step } from 'react-albus';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
import moment from 'moment';
import React, { Component } from 'react';

import { FifthStepAngel } from '../../FifthStep';
import { FirstStepAngel } from '../../FirstStep';
import { FourthStepAngel } from '../../FourthStep';
import { onAngelSignupReq } from '../../../../../data/user/actions';
import { SecondStepAngel } from '../../SecondStep';
import { SixthStepAngel } from '../../SixthStep';
import { ThirdStepAngel } from '../../ThirdStep';
import API from '../api';
import EighthStepAngel from '../../EighthStep';
import formSchema from './formSchema';
import LanguageSelectionStep from '../../LanguageSelectionStep';
import OutsideService from '../../OutsideService';
import SeventhStepAngel from '../../SeventhStep';

import type {
  PayloadAngel,
  SignUpReqAngelAction,
} from '../../../../../data/user/actions';

type Props = {
  onBack: Function,
  onSignup: Function,
  isLoading: boolean,
  apiErrors: Object,
  authenticated: boolean,
  history: Object,
  user: string,
  facebookData: {
    first_name: string,
    last_name: string,
    birthday: string,
    email: string,
    locale: string,
    gender: string,
  },
};

var initialValues = {
  firstStepAngel: {
    name: '',
    lastName: '',
    birthdate: '',
  },
  secondStepAngel: {
    email: '',
    password: '',
    terms: false,
    privacy: false,
  },
  thirdStepAngel: {
    postalCode: '',
    streetNumber: '',
    landCode: '+31',
    phone: '',
  },
  fourthStepAngel: {
    education: '',
    fieldOfStudy: '',
  },
  fourthBStepAngel: {
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

class AngelEmailSignupWizard extends Component<Props> {
  static defaultProps = {
    onBack: () => {},
  };

  state = {
    isLoading: false,
    city: null,
  };

  onFormSubmit = ({
    firstStepAngel,
    secondStepAngel,
    thirdStepAngel,
    fourthStepAngel,
    fourthBStepAngel,
  }): void => {
    const data: PayloadAngel = {
      locale: this.props.facebookData
        ? this.props.facebookData.locale
        : 'en_GB',
      email: secondStepAngel.email,
      password: secondStepAngel.password,
      password_confirmation: secondStepAngel.password,
      postalcode: thirdStepAngel.postalCode,
      phone: thirdStepAngel.phone,
      first_name: firstStepAngel.name,
      last_name: firstStepAngel.lastName,
      street_number: thirdStepAngel.streetNumber,
      city: 'Amsterdam',
      street_name: 'Wijde Kapelsteeg',
      gender: this.props.facebookData
        ? this.props.facebookData.gender
        : 'female',
      confirmation_link:
        'https://app.charlycares.com/#/angels-signup/step4/{confirmation_link}',
      nationality: 'Dutch',
      education: fourthStepAngel.education,
      field_of_study: fourthStepAngel.fieldOfStudy,
      liability_insurance: true,
      driving_licence: true,
      birthdate: firstStepAngel.birthdate,
      languages: fourthBStepAngel.languages,
    };

    this.props.onSignup(data);
  };

  checkIsCityInServiceRange = (values, push, next) => {
    // if city not in range push to out of service screen
    API.checkPostalCode({
      postalcode: values.thirdStepAngel.postalCode,
    }).then(res => {
      this.setState({
        isLoading: false,
        city: res.data.city,
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
    if (this.props.facebookData) {
      initialValues = mergeDeepRight(initialValues, {
        firstStepAngel: {
          name: this.props.facebookData.first_name,
          lastName: this.props.facebookData.last_name,
          birthdate: moment(
            this.props.facebookData.birthday,
            'MM/DD/YYYY'
          ).format('YYYY-MM-DD'),
        },
        secondStepAngel: {
          email: this.props.facebookData.email,
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
                          <FirstStepAngel
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
                          <SecondStepAngel
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
                          <ThirdStepAngel
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
                          <FourthStepAngel
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            values={values}
                            next={next}
                            previous={previous}
                          />
                        )}
                      />
                      <Step
                        id="fourthBStep"
                        render={({ next, previous }) => (
                          <LanguageSelectionStep
                            userRole="angel"
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            values={values}
                            errors={errors}
                            touched={touched}
                            next={next}
                            previous={previous}
                            submitForm={submitForm}
                          />
                        )}
                      />
                      <Step
                        id="fifthStep"
                        render={({ next, previous }) => (
                          <FifthStepAngel next={next} previous={previous} />
                        )}
                      />
                      <Step
                        id="sixthStep"
                        render={({ next, previous }) => (
                          <SixthStepAngel
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            values={values}
                            next={next}
                            previous={previous}
                          />
                        )}
                      />
                      <Step
                        id="seventhStep"
                        render={({ next, previous }) => (
                          <SeventhStepAngel
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            values={values}
                            next={next}
                            previous={previous}
                          />
                        )}
                      />
                      <Step
                        id="eightStep"
                        render={({ next, previous }) => (
                          <EighthStepAngel
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            values={values}
                            next={next}
                            previous={previous}
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

const mapDispatchToProps = (dispatch: *) => {
  return {
    onSignup: (data: PayloadAngel): SignUpReqAngelAction => {
      return dispatch(onAngelSignupReq(data));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AngelEmailSignupWizard);
