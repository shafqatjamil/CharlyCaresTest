import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid, Divider } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import anime from 'animejs';
import React, { Component } from 'react';

import { getBookings } from '../selectors';
import AddAngelsSection from '../components/AddAngelsSection';
import Angel from '../components/Angel';
import API from '../../api';
import BookingInformation from '../components/BookingInformation';
import LinksSection from '../../components/LinksSection';

class OfferDetails extends Component {
  ref = React.createRef();
  state = {
    booking: null,
    errors: null,
    isLoading: false,
    showAllBookingInfo: false,
  };

  componentDidMount() {
    if (!this.props.bookings) {
      this.props.history.push('/booking');
    } else {
      this.findBooking();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.booking && this.state.booking !== prevState.booking) {
      this.infoHeight = this.ref.current.clientHeight;
      this.ref.current.style.height = 0;
    }
  }

  animateSlideDown = () => {
    this.animation = anime.timeline();
    this.animation
      .add({
        targets: this.ref.current,
        opacity: [0, 1],
        height: [0, this.infoHeight],
        duration: 400,
        easing: 'linear',
      })
      .add({
        targets: '#arrow',
        rotate: '-180deg',
        duration: 200,
        offset: '-=100',
        easing: 'linear',
      });
  };

  onOfferLook = state => () => {
    this.props.history.push('/booking/angel-offer', state);
  };

  onAcceptOffer = (bookingId, angelId) => () => {
    this.setState(
      {
        isLoading: true,
      },
      this.acceptOffer(bookingId, angelId)
    );
  };

