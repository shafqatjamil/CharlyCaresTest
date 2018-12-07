import CustomColumn from 'Components/CustomColumn';
import ContentWrapper from 'Components/ContentWrapper';
import EmptyCell from 'Components/EmptyCell';
import CustomLink from 'Components/CustomLink';
import Confirmation from 'Components/Confirmation';
import Divider from 'Components/Divider';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import PaymentsList from './components/PaymentsList';
import ListItem from './components/ListItem';
import ConfirmationSection from './components/ConfirmationSection';

export default class PaymentsCreatePDF extends Component {
  render() {
    return (
      <Layout
        navBorder
        navTitle="Create PDF"
        onNavClose={this.props.history.goBack}
        navRightComponent={() => (
          <CustomLink fontSize="0.9375rem" to="/support">
            Support
          </CustomLink>
        )}
      >
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <Divider />
              <PaymentsList>
                <ListItem
                  sum="15,30"
                  paymentDesc="paid"
                  description="tuesday"
                  date="November 14, 2017"
                />
                <ListItem
                  sum="15,30"
                  paymentDesc="paid"
                  description="tuesday"
                  date="November 14, 2017"
                />
                <ListItem
                  sum="15,30"
                  paymentDesc="paid"
                  description="tuesday"
                  date="November 14, 2017"
                />
                <ListItem
                  sum="15,30"
                  paymentDesc="paid"
                  description="tuesday"
                  date="November 14, 2017"
                />
                <ListItem
                  sum="15,30"
                  paymentDesc="paid"
                  description="tuesday"
                  date="November 14, 2017"
                />
                <ListItem
                  sum="15,30"
                  paymentDesc="paid"
                  description="tuesday"
                  date="November 14, 2017"
                />
              </PaymentsList>
            </CustomColumn>
          </CustomRow>
          <EmptyCell padding="0 0 10rem" />
        </ContentWrapper>

        <Confirmation>
          <ConfirmationSection />
        </Confirmation>
      </Layout>
    );
  }
}
