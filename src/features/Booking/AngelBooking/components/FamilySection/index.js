import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Header, Image } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import arrowRightIcon from 'Assets/icons/btn-large-arrow-right.svg';
import chatIcon from 'Assets/icons/btn-chat.svg';
import dayIcon from 'Assets/icons/icn-feature-day.svg';
import locationIcon from 'Assets/icons/icn-feature-location.svg';
import nightIcon from 'Assets/icons/icn-feature-night.svg';

const handleDistance = distance => {
  if (typeof distance !== 'number') return 0;
  if (distance < 1) {
    return `${distance * 1000} m`;
  }
  return `${distance} km`;
};

const goToChat = (history, id, data) => () => {
  if (isMobile) {
    history.push('/chat/' + id, data);
  } else {
    history.push('/booking/angel-booking/chat/' + id, data);
  }
};

const goToProfile = (history, id) => () => {
  history.push('/booking/angel-booking/families/' + id);
};

const cutBio = bio => {
  if (!bio) return;
  return bio.slice(0, 135) + '...';
};

const FamilySection = ({
  family,
  expectedEarnings,
  normalRate,
  extraRate,
  distance,
  history,
}) => {
  const { last_name, short_bio, image, phone, family_id, user_id } = family;
  const data = {
    name: last_name,
    phone,
  };
  return (
    <Wrapper>
      <HeaderContainer>
        <Header as="h3">
          <FormattedMessage
            id="booking.angel.offers.details.familyName"
            values={{ name: last_name }}
          />
        </Header>
        <ChatButton onClick={goToChat(history, user_id, data)}>
          <ChatIcon src={chatIcon} />
        </ChatButton>
      </HeaderContainer>
      <InfoContainer>
        <ImageContainer>
          <FamilyImage src={image} />
        </ImageContainer>
        <FamilyInfoContainer onClick={goToProfile(history, family_id)}>
          <FamilyInfo>{cutBio(short_bio)}</FamilyInfo>
          <ArrowRightBtn src={arrowRightIcon} />
        </FamilyInfoContainer>
      </InfoContainer>
      <FeaturesContainer>
        <IconsContainer>
          <FeatureIcon>
            <Image src={dayIcon} />
            <FeaturesValues>
              <FormattedNumber
                style="currency"
                value={normalRate}
                currency="EUR"
              />
            </FeaturesValues>
          </FeatureIcon>
          <FeatureIcon>
            <Image src={nightIcon} />
            <FeaturesValues>
              <FormattedNumber
                style="currency"
                value={extraRate}
                currency="EUR"
              />
            </FeaturesValues>
          </FeatureIcon>
          <FeatureIcon>
            <Image src={locationIcon} />
            <FeaturesValues>{handleDistance(distance)}</FeaturesValues>
          </FeatureIcon>
        </IconsContainer>

        <EarningContainer>
          <EarningTitle>Expected earnings</EarningTitle>
          <EarningValue>
            <FormattedNumber
              style="currency"
              value={expectedEarnings}
              currency="EUR"
            />
          </EarningValue>
        </EarningContainer>
      </FeaturesContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const FamilyInfo = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.3;
  text-align: left;
`;

const FeaturesContainer = styled.div`
  padding: 0.75rem 0.75rem ${isMobile ? '2rem' : '0.75rem'};
  display: flex;
  width: 100%;
`;

const IconsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5125rem;
`;

const ArrowRightBtn = styled.img`
  position: absolute;
  right: -0.5rem;
  bottom: 1.2rem;
`;

const EarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 0.8;
`;

const FeatureIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    margin-right: 0;
  }
`;

const FamilyInfoContainer = styled.button`
  position: relative;
  flex: 1.7;
  padding: 0;
  padding-top: 0.5rem;
  border: 0;
  background: transparent;
  &:focus {
    outline: 0;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
`;

const ImageContainer = styled.div`
  margin-right: 0.75rem;
  height: 5rem;
`;

const InfoContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 0.625rem;
  justify-content: space-between;
`;

const ChatIcon = styled.img``;

const FamilyImage = styled.img`
  width: 7.5rem;
  border: 1px solid ${({ theme }) => theme.defaultBtnBackgroundColor};
  border-radius: 4px;
  height: auto;
`;

const FeaturesValues = styled.div`
  font-size: 0.875rem;
`;

const EarningTitle = styled.div`
  font-size: 0.8125rem;
  line-height: 1.6;
`;

const EarningValue = styled.div`
  font-size: 1.5rem;
  line-height: 1.4;
`;

const ChatButton = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  position: absolute;
  top: -0.25rem;
  right: 0;
  cursor: pointer;
`;

export default FamilySection;
