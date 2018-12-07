import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import curry from 'ramda/es/curry';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import memoizeWith from 'ramda/es/memoizeWith';
import React, { Component } from 'react';

import MembershipPeriodSelect from './components/MembershipPeriodSelect';
import MembershipTypes from './components/MembershipTypes';
import Prices from './components/Prices';

class Membership extends Component {
  setCurrentTypeInitialIndex = () => {
    if (this.props.membership && this.props.membership.current_state) {
      switch (this.props.membership.current_state) {
        case 'basic':
          return 0;
        case 'premium':
          return 2;
        default:
          return 1;
      }
    }
  };

  state = {
    currentType: 'flexible',
    currentPeriod: '_MONTHLY_',
    touched: false,
    typeInitialIndex: this.setCurrentTypeInitialIndex(),
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onPeriodSelect = period => () => {
    this.setState({
      currentPeriod: period,
    });
  };

  onTypeSelect = memoizeWith(
    (type, _) => {
      return type;
    },
    curry((type, index, _) => {
      this.setState({
        currentType: type,
        touched: true,
        typeInitialIndex: index,
      });
    })
  );

  onCancelMembership = e => {
    const data = {
      reasons: [
        {
          name: 'not_enough_usage',
          text: "I don't use the service enough.",
        },
      ],
    };

    this.props.onCancelMembership(data);
  };

  onContinue = () => {
    this.props.history.push('/connect-payment');
  };

  render() {
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navBorder
        navTitle={<FormattedMessage id="membership.title" />}
      >
        <Divider />
        <CustomRow noPadding>
          <CustomColumn>
            <MembershipPeriodSelect
              selectedPeriod={this.state.currentPeriod}
              onPeriodSelect={this.onPeriodSelect}
            />
            <MembershipTypes
              onTypeSelect={this.onTypeSelect}
              activeType={this.state.currentType}
            />
            <Prices
              typeIndex={this.state.typeInitialIndex}
              period={this.state.currentPeriod}
              selectedType={this.state.currentType}
            />
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <BasicButton primary fluid onClick={this.onContinue}>
            <FormattedMessage id="membership.button" />
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }
}

export default Membership;
