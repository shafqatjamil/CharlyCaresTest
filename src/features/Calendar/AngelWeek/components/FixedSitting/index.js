import styled from 'styled-components';

import reload from 'Assets/icons/icn-fixed-sitting-small.svg';

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

const FixedSitting = styled.div`
  background: rgba(170, 170, 170, 0.4);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  width: 90%;
  position: absolute;
  top: ${({ from, hasMinutes }) => calculateTop(from, hasMinutes)}rem;
  bottom: ${({ to, hasMinutes }) => calculateBottom(to, hasMinutes)}rem;
  left: 50%;
  transform: translateX(-50%);

  &::after {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    background: url(${reload}) no-repeat center;
  }
`;

export default FixedSitting;
