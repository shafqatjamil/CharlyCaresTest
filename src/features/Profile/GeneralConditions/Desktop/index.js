import { Segment } from 'semantic-ui-react';
import Navigation from 'Components/Navigation';
import React, { Component, Fragment } from 'react';

import List from '../components/List';
import ListItem from '../components/ListItem';

export default class GeneralConditions extends Component {
  render() {
    return (
      <Fragment>
        <Navigation
          title="General conditions"
          onBack={this.props.history.goBack}
        />
        <Segment basic vertical>
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
        </Segment>
      </Fragment>
    );
  }
}
