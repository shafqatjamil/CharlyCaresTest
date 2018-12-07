import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import memoizeWith from 'ramda/es/memoizeWith';
import curry from 'ramda/es/curry';
import arrow from 'Assets/icons/btn-small-forward.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
`;

const RepeatValue = styled.span`
  color: ${({ theme }) => theme.secondaryColor};
  font-family: ${({ theme }) => theme.primaryFont};
`;

const NavigateToRepeatsBtn = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 1rem;

  &:focus {
    outline: 0;
  }
`;

const ArrowImg = styled.img`
  position: absolute;
  right: -0.375rem;
  top: -0.5rem;
`;

const navigateToRepeats = memoizeWith(
  (_, id) => id,
  curry((history, dayId, _ev) => {
    history.push('/booking/repeat/' + dayId);
  })
);

const Repeat = ({ repeats, history, dayId }) => (
  <Container>
    <div>
      <FormattedMessage id="repeat" />
    </div>
    <NavigateToRepeatsBtn onClick={navigateToRepeats(history, dayId)}>
      <RepeatValue>{repeats} x</RepeatValue>
      <ArrowImg src={arrow} />
    </NavigateToRepeatsBtn>
  </Container>
);

export default withRouter(Repeat);
