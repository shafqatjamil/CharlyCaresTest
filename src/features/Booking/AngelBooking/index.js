import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import { getBookingById } from './selectors';
import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { LoadableFamilyProfile } from '../../AngelFamilies/routes';
import { onAngelAcceptBooking } from '../data/actions';
import { onErrorConfirm } from '../../../ui/actions';
import BookingInfo from './components/BookingInfo';
import ConfirmationSection from './components/ConfirmationSection';
import FamilySection from './components/FamilySection';
import Location from './components/Location';
import Message from './components/Message';
import API from './api';

class AngelBooking extends Component {
  initialState = {
    selectedDays: [],
    deselected: false,
    error: null,
    isLoading: false,
  };
  state = this.initialState;

  componentDidMount() {
    LoadableFamilyProfile.preload();
    if (!this.props.booking || !this.props.booking.booking) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          API.getBooking(this.props.match.params.bookingId)
            .then(res => {
              this.setState({
                booking: res.data.data,
                isLoading: false,
                selectedDays: this.getDateIds(res.data.data.bookings),
                deselected: Array.from(
                  Array(res.data.data.bookings.length),
                  (v, i) => ({
                    id: i,
                    state: false,
                  })
                ),
              });
            })
            .catch(err => {
              this.setState({
                error: err,
                isLoading: false,
              });
            });
        }
      );
    } else {
      let initialState = {
        selectedDays: this.getDateIds(this.props.booking.bookings),
        deselected: Array.from(
          Array(this.props.booking.bookings.length),
          (v, i) => ({
            id: i,
            state: false,
          })
        ),
      };
      this.setState(initialState);
    }
  }

  onDayPress = (currentDay, id) => () => {
    this.setState(state => ({
      selectedDays: state.selectedDays.map((d, i) => {
        if (i === currentDay) {
          return d.map(data => {
            if (data.booking_dates_id === id) {
              if (data.current_state === 'accepted') {
                return {
                  ...data,
                  current_state: 'declined',
                };
              }
              return {
                ...data,
                current_state: 'accepted',
              };
            }
            return data;
          });
        }
        return d;
      }),
    }));
  };

  onSelectAndDeselectAll = dayIndex => () => {
    this.setState(prevState => {
      if (prevState.deselected[dayIndex].state === false) {
        return {
          selectedDays: prevState.selectedDays.map((d, i) => {
            if (i === dayIndex) {
              return d.map(data => ({
                ...data,
                current_state: 'declined',
              }));
            }
            return d;
          }),
          deselected: prevState.deselected.map((d, i) => {
            if (d.id === dayIndex) {
              return {
                ...d,
                state: true,
              };
            }
            return d;
          }),
        };
      }
      return {
        selectedDays: prevState.selectedDays.map((d, i) => {
          if (i === dayIndex) {
            return d.map(data => ({
              ...data,
              current_state: 'accepted',
            }));
          }
          return d;
        }),
        deselected: prevState.deselected.map((d, i) => {
          if (d.id === dayIndex) {
            return {
              ...d,
              state: false,
            };
          }
          return d;
        }),
      };
    });
  };

  getDateIds(dates = []) {
    if (Array.isArray(dates)) {
      return dates.map(days => {
        return days.bookingdates.map(date => {
          return {
            invitation_id: this.props.booking && this.props.booking.id,
            booking_dates_id: date.id,
            current_state: 'accepted',
          };
        });
      });
    } else {
      if (dates.bookingdates) {
        return dates.bookingdates.map(date => {
          return {
            invitation_id: this.props.booking && this.props.booking.id,
            booking_dates_id: date.id,
            current_state: 'accepted',
          };
        });
      }
      return [];
    }
  }

  onAccept = () => {
    const { booking, onAngelAcceptBooking } = this.props;
    const payload = {
      booking_date_responses: this.state.selectedDays.reduce((arr, days) => {
        arr = [...arr, ...days];
        return arr;
      }, []),
    };
    onAngelAcceptBooking(booking.id, payload, this.props.history);
  };

  onDecline = () => {
    this.props.history.push('/booking/angel-booking-decline/', {
      bookingId: this.props.booking.id,
      invitationId: this.props.booking.id,
    });
  };

  render() {
    const data = this.state.booking || this.props.booking;
    return data && data.family_data && this.state.selectedDays ? (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="navigation.tabs.booking" />}
        navSubTitle={
          <FormattedMessage
            id="booking.angel.offers.details.subTitle"
            values={{
              angelId: data.angel_id,
              bookingId: data.booking_id,
            }}
          />
        }
        navRightComponent={() => (
          <CustomLink to="/support1" primary>
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        <Error
          errors={this.props.errors || this.state.error}
          onErrorConfirm={
            this.state.error ? this.onErrorConfirm : this.props.onErrorConfirm
          }
        />
        {this.props.isLoading || this.state.isLoading ? <Loader /> : null}

        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.5rem 0 1rem 0">
                <FamilySection
                  history={this.props.history}
                  angelId={data.angel_id}
                  normalRate={data.normal_rate}
                  extraRate={data.extra_rate}
                  expectedEarnings={data.expected_earnings}
                  family={
                    Array.isArray(data.family_data)
                      ? data.family_data[0]
                      : data.family_data
                  }
                  distance={data.distance}
                />
              </CustomRow>
            </Grid>
            <BookingInfo
              onSelectAndDeselectAll={this.onSelectAndDeselectAll}
              onDayPress={this.onDayPress}
              booking={data}
              selectedDays={this.state.selectedDays}
              deselected={this.state.deselected}
            />
            <Divider />
            <Grid container>
              <CustomRow padding="1rem 0 0 0">
                <Location
                  city={data.family_data.city || data.family_data[0].city}
                  streetNumber={
                    data.family_data.street_number ||
                    data.family_data[0].street_number
                  }
                  address={
                    data.family_data.street_name ||
                    data.family_data[0].street_name
                  }
                  lat={data.family_data.lat || data.family_data[0].lat}
                  lon={data.family_data.lon || data.family_data[0].lon}
                />
              </CustomRow>
              <CustomRow padding="1rem 0 10rem 0">
                <Message message={data.message} />
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
        {data.current_state === 'pending' && (
          <Confirmation>
            <ConfirmationSection
              total={data.bookings.length}
              numOfAccepted={this.state.selectedDays.length}
              history={this.props.history}
              onDecline={this.onDecline}
              onAccept={this.onAccept}
            />
          </Confirmation>
        )}
      </Layout>
    ) : null;
  }

  static defaultProps = {
    booking: {
      family_date: [{}],
      angel_id: '',
      booking_id: '',
    },
  };
}

export default connect(
  (state, props) => ({
    booking: getBookingById(state, props),
    errors: getErrors(state),
    isLoading: getLoadingStatus(state),
  }),
  {
    onErrorConfirm,
    onAngelAcceptBooking,
  }
)(AngelBooking);
