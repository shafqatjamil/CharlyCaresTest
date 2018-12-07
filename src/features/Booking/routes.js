import { isMobile } from 'react-device-detect';
import Loadable from 'react-loadable';
import Loader from 'Components/Loader';
import React from 'react';

import BookingHome from './Home/Desktop';

export const LoadableBookingCreate = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-create" */ '../Booking/Create');
    } else {
      return import(/* webpackChunkName: "booking-create" */ '../Booking/Create/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableBookingHome = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-home" */ './Home');
    } else {
      return import(/* webpackChunkName: "booking-home" */ './Home/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableEditBooking = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-home" */ './EditBooking');
    } else {
      return import(/* webpackChunkName: "booking-home" */ './EditBooking/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableBookingRepeat = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-repeat" */ '../Booking/Create/Repeat');
    } else {
      return import(/* webpackChunkName: "booking-repeat" */ '../Booking/Create/Repeat/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableBookingSearch = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-search" */ '../Booking/Search/');
    } else {
      return import(/* webpackChunkName: "booking-search" */ '../Booking/Search/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableBookingFilters = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-filter" */ '../Booking/Filters/');
    } else {
      return import(/* webpackChunkName: "booking-filter" */ '../Booking/Filters/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngel = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-angel" */ '../Angel/');
    } else {
      return import(/* webpackChunkName: "booking-angel" */ '../Angel/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableDetails = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-details" */ '../Booking/Details');
    } else {
      return import(/* webpackChunkName: "booking-send" */ '../Booking/Details/Desktop');
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableSend = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-send" */ '../Booking/Send');
    } else {
      return import(/* webpackChunkName: "booking-send" */ '../Booking/Send/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAccepted = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-accepted" */ '../Booking/Accepted');
    } else {
      return import(/* webpackChunkName: "booking-accepted" */ '../Booking/Accepted/Desktop');
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableOfferDetails = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-offer-details" */ '../Booking/OfferDetails');
    } else {
      return import(/* webpackChunkName: "booking-offer-details" */ '../Booking/OfferDetails/Desktop');
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelOffer = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-angel-offer" */ '../Booking/OfferFromAngel');
    } else {
      return import(/* webpackChunkName: "booking-angel-offer" */ '../Booking/OfferFromAngel/Desktop');
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableMultiBooking = Loadable({
  loader: () =>
    import(/* webpackChunkName: "booking-direct-offer" */ '../Booking/MultiBooking'),
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableRequestSent = Loadable({
  loader: () =>
    import(/* webpackChunkName: "booking-request-sent" */ '../Booking/RequestSent'),
  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableAngelBooking = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking-angel-booking" */ '../Booking/AngelBooking');
    } else {
      return import(/* webpackChunkName: "booking-angel-booking" */ '../Booking/AngelBooking/Desktop');
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableAngelBookingDecline = Loadable({
  loader: () =>
    import(/* webpackChunkName: "booking-angel-booking-decline" */ '../Booking/AngelBookingDecline'),
  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableAngelBookingConfirm = Loadable({
  loader: () =>
    import(/* webpackChunkName: "booking-angel-booking-decline" */ '../Booking/AngelBookingConfirmation'),
  loading: () => {
    return <Loader isLoading />;
  },
});

export const preloadAngelBookingRoutes = () => {
  LoadableAngelBooking.preload();
  LoadableAngelBookingDecline.preload();
  LoadableAngelBookingConfirm.preload();
};

const routes = rootPath => [
  {
    exact: true,
    path: `${rootPath}`,
    component: LoadableBookingHome,
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/create`,
    component: LoadableBookingCreate,
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/edit/:bookingId`,
    component: LoadableEditBooking,
  },
  {
    exact: false,
    path: `${rootPath}/offer/:bookingId`,
    component: LoadableOfferDetails,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/accepted/:bookingId`,
    component: LoadableAccepted,
  },
  {
    exact: false,
    path: `${rootPath}/angel-offer`,
    component: LoadableAngelOffer,
  },
  {
    exact: false,
    path: `${rootPath}/multibooking`,
    component: LoadableMultiBooking,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/repeat/:dayId`,
    component: LoadableBookingRepeat,
  },
  {
    exact: false,
    path: `${rootPath}/search`,
    component: LoadableBookingSearch,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/filters`,
    component: LoadableBookingFilters,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/angel/:id`,
    component: LoadableAngel,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/details/:bookingId`,
    component: LoadableDetails,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: false,
    path: `${rootPath}/send`,
    component: LoadableSend,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: false,
    path: `${rootPath}/request-send`,
    component: LoadableRequestSent,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootPath}/angel-booking/:bookingId`,
    component: LoadableAngelBooking,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: false,
    path: `${rootPath}/angel-booking-decline`,
    component: LoadableAngelBookingDecline,
  },
  {
    exact: false,
    path: `${rootPath}/angel-booking-confirm`,
    component: LoadableAngelBookingConfirm,
  },
];

export const desktopLeft = rootPath => [
  {
    exact: true,
    path: `${rootPath}`,
    component: BookingHome,
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/create`,
    component: LoadableBookingCreate,
  },
  {
    exact: false,
    path: `${rootPath}/search`,
    component: LoadableBookingSearch,
  },
  {
    exact: false,
    protected: true,
    allowedRoles: ['family'],
    path: `${rootPath}/repeat/:dayId`,
    component: LoadableBookingRepeat,
  },
  {
    exact: false,
    path: `${rootPath}/offer/:bookingId`,
    component: LoadableOfferDetails,
  },
  {
    exact: true,
    path: `${rootPath}/angel-booking/:bookingId`,
    component: LoadableAngelBooking,
    protected: true,
    allowedRoles: ['angel'],
  },
];
export const desktopRight = [];

export default routes;
