import { connect } from 'react-redux';
import { AngelTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { PureComponent } from 'react';

import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { getPreferences } from './selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onGetPreferences, onUpdatePreferences } from './actions';
import Preferences from './components/Preferences';
import RdyButton from '../components/RdyButton';

class AngelPreferences extends PureComponent {
  state = {
    preferences: {},
  };
  componentDidMount() {
    this.props.onGetPreferences();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.preferences !== this.props.preferences) {
      this.setState(
        {
          preferences: this.props.preferences,
        },
        () => {
          this.initialState = this.props.preferences;
        }
      );
    }
  }

  onPreferenceChange = preference => e => {
    this.setState(prevState => {
      return {
        ...prevState,
        preferences: {
          ...prevState.preferences,
          [preference]: prevState.preferences[preference] === 0 ? 1 : 0,
        },
      };
    });
  };

  onPreferencesUpdate = () => {
    this.props.onUpdatePreferences(this.state.preferences);
  };

  arePreferencesChanged = () => {
    if (!this.initialState) return true;
    let notChanged = true;
    for (let prop in this.state.preferences) {
      if (this.initialState[prop] !== this.state.preferences[prop]) {
        notChanged = notChanged && false;
      }
    }
    return notChanged;
  };

  render() {
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navBorder
        navTitle={<FormattedMessage id="profile.angel.preferences.navTitle" />}
        navRightComponent={() => (
          <RdyButton
            disabled={this.arePreferencesChanged()}
            onClick={this.onPreferencesUpdate}
          >
            <FormattedMessage id="profile.family.rdy" />
          </RdyButton>
        )}
      >
        {this.props.isLoading && <Loader />}
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Preferences
              onPreferenceChange={this.onPreferenceChange}
              preferences={this.state.preferences}
            />
          </CustomColumn>
        </CustomRow>
        <AngelTabBar />
      </Layout>
    );
  }
}

export default connect(
  state => ({
    preferences: getPreferences(state),
    errors: getErrors(state),
    isLoading: getLoadingStatus(state),
  }),
  {
    onGetPreferences,
    onUpdatePreferences,
    onErrorConfirm,
  }
)(AngelPreferences);
