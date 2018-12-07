import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { nearestMinutes } from 'Utils';
import { Segment, Image } from 'semantic-ui-react';
import AddBtn from 'Components/Buttons/AddBtn';
import BasicButton from 'Components/Buttons/Basic';
import DesktopError from 'Components/DesktopError';
import Divider from 'Components/Divider';
import flatten from 'ramda/es/flatten';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React from 'react';

import calendar from 'Assets/icons/calendar.svg';

import { getDays } from '../selectors';
import { getErrors } from '../../../../ui/selectors';
import { onAngelsSearch } from '../../data/actions';
import {
  onDayFieldChange,
  onAddDay,
  onClearDays,
  onDeleteDay,
} from '../actions';
import { onErrorConfirm } from '../../../../ui/actions';
import AddBtnWrapper from '../components/AddBtnWrapper';
import Day from '../components/Day/Desktop';
import MaxDaysMessage from '../components/MaxDaysMessage';
import NavigateToBooking from '../components/NavigateToBooking';

class BookingCreate extends React.PureComponent {
  startDateAndTimeInput = React.createRef();
  static defaultProps = {
    days: [],
    addresses: [],
    city: '',
    children: [],
  };
  makeDays = () => {
    if (!this.props.days.length) return;
    if (this.props.days.length === 1) {
      return [
        {
          id: 1,
          startDate: this.props.days[0].startDate,
          startTime: this.props.days[0].startTime,
          endTime: this.props.days[0].endTime,
        },
      ];
    }
    return this.props.days.map((day, i) => {
      return {
        id: i + 1,
        startDate: day.startDate,
        startTime: day.startTime,
        endTime: day.endTime,
      };
    });
  };

  state = {
    days: null,
  };

  componentDidMount() {
    if (this.props.days.length === 0) {
      this.props.onAddDay();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.days || prevProps.days.length !== this.props.days.length) {
      this.setState(prevState => {
        return {
          ...prevState,
          days: this.makeDays(),
        };
      });
    }
  }
  onClose = () => {
    this.props.history.goBack();
  };

  onSearch = () => {
    const dates = this.props.days.map(day => {
      const startTime = `${day.startDate} ${day.startTime}`;
      const endTime = `${day.startDate} ${day.endTime}`;

      const selectedDay = {
        start_date: moment(startTime, 'YYYY-MM-DD HH:mm').format('X'),
        end_date: moment(endTime, 'YYYY-MM-DD HH:mm').format('X'),
      };

      if (day.repetitions) {
        const repeatedDays = day.repetitions.map(date => {
          return {
            start_date: moment(
              `${date} ${startTime}`,
              'YYYY-MM-DD HH:mm'
            ).format('X'),
            end_date: moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm').format(
              'X'
            ),
          };
        });
        return [selectedDay, ...repeatedDays];
      }

      return [selectedDay];
    });

    const data = {
      dates: flatten(dates),
    };

    window.analytics.track('FSearchAngels', {
      repeatQuantity: data.dates.length,
    });

    this.props.onAngelsSearch(data);
    this.props.history.push('/booking/search');
  };

  onFieldBlur = (field, setterFunc) => () => {
    setterFunc(field, this.state[field]);
  };

  onDayFieldChange = dayIndex => field => (e, data) => {
    const mapToNewValues = this.props.days.map((day, i) => {
      if (day.id === dayIndex) {
        if (field === 'startTime') {
          let mTime = moment(
            `${day.startDate} ${data.value}`,
            'YYYY-MM-DD HH:mm'
          );
          let timeDifference = moment(
            `${day.startDate} ${day.endTime}`,
            'YYYY-MM-DD HH:mm'
          ).diff(mTime, 'hours');
          if (timeDifference < 2) {
            return {
              ...day,
              [field]: nearestMinutes(15, mTime.clone()).format('HH:mm'),
              endTime: nearestMinutes(15, mTime.clone().add(2, 'hours')).format(
                'HH:mm'
              ),
            };
          }
          return {
            ...day,
            [field]: nearestMinutes(15, mTime.clone()).format('HH:mm'),
          };
        }
        if (field === 'endTime') {
          const time = moment(
            `${day.startDate} ${data.value}`,
            'YYYY-MM-DD HH:mm'
          );
          return {
            ...day,
            [field]: nearestMinutes(15, time.clone()).format('HH:mm'),
          };
        }
        return {
          ...day,
          [field]: e.format('YYYY-MM-DD'),
        };
      }
      return day;
    });
    this.props.onDayFieldChange(mapToNewValues);
  };

  onFieldChange = (dayId, field) => (date, data) => {
    const days = this.state.days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          [field]: date.format ? date.format('YYYY-MM-DD') : data.value,
        };
      }
      return day;
    });

    this.setState(prevState => ({
      ...prevState,
      days: days,
    }));
  };

  renderDays = () => {
    return this.props.days.map((day, i) => (
      <Day
        key={day.id}
        dayIndex={day.id}
        index={i}
        onValueChange={this.onDayFieldChange(day.id)}
        startDate={day.startDate}
        startTime={day.startTime}
        initialDate={day.initialDate}
        initialStartTime={day.initialStartTime}
        endTime={day.endTime}
        repetitions={day.repetitions}
        onShowInCalendar={this.onShowInCalendar}
        onDeleteDay={this.deleteDay}
      />
    ));
  };

  onShowInCalendar = () => {
    this.props.history.push('/booking/create/show-calendar');
  };

  addDay = () => {
    this.setState(
      prevState => ({
        ...prevState,
        days: [
          ...prevState.days,
          {
            id: prevState.days.length + 1,
            dateTime: '',
            endTime: '',
          },
        ],
      }),
      this.props.onAddDay
    );
  };

  deleteDay = id => () => {
    this.props.onDeleteDay(id);
  };

  render() {
    return (
      <React.Fragment>
        <Navigation
          onBack={this.props.history.goBack}
          title="Booking request"
        />
        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={onErrorConfirm}
        />
        {this.renderDays()}
        <Divider
          both
          noBottomBorder={this.state.days && this.state.days.length === 3}
        >
          {this.state.days && this.state.days.length === 3 ? (
            <MaxDaysMessage>
              <FormattedMessage id="booking.create.maxDays" />
            </MaxDaysMessage>
          ) : (
            <div />
          )}
          <NavigateToBooking onClick={this.onShowInCalendar}>
            <FormattedMessage id="booking.create.showCalendar" />
            <Image avatar src={calendar} />
          </NavigateToBooking>
        </Divider>
        {this.props.days.length < 3 ? (
          <AddBtnWrapper>
            <AddBtn onClick={this.addDay} padding="0.6875em 1.5em 0.6875em 0">
              <FormattedMessage id="booking.create.addDay" />
            </AddBtn>
          </AddBtnWrapper>
        ) : null}
        <Segment basic vertical>
          <BasicButton onClick={this.onSearch} primary fluid>
            <FormattedMessage id="booking.create.btn" />
          </BasicButton>
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  days: getDays(state),
  errors: getErrors(state),
});

const mapDispatchToProps = dispatch => ({
  onAddDay: () => dispatch(onAddDay()),
  onClearDays: () => dispatch(onClearDays()),
  onDayFieldChange: values => dispatch(onDayFieldChange(values)),
  onAngelsSearch: data => dispatch(onAngelsSearch(data)),
  onDeleteDay: id => dispatch(onDeleteDay(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingCreate);
