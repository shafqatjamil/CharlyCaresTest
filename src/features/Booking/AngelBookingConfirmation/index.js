import { Grid, Header } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import { Paragraph } from 'Components/Text';
import Confirmation from 'Components/Confirmation';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import DaysList from './components/DaysList';
import Day from './components/Day';
import ConfirmationSection from './components/ConfirmationSection';

export default class AngelBookingConfirmation extends Component {
  render() {
    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle="Confirmation"
        navSubTitle="detail: BKF-2323-23"
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.5rem 0 0 0">
                <Header as="h3">Summary</Header>
              </CustomRow>
              <CustomRow padding="0 0 1rem 0">
                <Paragraph light fontSize="0.9375rem">
                  We’ll send your offer for confirmation to family de Jong, and
                  will keep you posted. Bla bla bla.
                </Paragraph>
              </CustomRow>
              <CustomRow>
                <DaysList>
                  <Day />
                  <Day />
                  <Day />
                </DaysList>
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <ConfirmationSection />
        </Confirmation>
      </Layout>
    );
  }
}
