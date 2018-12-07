import { FamilyTabBar } from 'Components/NavigationTabs';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import ConfigList from './components/ConfigList';
import ConfigItem from './components/ConfigItem';

export default class GeneralConditions extends Component {
  render() {
    return (
      <Layout
        navBorder
        longTitle
        navTitle="Need help?"
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <ConfigList>
                <ConfigItem
                name={<FormattedMessage id="profile.family.help.li1" />}
                to="https://www.charlycares.com/support"
                />
                <ConfigItem
                name={<FormattedMessage id="profile.family.help.li2" />}
                value="06 40 59 22 93"
                />
                <ConfigItem
                name={<FormattedMessage id="profile.family.help.li3" />}
                to="https://www.charlycares.com/"
                />
                <ConfigItem
                name={<FormattedMessage id="profile.family.help.li4" />}
                value="020 - 210 23 23"
                />
          </ConfigList>
          </CustomColumn>
        </CustomRow>
        <FamilyTabBar />
      </Layout>
    );
  }
}