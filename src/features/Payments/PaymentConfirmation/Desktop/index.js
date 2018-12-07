import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import moment from 'moment';
import React from 'react';
import API from '../api';
import ConfirmationSection from '../../components/ConfirmationSection';
import DateTimeValues from '../../components/DateTimeValues';
import Profile from '../../components/Profile';
import RatingSection from '../../components/RatingSection';
import Review from '../../components/Review';
import Transaction from '../components/Transaction';

class PaymentConfirmation extends React.PureComponent {
  state = {
    payment: null,
  };

  static defaultProps = {
    rates: [],
    payments: [],
  };

  componentDidMount() {
    this.fetchRates();
  }

  fetchRates = () => {
    const format = 'YYYY-MM-DD HH:mm:ss.SSSSSS';
    const { startTime, endTime } = this.props.location.state;
    const startTimeTimestamp = moment(startTime, format)
      .toDate()
      .getTime();
    console.log(startTimeTimestamp);
    // API.getRates(startTime, endTime)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };

  render() {
    const { payment } = this.state;
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="payments.family.navTitle" />}
        navSubTitle={
          payment ? (
            this.props.role === 'family' ? (
              <FormattedMessage
                id="payments.family.subtitleTitle"
                values={{
                  id: payment.invoice_number,
                  prefix: payment.invoice_prefix,
                }}
              />
            ) : (
              <FormattedMessage
                id="payments.angel.details.subTitle"
                values={{
                  familyId: payment.family[0].id,
                  bookingId: payment.booking_id,
                }}
              />
            )
          ) : null
        }
        onNavBack={this.props.history.goBack}
        navRightComponent={() => (
          <CustomLink to="/support1">
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            {payment && (
              <Grid container>
                <CustomRow padding="1rem 0 1.125rem 0">
                  {this.props.role === 'family' ? (
                    <Profile
                      name={payment.angel.first_name}
                      age={getAge(payment.angel.birthdate)}
                      img={payment.angel.image}
                      phone={payment.angel.phone}
                      id={payment.angel.id}
                      history={this.props.history}
                      role={this.props.role}
                    />
                  ) : (
                    <Profile
                      name={payment.family[0].last_name}
                      img={payment.family[0].image}
                      phone={payment.family[0].phone}
                      id={payment.family[0].id}
                      history={this.props.history}
                      role={this.props.role}
                    />
                  )}
                </CustomRow>
                <CustomRow padding="0 0 1.125rem 0">
                  <CustomColumn noPadding width={4}>
                    <InlineText primaryFont>
                      <FormattedMessage id="start" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn textAlign="right" width={10}>
                    <DateTimeValues>
                      {moment(
                        payment.actual_start,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('dd. DD MMMM')}
                    </DateTimeValues>
                  </CustomColumn>
                  <CustomColumn noPadding textAlign="right" width={2}>
                    <DateTimeValues>
                      {moment(
                        payment.actual_start,
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
                      {moment(payment.actual_end, 'YYYY-MM-DD HH:mm:ss').format(
                        'HH:mm'
                      )}
                    </DateTimeValues>
                  </CustomColumn>
                </CustomRow>
                <CustomRow padding="0 0 1rem">
                  <Transaction
                    rates={
                      this.props.rates
                        ? this.props.rates
                        : this.state.payment.costs_summary.rates
                    }
                    role={this.props.role}
                    angelName={this.state.payment.angel.first_name}
                    creditUsed={this.state.payment.credit_used}
                    transactionCosts={
                      this.state.payment.costs_summary.transaction
                    }
                    tip={this.state.payment.tip}
                    totalTime={this.state.payment.total_hours}
                    warning={this.state.payment.chargeback_reason}
                    totalAmount={this.state.payment.total_amount}
                    fee={this.state.payment.fee}
                  />
                </CustomRow>
              </Grid>
            )}
            <Divider />
            {/* {this.props.location.state &&
            this.props.location.state.from === 'payments' &&
            this.state.payment &&
            this.state.payment.rating ? (
              <Review
                rating={this.state.payment.rating.rating}
                review={this.state.payment.rating.comments}
              />
            ) : null} */}
            {/* {!this.state.payment.rating && (
                <RatingSection
                  stateOfPayment={this.state.payment.current_state}
                />
              )}
              {this.state.payment.rating ? (
                <Review
                  rating={this.state.payment.rating.rating}
                  review={this.state.payment.rating.comments}
                />
              ) : (
                <Review />
              )} */}
          </CustomColumn>
        </CustomRow>
        {/* {this.state.payment &&
        this.state.payment.current_state === 'chargeback' ? (
          <Confirmation>
            <ConfirmationSection
              paymentState={this.state.payment.current_state}
              sum={this.state.payment.total_amount}
              chargeLink={this.state.payment.payment_link}
            />
          </Confirmation>
        ) : (
          <FamilyTabBar />
        )} */}
      </Layout>
    );
  }
}

export default PaymentConfirmation;
