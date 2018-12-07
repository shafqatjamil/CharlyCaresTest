import { FormattedMessage } from 'react-intl';
import anime from 'animejs';
import CustomLink from 'Components/CustomLink';
import Error from 'Components/Error';
import Hammer from 'react-hammerjs';
import Layout from 'Components/Layout';
import moment from 'moment';
import React, { PureComponent } from 'react';

import API from './api';
import CalendarNav from '../components/CalendarNav';
import Cell from './components/Cell';
import Container from './components/Container';
import Day from './components/Day';
import FixedSitting from './components/FixedSitting';
import Hours from './components/Hours';
import Status from './components/Status';
import Unavailable from './components/Unavailable';
import Week from './components/Week';
import WeekDays from './components/WeekDays';

export default class AngelWeek extends PureComponent {
  swipeLeftOptions = { rotate: 3 };
  swipeRightOptions = { rotate: -3, translateX: [0, 150] };
  hammerOptions = {
    touchAction: 'compute',
    recognizers: {
      swipe: {
        time: 600,
        threshold: 100,
      },
    },
  };

  today = moment();

  constructor(props) {
    super(props);

    const current_week_day = moment()
      .day('Monday')
      .week(this.props.location.state);

    this.state = {
      week: current_week_day,
      hours: this.getHours(),
      today: this.today,
      weekStart: current_week_day.clone().startOf('week'),
      weekEnd: current_week_day.clone().endOf('week'),
      weekEvents: [],
      errors: null,
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.state !== prevProps.location.state) {
      const current_week_day = moment()
        .day('Monday')
        .week(this.props.location.state);
      this.setState(
        {
          week: current_week_day,
          weekStart: current_week_day.clone().startOf('week'),
          weekEnd: current_week_day.clone().endOf('week'),
        },
        this.getEvents
      );
    }
  }

  getEvents = () => {
    const format = 'YYYY-MM-DD';
    API.getEventsForWeek(
      this.state.weekStart.format(format),
      this.state.weekEnd
        .clone()
        .add(1, 'day')
        .format(format)
    )
      .then(res => {
        this.setState({
          weekEvents: res.data.data,
        });
      })
      .catch(errors => {
        this.setState({
          errors,
        });
      });
  };

  hasAcceptedWithSameDate = currentDay => {
    const format = 'YYYY-MM-DD HH:mm';
    const mCurrentDay = moment(currentDay.start_date, format);

    const event = this.state.weekEvents.find(day => {
      const mDay = moment(day.start_date, format);
      if (mCurrentDay.isSame(mDay, 'day') && day.current_state === 'accepted') {
        return day;
      }
    });
    return Boolean(event);
  };

  onSelectUnavailable = ({ start, end, id }) => () => {
    this.props.history.push('/calendar/not-available', {
      start: start.format('YYYY-MM-DDTHH:mm'),
      end: end.format('HH:mm'),
      id,
    });
  };
  onSelectAvailable = ({ start, end, id }) => () => {
    this.props.history.push('/calendar/fixed-sitting', {
      start: start.format('YYYY-MM-DDTHH:mm'),
      end: end.format('HH:mm'),
      id,
    });
  };

  renderEvents = dayIndex => {
    const format = 'YYYY-MM-DD HH:mm';
    return this.state.weekEvents.map((day, index) => {
      const mStart = moment(day.start_date, format);
      const mEnd = moment(day.end_date, format);
      if (mStart.clone().weekday() === dayIndex) {
        switch (day.current_state) {
          case 'pending':
            return (
              <Status
                key={index}
                pending
                hasMinutes={mStart.clone().minutes()}
                from={mStart.clone().hour()}
                to={mEnd.clone().hour()}
                booking_id={day.booking_id}
                history={this.props.history}
              >
                <FormattedMessage
                  id="calendar.angel.weekView.family"
                  values={{ family: day.family }}
                />
              </Status>
            );

          case 'accepted':
            return (
              <Status
                key={index}
                accepted
                hasMinutes={mStart.clone().minutes()}
                from={mStart.clone().hour()}
                to={mEnd.clone().hour()}
                booking_id={day.booking_id}
                history={this.props.history}
              >
                <FormattedMessage
                  id="calendar.angel.weekView.family"
                  values={{ family: day.family }}
                />
              </Status>
            );
          case 'unavailable':
            const data = {
              start: mStart.clone(),
              end: mEnd.clone(),
              id: day.id,
            };
            return (
              <Unavailable
                key={index}
                hasMinutes={mStart.clone().minutes()}
                from={mStart.clone().hour()}
                to={mEnd.clone().hour()}
                onClick={this.onSelectUnavailable(data)}
              />
            );
          case 'available':
            if (this.hasAcceptedWithSameDate(day)) {
              return (
                <FixedSitting
                  key={index}
                  from={mStart.clone().hour()}
                  to={mEnd.clone().hour()}
                />
              );
            }
            return null;
          case 'fixed_sitting':
            const fixedSittingData = {
              start: mStart.clone(),
              end: mEnd.clone(),
              id: day.id,
            };
            return (
              <FixedSitting
                key={index}
                onClick={this.onSelectAvailable(fixedSittingData)}
                from={mStart.clone().hour()}
                to={mEnd.clone().hour()}
              />
            );

          default:
            return null;
        }
      }
      return null;
    });
  };

