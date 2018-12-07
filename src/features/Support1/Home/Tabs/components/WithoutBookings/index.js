import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import CustomRow from 'Components/CustomRow';
import React from 'react';

const onFirstBooking = (history): Function => (): void =>
  history.push('/booking/create');

const WithoutBookings = ({ history }) => (
  <Grid container>
    <CustomRow padding="5.5em 0 1rem">
      <Grid.Column>
        <Header as="h3">
          <FormattedMessage id="No Support Item" />
        </Header>
      </Grid.Column>
    </CustomRow>
    <CustomRow padding="0 0 1rem">
      <Grid.Column>
        <FormattedMessage id="We are Coming soon" />
      </Grid.Column>
    </CustomRow>
    <CustomRow padding="0 0 1rem">
      <Grid.Column>
        <FormattedMessage id="Thanks for your patience :)" />
      </Grid.Column>
    </CustomRow>
    <CustomRow>
      {/* <BasicButton primary fluid onClick={onFirstBooking(history)}>
        <FormattedMessage id="booking.home.all.btn" />
      </BasicButton> */}
    </CustomRow>
  </Grid>
);

export default WithoutBookings;
