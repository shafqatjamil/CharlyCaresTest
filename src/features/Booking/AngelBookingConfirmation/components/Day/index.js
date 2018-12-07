import React from 'react';
import styled from 'styled-components';
import { InlineText } from 'Components/Text';

const Day = () => {
  return (
    <DayWrapper>
      <DayTimeRow>
        <div>
          <InlineText primaryFont fontSize="1.25rem">
            Monday
          </InlineText>
        </div>
        <div>
          <InlineText primaryFont>13:00 - 15:45</InlineText>
        </div>
      </DayTimeRow>
      <RepetitionsContainer>
        <SelectedDays>10</SelectedDays> / 12 days
      </RepetitionsContainer>
    </DayWrapper>
  );
};

const DayWrapper = styled.li`
  padding: 2rem 0 1rem;
  border-bottom: 1px solid #e6e6e6;
  width: 100%;

  &:first-child {
    padding: 1rem 0;
  }
`;

const DayTimeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectedDays = styled.span`
  display: inline-block;
  padding: 0.1rem 0.4rem;
  background-color: ${props => props.theme.defaultBtnBackgroundColor};
  border-radius: 0.125rem;
`;

const RepetitionsContainer = styled.div`
  padding-top: 0.5rem;
`;

export default Day;
