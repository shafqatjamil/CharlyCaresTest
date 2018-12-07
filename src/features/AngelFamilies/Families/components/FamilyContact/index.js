import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';
import callIcon from 'Assets/icons/btn-phone.svg';
import chatIcon from 'Assets/icons/btn-chat.svg';

const goToChat = (history, id, name) => () => {
  if (isMobile) {
    history.push('/chat/' + id, { name });
  } else {
    history.push('/families/chat/' + id, { name });
  }
};
const goToFamilyProfile = (history, familyId) => () => {
  history.push('/families/' + familyId);
};

const FamilyContact = ({ name, img, phone, id, history, familyId }) => {
  return (
    <FirstRow>
      <FamilyImage src={img} />
      <ContactInfo>
        <FamilyName>{name}</FamilyName>
        <ContactButtonsContainer>
          <Button onClick={goToChat(history, id, name.replace(/Fam./g, ''))}>
            <ButtonIcon src={chatIcon} />
            <FormattedMessage id="message" />
          </Button>
          <PhoneBtn href={`tel:+${phone}`}>
            <ButtonIcon src={callIcon} />
            <FormattedMessage id="call" />
          </PhoneBtn>
        </ContactButtonsContainer>
        <MoreInfoButton onClick={goToFamilyProfile(history, familyId)}>
          <ButtonIcon src={arrowRight} />
        </MoreInfoButton>
      </ContactInfo>
    </FirstRow>
  );
};

const ContactInfo = styled.div`
  position: relative;
  width: 100%;
`;

const FirstRow = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 0.875rem;
`;

const FamilyName = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
  padding-top: 0.5rem;
`;

const FamilyImage = styled.img`
  margin-right: 0.5rem;
  width: auto;
  height: 5.0625rem;
  border-radius: 4px;
`;

const ButtonIcon = styled.img``;

const MoreInfoButton = styled.button`
  position: absolute;
  right: ${isMobile ? '-1rem' : 0};
  height: 100%;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  font-family: ${props => props.theme.secondaryFont};
  color: ${props => props.theme.secondaryColor};
  align-items: center;
  padding: 0;
  margin-right: 2rem;
  justify-content: center;
  border: 0;
  background: transparent;

  &:focus {
    outline: 0;
  }

  &:hover {
    cursor: pointer;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const PhoneBtn = styled.a`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  font-family: ${props => props.theme.secondaryFont};
  color: ${props => props.theme.secondaryColor};
  align-items: center;
  justify-content: center;
  padding: 0.1rem 0 0 0;
  margin-right: 2rem;
  max-height: 2.9375rem;

  &:focus {
    color: ${props => props.theme.secondaryColor};
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: ${props => props.theme.secondaryColor};
  }
`;

const ContactButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default withRouter(FamilyContact);
