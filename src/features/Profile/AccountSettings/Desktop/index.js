import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment, Divider } from 'semantic-ui-react';
import { parseNumber } from 'libphonenumber-js';
import Error from 'Components/Error';
import CustomDivider from 'Components/Divider';
import Navigation from 'Components/Navigation';
import pick from 'ramda/es/pick';
import React, { Component, Fragment } from 'react';
import yup from 'yup';

import {
  getUser,
  getUserSettings,
  getUserProfile,
  getMembershipData,
} from '../selectors';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onLogout } from '../../../../data/auth/actions';
import { onSettingsUpdate, onFBInfoUpdate } from '../actions';
import Contact from '../components/Contact';
import Credentials from '../components/Credentials';
import LogoutBtn from '../components/LogoutBtn';
import PaymentMethod from '../components/PaymentMethod';
import RdyButton from '../../components/RdyButton';
import SettingsSection from '../components/SettingsSection';

class AccountSettings extends Component {
  static defaultProps = {
    settings: {},
    membershipData: {},
    profile: {},
  };

  initialState = {
    email: {
      edited: false,
      value: this.props.user.email,
      valid: true,
      error: null,
    },
    password: {
      edited: false,
      value: 'aaaaaaaaaaaaa',
    },
    phone: '+' + this.props.profile.phone,
    isPhoneEdited: false,
    isCityEdited: false,
    isStreetAddressEdited: false,
    initialSecondPhone: this.props.profile.second_phone,
    secondPhone: this.props.profile.second_phone
      ? '+' + this.props.profile.second_phone
      : '+',
    isSecondPhoneValid: true,
    addSecondPhone: false,
    emailPromo: this.props.settings.promo_mail === 1 ? true : false,
    pushPromo: this.props.settings.promo_push === 1 ? true : false,
    smsPromo: this.props.settings.sms === 1 ? true : false,
    settingsTouched: false,
    FBError: false,
    city: this.props.profile.city,
    streetAddress: `${this.props.profile.street_name} ${
      this.props.profile.street_number
    }`,
  };
  state = this.initialState;

