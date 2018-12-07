import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Grid } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import moment from 'moment';
import React from 'react';

import { getUserRole } from '../../../data/auth/selectors';
import API from './api';
import ConfirmationSection from '../components/ConfirmationSection';
import DateTimeInputs from './components/DateTimeInputs';
import DateTimeValues from '../components/DateTimeValues';
import Profile from '../components/Profile';
import RatingSection from '../components/RatingSection';
import Review from '../components/Review';
import Transaction from './components/Transaction';

class PaymentConfirmation extends React.PureComponent {
  format = 'YYYY-MM-DDTHH:mm';
  state = {
    isLoading: false,
    errors: null,
    rates: null,
    tip: 0,
    review: '',
    rating: 0,
    total: 0,
    initialTotal: 0,
    startTime: moment(
      this.props.location.state.startTime,
      'YYYY-MM-DD HH:mm:ss.SSSSSS'
    ).format('YYYY-MM-DDTHH:mm'),
    endTime: moment(
      this.props.location.state.endTime,
      'YYYY-MM-DD HH:mm:ss.SSSSSS'
    )
      .add(1, 'minute')
      .format('YYYY-MM-DDTHH:mm'),
    tempStartTime: moment(
      this.props.location.state.startTime,
      'YYYY-MM-DD HH:mm:ss.SSSSSS'
    ).format('YYYY-MM-DDTHH:mm'),
    tempEndTime: moment(
      this.props.location.state.endTime,
      'YYYY-MM-DD HH:mm:ss.SSSSSS'
    )
      .add(1, 'minute')
      .format('YYYY-MM-DDTHH:mm'),
  };

  componentDidMount() {
    this.fetchRates();
  }

  fetchRates = () => {
    const format = 'YYYY-MM-DD HH:mm:ss.SSSSSS';
    const { startTime, endTime } = this.props.location.state;
    if (startTime && endTime) {
      const startTimeTimestamp = moment(startTime, format).format('X');
      const endTimeTimestamp = moment(endTime, format).format('X');
      this.setState(
        {
          isLoading: true,
        },
        () => {
          API.getRates(startTimeTimestamp, endTimeTimestamp)
            .then(res => {
              console.log(res);
              const total = this.getTotalAmount(res.data.data.rates);
              this.setState({
                rates: res.data.data.rates,
                initialTotal: total,
                isLoading: false,
                total,
              });
            })
            .catch(err => {
              this.setState({
                errors: err,
                isLoading: false,
              });
            });
        }
      );
    }
  };

  getTotalTime = () => {
    if (this.state.rates) {
      const dayTime = this.state.rates.day_length.split(':');
      const nightTime = this.state.rates.night_length.split(':');

      return `${Number(dayTime[0]) + Number(nightTime[0])}:${Number(
        dayTime[1]
      ) + Number(nightTime[1])}`;
    }
    return '';
  };

  getTotalAmount = rates => {
    if (rates) {
      const total = rates.day_amount + rates.night_amount;
      return Number(total - Number(this.props.location.state.credit)).toFixed(
        2
      );
    }
    return 0;
  };

  onTipAndReviewChange = type => e => {
    e.persist();
    if (type === 'tip') {
      return this.setState(prevState => {
        return {
          tip: e.target.value,
          total: (
            Number(prevState.initialTotal) + Number(e.target.value)
          ).toFixed(2),
        };
      });
    }
    return this.setState({
      [type]: e.target.value,
    });
  };

  onRatingChange = (_, data) => {
    this.setState({
      rating: data.rating,
    });
  };

  onDateChange = type => e => {
    if (type === 'startTime') {
      return this.setState({
        tempStartTime: e.target.value,
      });
    }
    return this.setState({
      tempEndTime: e.target.value,
    });
  };

  onTimeBlur = type => () => {
    return this.setState(prevState => {
      const diff = moment(prevState.tempEndTime, this.format).diff(
        moment(prevState.tempStartTime, this.format),
        'hours'
      );
      if (diff < 2) {
        if (type === 'startTime') {
          return {
            startTime: prevState.tempStartTime,
            endTime: moment(prevState.tempStartTime, this.format).add(
              2,
              'hours'
            ),
          };
        } else {
          return {
            startTime: moment(prevState.tempEndTime, this.format).subtract(
              2,
              'hours'
            ),
            endTime: prevState.tempEndTime,
          };
        }
      }
      return {
        [type]: prevState.tempStartTime,
      };
    });
  };

