import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AnimationWrapper from 'Components/AnimationWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Error from 'Components/Error';
import InfiniteScroller from 'react-infinite-scroller';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import moment from 'moment';
import React from 'react';
import ScrollerLoader from 'Components/ScrollerLoader';

import { getErrors } from '../../../ui/selectors';
import { getUserRole } from '../../../data/auth/selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onGetAngelEventsError } from './actions';
import { slideIn, slideOut } from '../../../themes/animations';
import API from './api';
import CalendarNav from '../components/CalendarNav';
import Month from '../components/Month';

class Availability extends React.PureComponent {
  wrapperRef = React.createRef();
  state = {
    startingMonth: moment().subtract(1, 'month'),
    events: [],
    months: [],
    lastMonthIndex: 1,
    isLoading: false,
  };

  componentDidMount() {
    slideIn(this.wrapperRef.current);
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

  renderMonths = (months = [], events = []) => {
    const {
      location: { pathname },
      role,
    } = this.props;
    const showBookings =
      pathname.includes('availability') && role === 'family' ? false : true;
    return months.map((m, i) => {
      return (
        <Month
          showBookings={showBookings}
          month={m}
          role={this.props.role}
          events={this.filterEventsForMonth(m, events)}
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
          API.getEvents(startDate, endDate, this.props.match.params.id)
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
      <React.Fragment>
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm}
        />
        {this.state.isLoading ? <Loader isLoading /> : null}

        <Layout
          navBorder
          onNavBack={this.props.role === 'family' && this.props.history.goBack}
          onNavClose={this.props.role === 'angel' && this.onClose}
          navTitle={
            this.props.role === 'family' &&
            !this.props.location.pathname.includes('availability') ? (
              <FormattedMessage id="calendar.family.calendar.navTitle" />
            ) : this.props.role === 'family' ? (
              <FormattedMessage id="calendar.family.availability.navTitle" />
            ) : (
              <FormattedMessage id="calendar.angel.navTitle" />
            )
          }
          navRightComponent={() => (
            <CustomLink to="/support">
              <FormattedMessage id="navigation.legenda" />
            </CustomLink>
          )}
          withDays
        >
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
        </Layout>
        {this.props.role === 'angel' && <CalendarNav />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: getErrors(state),
  role: getUserRole(state),
});

const mapDispatchToProps = dispatch => ({
  onError: err => dispatch(onGetAngelEventsError(err)),
  onErrorConfirm: () => dispatch(onErrorConfirm),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Availability);