  acceptOffer = (bookingId, angelId) => () => {
    API.onOfferAccept(bookingId, angelId)
      .then(res => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.props.history.push('/booking');
          }
        );
      })
      .catch(err => {
        this.setState({
          errors: err,
          isLoading: false,
        });
      });
  };

  renderWithType = () => {
    return this.state.booking.invitations.map(
      (
        {
          angel_data,
          current_state,
          id,
          angel_id,
          booking_id,
          booking_date_responses,
          expires_at,
          has_accepted_all_dates,
        },
        i
      ) => {
        const { first_name, image, birthdate, phone, user_id } = angel_data[0];
        const offerData = {
          startDate: this.state.booking.start_date,
          endDate: this.state.booking.end_date,
          repeatQty: this.state.booking.repeat_qty,
          bookingDateResponses: booking_date_responses,
          bookingDates: this.state.booking.bookingdates,
          bookingId: this.state.booking.id,
          angelId: angel_data[0].id,
        };
        if (current_state !== 'canceled') {
          return (
            <Angel
              key={id}
              divider={
                i === this.state.booking.invitations.length - 1 ? false : true
              }
              awaiting={
                current_state === 'pending' ||
                current_state === 'pending_payment'
              }
              declined={current_state === 'declined'}
              expired={current_state === 'expired'}
              notFullyAccepted={!has_accepted_all_dates}
              angelId={user_id}
              phone={phone}
              name={first_name}
              img={image}
              expiresAt={expires_at}
              age={getAge(birthdate)}
              maxDays={this.state.booking.repeat_qty}
              onOfferAccept={this.onAcceptOffer(
                this.state.booking.id,
                angel_data[0].id
              )}
              selectedDays={this.getSelectedDays(
                booking_date_responses,
                this.state.booking.bookingdates
              )}
              history={this.props.history}
              onOfferLook={this.onOfferLook(offerData)}
              onDeclineOffer={this.onDeclineOffer(
                this.state.booking.id,
                angel_data[0].id
              )}
            />
          );
        }

        return null;
      }
    );
  };

  getSelectedDays = (bookingDateResponses, bookingDates) => {
    return bookingDateResponses.reduce((acc, curr, i) => {
      if (
        bookingDateResponses[i].booking_date_id === bookingDates[i].id &&
        bookingDateResponses[i].current_state === 'accepted'
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  findBooking = () => {
    if (this.props.bookings && this.props.bookings.length > 0) {
      const data = this.props.bookings.find(booking => {
        return booking.id === Number(this.props.match.params.bookingId);
      });

      this.setState({
        booking: data,
      });
    }
  };

  getAngels = () => {
    return this.state.booking.invitations.map(inv => {
      return inv.angel_data[0];
    });
  };

  onDeclineOffer = (bookingId, angelId) => () => {
    this.setState(
      {
        isLoading: true,
      },
      this.declineOffer(bookingId, angelId)
    );
  };

  declineOffer = (bookingId, angelId) => () => {
    API.onOfferDecline(bookingId, angelId)
      .then(res => {
        let boging_new_state = this.state.booking;

        boging_new_state.invitations = this.state.booking.invitations.filter(
          invatation => {
            return invatation.angel_id !== angelId;
          }
        );

        this.setState(
          {
            isLoading: false,
            booking: boging_new_state,
          },
          () => {
            //this.props.history.push('/booking');
          }
        );
      })
      .catch(err => {
        this.setState({
          errors: err,
          isLoading: false,
        });
      });
  };

  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  onEditBooking = () => {
    const { id, start_date, end_date, booking_dates } = this.state.booking;
    this.props.history.push('/booking/edit/' + id, {
      start_date,
      end_date,
      bookingDateId: booking_dates[0].id,
      bookingDates: booking_dates,
    });
  };

  onCancelBooking = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        API.cancelBooking(this.state.booking.id)
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

  showAllBookingInfo = () => {
    this.setState(
      state => ({
        showAllBookingInfo: !state.showAllBookingInfo,
      }),
      () => {
        if (this.animation) {
          this.animation.reverse();
          this.animation.play();
        } else {
          this.animateSlideDown();
        }
      }
    );
  };
  render() {
    return this.props.bookings && this.state.booking ? (
      <React.Fragment>
        <Navigation
          title="Booking"
          subTitle={
            <FormattedMessage
              id="booking.offers.details"
              values={{
                bookingId: this.state.booking.id,
                familyId: this.state.booking.family_id,
              }}
            />
          }
          onBack={this.props.history.goBack}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Grid container>
              <CustomRow padding="2.5rem 0 1rem">
                <CustomColumn noPadding width={5}>
                  <InlineText bold primaryFont>
                    <FormattedMessage id="start" />
                  </InlineText>
                </CustomColumn>
                <CustomColumn textAlign="right" noPadding width={11}>
                  <InlineText bold primaryFont accentText>
                    {moment(this.state.booking.start_date).format(
                      'ddd DD MMMM'
                    )}
                  </InlineText>
                </CustomColumn>
              </CustomRow>

              <CustomRow padding="0 0 1rem 0">
                <CustomColumn noPadding>
                  <BookingInformation
                    borderTop
                    onClick={this.showAllBookingInfo}
                  />
                </CustomColumn>
              </CustomRow>
            </Grid>
            <div ref={this.ref} style={{ opacity: 0 }}>
              <Grid container>
                <CustomRow padding="1rem 0 1rem 0">
                  <CustomColumn noPadding width={5}>
                    <InlineText bold primaryFont>
                      <FormattedMessage id="start" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn textAlign="right" noPadding width={11}>
                    <InlineText bold primaryFont accentText>
                      {moment(this.state.booking.start_date).format('HH:mm')}
                    </InlineText>
                  </CustomColumn>
                </CustomRow>
                <CustomRow padding="0 0 1rem 0">
                  <CustomColumn noPadding width={5}>
                    <InlineText bold primaryFont>
                      <FormattedMessage id="end" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn textAlign="right" noPadding width={11}>
                    <InlineText bold primaryFont accentText>
                      {moment(this.state.booking.end_date).format('HH:mm')}
                    </InlineText>
                  </CustomColumn>
                </CustomRow>

                <CustomRow padding="0 0 1rem 0">
                  <CustomColumn noPadding width={5}>
                    <InlineText bold primaryFont>
                      <FormattedMessage id="repeat" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn textAlign="right" noPadding width={11}>
                    <InlineText bold primaryFont accentText>
                      {this.state.booking.repeat_qty}x
                    </InlineText>
                  </CustomColumn>
                </CustomRow>

                <CustomRow padding="0 0 1rem 0">
                  <CustomColumn noPadding width={11}>
                    <InlineText bold primaryFont>
                      <FormattedMessage id="booking.angel.offers.details.personalMessage" />
                    </InlineText>
                  </CustomColumn>
                </CustomRow>
              </Grid>
              <Paragraph light fontSize="0.9375rem">
                {this.state.booking.message}
              </Paragraph>
            </div>
            {this.state.booking.booking_dates.length ? (
              <LinksSection
                onCancel={this.onCancelBooking}
                onEdit={this.onEditBooking}
              />
            ) : null}
            {this.renderWithType()}
          </CustomColumn>
        </CustomRow>
        <Divider />
        <AddAngelsSection
          history={this.props.history}
          bookingId={this.state.booking.id}
          angels={this.getAngels()}
        />
      </React.Fragment>
    ) : null;
  }
}

const mapStateToProps = state => ({
  bookings: getBookings(state),
});

export default connect(mapStateToProps)(OfferDetails);
