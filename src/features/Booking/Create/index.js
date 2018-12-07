import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import AddBtn from 'Components/Buttons/AddBtn';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import flatten from 'ramda/es/flatten';
import Layout from 'Components/Layout';
import moment from 'moment';
import React from 'react';

import calendar from 'Assets/icons/calendar.svg';

import { nearestMinutes } from 'Utils';
import { getDays } from './selectors';
import { onAngelsSearch } from '../data/actions';
import {
  onDayFieldChange,
  onAddDay,
  onClearDays,
  onDeleteDay,
} from './actions';
import AddBtnWrapper from './components/AddBtnWrapper';
import NavigateToBooking from './components/NavigateToBooking';
import Day from './components/Day';
import MaxDaysMessage from './components/MaxDaysMessage';

class BookingCreate extends React.PureComponent {
  startDateAndTimeInput = React.createRef();
  static defaultProps = {
    days: [],
    addresses: [],
    city: '',
    children: [],
  };

  constructor(props) {
    super(props);

    this.state = { dateTime: '', endTime: '' };
  }

  makeDays = () => {
    if (!this.props.days.length) return;
    if (this.props.days.length === 1) {
      const dateTime = `${this.props.days[0].startDate}T${
        this.props.days[0].startTime
      }`;
      const endTime = `${this.props.days[0].endTime}`;
      return [
        {
          id: 1,
          dateTime,
          endTime,
        },
      ];
    }
    return this.props.days.map((day, i) => {
      const dateTime = `${day.startDate}T${day.startTime}`;
      const endTime = `${day.endTime}`;
      return {
        id: i + 1,
        dateTime,
        endTime,
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

  onDayFieldChange = dayIndex => field => e => {
    const changingDay = this.state.days.find(day => day.id === dayIndex);
    const mapToNewValues = this.props.days.map((day, i) => {
      if (day.id === dayIndex) {
        if (field === 'startDateAndTime') {
          const { 0: date, 1: time } = changingDay.dateTime.split('T');
          const mTime = moment(time, 'HH:mm');
          day.startDate = date;
          day.startTime = nearestMinutes(15, mTime.clone()).format('HH:mm');
          day.endTime = nearestMinutes(
            15,
            mTime.clone().add(2, 'hours')
          ).format('HH:mm');
        } else {
          const time = moment(changingDay.endTime, 'HH:mm');
          const timeDifference = moment(time, 'HH:mm').diff(
            moment(day.startTime, 'HH:mm'),
            'hours'
          );
          //Diff less then 2 hours
          if (timeDifference < 2) {
            day[field] = nearestMinutes(
              15,
              moment(day.startTime, 'HH:mm').add(2, 'hours')
            ).format('HH:mm');
          } else {
            day[field] = nearestMinutes(15, time.clone()).format('HH:mm');
          }

          // day[field] = nearestMinutes(15, time.clone()).format('HH:mm');
        }
      }
      return day;
    });
    this.props.onDayFieldChange(mapToNewValues);
  };

  onFieldChange = (dayId, field) => e => {
    const days = this.state.days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          [field]: e.target.value,
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
        onValueChange={this.onFieldChange}
        onBlur={this.onDayFieldChange(day.id)}
        startDate={day.startDate}
        startTime={day.startTime}
        initialDate={day.initialDate}
        initialStartTime={day.initialStartTime}
        endTime={day.endTime}
        repetitions={day.repetitions}
        dateTimeValue={this.state.days ? this.state.days[i].dateTime : moment()}
        endTimeValue={this.state.days ? this.state.days[i].endTime : moment()}
        onDeleteDay={this.deleteDay}
      />
    ));
  };

  onShowInCalendar = () => {
    this.props.history.push('/calendar');
  };

  addDay = () => {
    if (this.state.days.length <= 3) {
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
    }
  };

  deleteDay = id => () => {
    this.props.onDeleteDay(id);
  };

  render() {
    return (
      <Layout
        onNavClose={this.onClose}
        navRightComponent={() => (
          <CustomLink primary to="/support1">
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
        navTitle={<FormattedMessage id="booking.create.navTitle" />}
        navBorder
      >
        <CustomRow padding="1.3rem 0 0 0">{this.renderDays()}</CustomRow>
        <CustomRow style={{ backgroundColor: '#F9F8F9' }} noPadding>
          <CustomColumn padding="0 0 50% 0" width={16}>
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

            {this.state.days && this.state.days.length <= 2 && (
              <CustomColumn>
                <AddBtnWrapper>
                  <AddBtn
                    onClick={this.addDay}
                    padding="0.6875em 1.5em 0.6875em 0"
                  >
                    <FormattedMessage id="booking.create.addDay" />
                  </AddBtn>
                </AddBtnWrapper>
              </CustomColumn>
            )}
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <BasicButton onClick={this.onSearch} primary fluid>
            <FormattedMessage id="booking.create.btn" />
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  days: getDays(state),
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
