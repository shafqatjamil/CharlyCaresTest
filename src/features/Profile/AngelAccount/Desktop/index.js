import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment, Divider } from 'semantic-ui-react';
import curry from 'ramda/es/curry';
import Error from 'Components/Error';
import InfoOverlay from 'Components/InfoOverlay';
import Loader from 'Components/Loader';
import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import pick from 'ramda/es/pick';
import React, { PureComponent, Fragment } from 'react';

import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { getUserLanguages } from '../../AngelProfile/selectors';

import {
  getUserProfile,
  getInitialNormalRate,
  getInitialExtraRate,
  getVideoUploadUrl,
} from '../selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onUpdateProfile } from '../actions';
import DataSection from './components/DataSection';
import Languages from '../components/Languages';
import Rate from '../components/Rate';
import RdyButton from '../../components/RdyButton';
import Skills from '../components/Skills';

class AngelAccount extends PureComponent {
  supportedLanguages = [
    'english',
    'german',
    'french',
    'spanish',
    'italian',
    'dutch',
  ];
  initialState = {
    step: 0.25,
    minRate: 2,
    firstName: this.props.profile.first_name,
    lastName: this.props.profile.last_name,
    birthdate: moment(
      this.props.profile.birthdate,
      'YYYY-MM-DD HH:mm:ss'
    ).format('MMMM DD, YYYY'),
    isBirthdateValid: true,
    driverLicense: this.props.profile.angel.driving_license,
    currentNormalRate: this.props.profile.angel.normal_rate,
    currentExtraRate: this.props.profile.angel.extra_rate,
    maxNormalRate: Number(this.props.profile.angel.max_normal_rate),
    maxExtraRate: Number(this.props.profile.angel.max_extra_rate),
    bio: this.props.profile.personal,
    fieldOfStudy: this.props.profile.angel.field_of_study,
    education: this.props.profile.angel.education,
    languages: pick(this.supportedLanguages, this.props.profile.language),
    isOverlayActive: false,
    video: null,
  };

  state = this.initialState;

  onDriverLicenseStatusChange = () => {
    this.setState(prevState => ({
      driverLicense: !prevState.driverLicense,
    }));
  };

  getSkills = () => {
    if (this.props.profile) {
      return pick(
        [
          'first_aid',
          'babysit_expertise',
          'driving_license',
          'liability_insurance',
          'works_with_kids',
        ],
        this.props.profile
      );
    }
  };

  onRateIncrease = memoizeWith(
    type => type,
    curry((type, _ev) => {
      this.setState(prevState => {
        if (prevState[`current${type}Rate`] < prevState[`max${type}Rate`]) {
          return {
            [`current${type}Rate`]:
              prevState[`current${type}Rate`] + this.state.step,
          };
        }
        if (prevState[`current${type}Rate`] === prevState[`max${type}Rate`]) {
          return null;
        }
      });
    })
  );

  onRateDecrease = memoizeWith(
    type => type,
    curry((type, _ev) => {
      this.setState(prevState => {
        if (
          prevState[`current${type}Rate`] <= prevState[`max${type}Rate`] &&
          prevState[`current${type}Rate`] > this.state.minRate
        ) {
          return {
            [`current${type}Rate`]:
              prevState[`current${type}Rate`] - this.state.step,
          };
        }
        return null;
      });
    })
  );

  isProfileNotChanged = () => {
    let isChanged = true;
    for (let prop in this.initialState) {
      if (this.initialState[prop] !== this.state[prop]) {
        isChanged = isChanged && false;
      }
    }
    return isChanged;
  };

  onBioChange = e => {
    this.setState({
      bio: e.target.value,
    });
  };

  onLanguageSelect = memoizeWith(
    lang => lang,
    curry((lang, _ev) => {
      this.setState(prevState => {
        return {
          ...prevState,
          languages: {
            ...prevState.languages,
            [lang]: !prevState.languages[lang],
          },
        };
      });
    })
  );

