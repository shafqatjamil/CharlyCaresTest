import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ProgressiveBookings } from 'Components/Progressive';
import CustomColumn from 'Components/CustomColumn';
import Divider from 'Components/Divider';
import WithRole from 'Components/WithRole';
import CustomRow from 'Components/CustomRow';
import DesktopError from 'Components/DesktopError';
import React, { PureComponent } from 'react';

import { getBookings } from '../../data/selectors';
import { getErrors, getLoadingStatus } from '../../../../ui/selectors';
import { onErrorConfirm } from '../../../../ui/actions';
import { onGetBookings } from '../../data/actions';
import AllTab from '../Tabs/All';
import Tabs from '../components/Tabs';
import Container from './components/Container';

class Support1Home extends PureComponent {
  componentDidMount() {
    if (this.props.location.pathname === '/support1' || !this.props.bookings) {
      this.props.getBookings();
    }
  }

  getBookingsByType = (bookings = [], type) => {
    return bookings.filter(booking => booking.title === type);
  };
  createTabBar = (bookings, role, isLoading) => {
    
    if (role === 'family') {
      // bookings.map(function(item, i){
      if(bookings != null){
        
        return bookings.map(function(item,i){
          if(item.title != null){
            return {
              menuItem: item.title,
              render: () => (
                <AllTab 
                  isLoading={isLoading}
                  bookings={bookings.filter(booking => booking.title === item.title)}
                />
              ), 
            }
          }
          return null
        })
      }
      
    } else if (role === 'angel') {
      if(bookings != null){
        
        return bookings.map(function(item,i){
          if(item.title != null){
            return {
              menuItem: item.title,
              render: () => (
                <AllTab 
                  isLoading={isLoading}
                  bookings={bookings.filter(booking => booking.title === item.title)}
                />
              ), 
            }
          }
          return null
        })
      }
    }
  };

  render() {
    return (
      <Container>
        <DesktopError
          errors={this.props.errors}
          onRetry={this.props.getBookings}
        />

        {this.props.isLoading && this.props.location.pathname === '/booking' ? (
          [
            <Divider key={0}>
              <FormattedMessage id="outstanding" />
            </Divider>,
            <ProgressiveBookings key={1} isLoading={this.props.isLoading} />,
            <ProgressiveBookings key={2} isLoading={this.props.isLoading} />,
          ]
        ) : (
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
        )}
      </Container>
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
)(Support1Home);
