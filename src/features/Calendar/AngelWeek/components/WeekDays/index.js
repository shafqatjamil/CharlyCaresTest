import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  z-index: 1;
  position: relative;
  background: #fff;
  padding-left: 2.21rem;
  padding-bottom: 0.275rem;
`;

const Day = styled.div`
  font-weight: 600;
  color: ${({ isToday, isBefore, theme }) =>
    isBefore ? '#c7c7c9' : theme.primaryText};
  font-size: 0.625rem;
  line-height: 1.4;
  padding-bottom: 0.625rem;
`;

const DateNum = styled.div`
  font-weight: ${({ isBefore }) => (isBefore ? 300 : 600)};
  font-size: 0.9375rem;
  line-height: 1.34;
  width: 1.9375rem;
  height: 1.9375rem;
  border: ${({ isToday, theme }) =>
    isToday ? `1px solid ${theme.primaryText};` : 'none;'};
  border-radius: ${({ isToday }) => (isToday ? `50%` : 'none;')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: ${({ theme, isBefore }) => (isBefore ? '#c7c7c9' : theme.primaryText)};

  ${({ isBefore }) =>
    isBefore &&
    `
  &:before {
    content: '';
    position: absolute;
    left: 60%;
    bottom: 20%;
    width: 100%;
    height: 1px;
    background: #c7c7c9;
    transform-origin: 0 100%;
    transform: translateX(-50%) rotate(-30deg);
  }
  
  `};
`;

const WeekDay = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const createWeek = (weekStart, weekEnd, today) => {
  const week = [];
  while (weekStart.isSameOrBefore(weekEnd)) {
    week.push({
      isToday: weekStart.isSame(today, 'day'),
      isBefore: weekStart.isBefore(today, 'day'),
      date: weekStart.format('DD'),
      name: [...weekStart.format('dd')].reduce((word, letter, i) => {
        if (i === 0) {
          return word + letter.toUpperCase();
        }
        return word;
      }, ''),
    });
    weekStart.add(1, 'day');
  }
  return week;
};

const WeekDays = ({ weekStart, weekEnd, today }) => {
  return (
    <Container>
      {createWeek(weekStart, weekEnd, today).map((day, i) => (
        <WeekDay isBefore={day.isBefore} key={i}>
          <Day isBefore={day.isBefore} isToday={day.isToday}>
            {day.name}
          </Day>
          <DateNum isToday={day.isToday} isBefore={day.isBefore}>
            {day.date}
          </DateNum>
        </WeekDay>
      ))}
    </Container>
  );
};

export default WeekDays;