  getHours() {
    const start = moment('24:00', 'HH:mm');
    const end = moment('24:00', 'HH:mm');
    const startWorking = start.clone().add(7, 'hours');
    end.add(1, 'day').add(2, 'hours');
    const endWorking = end.clone().subtract(2, 'hours');
    const hours = [];
    let i = 0;
    while (start.isSameOrBefore(end, 'hour')) {
      hours.push({
        time: start.format('HH'),
        available: start.isBetween(startWorking, endWorking, 'hours'),
        index: i,
      });
      i++;
      start.add(1, 'hour');
    }
    return hours;
  }

  renderWeek = () => {
    return [...Array(7)].map((value, i) => (
      <Day key={i}>
        {this.renderEvents(i)}
        {this.state.hours.map((hour, idx) => {
          if (hour.index === 8 || hour.index === this.state.hours.length - 1) {
            return <Cell available={false} key={idx} />;
          }
          if (hour.index === this.state.hours.length - 3) {
            return <Cell available key={idx} />;
          }
          return <Cell available={hour.available} key={idx} />;
        })}
      </Day>
    ));
  };

  animateSwipe = (props, onComplete) => () => {
    return anime({
      targets: '[data-swipe-container]',
      rotate: 3,
      duration: 200,
      transformOrigin: '50% 50%',
      opacity: [1, 0],
      translateX: [0, -150],
      easing: 'linear',
      complete: function(anim) {
        anim.reset();
        onComplete();
      },
      ...props,
    });
  };

  moveWeeks = type => () => {
    this.setState(prevState => {
      if (type === 'backward') {
        return {
          ...prevState,
          weekStart: prevState.weekStart.clone().add(1, 'week'),
          weekEnd: prevState.weekEnd.clone().add(1, 'week'),
        };
      }
      return {
        ...prevState,
        weekStart: prevState.weekStart.clone().subtract(1, 'week'),
        weekEnd: prevState.weekEnd.clone().subtract(1, 'week'),
      };
    }, this.getEvents);
  };

  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  render() {
    return (
      <Layout
        navRightComponent={() => (
          <CustomLink to="/support">
            <FormattedMessage id="navigation.legenda" />
          </CustomLink>
        )}
        navTitle={
          <FormattedMessage
            id="calendar.angel.weekView.navTitle"
            values={{ week: this.state.weekStart.format('w, MMM YYYY') }}
          />
        }
        onNavBack={this.props.history.goBack}
      >
        <Error
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        <Hammer
          options={this.hammerOptions}
          direction="DIRECTION_HORIZONTAL"
          onSwipeLeft={this.animateSwipe(
            this.swipeLeftOptions,
            this.moveWeeks('backward')
          )}
          onSwipeRight={this.animateSwipe(
            this.swipeRightOptions,
            this.moveWeeks('forward')
          )}
        >
          <div style={{ width: '100%', padding: 0 }}>
            <Container data-swipe-container>
              <WeekDays
                weekStart={this.state.weekStart.clone()}
                weekEnd={this.state.weekEnd.clone()}
                today={this.state.today.clone()}
              />
              <Week>
                <Hours hours={this.state.hours} />
                {this.renderWeek()}
              </Week>
            </Container>
          </div>
        </Hammer>
        <CalendarNav />
      </Layout>
    );
  }
}