  postBookingFinish = () => {
    API.finishBooking({
      start_time: moment(this.state.startTime, this.format).format('X'),
      end_time: moment(this.state.endTime, this.format).format('X'),
      tip: this.state.tip,
      rating: this.state.rating,
      comments: this.state.review,
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/payments/success');
        }
      })
      .catch(err => {
        this.setState({
          errors: err,
          isLoading: false,
        });
      });
  };

  onBookingFinish = () => {
    console.log(this.state);
    if (this.state.rating > 0) {
      this.setState(
        {
          isLoading: true,
        },
        this.postBookingFinish
      );
    }
  };

  onErrorConfirm = () => {
    this.setState({
      errors: null,
    });
  };

  render() {
    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="payments.family.navTitle" />}
        navSubTitle={
          <FormattedMessage
            id="payments.family.confirmation.subtitle"
            values={{
              id: this.props.location.state.bookingId,
            }}
          />
        }
        onNavBack={this.props.history.goBack}
        navRightComponent={() => (
          <CustomLink to="/support1">
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
      >
        <Loader isLoading={this.state.isLoading} />
        <Error
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        <CustomRow noPadding>
          <CustomColumn noPadding>
            {this.props.location.state.angel && (
              <Grid container>
                <CustomRow padding="1rem 0 1.125rem 0">
                  <Profile
                    name={this.props.location.state.angel.first_name}
                    age={getAge(this.props.location.state.angel.birthdate)}
                    img={this.props.location.state.angel.image}
                    phone={this.props.location.state.angel.phone}
                    id={this.props.location.state.angel.id}
                    history={this.props.history}
                    role={this.props.role}
                  />
                </CustomRow>
                <CustomRow padding="0 0 1.125rem 0">
                  <DateTimeInputs
                    onBlur={this.onTimeBlur('startTime')}
                    onChange={this.onDateChange('startTime')}
                    type="datetime-local"
                    value={this.state.tempStartTime}
                  />
                  <CustomColumn noPadding width={4}>
                    <InlineText primaryFont>
                      <FormattedMessage id="start" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn textAlign="right" width={10}>
                    <DateTimeValues>
                      {moment(this.state.startTime, 'YYYY-MM-DDTHH:mm').format(
                        'dd. DD MMMM'
                      )}
                    </DateTimeValues>
                  </CustomColumn>
                  <CustomColumn noPadding textAlign="right" width={2}>
                    <DateTimeValues>
                      {moment(this.state.startTime, 'YYYY-MM-DDTHH:mm').format(
                        'HH:mm'
                      )}
                    </DateTimeValues>
                  </CustomColumn>
                </CustomRow>
                <CustomRow padding="0 0 1.125rem 0">
                  <DateTimeInputs
                    onBlur={this.onTimeBlur('endTime')}
                    onChange={this.onDateChange('endTime')}
                    type="datetime-local"
                    value={this.state.tempEndTime}
                  />
                  <CustomColumn noPadding width={4}>
                    <InlineText primaryFont>
                      <FormattedMessage id="end" />
                    </InlineText>
                  </CustomColumn>
                  <CustomColumn textAlign="right" width={10}>
                    <DateTimeValues>
                      {moment(this.state.endTime, 'YYYY-MM-DDTHH:mm').format(
                        'dd. DD MMMM'
                      )}
                    </DateTimeValues>
                  </CustomColumn>
                  <CustomColumn noPadding textAlign="right" width={2}>
                    <DateTimeValues>
                      {moment(this.state.endTime, 'YYYY-MM-DDTHH:mm').format(
                        'HH:mm'
                      )}
                    </DateTimeValues>
                  </CustomColumn>
                </CustomRow>
                <CustomRow padding="0 0 1rem">
                  {this.state.rates && (
                    <Transaction
                      rates={this.state.rates}
                      role={this.props.role}
                      angelName={this.props.location.state.angel.first_name}
                      creditUsed={this.props.location.state.credit}
                      transactionCosts={
                        this.props.location.state.transactionCosts
                      }
                      tip={this.state.tip}
                      totalTime={this.getTotalTime()}
                      totalAmount={this.state.total}
                      onTipChange={this.onTipAndReviewChange('tip')}
                    />
                  )}
                </CustomRow>
              </Grid>
            )}
            <Divider />
            <RatingSection
              onRatingChange={this.onRatingChange}
              rating={this.state.rating}
            />
            <Review
              onReviewChange={this.onTipAndReviewChange('review')}
              review={this.state.review}
            />
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <ConfirmationSection
            formIsValid={this.state.rating > 0}
            onSubmit={this.onBookingFinish}
            sum={this.state.total}
          />
        </Confirmation>
      </Layout>
    );
  }
}

export default connect(state => ({
  role: getUserRole(state),
}))(PaymentConfirmation);