  emailInput = React.createRef();
  passwordInput = React.createRef();
  phoneInput = React.createRef();
  addressInput = React.createRef();

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onCredentialsChange = type => e => {
    e.persist();
    this.setState(prevState => {
      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          edited: true,
          value: e.target.value,
        },
        settingsTouched: true,
      };
    });
  };

  validateCredentials = (type, yupObj) => {
    yupObj
      .validate(this.state[type].value)
      .then(res => {
        this.setState(prevState => {
          return {
            ...prevState,
            [type]: {
              ...prevState[type],
              edited: false,
              valid: true,
              error: null,
            },
          };
        });
      })
      .catch(err => {
        this.setState(prevState => {
          return {
            ...prevState,
            [type]: {
              ...prevState[type],
              edited: true,
              valid: false,
              error: err.message,
            },
            settingsTouched: false,
          };
        });
      });
  };

  onCredentialsFocusOut = type => () => {
    if (type === 'email') {
      const emailString = yup.string().email();
      this.validateCredentials(type, emailString);
    } else {
      const passwordString = yup.string().min(6);
      this.validateCredentials(type, passwordString);
    }
  };

  onCredentialsEdit = type => () => {
    const input = `${type}Input`;

    if (type === 'password') {
      this.setState(
        prevState => {
          return {
            ...prevState,
            [type]: {
              ...prevState[type],
              value: '',
              edited: true,
            },
          };
        },
        () => {
          this[input].current.focus();
        }
      );
    } else {
      this[input].current.focus();
      this.setState(prevState => {
        return {
          ...prevState,
          [type]: {
            ...prevState[type],
            edited: true,
          },
        };
      });
    }
  };

  onInputsChange = type => e => {
    e.persist();
    this.setState(prevState => {
      return {
        ...prevState,
        [type]: e.target.value,
        settingsTouched: true,
      };
    });
  };

  onAddSecondPhone = () => {
    if (!this.state.initialSecondPhone) {
      this.setState(prevState => ({
        ...prevState,
        addSecondPhone: true,
      }));
    }
  };

  onRemoveSecondPhone = () => {
    this.setState(prevState => ({
      ...prevState,
      secondPhone: '+',
      addSecondPhone: false,
      settingsTouched: true,
      initialSecondPhone: '',
    }));
  };

  onSecondPhoneFocusOut = () => {
    const parsedNum = parseNumber(this.state.secondPhone);
    if (!Object.keys(parsedNum).length) {
      this.setState({
        isSecondPhoneValid: false,
        settingsTouched: false,
      });
    } else {
      this.setState({
        isSecondPhoneValid: true,
        settingsTouched: true,
      });
    }
  };

  onSettingsChange = type => e => {
    e.persist();
    this.setState(prevState => {
      return {
        ...prevState,
        [type]: Boolean(e.target.checked),
        settingsTouched: true,
      };
    });
  };

  onProfileUpdate = () => {
    let payload = {};

    const filteredState = pick(
      [
        'phone',
        'city',
        'emailPromo',
        'pushPromo',
        'smsPromo',
        'email',
        'password',
      ],
      this.state
    );

    for (let prop in filteredState) {
      if (prop === 'email' || prop === 'password') {
        if (this.initialState[prop].value !== filteredState[prop].value) {
          payload[prop] = filteredState[prop].value;
        }
      } else {
        if (this.initialState[prop] !== filteredState[prop]) {
          if (prop === 'phone') {
            payload[prop] = filteredState[prop].replace(/\+/g, '');
          } else {
            payload[prop] = filteredState[prop];
          }
        }
      }
    }
    this.props.onSettingsUpdate(payload);
  };

  handleFacebookData = data => {
    console.log(data);
    if (data.accessToken && data.id) {
      return this.props.onFBInfoUpdate({
        fb_id: data.id,
        fb_token: data.accessToken,
      });
    }
    return this.setState({
      FBError: true,
    });
  };

  onFBConnectFailure = e => {
    this.setState({
      FBError: true,
    });
  };

  onPhoneEdit = () => {
    this.setState(
      {
        isPhoneEdited: true,
      },
      () => {
        this.phoneInput.current.focus();
      }
    );
  };

  onInputsBlur = inputEditState => () => {
    this.setState({
      [inputEditState]: false,
    });
  };

  onAddressEdit = () => {
    this.setState(
      {
        isCityEdited: true,
        isStreetAddressEdited: true,
      },
      () => {
        this.addressInput.current.focus();
      }
    );
  };

  render() {
    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="profile.family.Acc&SettingsNavTitle" />}
          rightComp={() => (
            <RdyButton
              onClick={this.onProfileUpdate}
              disabled={!this.state.settingsTouched}
            >
              <FormattedMessage id="profile.family.rdy" />
            </RdyButton>
          )}
          onBack={this.props.history.goBack}
        />
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <Segment basic vertical>
          <Contact
            onInputsBlur={this.onInputsBlur}
            onPhoneEdit={this.onPhoneEdit}
            onAddressEdit={this.onAddressEdit}
            phoneInput={this.phoneInput}
            addressInput={this.addressInput}
            isCityEdited={this.state.isCityEdited}
            isPhoneEdited={this.state.isPhoneEdited}
            isStreetAddressEdited={this.state.isStreetAddressEdited}
            city={this.state.city}
            streetAddress={this.state.streetAddress}
            phone={this.state.phone}
            initialSecondPhone={this.state.initialSecondPhone}
            secondPhone={this.state.secondPhone}
            onChange={this.onInputsChange}
            addSecondPhone={this.state.addSecondPhone}
            onAddSecondPhone={this.onAddSecondPhone}
            onRemoveSecondPhone={this.onRemoveSecondPhone}
            onSecondPhoneFocusOut={this.onSecondPhoneFocusOut}
            isSecondPhoneValid={this.state.isSecondPhoneValid}
          />
          <Divider />
          <PaymentMethod
            link={this.props.membershipData.payment_link}
            accountNumber={this.props.profile.account_number}
          />
          <CustomDivider>
            <FormattedMessage id="profile.family.settings" />
          </CustomDivider>
          <SettingsSection
            border
            onSettingsChange={this.onSettingsChange('emailPromo')}
            title={<FormattedMessage id="profile.family.email" />}
            value={this.props.user.email}
            toggleName1={<FormattedMessage id="profile.family.promotions" />}
            toggleName2={
              <FormattedMessage id="profile.family.reservationsAndReviews" />
            }
            toggleVal1={this.state.emailPromo}
          />
          <SettingsSection
            border
            onSettingsChange={this.onSettingsChange('pushPromo')}
            title={<FormattedMessage id="profile.family.pushNotifications" />}
            toggleName1={<FormattedMessage id="profile.family.promotions" />}
            toggleName2={
              <FormattedMessage id="profile.family.reservationsAndReviews" />
            }
            toggleVal1={this.state.pushPromo}
          />
          <SettingsSection
            onSettingsChange={this.onSettingsChange('smsPromo')}
            title={<FormattedMessage id="profile.family.sms" />}
            value={`+${this.props.profile.phone}`}
            toggleName1={<FormattedMessage id="profile.family.promotions" />}
            toggleName2={
              <FormattedMessage id="profile.family.reservationsAndReviews" />
            }
            toggleVal1={this.state.sms}
          />
          <Divider />
          <Credentials
            emailRef={this.emailInput}
            passwordRef={this.passwordInput}
            email={this.state.email}
            password={this.state.password}
            onEdit={this.onCredentialsEdit}
            onChange={this.onCredentialsChange}
            onCredentialsFocusOut={this.onCredentialsFocusOut}
            handleFacebookData={this.handleFacebookData}
          />
          <LogoutBtn onClick={this.props.onLogout} />
        </Segment>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: getUser(state),
  settings: getUserSettings(state),
  membershipData: getMembershipData(state),
  profile: getUserProfile(state),
  errors: getErrors(state),
  isLoading: getLoadingStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    window.analytics.reset();
    dispatch(onLogout());
  },
  onSettingsUpdate: data => dispatch(onSettingsUpdate(data)),
  onFBInfoUpdate: data => dispatch(onFBInfoUpdate(data)),
  onErrorConfirm: () => dispatch(onErrorConfirm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettings);
