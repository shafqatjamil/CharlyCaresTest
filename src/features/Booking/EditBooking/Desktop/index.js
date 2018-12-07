import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import anime from 'animejs';
import Confirmation from 'Components/Confirmation';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React, { Component, Fragment } from 'react';
import { Divider } from 'semantic-ui-react';

import { onGetBookings } from '../../data/actions';
import Angel from '../components/Angel';
import API from '../api';
import Availability from '../components/Availability';
import BookingAPI from '../api';
import Buttons from '../components/Buttons';
import Fields from '../components/Fields/Desktop';
import Repeat from '../components/Repeat/Desktop';

class EditBooking extends Component {
  constructor(props) {
    super(props);

    const start = moment(
      this.props.location.state.start_date,
      'YYYY-MM-DD HH:mm:ss'
    );
    const end = moment(
      this.props.location.state.end_date,
      'YYYY-MM-DD HH:mm:ss'
    ).format('HH:mm');

    const repeatedDays = this.props.location.state.bookingDates.map(date => {
      return {
        ...date,
        selected: true,
      };
    });

    this.state = {
      startDate: start,
      startTime: start.format('HH:mm'),
      endTime: end,
      isLoading: false,
      error: null,
      message: '',
      availableAngels: [],
      unavailableAngels: [],
      checked: false,
      isMessageEdited: false,
      showRepeat: false,
      repeatedDays,
      initialRepeatedDays: repeatedDays,
    };
  }

  onChange = (m, data) => {
    if (m.persist) {
      m.persist();
    }
    this.setState(state => {
      if (data) {
        return {
          ...state,
          [data.name]: data.value,
        };
      } else if (m.target) {
        const name = m.target.getAttribute('name');
        return {
          ...state,
          [name]: m.target.value,
        };
      } else {
        return {
          ...state,
          startDate: m,
        };
      }
    });
  };

  onCheckAndConfirmBookings = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const date = this.state.startDate.format('YYYY-MM-DD');
        const id = this.props.location.state.bookingDateId;
        const startDate = moment(
          `${this.state.startDate.format('YYYY-MM-DD')} ${this.state.startTime}`
        );
        const endDate = moment(
          `${date} ${this.state.endTime}`,
          'YYYY-MM-DD HH:mm'
        );
        const bookingId = this.props.match.params.bookingId;
        const message = this.state.message;

