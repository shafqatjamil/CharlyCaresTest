import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import clockIcon from 'Assets/icons/icn-time.svg';

const ExpirationTimeContainer = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  text-align: right;
  color: ${props => props.theme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Time = styled.span`
  font-weight: 600;
  margin-left: 0.375rem;
`;

const calculateRemainingTime = expiresAt => {
  if (!expiresAt) return;
  const endTime = moment(expiresAt, 'YYYY-MM-DD HH:mm:ss');
  const now = moment();
  if (now > endTime) return;
  const totalInSec = moment.duration(endTime.diff(now)).asSeconds();
  const hours = Math.floor(totalInSec / 3600);
  const minutes = Math.floor((totalInSec % 3600) / 60);
  const seconds = Math.floor((totalInSec % 3600) % 60);

  return `${hours}h ${minutes}min ${seconds}s`;
};

const ExpirationTime = ({ expired, awaiting, declined, expiresAt }) => {
  return expired ? (
    <ExpirationTimeContainer>
      <FormattedMessage id="booking.offers.expired" />
    </ExpirationTimeContainer>
  ) : awaiting ? (
    <ExpirationTimeContainer>
      <FormattedMessage id="booking.offers.awaiting" />
    </ExpirationTimeContainer>
  ) : declined ? (
    <ExpirationTimeContainer>
      <FormattedMessage id="booking.offers.declined" />
    </ExpirationTimeContainer>
  ) : (
    expiresAt && (
      <ExpirationTimeContainer>
        <Image avatar src={clockIcon} />{' '}
        <FormattedMessage id="booking.offers.expiresIn" />{' '}
        <Time>{calculateRemainingTime(expiresAt)}</Time>
      </ExpirationTimeContainer>
    )
  );
};

export default ExpirationTime;
