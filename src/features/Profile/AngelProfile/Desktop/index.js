import { connect } from 'react-redux';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Segment, Divider } from 'semantic-ui-react';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import React, { PureComponent, Fragment } from 'react';

import { getCredit } from '../selectors';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import { getUserProfile } from '../../Edit/selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onGetUserProfileData } from '../../../../data/user/actions';
import ConfigItem from '../components/ConfigItem';
import ConfigList from '../components/ConfigList';
import ProfileSection from '../components/ProfileSection';

class AngelProfile extends PureComponent {
  componentDidMount() {
    this.props.onGetUserProfileData();
  }

  onEditProfile = () => {
    this.props.history.push('/profile/edit');
  };

  render() {
    return (
      <Fragment>
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <Segment basic vertical>
          <ProfileSection
            onEdit={this.onEditProfile}
            bio={this.props.profile.short_bio}
            fullName={`${this.props.profile.first_name} ${
              this.props.profile.last_name
            }`}
            image={this.props.profile.image}
          />
          <Divider />
          <ConfigList>
            <ConfigItem
              to="/profile/dashboard"
              name={<FormattedMessage id="profile.angel.home.dashboard" />}
              messages={10}
            />
            <ConfigItem
              name={
                <FormattedMessage id="profile.angel.home.sittingPreferences" />
              }
              // progress={{ total: 13, finished: 4 }}
              to="/profile/preferences"
            />
            <ConfigItem
              to="/profile/settings"
              name={
                <FormattedMessage id="profile.angel.home.account&settings" />
              }
            />
            <ConfigItem
              to="/profile/credit"
              name={
                <FormattedMessage id="profile.angel.home.creditsAndPromotional" />
              }
              value={
                <FormattedNumber
                  value={this.props.credit || 0}
                  style="currency"
                  currency="EUR"
                />
              }
            />
            <ConfigItem
              to="/profile/conditions"
              name={
                <FormattedMessage id="profile.angel.home.generalConditions" />
              }
            />
            <ConfigItem
              name={<FormattedMessage id="profile.angel.home.help" />}
              to="/profile/help"
            />
          </ConfigList>
        </Segment>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    errors: getErrors(state),
    profile: getUserProfile(state),
    credit: getCredit(state),
    isLoading: getLoadingStatus(state),
  }),
  {
    onGetUserProfileData,
    onErrorConfirm,
  }
)(AngelProfile);
