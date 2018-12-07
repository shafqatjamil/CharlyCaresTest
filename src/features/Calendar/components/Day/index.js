import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import uuid from 'uniqid';

const Day = ({
  number,
  today,
  bookingId,
  showBookings,
  history,
  details,
  role,
  id,
  angel_id,
  week_number,
  eventsData = [],
  isBeforeToday,
}) => {
  const filteredEventsByRole = eventsData.filter(e => {
    if (role === 'family') {
      return (
        e.current_state === 'new' ||
        e.current_state === 'accepted' ||
        e.current_state === 'pending'
      );
    }
    return true;
  });

  return (
    <DayContainer
      onClick={
        week_number !== -1 &&
        week_number !== undefined &&
        !isNaN(week_number) &&
        showBookings &&
        role === 'angel'
          ? navigateToWeekPage(history, week_number)
          : details && details.start_date
          ? navigateToDetailPage(history, details, angel_id)
          : null
      }
      today={today}
      isBeforeToday={isBeforeToday}
      role={role}
      eventsData={filteredEventsByRole}
      empty={!number}
      id={today ? 'today' : null}
    >
      <React.Fragment>
        {role === 'family' ? (
          number
        ) : (
          <InnerDayContainer eventsData={filteredEventsByRole} role={role}>
            {number}
          </InnerDayContainer>
        )}
        {showBookings ? (
          <DotsContainer today={today}>
            {generateEventDots(filteredEventsByRole, role)}
          </DotsContainer>
        ) : null}
      </React.Fragment>
    </DayContainer>
  );
};

// const navigateToBookingPage = memoizeWith(
//   (_, id) => id,
//   curry(
//     (history, id, _ev) =>
//       isMobile
//         ? history.push('/booking/details/' + id)
//         : history.push('/calendar/booking/details/' + id)
//   )
// );

const navigateToWeekPage = memoizeWith(
  (_, id) => id,
  curry((history, id, _ev) => history.push('/calendar/week', id))
);

/*const navigateToWeekPage = (history, week_number) => () => {
  history.push('/calendar/week/' + week_number)
};*/

const navigateToDetailPage = memoizeWith(
  () => uuid(),
  curry((history, details, angel_id, _ev) =>
    isMobile
      ? history.push('/calendar/availability-detail/', details)
      : history.push(
          '/calendar/availability/' + angel_id + '/availability-detail/',
          details
        )
  )
);

const DayContainer = styled.div`
  ${isMobile
    ? `width: 10.5%; height: 9.6vw;`
    : `width: 2.153rem; height: 2.153rem;`} display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9375rem;
  font-weight: 600;
  margin-right: 4.28%;
  margin-bottom: 1rem;
  position: relative;
  cursor: pointer;

  ${props =>
    props.today &&
    `
    border: 2px solid ${props.theme.primaryText};
    border-radius: 50%;`} ${props =>
    getStyleOfState(props)}
    
  &:nth-child(7n) {
    margin-right: 0;
  }
`;

const InnerDayContainer = styled.div`
  position: relative;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: ${props => (props.today ? '-0.85rem' : '-0.575rem')};
  left: 0;
  right: 0;
  display: flex;

  justify-content: space-around;
`;

const Dot = styled.div`
  position: relative;
  border-radius: 50%;
  width: 0.625rem;
  height: 0.625rem;
  ${props => getDotStyle(props)};
`;

function isAvailableInMorning(startDate) {
  return moment(startDate).isBetween(
    moment('00:00', 'HH:mm'),
    moment('15:00', 'HH:mm')
  );
}

function generateEventDots(eventsData, role) {
  if (!eventsData) return null;
  return eventsData
    .filter(e => {
      return (
        e.current_state !== 'available' && e.current_state !== 'unavailable'
      );
    })
    .map((event, i) => {
      return <Dot key={i} event={event.current_state} userRole={role} />;
    });
}

function getDotStyle(props) {
  if (
    (props.event === 'pending' ||
      props.event === 'accepted' ||
      props.event === 'new') &&
    props.userRole === 'family'
  ) {
    switch (props.event) {
      case 'pending':
        return `
          background: #fff;
          border: 3px solid ${props.theme.orange};
        `;
      case 'new':
        return `
          background: ${props.theme.primaryColor};
        `;
      case 'canceled':
        return `
          background: ${props.theme.secondaryColor};
        `;
      case 'pending-approval':
        return `
          background: props.theme.orange;
        `;
      case 'accepted':
        return `
          background: ${props.theme.green};
          z-index: 10;
        `;
      case 'declined':
        return `
          border: 3px solid ${props.theme.secondaryColor};
          background: #fff;
          z-index: 10;
        `;
      case 'standby':
        return `
          border: 3px solid ${props.theme.primaryColor};
          background: #fff;
          z-index: -1;
      `;
      default:
        return null;
    }
  }
}

