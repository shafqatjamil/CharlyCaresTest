import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import moment from 'moment';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import { getRates, getPayments, getAngelPayments } from './selectors';
import { getUserRole } from '../../../data/auth/selectors';
import { onGetRates } from './actions';
import { getAge } from 'Utils';
import { LoadableFamilyProfile } from '../../AngelFamilies/routes';
import Profile from '../components/Profile';
import { FamilyTabBar } from 'Components/NavigationTabs';
import ConfirmationSection from '../components/ConfirmationSection';
import DateTimeValues from '../components/DateTimeValues';
import RatingSection from '../components/RatingSection';
import Review from '../components/Review';
import Transaction from '../components/Transaction';

class Details extends Component {
  state = {
    payment: null,
  };

  static defaultProps = {
    rates: [],
    payments: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      this.props.location.state.from !== 'payments' &&
      this.props.role === 'family'
    ) {
      this.props.onGetRates();
    } else {
      this.getPaymentById();
      LoadableFamilyProfile.preload();
    }
  }

  getPaymentById = () => {
    let data;
    if (this.props.role === 'family') {
      data = this.props.payments.find(payment => {
        return payment.id === Number(this.props.match.params.paymentId);
      });
    } else {
      data = this.props.angelPayments.find(payment => {
        return payment.id === Number(this.props.match.params.paymentId);
      });
    }
    this.setState({
      payment: data,
    });
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
                      id={payment.family[0].family_id}
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
            {this.props.location.state &&
            this.props.location.state.from === 'payments' &&
            this.state.payment &&
            this.state.payment.rating ? (
              <Review
                rating={this.state.payment.rating.rating}
                review={this.state.payment.rating.comments}
              />
            ) : null}
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
        {this.state.payment &&
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
        )}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  rates: getRates(state),
  payments: getPayments(state),
  role: getUserRole(state),
  angelPayments: getAngelPayments(state),
});
const mapDispatchToProps = dispatch => ({
  onGetRates: () => dispatch(onGetRates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
