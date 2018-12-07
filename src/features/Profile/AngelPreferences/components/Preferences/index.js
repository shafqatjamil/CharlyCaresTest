import React from 'react';
import styled from 'styled-components';
import Toggle from 'Components/Toggle';
import { FormattedMessage } from 'react-intl';

const Container = styled.div`
  padding: 1.5rem 1rem;
`;

const Heading = styled.h1`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.primaryFont};
  font-weight: 600;
`;

const PreferenceHeading = Heading.extend`
  font-size: 0.975rem;
  margin-bottom: 0;
`;

const Desc = styled.p`
  font-weight: 300;
  font-size: 0.975rem;
`;

const PreferencesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Preference = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.defaultGrey};

  &:last-child {
    border-bottom: 0;
  }
`;
const PreferenceName = styled.div`
  font-size: 0.975rem;
  font-weight: 300;
`;

const renderPreferences = (preferencesObj, onPreferenceChange) => {
  if (!Object.keys(preferencesObj).length) return null;
  return Object.entries(preferencesObj).map((preference, i) => {
    return (
      <Preference key={i}>
        <PreferenceName>
          <FormattedMessage id={`profile.angel.preferences.${preference[0]}`} />
        </PreferenceName>
        <Toggle
          onChange={onPreferenceChange(preference[0])}
          value={preference[1]}
          name={preference[0]}
        />
      </Preference>
    );
  });
};

const Preferences = ({ preferences, onPreferenceChange }) => (
  <Container>
    <Heading>
      <FormattedMessage id="profile.angel.preferences.heading" />
    </Heading>
    <Desc>
      <FormattedMessage id="profile.angel.preferences.desc" />
    </Desc>
    <PreferenceHeading>
      <FormattedMessage id="profile.angel.preferences.preferencesSectionHeading" />
    </PreferenceHeading>
    <PreferencesList>
      {renderPreferences(preferences, onPreferenceChange)}
    </PreferencesList>
  </Container>
);

export default Preferences;
