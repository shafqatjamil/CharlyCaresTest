import { connect } from 'react-redux';
import { Divider, Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import React, { Component, Fragment } from 'react';
import Success from 'Components/Success';

import {
  getMembershipData,
  getMembershipStatus,
  getMembershipUpdateStatus,
} from '../selectors';
import {
  onCancelMembership,
  onCancelMembershipReset,
  onSaveMembership,
  onSaveMembershipReset,
} from '../actions';
import CancelMembership from '../components/CancelMembership';
import MembershipPeriodSelect from '../components/MembershipPeriodSelect';
import MembershipTypes from '../components/MembershipTypes';
import Prices from '../components/Prices';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: sticky;
  bottom: 1rem;
  align-self: flex-end;
`;

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
    currentType:
      this.props.membership.current_state === 'canceled'
        ? 'flexible'
        : this.props.membership.current_state,
    currentPeriod: '_MONTHLY_',
    touched: false,
    typeInitialIndex: this.setCurrentTypeInitialIndex(),
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    if (this.props.isMembershipCanceled) {
      this.props.onCancelMembershipReset();
    }
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

  onMembershipUpdate = () => {
    const data = {
      membership: this.state.currentType.toLowerCase(),
      terms: this.state.currentPeriod.replace(/_/g, '').toLowerCase(),
    };

    window.analytics.track('FChoosePlan', {
      plan: this.state.currentType.toLowerCase(),
      terms: this.state.currentPeriod.replace(/_/g, '').toLowerCase(),
    });

    this.props.onSaveMembership(data);
  };

  rederCancelButton() {
    if (this.props.membership.current_state)
      return <CancelMembership onCancelMembership={this.onCancelMembership} />;

    const style = {
      paddingTop: '1.5rem',
    };

    return <div style={style} />;
  }

  render() {
    return (
      <Fragment>
        <Success
          isVisible={
            this.props.isMembershipUpdated || this.props.isMembershipUpdated
          }
          onConfirm={
            this.props.isMembershipUpdated
              ? this.props.onSaveMembershipReset
              : this.props.onCancelMembershipReset
          }
        >
          {this.props.isMembershipUpdated ? (
            <FormattedMessage id="profile.family.membership.succesfullUpdateMessage" />
          ) : (
            <FormattedMessage id="profile.family.membership.succesfullCancelMessage" />
          )}
        </Success>
        <Navigation
          title={<FormattedMessage id="profile.family.membership.navTitle" />}
          subTitle={
            this.props.membership.current_state !== 'canceled' ? (
              <FormattedMessage
                id="profile.family.membership.subtitle"
                values={{
                  date: moment(
                    this.props.membership.valid_until,
                    'YYYY-MM-DD'
                  ).format('DD-MM-YYYY'),
                }}
              />
            ) : null
          }
          onBack={this.props.history.goBack}
        />

        <Segment basic vertical>
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
          <Divider fitted />
          {this.rederCancelButton()}
        </Segment>

        <InputContainer>
              <Segment basic vertical >
                <Confirmation>
                    <BasicButton
                        primary={
                        this.props.membership.current_state === 'canceled'
                            ? true
                            : this.state.touched
                        }
                        fluid
                        disabled={
                        this.props.membership.current_state === 'canceled'
                            ? false
                            : !this.state.touched
                        }
                        onClick={this.onMembershipUpdate}
                    >
                        <FormattedMessage id="profile.family.membership.saveBtn" />
                    </BasicButton>
                </Confirmation>
              </Segment>
          </InputContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  membership: getMembershipData(state),
  isMembershipCanceled: getMembershipStatus(state),
  isMembershipUpdated: getMembershipUpdateStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onCancelMembership: data => dispatch(onCancelMembership(data)),
  onCancelMembershipReset: () => dispatch(onCancelMembershipReset()),
  onSaveMembership: data => dispatch(onSaveMembership(data)),
  onSaveMembershipReset: () => dispatch(onSaveMembershipReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Membership);
