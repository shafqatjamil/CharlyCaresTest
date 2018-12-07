import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid, Segment } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React, { Component, Fragment } from 'react';

import { getBookings } from '../../data/selectors';
import AngelSection from '../components/AngelSection';
import BookingInformation from '../components/BookingInformation';
import LinksSection from '../../components/LinksSection';

class AcceptedBooking extends Component {
  state = {
    booking: null,
  };

  componentDidMount() {
    this.findBooking();
  }

  findBooking = () => {
    const data = this.props.bookings.find(booking => {
      return booking.id === Number(this.props.match.params.bookingId);
    });

    this.setState({
      booking: data,
    });
  };

  render() {
    if (this.state.booking) {
      const {
        angel_data,
        start_date,
        end_date,
        id,
        family_id,
        family_data,
        created_at,
        expires_at,
      } = this.state.booking;
      return (
        <Fragment>
          <Navigation
            title="Booking"
            subTitle={
              <FormattedMessage
                id="booking.accepted.subTitle"
                values={{ familyId: family_id, bookingId: id }}
              />
            }
            onBack={this.props.history.goBack}
          />

          {/*navRightComponent={() => (
            <CustomLink to="/support" primary>
              <FormattedMessage id="navigation.support" />
            </CustomLink>
          )}*/}

          <Segment basic vertical>
            <AngelSection
              angelId={angel_data[0].id}
              name={angel_data[0].first_name}
              phone={angel_data[0].first_name}
              img={angel_data[0].image}
              age={getAge(angel_data[0].birthdate)}
              history={this.props.history}
            />
          </Segment>

          <Grid container>
            <CustomRow>
              <CustomColumn padding="0 1rem 0 0" width={6}>
                <InlineText bold primaryFont>
                  <FormattedMessage id="booking.accepted.start" />
                </InlineText>
              </CustomColumn>
              <CustomColumn noPadding textAlign="right" width={7}>
                <InlineText accentText bold primaryFont>
                  {moment(
                    this.props.role === 'family' ? start_date : created_at,
                    'YYYY-MM-DD HH:mm:ss'
                  ).format('ddd MMMM DD')}
                </InlineText>
              </CustomColumn>
              <CustomColumn textAlign="right" padding="0 0 0 1rem" width={3}>
                <InlineText accentText bold primaryFont>
                  {moment(
                    this.props.role === 'family' ? start_date : created_at,
                    'YYYY-MM-DD HH:mm:ss'
                  ).format('HH:mm')}
                </InlineText>
              </CustomColumn>
            </CustomRow>
            <CustomRow>
              <CustomColumn padding="0 1rem 0 0" width={6}>
                <InlineText bold primaryFont>
                  <FormattedMessage id="booking.accepted.end" />
                </InlineText>
              </CustomColumn>
              <CustomColumn textAlign="right" padding="0 0 0 1rem" width={10}>
                <InlineText accentText bold primaryFont>
                  {moment(
                    this.props.role === 'family' ? end_date : expires_at,
                    'YYYY-MM-DD HH:mm:ss'
                  ).format('HH:mm')}
                </InlineText>
              </CustomColumn>
            </CustomRow>
          </Grid>

          <Segment basic vertical>
            <BookingInformation />
          </Segment>

          <Segment basic vertical>
            <LinksSection />
          </Segment>
        </Fragment>
      );
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  bookings: getBookings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptedBooking);
