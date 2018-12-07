import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import CustomLink from 'Components/CustomLink';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 1rem;
`;

const RequestWrapper = Wrapper.extend`
  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeclineButtonWrapper = styled.div`
  flex: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeclineButton = styled.button`
  font-size: 0.9375rem;
  color: ${props => props.theme.defaultBtnTextColor};
  font-family: ${props => props.theme.secondaryFont};
  line-height: 1.6;
  border: 0;
  background: transparent;

  &:focus {
    outline: 0;
  }
`;

const ButtonsSection = ({
  notFullyAccepted,
  expired,
  onOfferLook,
  onDecline,
  onAccept,
}) => {
  return expired ? (
    <RequestWrapper>
      <ButtonWrapper>
        <CustomLink primary to="booking/create">
          <FormattedMessage id="booking.offers.requestAgain" />
        </CustomLink>
      </ButtonWrapper>
    </RequestWrapper>
  ) : (
    <Wrapper>
      <DeclineButtonWrapper>
        <DeclineButton onClick={onDecline}>
          <FormattedMessage id="booking.offers.btnDecline" />
        </DeclineButton>
      </DeclineButtonWrapper>

      <ButtonWrapper>
        {notFullyAccepted ? (
          <BasicButton onClick={onOfferLook} fluid primary>
            <FormattedMessage id="booking.offers.btnViewOffer" />
          </BasicButton>
        ) : (
          <BasicButton onClick={onAccept} fluid primary>
            <FormattedMessage id="booking.offers.btnAccept" />
          </BasicButton>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ButtonsSection;
