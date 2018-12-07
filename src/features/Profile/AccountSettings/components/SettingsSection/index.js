import React from 'react';
import styled from 'styled-components';

import Heading from '../Heading';
import Container from '../Container';
import Toggle from 'Components/Toggle';
import WithRole from 'Components/WithRole';

const SettingSection = ({
  title,
  value,
  toggleName1,
  toggleName2,
  toggleVal1,
  toggleVal2,
  onSettingsChange,
  border = false,
}) => {
  return (
    <Container border={border}>
      <HeadingContainer>
        <Heading noMargin>{title}</Heading>
        {value && <Value>{value}</Value>}
      </HeadingContainer>
      <ToggleContainer>
        <ToggleName>{toggleName1}</ToggleName>
        <Toggle onChange={onSettingsChange} value={toggleVal1} />
      </ToggleContainer>
      <WithRole>
        {role => {
          if (role === 'family') {
            return (
              <ToggleContainer>
                <ToggleName>{toggleName2}</ToggleName>
                <Toggle
                  onChange={() => {}}
                  value={toggleVal2 === 1 ? true : false}
                />
              </ToggleContainer>
            );
          }
          return null;
        }}
      </WithRole>
    </Container>
  );
};

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Value = styled.div`
  font-weight: 300;
  font-size: 1rem;
`;
const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
`;

const ToggleName = styled.div`
  font-weight: 300;
  font-size: 0.9375rem;
`;

export default SettingSection;
