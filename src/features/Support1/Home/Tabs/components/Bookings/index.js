import { FormattedMessage } from 'react-intl';
import { isAngel } from 'Utils';
import { isMobile } from 'react-device-detect';
import curry from 'ramda/es/curry';
import Divider from 'Components/Divider';
import memoizeWith from 'ramda/es/memoizeWith';
import React from 'react';
import WithRole from 'Components/WithRole';

import AngelBooking from './components/AngelBooking';
import Booking from './components/Booking';
import BookingList from './components/BookingList';
import Container from './components/Container';
import ListDivider from './components/ListDivider';
import SupportHomeDesktop from '../../../../Explanation';

const filterBookingsWithFiniteAndNonFiniteStatuses = bookings => {
  let finite = [];
  let nonFinite = [];
  let finiteStatuses = ['ended', 'accepted', 'canceled', 'declined', 'given'];

  if (bookings && bookings.length > 0) {
    for (let i = 0; i < bookings.length; i++) {
      if (finiteStatuses.includes(bookings[i].current_state)) {
        finite.push(bookings[i]);
      } else {
        nonFinite.push(bookings[i]);
      }
    }

    return {
      finite,
      nonFinite,
    };
  }
  return {
    finite: [],
    nonFinite: [],
  };
};

const BookingWithRole = props => (
  <WithRole>
    {role => {
      const hasAngelRole = isAngel(role);
      return hasAngelRole ? (
        <AngelBooking {...props} angel={hasAngelRole} />
      ) : (
        <Booking {...props} />
      );
    }}
  </WithRole>
);

const onShowDetails = memoizeWith(
  (history, id) => id,
  curry((history, id, _ev) => history.push('/booking/details/' + id))
);
const onShowAccepted = memoizeWith(
  (history, id) => id,
  curry((history, id, _ev) => history.push('/booking/accepted/' + id))
);
const onOfferSelect = memoizeWith(
  (history, id, path) => id,
  curry((history, id, path, _ev) => history.push(path + id))
);

const Bookings = ({ bookings = [], history, role }) => {
  const {
    finite = [],
    nonFinite = [],
  } = filterBookingsWithFiniteAndNonFiniteStatuses(bookings);

  const isTherePendingBookings = nonFinite.find(
    b => b.current_state === 'pending'
  );

  const marginConst = isMobile ? '47px 0px 0px 0px' : null;
  return (
    <div
        key={0}
        style={{
          position: 'relative',
          width: '100%',
          marginTop: '2vw',
        }}
    >
      <SupportHomeDesktop bookings = {bookings} title = "Support"/>
    </div>
    // <Container hasPending={Boolean(isTherePendingBookings)}>
    //   {Boolean(isTherePendingBookings) ? (
    //     <Divider margin={marginConst}>
    //       <FormattedMessage id="outstanding" />
    //     </Divider>
    //   ) : null}
    //   <BookingList>
    //     {nonFinite.map((booking, i) => {
    //       const path =
    //         role === 'angel' ? '/booking/angel-booking/' : '/booking/offer/';
    //       if (nonFinite.length - 1 === i) {
    //         if (role === 'angel' && booking && booking.booking) {
    //           return (
    //             <BookingWithRole
    //               familyData={booking.family_data && booking.family_data[0]}
    //               onBookingSelect={onOfferSelect(history, booking.id, path)}
    //               noBorder
    //               key={booking.id}
    //               startDate={booking.booking.start_date}
    //               endDate={booking.booking.end_date}
    //               repeatQty={booking.booking.repeat_qty}
    //               status={booking.current_state}
    //               bookings={booking.bookings}
    //             />
    //           );
    //         }
    //         return (
    //           <BookingWithRole
    //             familyData={booking.family_data && booking.family_data[0]}
    //             onBookingSelect={onOfferSelect(history, booking.id, path)}
    //             noBorder
    //             key={booking.id}
    //             startDate={booking.start_date}
    //             endDate={booking.end_date}
    //             repeatQty={booking.repeat_qty}
    //             status={booking.current_state}
    //             offer={booking.has_offer}
    //             angelInfo={booking.angel_data}
    //           />
    //         );
    //       }

    //       if (role === 'angel' && booking && booking.booking) {
    //         return (
    //           <BookingWithRole
    //             familyData={booking.family_data && booking.family_data[0]}
    //             onBookingSelect={onOfferSelect(history, booking.id, path)}
    //             key={booking.id}
    //             startDate={booking.booking.start_date}
    //             endDate={booking.booking.end_date}
    //             repeatQty={booking.booking.repeat_qty}
    //             status={booking.current_state}
    //             bookings={booking.bookings}
    //           />
    //         );
    //       }
    //       return (
    //         <BookingWithRole
    //           familyData={booking.family_data && booking.family_data[0]}
    //           onBookingSelect={onOfferSelect(history, booking.id, path)}
    //           key={booking.id}
    //           startDate={booking.start_date}
    //           endDate={booking.end_date}
    //           repeatQty={booking.repeat_qty}
    //           status={booking.current_state}
    //           offer={booking.has_offer}
    //           angelInfo={booking.angel_data}
    //         />
    //       );
    //     })}
    //     <ListDivider />
    //     {finite.map(booking => {
    //       const path = '/booking/angel-booking/';
    //       if (role === 'angel' && booking && booking.booking) {
    //         return (
    //           <BookingWithRole
    //             familyData={booking.family_data && booking.family_data[0]}
    //             key={booking.id}
    //             onBookingSelect={
    //               booking.current_state === 'accepted' ||
    //               booking.current_state === 'pending_approval'
    //                 ? onOfferSelect(history, booking.id, path)
    //                 : null
    //             }
    //             startDate={booking.booking.start_date}
    //             endDate={booking.booking.end_date}
    //             repeatQty={booking.booking.repeat_qty}
    //             status={booking.current_state}
    //             bookings={booking.bookings}
    //           />
    //         );
    //       }
    //       return (
    //         <BookingWithRole
    //           familyData={booking.family_data && booking.family_data[0]}
    //           key={booking.id}
    //           onBookingSelect={
    //             role !== 'family'
    //               ? null
    //               : booking.current_state === 'accepted'
    //               ? onShowAccepted(history, booking.id)
    //               : onShowDetails(history, booking.id)
    //           }
    //           startDate={booking.start_date}
    //           endDate={booking.end_date}
    //           repeatQty={booking.repeat_qty}
    //           status={booking.current_state}
    //           angelInfo={booking.angel_data}
    //         />
    //       );
    //     })}
    //   </BookingList>
    // </Container>
  );
};

export default Bookings;
