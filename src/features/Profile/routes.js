import { isMobile } from 'react-device-detect';
import Loadable from 'react-loadable';
import Loader from 'Components/Loader';
import React from 'react';

export const LoadableProfileHome = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "home-profile-home" */ './Home');
    }
    return import(/* webpackChunkName: "home-profile-home" */ './Home/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableEdit = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-home" */ './Edit');
    }
    return import(/* webpackChunkName: "profile-home" */ './Edit/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableSettings = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-settings" */ './AccountSettings');
    }
    return import(/* webpackChunkName: "profile-settings" */ './AccountSettings/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableCredit = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-credit" */ './Credit');
    }
    return import(/* webpackChunkName: "profile-credit" */ './Credit/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableMembership = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-membership" */ './Membership');
    }
    return import(/* webpackChunkName: "profile-membership" */ './Membership/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableConditions = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-conditions" */ './GeneralConditions');
    }
    return import(/* webpackChunkName: "profile-conditions" */ './GeneralConditions/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngel = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-angel-profile" */ './AngelProfile');
    }
    return import(/* webpackChunkName: "profile-angel-profile" */ './AngelProfile/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelAcc = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-angel-account" */ './AngelAccount');
    }
    return import(/* webpackChunkName: "profile-angel-account" */ './AngelAccount/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelDashboard = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-angel-dashboard" */ './AngelDashboard');
    }
    return import(/* webpackChunkName: "profile-angel-dashboard" */ './AngelDashboard/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableAngelPreferences = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-angel-preferences" */ './AngelPreferences');
    }
    return import(/* webpackChunkName: "profile-angel-preferences" */ './AngelPreferences/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadableHelp = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "profile-help" */ './Help');
    }
    return import(/* webpackChunkName: "profile-help" */ './Help/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

export const preloadAllRoutes = () => {
  LoadableSettings.preload();
  LoadableCredit.preload();
  LoadableEdit.preload();
  LoadableMembership.preload();
  LoadableConditions.preload();
  LoadableAngelPreferences.preload();
  LoadableHelp.preload();
};

const routes = rootRoute => [
  {
    exact: true,
    path: `${rootRoute}`,
    component: LoadableProfileHome,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}`,
    component: LoadableAngel,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/edit`,
    component: LoadableAngelAcc,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/edit`,
    component: LoadableEdit,
    protected: true,
    allowedRoles: ['family'],
  },
  {
    exact: true,
    path: `${rootRoute}/settings`,
    component: LoadableSettings,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/credit`,
    component: LoadableCredit,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/membership`,
    component: LoadableMembership,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/conditions`,
    component: LoadableConditions,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },

  {
    exact: true,
    path: `${rootRoute}/dashboard`,
    component: LoadableAngelDashboard,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/preferences`,
    component: LoadableAngelPreferences,
    protected: true,
    allowedRoles: ['angel'],
  },
  {
    exact: true,
    path: `${rootRoute}/help`,
    component: LoadableHelp,
    protected: true,
    allowedRoles: ['family', 'angel'],
  },
];

export default routes;
