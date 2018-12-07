import { FormattedMessage } from 'react-intl';
import { Segment, Divider } from 'semantic-ui-react';
import curry from 'ramda/es/curry';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';

import {
  LoadableNotAvailable,
  LoadableUnavailable,
  LoadableFixedSitting,
} from '../../routes';

import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import API from '../api';
import React, { PureComponent, Fragment } from 'react';
import Navigation from 'Components/Navigation';

import Feature from '../components/Feature';

export default class CalendarAdd extends PureComponent {
  getNextNearestDayInWeek = dayInWeekIndex => {
    const now = moment();
    const today = now.clone().isoWeekday();
    if (today <= dayInWeekIndex) {
      return now.clone().isoWeekday(dayInWeekIndex);
    } else {
      return now
        .clone()
        .add(1, 'weeks')
        .isoWeekday(dayInWeekIndex);
    }
  };

  nextFriday = this.getNextNearestDayInWeek(5).format('YYYY-MM-DD');
  nextSaturday = this.getNextNearestDayInWeek(6).format('YYYY-MM-DD');
  nextSunday = this.getNextNearestDayInWeek(7).format('YYYY-MM-DD');

  state = {
    isLoading: false,
    errors: null,
    standBy: [
      {
        id: 1,
        selected: false,
        startTime: `${this.nextFriday} 18:00`,
        endTime: `${this.nextFriday} 23:00`,
        all_day: 0,
        recurring: false,
      },
      {
        id: 2,
        selected: false,
        startTime: `${this.nextSaturday} 8:00`,
        endTime: `${this.nextSaturday} 19:00`,
        all_day: 0,
        recurring: false,
      },
      {
        id: 3,
        selected: false,
        startTime: `${this.nextSaturday} 18:00`,
        endTime: `${this.nextSaturday} 23:00`,
        all_day: 0,
        recurring: false,
      },
      {
        id: 4,
        selected: false,
        startTime: `${this.nextSunday} 08:00`,
        endTime: `${this.nextSunday} 23:00`,
        all_day: 1,
        recurring: false,
      },
    ],
  };

  componentDidMount() {
    LoadableNotAvailable.preload();
    LoadableUnavailable.preload();
    LoadableFixedSitting.preload();
  }

  navigateToFeature = path => () => {
    this.props.history.push(path);
  };

  getLocalizationId(start, end) {
    if (start === '08:00' && end === '23:00') {
      return 'calendar.angel.addInCalendar.standBy.all';
    } else if (start !== '08:00' && end === '23:00') {
      return 'calendar.angel.addInCalendar.standBy.from';
    } else {
      return 'calendar.angel.addInCalendar.standBy.between';
    }
  }

  onStandByOptionSelect = memoizeWith(
    id => id,
    curry((id, _ev) => {
      const updated = this.state.standBy.map(day => {
        if (day.id === id) {
          return {
            ...day,
            selected: !day.selected,
          };
        }
        return day;
      });
      this.setState(prevState => {
        return {
          ...prevState,
          standBy: updated,
        };
      });
    })
  );

  updateStandby = () => {
    const selected = this.state.standBy.reduce((arr, curr) => {
      if (curr.selected) {
        arr.push({
          start_date: curr.startTime,
          end_date: curr.endTime,
          current_state: 'standby',
          all_day: curr.all_day,
          recurring: curr.recurring,
        });
      }
      return arr;
    }, []);
    API.addInCalendar(selected[0])
      .then(() => {
        this.setState({
          isLoading: false,
        });
      })
      .catch(errors => {
        this.setState({
          errors,
          isLoading: false,
        });
      });
  };

  onUpdate = () => {
    this.setState(
      {
        isLoading: true,
      },
      this.updateStandby
    );
  };
  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  render() {
    return (
      <Fragment>
        <Navigation
          title={
            <FormattedMessage id="calendar.angel.addInCalendar.navTitle" />
          }
          onBack={this.props.history.goBack}
        />
        {this.state.isLoading ? <Loader isLoading /> : null}
        <DesktopError
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        <Segment basic vertical>
          <Feature
            onClick={this.navigateToFeature('/calendar/not-available')}
            notAvailable
            title={
              <FormattedMessage id="calendar.angel.addInCalendar.title1" />
            }
          >
            <FormattedMessage id="calendar.angel.addInCalendar.notAvailableDesc" />
          </Feature>
          <Feature
            onClick={this.navigateToFeature('/calendar/fixed-sitting')}
            fixed
            title={
              <FormattedMessage id="calendar.angel.addInCalendar.title2" />
            }
          >
            <FormattedMessage id="calendar.angel.addInCalendar.fixedSittingDesc" />
          </Feature>
        </Segment>
      </Fragment>
    );
  }
}
