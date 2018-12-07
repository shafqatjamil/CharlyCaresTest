import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { InlineText, Paragraph } from 'Components/Text';
import { Redirect } from 'react-router-dom';
import Background from 'Components/Background';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Heading from 'Components/Heading';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import API from '../../data/user/api';

import backgroundImg from 'Assets/images/website-frontpage.jpg';

export default class Welcome extends Component {
  static defaultProps = {
    allowedRoles: [],
  };

  componentDidMount() {
    this.props.preloadLogin();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
      return true;
    }
    return false;
  }

  onSignupFamily = () => {
    this.props.history.push('/signup/family');
  };

  onSignupAngel = () => {
    this.props.history.push('/signup/angel');
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/booking" />;
    }

    return (
      <Layout noNav>
        <Background src={backgroundImg} />
        <CustomRow>
          <CustomColumn verticalAlign="bottom">
            <Grid centered>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Heading secondary as="h3">
                    <FormattedMessage id="welcome.header" />
                  </Heading>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <CustomColumn>
                  <Paragraph textAlign="center" fontSize="0.875em" secondary>
                    <FormattedMessage id="welcome.description" />
                  </Paragraph>
                </CustomColumn>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <BasicButton primary onClick={this.onSignupFamily} fluid>
                    <FormattedMessage id="welcome.parentsBtn" />
                  </BasicButton>
                </Grid.Column>
              </Grid.Row>
              <CustomRow noPadding textAlign="center">
                <Paragraph secondary>
                  <FormattedMessage id="welcome.or" />
                </Paragraph>
              </CustomRow>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <BasicButton
                    onClick={this.onSignupAngel}
                    outline="rgba(255,255,255,0.75)"
                    fluid
                  >
                    <FormattedMessage id="welcome.babysiterBtn" />
                  </BasicButton>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <InlineText secondary>
                    <FormattedMessage id="welcome.haveAcc" />
                  </InlineText>
                  <CustomLink to="/login">
                    <FormattedMessage id="welcome.logIn" />
                  </CustomLink>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </CustomColumn>
        </CustomRow>
      </Layout>
    );
  }
}