  onProfileUpdate = () => {
    let payload = {
      languages: {},
      profile: {},
      angelData: {
        id: this.props.profile.angel.id,
      },
      video: null,
      url: this.props.videoUploadUrl,
    };

    for (let prop in this.initialState) {
      if (prop === 'languages') {
        for (let lang in this.state.languages) {
          if (
            this.state.languages[lang] !== this.initialState.languages[lang]
          ) {
            payload.languages[lang] = this.state.languages[lang];
          }
        }
      } else {
        if (this.initialState[prop] !== this.state[prop]) {
          switch (prop) {
            case 'currentNormalRate':
              payload.profile.rates.normal_rate = this.state[prop];
              break;
            case 'currentExtraRate':
              payload.profile.rates.extra_rate = this.state[prop];
              break;
            case 'driverLicense':
              payload.profile.driving_license = this.state[prop];
              break;
            case 'bio':
              payload.profile.personal = this.state[prop];
              break;
            case 'firstName':
              payload.profile.first_name = this.state[prop];
              break;
            case 'lastName':
              payload.profile.last_name = this.state[prop];
              break;
            case 'birthdate':
              payload.profile.birthdate = moment(
                this.state[prop],
                'MMMM DD, YYYY'
              ).format('YYYY-MM-DD');
              break;
            case 'fieldOfStudy':
              payload.angelData.field_of_study = this.state[prop];
              break;
            case 'education':
              payload.angelData.education = this.state[prop];
              break;
            case 'video':
              payload.video = this.state[prop];
              break;
            default:
              break;
          }
        }
      }
    }

    this.props.onUpdateProfile(payload);
  };

  onBirthDateChange = momentDate => {
    this.setState(prevState => {
      if (moment().diff(momentDate, 'years') < 16) {
        return {
          isBirthdateValid: false,
        };
      }
      return {
        birthdate: momentDate.format('MMMM DD, YYYY'),
        isBirthdateValid: true,
      };
    });
  };

  handleOverlay = state => () => {
    this.setState(prevState => {
      if (state === 'open') {
        return {
          isOverlayActive: true,
        };
      }
      return {
        isOverlayActive: false,
      };
    });
  };

  onInputChange = e => {
    const input = e.target.getAttribute('name');
    this.setState({
      [input]: e.target.value,
    });
  };

  onVideoUpload = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        video: e.target.files[0],
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="profile.angel.edit.navTitle" />}
          onBack={this.props.history.goBack}
          rightComp={() => (
            <RdyButton
              onClick={this.onProfileUpdate}
              disabled={this.isProfileNotChanged()}
            >
              <FormattedMessage id="navigation.rdy" />
            </RdyButton>
          )}
        />
        <InfoOverlay
          active={this.state.isOverlayActive}
          onClose={this.handleOverlay('close')}
        >
          TEST
        </InfoOverlay>
        {this.props.isLoading && <Loader />}
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <Segment basic vertical>
          {this.props.profile && (
            <DataSection
              profile={this.props.profile}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              birthdate={this.state.birthdate}
              bio={this.state.bio}
              isBirthdateValid={this.state.isBirthdateValid}
              onOverlayOpen={this.handleOverlay('open')}
              fieldOfStudy={this.state.fieldOfStudy}
              education={this.state.education}
              onBioChange={this.onBioChange}
              onBirthDateChange={this.onBirthDateChange}
              onInputChange={this.onInputChange}
              onVideoUpload={this.onVideoUpload}
              video={this.props.profile.angel.video}
            />
          )}
          <Divider />
          <Rate
            minRate={this.state.minRate}
            currentNormal={this.state.currentNormalRate}
            currentExtra={this.state.currentExtraRate}
            initialNormal={this.props.initialNormalRate}
            initialExtra={this.props.initialExtraRate}
            maxNormal={this.state.maxNormalRate}
            maxExtra={this.state.maxExtraRate}
            onRateIncrease={this.onRateIncrease}
            onRateDecrease={this.onRateDecrease}
          />
          <Divider />
          <Skills
            onDriverLicenseStatusChange={this.onDriverLicenseStatusChange}
            driverLicense={this.state.driverLicense}
            skills={this.getSkills()}
          />
          <Divider />
          <Languages
            onLanguageSelect={this.onLanguageSelect}
            languages={this.state.languages}
          />
        </Segment>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    profile: getUserProfile(state),
    languages: getUserLanguages(state),
    errors: getErrors(state),
    isLoading: getLoadingStatus(state),
    initialNormalRate: getInitialNormalRate(state),
    initialExtraRate: getInitialExtraRate(state),
    videoUploadUrl: getVideoUploadUrl(state),
  }),
  {
    onUpdateProfile,
    onErrorConfirm,
  }
)(AngelAccount);
