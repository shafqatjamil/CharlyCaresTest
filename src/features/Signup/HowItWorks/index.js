import { injectIntl } from 'react-intl';
import { Header } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import CustomLink from 'Components/CustomLink';
import BasicButton from 'Components/Buttons/Basic';
import Layout from 'Components/Layout';
import NoFee from './components/NoFee';
import ButtonsContainer from './components/ButtonsContainer';
import MembershipInfoContainer from './components/MembershipInfoContainer';
import React, { Component } from 'react';

class HowItWorks extends Component {
  navigateToBooking = () => {
    this.props.history.push('/booking');
  };

  render() {
    return (
      <Layout>
        <CustomRow padding="2.5rem 0 0 0">
          <CustomColumn>
            <Header>
              {this.props.intl.formatMessage({
                id: 'signup.family.sixthStep.header',
              })}
            </Header>
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
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}

export default injectIntl(HowItWorks);
