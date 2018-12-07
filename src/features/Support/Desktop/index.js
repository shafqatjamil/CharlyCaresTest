import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import Navigation from 'Components/Navigation';
import { Segment } from 'semantic-ui-react';

import HelpBtn from '../components/HelpBtn';
import AgendaLegenda from '../components/AgendaLegenda';

const Support = ({ history }) => {
  return (
        <Fragment>
            <Navigation
                title={<FormattedMessage id="support.navTitle" />}
                rightComp={() => <HelpBtn />}
                onClose={this.onClose}
            />
            <Segment basic vertical >
                <AgendaLegenda />
            </Segment>
        </Fragment>
  );
};

export default Support;
