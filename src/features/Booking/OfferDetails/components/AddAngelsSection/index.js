import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';

const AddSectionWrapper = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  padding: 1.5rem 0;
  background: #fff;
`;
const AddSectionDesc = styled.div`
  color: ${props => props.theme.defaultBtnTextColor};
  font-size: 0.75rem;
  line-height: 1.5;
  flex: 1;
  text-align: left;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  text-align: right;
`;

const onAddAngels = (history, bookingId, angels) => () => {
  history.push('/booking/search', {
    from: 'bookingDetails',
    bookingId,
    angels,
  });
};

const AddAngelsSection = ({ history, bookingId, angels }) => {
  return (
    <AddSectionWrapper>
      <AddSectionDesc>
        <FormattedMessage id="booking.offers.addAngelsDesc" />
      </AddSectionDesc>

      <ButtonWrapper>
        <BasicButton
          onClick={onAddAngels(history, bookingId, angels)}
          size="small"
          primary
        >
          <FormattedMessage id="booking.offers.addAngelsBtn" />
        </BasicButton>
      </ButtonWrapper>
    </AddSectionWrapper>
  );
};

export default AddAngelsSection;
