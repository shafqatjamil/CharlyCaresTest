import { Select } from 'semantic-ui-react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

const CustomSelect = styled(Select)`
  &&& {
    border: 0;
    background: transparent;
    color: ${props => props.theme.secondaryColor};
    font-family: ${props => props.theme.primaryFont};
    margin-right: -0.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > .text {
      color: ${props => props.theme.secondaryColor} !important;
    }

    & > .menu {
      border: 0;
      z-index: 1000;

      & span {
        color: ${props => props.theme.secondaryColor};
      }
    }
  }
`;

const generateTimes = () => {
  let times = [];
  const mEnd = moment('23:00', 'HH:mm');
  const mStart = moment('08:00', 'HH:mm');

  let i = 0;
  while (mStart.isSameOrBefore(mEnd)) {
    times.push({
      key: i,
      value: mStart.format('HH:mm'),
      text: mStart.format('HH:mm'),
    });
    mStart.add(15, 'minutes');
    i++;
  }

  return times;
};

const DesktopTime = ({ startTime, date, type, ...rest }) => (
  <CustomSelect
    {...rest}
    compact
    options={generateTimes(date, startTime, type)}
  />
);

export default DesktopTime;
