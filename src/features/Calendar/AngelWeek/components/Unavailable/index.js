import styled, { keyframes } from 'styled-components';

import block from 'Assets/icons/icn-block.svg';
import pattern from 'Assets/images/pattern-dash.png';

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
    if (hasMinutes) {
      return (3 - hours) * 2.5 + 0.8;
    }
    return (3 - hours) * 2;
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

const Unavailable = styled.div`
  background: rgba(241, 212, 220, 0.6) url(${pattern}) repeat;
  border: 1px solid #e7b6c4;
  width: 90%;
  position: absolute;
  top: ${({ from, hasMinutes }) => calculateTop(from, hasMinutes)}rem;
  bottom: ${({ to, hasMinutes }) => calculateBottom(to, hasMinutes)}rem;
  left: 50%;
  transform: translateX(-50%);
  animation: ${slideDown} 0.6s ease-in;
  cursor: pointer;

  &::after {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0;
    right: 0;
    background: url(${block}) no-repeat center;
    opacity: 0.6;
  }
`;

export default Unavailable;
