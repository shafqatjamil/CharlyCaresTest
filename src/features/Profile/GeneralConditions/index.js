import { FamilyTabBar } from 'Components/NavigationTabs';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import List from './components/List';
import ListItem from './components/ListItem';

export default class GeneralConditions extends Component {
  render() {
    return (
      <Layout
        onNavBack={this.props.history.goBack}
        navBorder
        longTitle
        navTitle="General conditions"
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <List>
              <ListItem
                option="Gebruiksvoorwaarden"
                to="https://www.charlycares.com/gebruikersovereenkomst"
              />
              <ListItem
                option="Oppasovereenkomst"
                to="https://www.charlycares.com/oppasovereenkomst"
              />
              <ListItem
                option="Privacy statement"
                to="https://www.charlycares.com/privacy"
              />
              <ListItem
                option="Uitleg ‘Dienstverlening aan huis’"
                to="https://www.charlycares.com/regeling-dienstverlening-aan-huis"
              />
            </List>
          </CustomColumn>
        </CustomRow>
        <FamilyTabBar />
      </Layout>
    );
  }
}
