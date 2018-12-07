import { injectIntl } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import BasicButton from 'Components/Buttons/Basic';
import React, { Component } from 'react';

import image from 'Assets/images/security-final.svg';
import card from 'Assets/icons/icn-feature-payment-card.svg';
import check from 'Assets/icons/icn-check-blue.svg';

import Image from '../components/Image';
import Heading from '../components/Heading';
import Desc from '../components/Desc';
import RetainInfo from '../components/RetainInfo';

class NoValidMembership extends Component {
  onButtonClick = () => {
    this.props.history.push('/how-it-works');
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <Header as="h3">
              {this.props.intl.formatMessage({
                id: 'noValidMembership.title',
              })}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <Image src={image} />
            <Heading>
              {this.props.intl.formatMessage({
                id: 'noValidMembership.heading',
              })}
            </Heading>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <Desc
              icon={card}
              text={this.props.intl.formatMessage({
                id: 'noValidMembership.desc1',
              })}
            />
            <Desc
              icon={check}
              text={this.props.intl.formatMessage({
                id: 'noValidMembership.desc2',
              })}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <BasicButton onClick={this.onButtonClick} fluid primary>
              {this.props.intl.formatMessage({
                id: 'noValidMembership.btn',
              })}
            </BasicButton>
            <RetainInfo>
              {this.props.intl.formatMessage({
                id: 'noValidMembership.retainInfo',
              })}
            </RetainInfo>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default injectIntl(NoValidMembership);

{
  /* <DesktopWelcomeLayout withLogo>

          <DesktopError
            errors={this.props.errors}
            onErrorConfirm={this.props.onErrorReset}
          />
          {this.props.isLoading && <Loader />}
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} textAlign="center">
              <Header as="h3">
                <FormattedMessage
                  id={`signup.${this.props.match.params.user}.header`}
                />
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row> */
}
