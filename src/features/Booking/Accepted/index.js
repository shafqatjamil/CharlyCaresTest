import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import Layout from 'Components/Layout';
import moment from 'moment';
import React from 'react';

import { getBookings } from '../data/selectors';
import { getUserRole } from '../../../data/auth/selectors';
import AngelSection from './components/AngelSection';
import BookingInformation from './components/BookingInformation';
import LinksSection from '../components/LinksSection';

class AcceptedBooking extends React.Component {
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

  onEditBooking = () => {
    const { id, start_date, end_date, booking_dates } = this.state.booking;
    this.props.history.push('/booking/edit/' + id, {
      start_date,
      end_date,
      bookingDateId: booking_dates[0].id,
    });
  };

  render() {
    if (!this.state.booking) return null;

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
    console.log(this.state);
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navTitle="Booking"
        navSubTitle={
          <FormattedMessage
            id="booking.accepted.subTitle"
            values={{ familyId: family_id, bookingId: id }}
          />
        }
        navRightComponent={() => (
          <CustomLink to="/support1" primary>
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        <ContentWrapper>
          <CustomRow padding="1rem 0 1rem 0">
            <Divider />
            <Grid container>
              <CustomRow>
                <CustomColumn noPadding>
                  {this.props.role === 'family' &&
                  angel_data &&
                  angel_data[0] ? (
                    <AngelSection
                      angelId={angel_data ? angel_data[0].id : null}
                      name={angel_data ? angel_data[0].first_name : null}
                      phone={angel_data ? angel_data[0].phone : null}
                      img={angel_data ? angel_data[0].image : null}
                      age={getAge(angel_data ? angel_data[0].birthdate : null)}
                      history={this.props.history}
                    />
                  ) : this.props.role === 'angel' &&
                  family_data &&
                  family_data[0] ? (
                    <AngelSection
                      angelId={family_data[0].id}
                      name={family_data[0].first_name}
                      phone={family_data[0].phone}
                      img={family_data[0].image}
                      age={getAge(family_data[0].birthdate)}
                      history={this.props.history}
                    />
                  ) : null}
                </CustomColumn>
              </CustomRow>
              <CustomRow noPadding>
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
              <CustomRow padding="1rem 0 0 0">
                <CustomColumn noPadding>
                  <BookingInformation message={this.state.booking.message} />
                </CustomColumn>
              </CustomRow>
              <CustomRow noPadding>
                <CustomColumn noPadding>
                  <LinksSection onEdit={this.onEditBooking} />
                </CustomColumn>
              </CustomRow>
            </Grid>
          </CustomRow>
          <EmptyCell />
        </ContentWrapper>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  bookings: getBookings(state),
  role: getUserRole(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptedBooking);
