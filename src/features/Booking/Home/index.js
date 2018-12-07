import { connect } from 'react-redux';
import { FamilyTabBar, AngelTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import { isAngel } from 'Utils';
import { ProgressiveBookings } from 'Components/Progressive';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import WithRole from 'Components/WithRole';
import { Redirect } from 'react-router-dom';

import { getBookings } from '../data/selectors';
import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onGetBookings } from '../data/actions';
import AllTab from './Tabs/All';
import Tabs from './components/Tabs';

class BookingHome extends Component {
  componentDidMount() {
    this.props.getBookings();
  }

  getBookingsByType = (bookings = [], type) => {
    return bookings.filter(booking => booking.current_state.includes(type));
  };

  createTabBar = (bookings, role, isLoading) => {
    if (role === 'family') {
      return [
        {
          menuItem: 'all',
          render: () => <AllTab isLoading={isLoading} bookings={bookings} />,
        },
        {
          menuItem: 'pending',
          render: () => (
            <AllTab
              isLoading={isLoading}
              bookings={this.getBookingsByType(bookings, 'pending')}
            />
          ),
        },
        {
          menuItem: 'accepted',
          render: () => (
            <AllTab
              isLoading={isLoading}
              bookings={this.getBookingsByType(bookings, 'accepted')}
            />
          ),
        },
        {
          menuItem: 'declined',
          render: () => (
            <AllTab
              isLoading={isLoading}
              bookings={this.getBookingsByType(bookings, 'declined')}
            />
          ),
        },
        {
          menuItem: 'canceled',
          render: () => (
            <AllTab
              isLoading={isLoading}
              bookings={this.getBookingsByType(bookings, 'canceled')}
            />
          ),
        },
      ];
    } else if (role === 'angel') {
      return [
        {
          menuItem: 'all',
          render: () => <AllTab isLoading={isLoading} bookings={bookings} />,
        },
        {
          menuItem: 'pending',
          render: () => (
            <AllTab
              isLoading={isLoading}
              bookings={this.getBookingsByType(bookings, 'pending')}
            />
          ),
        },
        {
          menuItem: 'accepted',
          render: () => (
            <AllTab
              isLoading={isLoading}
              bookings={this.getBookingsByType(bookings, 'accepted')}
            />
          ),
        },
        {
          menuItem: 'declined',
          render: () => (
            <AllTab
              isLoading={isLoading}
              bookings={this.getBookingsByType(bookings, 'declined')}
            />
          ),
        },
        {
          menuItem: 'canceled',
          render: () => (
            <AllTab
              isLoading={isLoading}
              bookings={this.getBookingsByType(bookings, 'canceled')}
            />
          ),
        },
        {
          menuItem: 'given',
          render: () => (
            <AllTab
              isLoading={isLoading}
              bookings={this.getBookingsByType(bookings, 'given')}
            />
          ),
        },
      ];
    }
  };

  render() {
    return (
      <Layout
        backgroundColor="#f8f7f8"
        navLeftComponent={() => (
          <WithRole>
            {role =>
              isAngel(role) ? null : (
                <CustomLink primary role="banner" to="/booking">
                  <FormattedMessage id="navigation.agenda" />
                </CustomLink>
              )
            }
          </WithRole>
        )}
        navRightComponent={() => (
          <CustomLink primary role="banner" to="/support1">
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
        navTitle={<FormattedMessage id="booking.home.navTitle" />}
        centered
        role="main"
      >
        <Error errors={this.props.errors} onRetry={this.props.getBookings} />
        {!this.props.isLoading ? (
          <CustomRow noPadding>
            <CustomColumn noPadding width={16}>
              <WithRole>
                {role => (
                  <Tabs
                    menu={{
                      secondary: true,
                      pointing: true,
                      aligned: 'center',
                    }}
                    panes={this.createTabBar(this.props.bookings, role)}
                  />
                )}
              </WithRole>
            </CustomColumn>
          </CustomRow>
        ) : (
          [
            <Divider key={0}>
              <FormattedMessage id="outstanding" />
            </Divider>,
            <ProgressiveBookings key={1} isLoading={this.props.isLoading} />,
          ]
        )}
        <WithRole>
          {role => (isAngel(role) ? <AngelTabBar /> : <FamilyTabBar />)}
        </WithRole>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  bookings: getBookings(state),
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
});

const mapDispatchToProps = dispatch => ({
  getBookings: () => dispatch(onGetBookings()),
  onErrorConfirm: () => dispatch(onErrorConfirm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingHome);
