import { onGetUserProfileData } from '../../../data/user/actions';
import { AngelTabBar } from 'Components/NavigationTabs';
import { connect } from 'react-redux';
import CustomColumn from 'Components/CustomColumn';
import Error from 'Components/Error';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Loader from 'Components/Loader';
import Layout from 'Components/Layout';
import React from 'react';

import { getUserProfile, getNumberOfUnreadMessages } from './selectors';
import ConfigItem from './components/ConfigItem';
import ConfigList from './components/ConfigList';
import ProfileSection from './components/ProfileSection';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { getCredit } from './selectors';
import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { onErrorConfirm } from '../../../ui/actions';

class AngelProfile extends React.PureComponent {
  componentDidMount() {
    this.props.onGetUserProfileData();
  }

  onEditProfile = () => {
    this.props.history.push('/profile/edit');
  };

  render() {
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="profile.angel.home.navTitle" />}
      >
        {this.props.isLoading && <Loader />}
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
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
                messages={this.props.unreadMessages}
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
                    value={Number(this.props.credit) || 0}
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
          </CustomColumn>
        </CustomRow>
        <AngelTabBar />
      </Layout>
    );
  }
}

export default connect(
  state => ({
    errors: getErrors(state),
    profile: getUserProfile(state),
    credit: getCredit(state),
    isLoading: getLoadingStatus(state),
    unreadMessages: getNumberOfUnreadMessages(state),
  }),
  {
    onGetUserProfileData,
    onErrorConfirm,
  }
)(AngelProfile);
