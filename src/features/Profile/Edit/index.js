import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { onUpdateProfile } from './actions';
import { getUserProfile, getUpdateStatus, getUserRole } from './selectors';
import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { onGetProfile } from '../../../data/user/actions';
import { onErrorConfirm } from '../../../ui/actions';
import omit from 'ramda/es/omit';
import CustomColumn from 'Components/CustomColumn';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';
import CustomRow from 'Components/CustomRow';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import DataSection from './components/DataSection';
import Address from './components/Address';
import Languages from './components/Languages';
import RdyButton from '../components/RdyButton';

class ProfileEdit extends Component {
  propsToOmitInLanguages = [
    'created_at',
    'deleted_at',
    'user_id',
    'updated_at',
    'id',
  ];
  initialState = {
    short_bio: this.props.profile.family.short_bio,
    city: this.props.profile.city,
    address: `${this.props.profile.street_name} ${
      this.props.profile.street_number
    }`,
    imageSrc: this.props.profile.image,
    imageData: null,
    touched: false,
    languages: omit(this.propsToOmitInLanguages, this.props.profile.languages),
  };

  state = this.initialState;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.onGetProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profile !== this.props.profile) {
      this.setState({
        short_bio: this.props.profile.family.short_bio,
        city: this.props.profile.city,
        address: `${this.props.profile.street_name} ${
          this.props.profile.street_number
        }`,
        imageSrc: this.props.profile.image,
        imageData: null,
        touched: false,
        languages: omit(
          this.propsToOmitInLanguages,
          this.props.profile.languages
        ),
      });
    }
  }

  onLanguageSelect = lang => () => {
    this.setState(prevState => ({
      ...prevState,
      languages: {
        ...prevState.languages,
        [lang]: !prevState.languages[lang],
      },
      touched: true,
    }));
  };

  onImageChange = (imageSrc, imageData) => {
    this.setState({
      imageSrc,
      imageData,
      touched: true,
    });
  };

  onDescChange = e => {
    this.setState({
      short_bio: e.target.value,
      touched: true,
    });
  };

  onAddressChange = memoizeWith(
    type => type,
    curry(type => e => {
      this.setState({
        [type]: e.target.value,
        touched: true,
      });
    })
  );

  onUpdateProfile = () => {
    let data = {
      profile: {},
      languages: {},
    };

    for (let value in this.state) {
      if (value === 'touched' || value === 'imageSrc') continue;
      if (this.state[value] !== this.initialState[value]) {
        if (value === 'imageData') {
          data.image = this.state[value];
        } else if (value === 'languages') {
          for (let lang in this.state.languages) {
            if (
              this.state.languages[lang] !== this.initialState.languages[lang]
            ) {
              data.languages[lang] = this.state.languages[lang];
            }
          }
        } else {
          data.profile[value] = this.state[value];
        }
      }
    }
    const isProfileEmpty = Object.keys(data.profile).length === 0;
    const isLanguagesEmpty = Object.keys(data.languages).length === 0;
    const isImageEmpty = data.image === undefined;
    this.setState(
      {
        touched: false,
      },
      () => {
        this.props.onUpdateProfile(
          this.props.role,
          isProfileEmpty ? null : data.profile,
          isImageEmpty ? null : data.image,
          isLanguagesEmpty ? null : data.languages
        );
      }
    );
  };

  render() {
    const { first_name, last_name } = this.props.profile;
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <Layout
        onNavBack={this.props.history.goBack}
        navBorder
        navTitle={<FormattedMessage id="profile.family.edit.navTitle" />}
        navRightComponent={() => (
          <RdyButton
            onClick={this.onUpdateProfile}
            disabled={!this.state.touched}
          >
            <FormattedMessage id="navigation.rdy" />
          </RdyButton>
        )}
      >
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <DataSection
              firstName={first_name}
              surname={last_name}
              desc={this.state.short_bio}
              image={this.state.imageSrc}
              onImageChange={this.onImageChange}
              onDescChange={this.onDescChange}
            />

            <Divider />
            <Address
              onAddressChange={this.onAddressChange}
              city={this.state.city}
              address={this.state.address}
            />
            <Divider />
            <Languages
              onLanguageSelect={this.onLanguageSelect}
              languages={this.state.languages}
            />
          </CustomColumn>
        </CustomRow>
        <FamilyTabBar />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  profile: getUserProfile(state),
  isProfileUpdated: getUpdateStatus(state),
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  role: getUserRole(state),
});

export default connect(
  mapStateToProps,
  {
    onErrorConfirm,
    onUpdateProfile,
    onGetProfile,
  }
)(ProfileEdit);
