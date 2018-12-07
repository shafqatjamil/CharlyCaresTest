import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AnimationWrapper from 'Components/AnimationWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Error from 'Components/Error';
import InfiniteScroller from 'react-infinite-scroller';
import Loader from 'Components/Loader';
import moment from 'moment';
import React, { Fragment } from 'react';
import ScrollerLoader from 'Components/ScrollerLoader';

import { getErrors } from '../../../../ui/selectors';
import { getNewBooking } from '../selectors';
import { getUserRole } from '../../../../data/auth/selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onGetAngelEventsError } from '../actions';
import { slideIn, slideOut } from '../../../../themes/animations';
import API from '../api';
import Month from '../../components/Month';

class Availability extends React.PureComponent {
  wrapperRef = React.createRef();
  state = {
    startingMonth: moment().subtract(1, 'month'),
    events: [],
    newBookings: [],
    months: [],
    lastMonthIndex: 1,
    isLoading: false,
  };

  componentDidMount() {
    slideIn(this.wrapperRef.current);
    if (this.props.location.pathname.includes('/show-calendar')) {
      this.setState(state => {
        return {
          ...state,
          newBookings: this.props.newBooking.map(day => {
            return {
              current_state: 'new',
              end_date: `${day.startDate} ${day.startTime}`,
              start_date: `${day.startDate} ${day.endTime}`,
            };
          }),
        };
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      this.props.location.pathname === '/calendar'
    ) {
      this.updateEvents();
    }
    if (
      this.props.location.pathname.includes('/show-calendar') &&
      this.props.newBooking !== prevProps.newBooking
    ) {
      this.setState(state => {
        return {
          ...state,
          newBookings: this.props.newBooking.map(day => {
            return {
              current_state: 'new',
              end_date: `${day.startDate} ${day.startTime}`,
              start_date: `${day.startDate} ${day.endTime}`,
            };
          }),
        };
      });
    }
  }

  filterEventsForMonth = (month, events) => {
    if (!events.length) return [];
    return events.filter(event => {
      return (
        event &&
        moment(event.start_date, 'YYYY-MM-DD HH:mm:ss').isSame(month, 'month')
      );
    });
  };

  updateEvents = date => {
    const nextMonth = this.state.startingMonth.clone().add(1, 'months');
    const startDate = nextMonth.startOf('month').format('YYYY-MM-DD');
    const endDate = nextMonth.endOf('month').format('YYYY-MM-DD');
    API.getEvents(startDate, endDate, this.props.match.params.id)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            events: prevState.events.concat(data.data),
            isLoading: false,
          };
        });
      })
      .catch(err => this.props.onError(err));
  };

  renderMonths = (months = [], events = []) => {
    const {
      location: { pathname },
      role,
    } = this.props;
    const showBookings =
      pathname.includes('availability') && role === 'family' ? false : true;

    const allEvents = this.props.location.pathname.includes('/show-calendar')
      ? [...events, ...this.state.newBookings]
      : events;

    return months.map((m, i) => {
      return (
        <Month
          showBookings={showBookings}
          month={m}
          role={this.props.role}
          events={this.filterEventsForMonth(m, allEvents)}
          key={i}
          angel_id={this.props.match.params.id}
        />
      );
    });
  };

  loadMoreMonths = page => {
    const nextMonth = this.state.startingMonth.clone().add(page, 'months');
    const startDate = nextMonth.startOf('month').format('YYYY-MM-DD');
    const endDate = nextMonth.endOf('month').format('YYYY-MM-DD');

    this.setState(
      prevState => {
        return {
          ...prevState,
          months: [...prevState.months, nextMonth],
          lastMonthIndex: page,
          isLoading: page <= 2 ? true : false,
        };
      },
      () => {
        if (
          this.props.role === 'family' &&
          !this.props.location.pathname.includes('availability')
        ) {
          API.getEventsFamily(startDate, endDate)
            .then(({ data }) => {
              this.setState(prevState => {
                return {
                  ...prevState,
                  events: prevState.events.concat(data.data),
                  isLoading: false,
                };
              });
            })
            .catch(err => this.props.onError(err));
        } else {
          API.getEvents(startDate, endDate, Number(this.props.match.params.id))
            .then(({ data }) => {
              let events = data.data || data;
              this.setState(prevState => {
                return {
                  ...prevState,
                  events: prevState.events.concat(events),
                  isLoading: false,
                };
              });
            })
            .catch(err => this.props.onError(err));
        }
      }
    );
  };

  onClose = () => {
    slideOut(this.wrapperRef.current, this.props.history.goBack);
  };

  render() {
    return (
      <Fragment>
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.state.isLoading ? <Loader isLoading /> : null}

        <AnimationWrapper innerRef={this.wrapperRef}>
          <CustomRow padding="2rem 0 0 0">
            <CustomColumn noPadding>
              <InfiniteScroller
                pageStart={0}
                threshold={300}
                initialLoad
                loadMore={this.loadMoreMonths}
                hasMore={true}
                loader={<ScrollerLoader key={9999} />}
              >
                {this.renderMonths(this.state.months, this.state.events)}
              </InfiniteScroller>
            </CustomColumn>
          </CustomRow>
        </AnimationWrapper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: getErrors(state),
  role: getUserRole(state),
  newBooking: getNewBooking(state),
});

const mapDispatchToProps = dispatch => ({
  onError: err => dispatch(onGetAngelEventsError(err)),
  onErrorConfirm: () => dispatch(onErrorConfirm),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Availability));
