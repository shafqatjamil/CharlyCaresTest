import { connect } from 'react-redux';
import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import moment from 'moment';
import React from 'react';

import { getBookings } from '../data/selectors';
import AngelSection from './components/AngelSection';
import API from './api';
import DateTimeValues from './components/DateTimeValues';
import Review from './components/Review';
import Transaction from './components/Transaction';

class Details extends React.Component {
  state = {
    booking: null,
    error: null,
    isLoading: false,
  };

  static defaultProps = {
    bookings: [],
  };

  componentDidMount() {
    this.findBooking();
  }

  findBooking = () => {
    if (this.props.bookings && this.props.bookings.length) {
      const data = this.props.bookings.find(booking => {
        return booking.id === Number(this.props.match.params.bookingId);
      });
      if (data) {
        this.setState({
          booking: data,
        });
      } else {
        this.setState(
          {
            isLoading: true,
          },
          () => {
            API.getBooking(Number(this.props.match.params.bookingId))
              .then(res => {
                this.setState({
                  booking: res.data.data,
                  isLoading: false,
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
      }
    } else {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          API.getBooking(Number(this.props.match.params.bookingId))
            .then(res => {
              this.setState({
                booking: res.data.data,
                isLoading: false,
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
    }
  };

  renderAngels = () => {
    if (
      this.state.booking &&
      this.state.booking.invitations &&
      this.state.booking.invitations.length
    ) {
      return this.state.booking.invitations.map(
        ({ angel_data, current_state }) => {
          if (current_state === 'accepted') {
            return (
              <AngelSection
                angelId={angel_data[0].id}
                key={angel_data[0].id}
                name={angel_data[0].first_name}
                phone={angel_data[0].phone}
                img={angel_data[0].image}
                age={getAge(angel_data[0].birthdate)}
                history={this.props.history}
              />
            );
          }
          return null;
        }
      );
    }
    return null;
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  render() {
    console.log(this.state);
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="booking.family.details.navTitle" />}
        navSubTitle={
          <FormattedMessage
            id="booking.family.details.subTitle"
            values={{
              bookingId: this.props.match.params.bookingId,
              familyId: this.state.booking && this.state.booking.family_id,
            }}
          />
        }
        onNavBack={this.props.history.goBack}
        navRightComponent={() => {
          return (
            <CustomLink to="/support1">
              <FormattedMessage id="navigation.support" />
            </CustomLink>
          );
        }}
      >
        {this.state.isLoading ? <Loader /> : null}
        <Error errors={this.state.error} onErrorConfirm={this.onErrorConfirm} />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="1rem 0 1.125rem 0">
                {this.renderAngels()}
              </CustomRow>
              <CustomRow padding="0 0 1.125rem 0">
                <CustomColumn noPadding width={4}>
                  <InlineText primaryFont>
                    <FormattedMessage id="start" />
                  </InlineText>
                </CustomColumn>
                <CustomColumn textAlign="right" width={10}>
                  <DateTimeValues>
                    {this.state.booking &&
                      moment(
                        this.state.booking.start_date,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('dd. DD MMMM')}
                  </DateTimeValues>
                </CustomColumn>
                <CustomColumn noPadding textAlign="right" width={2}>
                  <DateTimeValues>
                    {this.state.booking &&
                      moment(
                        this.state.booking.start_date,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('HH:mm')}
                  </DateTimeValues>
                </CustomColumn>
              </CustomRow>
              <CustomRow padding="0 0 1.125rem 0">
                <CustomColumn noPadding width={2}>
                  <InlineText primaryFont>
                    <FormattedMessage id="end" />
                  </InlineText>
                </CustomColumn>
                <CustomColumn noPadding textAlign="right" width={14}>
                  <DateTimeValues>
                    {this.state.booking &&
                      moment(
                        this.state.booking.end_date,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('HH:mm')}
                  </DateTimeValues>
                </CustomColumn>
              </CustomRow>
              <CustomRow>
                {this.state.booking &&
                this.state.booking.payment &&
                this.state.booking.normal_rate &&
                this.state.booking.extra_rate ? (
                  <Transaction
                    payment={this.state.booking.payment}
                    normalRate={this.state.booking.normal_rate}
                    extraRate={this.state.booking.extra_rate}
                  />
                ) : null}
              </CustomRow>
            </Grid>
            <Divider />
            {this.state.booking && this.state.booking.rating ? (
              <Review review={this.state.booking.rating} />
            ) : null}
          </CustomColumn>
        </CustomRow>
        <FamilyTabBar />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  bookings: getBookings(state),
});

export default connect(mapStateToProps)(Details);
