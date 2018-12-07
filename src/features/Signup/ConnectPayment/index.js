import { injectIntl } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import React, { Component } from 'react';

import PromotionalCode from './components/PromotionalCode';
import ConnectToAccount from './components/ConnectToAccount';
import API from './api';

class ConnectPayment extends Component {
  state = {
    coupon: '',
    isLoading: false,
    type: null,
    message: null,
    errors: null,
  };

  addPromoCode = () => {
    this.setState({ isLoading: true }, () => {
      API.addPromoCode(this.state.coupon)
        .then(res => {
          this.setState({
            isLoading: false,
            type: res.data.message,
            message: res.data.data,
            isCodeValid:
              res.data.data.message === 'not_found' ||
              res.data.data.message === 'invalid'
                ? false
                : true,
          });
        })
        .catch(err => {
          this.setState({ errors: err });
        });
    });
  };

  onCouponChange = e => {
    this.setState({
      coupon: e.target.value,
    });
  };

  onErrorConfirm = () => {
    this.setState({ errors: null });
  };

  render() {
    return (
      <Layout
        navTitle={this.props.intl.formatMessage({
          id: 'connectPayment.title',
        })}
        navBorder
      >
        <Error
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        {this.state.isLoading ? <Loader /> : null}
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <PromotionalCode
              onPromoCodeChange={this.onCouponChange}
              promoCode={this.state.coupon}
              onApply={this.addPromoCode}
              type={this.state.type}
              message={this.state.message}
              isCodeValid={this.state.isCodeValid}
            />
            <Divider />
            <ConnectToAccount link={this.props.paymentLink} />
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default injectIntl(ConnectPayment);