        if (this.state.checked) {
          let bookingDates;
          if (this.state.repeatedDays.length === 1) {
            bookingDates = [
              {
                id,
                start_date: `${startDate.format('YYYY-MM-DD')} ${
                  this.state.startTime
                }`,
                end_date: `${endDate.format('YYYY-MM-DD')} ${
                  this.state.endTime
                }`,
              },
            ];
          } else {
            bookingDates = this.state.repeatedDays.map(day => {
              return {
                id: day.id,
                start_date: `${moment(
                  day.start_date,
                  'YYYY-MM-DD HH:mm:ss'
                ).format('YYYY-MM-DD')} ${this.state.startTime}`,
                end_date: `${moment(day.end_date, 'YYYY-MM-DD HH:mm:ss').format(
                  'YYYY-MM-DD'
                )} ${this.state.endTime}`,
              };
            });
          }
          API.editBooking({
            booking_dates: bookingDates,
            booking_id: bookingId,
            message,
          })
            .then(res => {
              this.props.getBookings();
              this.props.history.push('/booking');
            })
            .catch(err => {
              this.setState({
                isLoading: false,
                error: err,
              });
            });
        } else {
          let bookingDates;
          if (this.state.repeatedDays.length === 1) {
            bookingDates = [
              {
                id,
                start_date: `${startDate.format('YYYY-MM-DD')} ${
                  this.state.startTime
                }`,
                end_date: `${endDate.format('YYYY-MM-DD')} ${
                  this.state.endTime
                }`,
              },
            ];
          } else {
            bookingDates = this.state.repeatedDays.map(day => {
              return {
                id: day.id,
                start_date: `${moment(
                  day.start_date,
                  'YYYY-MM-DD HH:mm:ss'
                ).format('YYYY-MM-DD')} ${this.state.startTime}`,
                end_date: `${moment(day.end_date, 'YYYY-MM-DD HH:mm:ss').format(
                  'YYYY-MM-DD'
                )} ${this.state.endTime}`,
              };
            });
          }
          API.checkBookings({
            booking_dates: bookingDates,
            booking_id: bookingId,
            message,
          })
            .then(({ data }) => {
              this.setState(
                state => {
                  return {
                    ...state,
                    isLoading: false,
                    availableAngels: data.data.available_angels,
                    unavailableAngels: data.data.unavailable_angels
                      ? data.data.unavailable_angels
                      : [],
                    checked: true,
                  };
                },
                () => {
                  this.animation = anime({
                    targets: '#angels',
                    opacity: [0, 1],
                    translateY: [-50, 0],
                    duration: 300,
                    delay: 200,
                    easing: 'linear',
                  });
                }
              );
            })
            .catch(err => {
              this.setState({
                isLoading: false,
                error: err,
              });
            });
        }
      }
    );
  };

  onCancelBooking = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        BookingAPI.cancelBooking(this.props.match.params.bookingId)
          .then(res =>
            this.setState(
              {
                isLoading: false,
              },
              () => this.props.history.push('/booking')
            )
          )
          .catch(err => {
            this.setState({
              isLoading: false,
              error: err,
            });
          });
      }
    );
  };

  renderAvailableAngels = () => {
    if (this.state.availableAngels.length > 0) {
      return this.state.availableAngels.map(angel => (
        <Angel key={angel.id} angel={angel} />
      ));
    }
    return null;
  };
  renderUnavailableAngels = () => {
    if (this.state.unavailableAngels.length > 0) {
      return this.state.unavailableAngels.map(angel => (
        <Angel key={angel.id} angel={angel} unavailable />
      ));
    }
    return null;
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  toggleRepeat = type => () => {
    if (type === 'quit') {
      this.setState(state => ({
        ...state,
        showRepeat: !state.showRepeat,
        repeatedDays: state.initialRepeatedDays,
      }));
    } else {
      this.setState(state => ({
        showRepeat: !state.showRepeat,
      }));
    }
  };

  onToggleDay = index => () => {
    this.setState(state => {
      return {
        ...state,
        repeatedDays: state.repeatedDays.map((day, i) => {
          if (index === i) {
            return {
              ...day,
              selected: !day.selected,
            };
          }
          return day;
        }),
      };
    });
  };

  render() {
    if (this.state.showRepeat) {
      return (
        <Repeat
          id={this.props.match.params.bookingId}
          bookingDates={this.state.repeatedDays}
          onGoBack={this.toggleRepeat}
          onToggleDay={this.onToggleDay}
        />
      );
    }
    return (
      <Fragment>
        <Navigation
          title={<FormattedMessage id="booking.edit.title" />}
          subTitle={
            <FormattedMessage
              id="booking.edit.subTitle"
              values={{
                id: this.props.match.params.bookingId,
              }}
            />
          }
          rightComp={() => (
            <CustomLink to="/support1" primary>
              <FormattedMessage id="navigation.support" />
            </CustomLink>
          )}
          onClose={this.props.history.goBack}
        />

        {this.state.isLoading ? <Loader isLoading /> : null}

        <DesktopError
          errors={this.state.error}
          onErrorConfirm={this.onErrorConfirm}
        />
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Fields
                onChange={this.onChange}
                startDate={this.state.startDate}
                startTime={this.state.startTime}
                endTime={this.state.endTime}
                message={this.state.message}
                isMessageEdited={this.state.isMessageEdited}
                bookingDates={this.state.repeatedDays}
                toggleRepeat={this.toggleRepeat()}
              />
            </CustomColumn>

            <CustomColumn noPadding id="angels">
              {this.state.availableAngels.length > 0 ||
              this.state.unavailableAngels.length > 0 ? (
                <React.Fragment>
                  <Divider fitted />
                  <Availability>
                    {this.renderAvailableAngels()}
                    {this.renderUnavailableAngels()}
                  </Availability>
                </React.Fragment>
              ) : null}
            </CustomColumn>
          </CustomRow>
        </ContentWrapper>
        <Confirmation>
          <Buttons
            onCheckAndConfirm={this.onCheckAndConfirmBookings}
            onCancelBooking={this.onCancelBooking}
            onCancel={this.props.history.goBack}
            checked={this.state.checked}
            available={this.state.availableAngels.length > 0 ? true : false}
          />
        </Confirmation>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBookings: () => dispatch(onGetBookings()),
});

export default connect(
  null,
  mapDispatchToProps
)(EditBooking);
