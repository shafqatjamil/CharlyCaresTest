import { connect } from 'react-redux';
import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import React, { Component } from 'react';
import CustomLink from 'Components/CustomLink';

import VerificationFailed from './components/VerificationFailed';
import VerificationSuccess from './components/VerificationSuccess';

class PaymentMethodVerification extends Component {

    

  render() {

    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="navigation.tabs.payments" />}
        navRightComponent={() => (
          <CustomLink to="/profile/settings" primary>
            <FormattedMessage id="booking.repeat.btn" />
          </CustomLink>
        )}
      >

        {this.props.isLoading && <Loader />}
        
        {(this.props.match.params.status === 'failed' ? <VerificationFailed history={this.props.history} /> : <VerificationSuccess hadPandingBooking={this.props.location.search.includes('had_pending_booking=true')} history={this.props.history} />)}

        <FamilyTabBar />
      </Layout>
    );
  }
}

export default PaymentMethodVerification;
