import { Header, Grid } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { Paragraph } from 'Components/Text';
import BasicButton from 'Components/Buttons/Basic';
import CustomLink from 'Components/CustomLink';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout';
import React, { Component } from 'react';

import ButtonsContainer from '../components/ButtonsContainer';
import MembershipInfoContainer from '../components/MembershipInfoContainer';
import NoFee from '../components/NoFee';

class HowItWorks extends Component {
  navigateToBooking = () => {
    this.props.history.push('/booking');
  };

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="center">
            <Header as="h3">
              {this.props.intl.formatMessage({
                id: 'signup.family.sixthStep.header',
              })}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} textAlign="left">
            <NoFee
              text={this.props.intl.formatMessage({
                id: 'signup.family.sixthStep.noFee',
              })}
            />
            <Paragraph light fontSize="0.9375rem">
              {this.props.intl.formatMessage({
                id: 'signup.family.sixthStep.desc',
              })}
            </Paragraph>
            <MembershipInfoContainer>
              <CustomLink fontSize="1rem" to="/membership">
                {this.props.intl.formatMessage({
                  id: 'signup.family.sixthStep.info',
                })}
              </CustomLink>
            </MembershipInfoContainer>
            <ButtonsContainer>
              <BasicButton fluid primary>
                {this.props.intl.formatMessage({
                  id: 'signup.family.sixthStep.btnTrial',
                })}
              </BasicButton>
              <BasicButton onClick={this.navigateToBooking} fluid>
                {this.props.intl.formatMessage({
                  id: 'signup.family.sixthStep.btnLater',
                })}
              </BasicButton>
            </ButtonsContainer>
          </Grid.Column>
        </Grid.Row>
      </DesktopWelcomeLayout>
    );
  }
}

export default injectIntl(HowItWorks);
