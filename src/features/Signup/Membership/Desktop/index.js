import { FormattedMessage, injectIntl } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import curry from 'ramda/es/curry';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import memoizeWith from 'ramda/es/memoizeWith';
import React, { Component } from 'react';

import MembershipPeriodSelect from '../components/MembershipPeriodSelect';
import MembershipTypes from '../components/MembershipTypes';
import Prices from '../components/Prices';

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
      <DesktopWelcomeLayout withLogo>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <Header as="h3">
              {this.props.intl.formatMessage({
                id: 'membership.title',
              })}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
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
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <BasicButton primary fluid onClick={this.onContinue}>
              <FormattedMessage id="membership.button" />
            </BasicButton>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default injectIntl(Membership);
