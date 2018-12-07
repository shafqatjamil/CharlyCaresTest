import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Segment } from 'semantic-ui-react';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import Navigation from 'Components/Navigation';
import React, { PureComponent, Fragment } from 'react';
import isEqual from 'lodash.isequal';

import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { getPreferences } from '../selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onGetPreferences, onUpdatePreferences } from '../actions';
import Preferences from '../components/Preferences';
import RdyButton from '../../components/RdyButton';

class AngelPreferences extends PureComponent {
  state = {
    preferences: {},
    arePreferencesChanged: false,
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
    this.setState(
      prevState => {
        return {
          ...prevState,
          preferences: {
            ...prevState.preferences,
            [preference]: prevState.preferences[preference] === 0 ? 1 : 0,
          },
        };
      },
      () => {
        this.setState({ arePreferencesChanged: this.arePreferencesChanged() });
      }
    );
  };

  onPreferencesUpdate = () => {
    this.setState(
      {
        arePreferencesChanged: false,
      },
      () => {
        this.props.onUpdatePreferences(this.state.preferences);
      }
    );
  };

  arePreferencesChanged = () => {
    return isEqual(this.initialState, this.state.preferences);
  };

  render() {
    return (
      <Fragment>
        {this.props.isLoading ? <Loader /> : null}
        <Navigation
          title={<FormattedMessage id="profile.angel.preferences.navTitle" />}
          onBack={this.props.history.goBack}
          rightComp={
            <RdyButton
              disabled={this.state.arePreferencesChanged}
              onClick={this.onPreferencesUpdate}
            >
              <FormattedMessage id="profile.family.rdy" />
            </RdyButton>
          }
        />
        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />

        <Segment basic vertical>
          <Preferences
            onPreferenceChange={this.onPreferenceChange}
            preferences={this.state.preferences}
          />
        </Segment>
      </Fragment>
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
