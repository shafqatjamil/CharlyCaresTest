import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Image, Rating } from 'semantic-ui-react';
import { renderDistanceInKilometers, renderTimeInHours } from 'Utils';
import React from 'react';
import styled from 'styled-components';

import babyIcon from 'Assets/icons/icn-feature-baby.svg';
import connectionsIcon from 'Assets/icons/icn-feature-connections.svg';
import dayIcon from 'Assets/icons/icn-feature-day.svg';
import locationIcon from 'Assets/icons/icn-feature-location.svg';
import nightIcon from 'Assets/icons/icn-feature-night.svg';

const FeaturesContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 3.2vw;
  min-width: 16px;
`;

const CustomHeader = styled.h5`
  margin: 0;
`;

const FeatureDesc = styled.div`
  font-size: 0.75rem;
`;

const ResponseTime = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
`;

const onAngelSelect = (history, angelId) => () => {
  history.push(`/angel/${angelId}`);
};

const AngelFeatures = ({
  name,
  age,
  liked,
  onLike,
  rating,
  onRate,
  distance,
  dailyPrice,
  nightlyPrice,
  baby,
  connections,
  avgResponse,
  history,
  angelId,
}) => {
  return (
    <div onClick={onAngelSelect(history, angelId)}>
      <CustomHeader>
        {name} ({getAge(age)})
      </CustomHeader>
      <Rating
        size="mini"
        rating={Math.round(rating)}
        onRate={onRate}
        maxRating={5}
      />
      <FeaturesContainer>
        <Feature>
          <Image src={locationIcon} />
          <FeatureDesc>{renderDistanceInKilometers(distance)}</FeatureDesc>
        </Feature>
        <Feature>
          <Image src={dayIcon} />
          <FeatureDesc>€ {dailyPrice}</FeatureDesc>
        </Feature>
        <Feature>
          <Image src={nightIcon} />
          <FeatureDesc>€ {nightlyPrice}</FeatureDesc>
        </Feature>
        {connections && (
          <Feature>
            <Image src={connectionsIcon} />
            <FeatureDesc>{connections}</FeatureDesc>
          </Feature>
        )}

        {baby && (
          <Feature>
            <Image src={babyIcon} />
            <FeatureDesc>baby</FeatureDesc>
          </Feature>
        )}
      </FeaturesContainer>
      <ResponseTime>
        <FormattedMessage id="booking.search.responseTime" />{' '}
        {renderTimeInHours(avgResponse)}
      </ResponseTime>
    </div>
  );
};

export default AngelFeatures;