function getStyleOfState(props) {
  if (props.empty) return;
  if (props.isBeforeToday) {
    return `
      color: ${props.theme.grey};
      position: relative;
      font-weight: 400;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 90%;
        height: 1px;
        background: ${props.theme.grey};
        transform-origin: 0 100%;
        transform: rotate(-30deg) translate(25%, -5px);
      }`;
  }

  if (!props.eventsData.length) {
    return `
      background: ${props.theme.defaultGrey};
      border-radius: 50%;
  `;
  }

  const isThereAvailable = props.eventsData.find(
    data => data.current_state === 'available'
  );

  return props.eventsData
    .filter(event => {
      return (
        event.current_state !== 'pending' &&
        event.current_state !== 'accepted' &&
        event.current_state !== 'new' &&
        event.current_state !== 'standby' &&
        event.current_state !== 'declined' &&
        event.current_state !== 'pending-approval'
      );
    })
    .reduce((style, event, i) => {
      if (event.current_state === 'unavailable' && Boolean(isThereAvailable))
        return style;

      switch (event.current_state) {
        case 'available':
          if (isAvailableInMorning(event.start_date)) {
            return style.concat(`
              &:after {
                content: '';
                position: absolute;
                left:0;
                top: 0;
                background: ${props.theme.defaultGrey};
                ${
                  isMobile
                    ? `height: 9.6vw; width: 4.8vw;`
                    : `height: 100%; width: 50%;`
                }
                border-top-left-radius: 36px;
                border-bottom-left-radius: 36px;
                border-right: 0;
                z-index: -1;
                transform: rotate(30deg) translate(-0.1875rem, -0.25rem);
              } 
              `);
          }
          return style.concat(`
              &:after {
                content: '';
                position: absolute;
                left: -1px;
                top: -2px;
                background: ${props.theme.defaultGrey};
                ${
                  isMobile
                    ? `height: 9.6vw; width: 4.8vw;`
                    : `height: 100%; width: 50%;`
                }
                border-top-left-radius: 36px;
                border-bottom-left-radius: 36px;
                border-right: 0;
                z-index: -1;
                ${
                  props.role === 'family'
                    ? 'transform: rotate(-150deg) translate(-100%, 12%);'
                    : 'transform: rotate(-200deg) translate(-101%,-12%);'
                }
                
              }
            `);

        case 'unavailable':
          if (event.all_day === 1) {
            return style.concat(`
            color: ${props.theme.grey};
            position: relative;
            font-weight: 400;

            &::before {
              content: '';
              position: absolute;
              left: 0;
              bottom: 0;
              width: 90%;
              height: 1px;
              background: ${props.theme.grey};
              transform-origin: 0 100%;
              transform: rotate(-30deg) translate(25%, -5px);
            }
            `);
          }
          if (isAvailableInMorning(event.start_date)) {
            return style.concat(`
            &:after {
              content: '';
              position: absolute;
              left: -1px;
              top: -2px;
              background: ${props.theme.defaultGrey};
              ${
                isMobile
                  ? `height: 9.6vw; width: 4.8vw;`
                  : `height: 100%; width: 50%;`
              }
              border-top-left-radius: 36px;
              border-bottom-left-radius: 36px;
              border-right: 0;
              z-index: -1;
              ${
                props.role === 'family'
                  ? 'transform: rotate(-150deg) translate(-100%, 12%);'
                  : 'transform: rotate(-200deg) translate(-101%,-12%);'
              }
              
            }
        `);
          }
          return style.concat(`
              &:after {
                content: '';
                position: absolute;
                left: ${
                  props.today && !isMobile
                    ? '1px'
                    : props.today && isMobile
                    ? '-3px'
                    : '2px'
                };
                top: ${
                  props.today && !isMobile
                    ? '-1px'
                    : props.today && isMobile
                    ? '-3px'
                    : '1px'
                };
                background: ${props.theme.defaultGrey};
                ${
                  isMobile
                    ? `height: 9.6vw; width: 4.8vw;`
                    : `height: 100%; width: 50%;`
                }
                border-top-left-radius: 36px;
                border-bottom-left-radius: 36px;
                border-right: 0;
                z-index: -1;
                transform: rotate(30deg) translate(-0.1875rem, -0.25rem);
              } 
            `);
        case 'fixed_sitting':
          return style.concat(`
          background: ${props.theme.darkGray};
          border-radius: 50%;
        `);

        default:
          return '';
      }
    }, '');
}

export default withRouter(Day);
