import { connect } from 'react-redux';
import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

class Success extends Component {
  static defaultProps = {
    paidPayments: [],
    chargeBackPayments: [],
  };

  render() {
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="booking.family.success.title" />}
        // navRightComponent={() => (
        //   <CustomLink fontSize="0.9375rem" to="/payments/pdf">
        //     <FormattedMessage id="payments.family.home.createPdfBtn" />
        //   </CustomLink>
        // )}
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>test</CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default Success;
