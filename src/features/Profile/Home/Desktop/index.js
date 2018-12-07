import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment, Divider } from 'semantic-ui-react';
import Loader from 'Components/Loader';
import React, { Component, Fragment } from 'react';

import { getLoadingStatus } from '../../../../ui/selectors';
import { getUser, getUserRole } from '../selectors';
import { onGetUserProfileData } from '../../../../data/user/actions';
import { preloadAllRoutes } from '../../routes';
import ConfigItem from '../components/ConfigItem';
import ConfigList from '../components/ConfigList';
import ProfileSection from '../components/ProfileSection';

class ProfileHome extends Component {
  componentDidMount() {
    this.props.getUserProfileData();
    preloadAllRoutes();
  }

  render() {
    return (
      <Fragment>
        {this.props.location.pathname === '/profile' && this.props.isLoading ? (
          <Loader />
        ) : null}
        {this.props.user && this.props.user.profile && (
          <Segment basic vertical>
            <ProfileSection
              history={this.props.history}
              role={this.props.role}
              profile={this.props.user.profile}
            />
            <Divider fitted />
            <ConfigList>
              <ConfigItem
                name={<FormattedMessage id="profile.family.account" />}
                value={
                  <FormattedMessage
                    id="profile.family.accFamilyName"
                    values={{
                      name:
                        this.props.user.profile &&
                        this.props.user.profile.last_name,
                    }}
                  />
                }
                to="/profile/settings"
              />
              <ConfigItem
                name={
                  <FormattedMessage id="profile.family.balanceAndPromoCodes" />
                }
                value={`€ ${this.props.user.profile.credit}`}
                to="/profile/credit"
              />
              <ConfigItem
                name={<FormattedMessage id="profile.family.membership" />}
                value={this.props.user.membershipData.current_state}
                to="/profile/membership"
              />
              <ConfigItem
                name={
                  <FormattedMessage id="profile.family.termsAndConditions" />
                }
                to="/profile/conditions"
              />
              <ConfigItem
                name={<FormattedMessage id="profile.family.needHelp" />}
                to="/profile/help"
              />
            </ConfigList>
          </Segment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  role: getUserRole(state),
  isLoading: getLoadingStatus(state),
});

const mapDispatchToProps = dispatch => ({
  getUserProfileData: () => dispatch(onGetUserProfileData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHome);
