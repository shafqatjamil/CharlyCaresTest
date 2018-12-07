import React from 'react';
import styled, { keyframes } from 'styled-components';

import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';
import { isMobile } from 'react-device-detect';

const calculateTop = (hours, hasMinutes) => {
  const defaultTop = 2.7;
  if (!hours) return defaultTop;
  if (hasMinutes) {
    return hours * 2.5 + 1.1;
  }
  return hours * 2.5 + defaultTop;
};
const calculateBottom = (hours, hasMinutes) => {
  const defaultBottom = 7.2;
  if (!hours) return defaultBottom;
  if (hours < 8) {
    if (hours < 8) {
      if (hasMinutes) {
        return (3 - hours) * 2.5 + 0.8;
      }
      return (3 - hours) * 2;
    }
  }
  if (hasMinutes) {
    return (24 - hours) * 2.5 + defaultBottom - 1.8;
  }
  return (24 - hours) * 2.5 + defaultBottom;
};

const slideDown = keyframes`
  from {
     max-height: 0;
  }

  to {
    max-height: 21.785rem;
  }
`;

const StatusContainer = styled.a`
  border-radius: 2px;
  background-color: ${({ accepted, pending, theme }) =>
    accepted ? theme.acceptedGreen : theme.pendingYellow};
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
  width: 70%;
  position: absolute;
  top: ${({ from, hasMinutes }) => calculateTop(from, hasMinutes)}rem;
  bottom: ${({ to, hasMinutes }) => calculateBottom(to, hasMinutes)}rem;
  left: 50%;
  transform: translateX(-50%);
  will-change: auto;
  animation: ${slideDown} 0.6s ease-in;
  cursor: pointer;
`;

const StatusText = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 50%;
  text-align: right;
  writing-mode: vertical-rl;
  transform: translateX(-50%) rotate(-180deg);
  font-size: 0.75rem;
  color: #fff;
  line-height: 1.42;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-height: 90%;
  overflow: hidden;
`;

const TextContainer = styled.div`
  position: relative;
  height: 100%;
`;

const navigateToBookingPage = memoizeWith(
  (_, id) => id,
  curry((history, id, _ev) =>
    isMobile
      ? history.push('/booking/angel-booking/' + id)
      : history.push('/calendar/angel-booking/' + id)
  )
);

const Status = ({
  children,
  history,
  booking_id,
  from,
  to,
  accepted,
  pending,
}) => (
  <StatusContainer
    onClick={navigateToBookingPage(history, booking_id)}
    accepted={accepted}
    pending={pending}
    from={from}
    to={to}
  >
    <TextContainer>
      <StatusText>{children}</StatusText>
    </TextContainer>
  </StatusContainer>
);

export default Status;
