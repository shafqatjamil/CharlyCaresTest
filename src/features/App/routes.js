import { isMobile } from 'react-device-detect';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';
import ProtectedRoute from 'Components/ProtectedRoute';
import React from 'react';

import AngelProfile from '../AngelProfile';
import Chat from '../Chat';
import defaultTheme from '../../themes/default';
import Support from '../Support';
import Loader from 'Components/Loader';

const LoadableLogin = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "login" */ '../Login');
    } else {
      return import(/* webpackChunkName: "login" */ '../Login/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableCalendar = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "login" */ '../Calendar');
    } else {
      return import(/* webpackChunkName: "login" */ '../Calendar/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadablePayments = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "payments" */ '../Payments');
    } else {
      return import(/* webpackChunkName: "payments" */ '../Payments/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableAngelFamilies = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "angel-families" */ '../AngelFamilies');
    } else {
      return import(/* webpackChunkName: "angel-families" */ '../AngelFamilies/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadableBooking = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "booking" */ '../Booking');
    } else {
      return import(/* webpackChunkName: "booking" */ '../Booking/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadablePasswordRecovery = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "password-recovery" */ '../PasswordRecovery');
    } else {
      return import(/* webpackChunkName: "password-recovery" */ '../PasswordRecovery/Desktop');
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadablePassword = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "new-password" */ '../NewPassword');
    } else {
      return import(/* webpackChunkName: "new-password" */ '../NewPassword/Desktop');
    }
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableSignup = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "signup" */ '../Signup');
    } else {
      return import(/* webpackChunkName: "signup" */ '../Signup/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableWelcome = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "welcome" */ '../Welcome');
    } else {
      return import(/* webpackChunkName: "welcome" */ '../Welcome/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableFavorites = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "favorites" */ '../Favorites');
    } else {
      return import(/* webpackChunkName: "favorites" */ '../Favorites/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableAngel = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "angel" */ '../Angel');
    } else {
      return import(/* webpackChunkName: "angel" */ '../Angel/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableProfile = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "home-profile" */ '../Profile');
    } else {
      return import(/* webpackChunkName: "home-profile" */ '../Profile/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

export const LoadablePaymentMethodVerification = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "payment-mehod-verification" */ '../PaymentMethodVerification');
    }
    return import(/* webpackChunkName: "payment-mehod-verification" */ '../PaymentMethodVerification/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableSignupNoMembership = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "signup-no-membership" */ '../Signup/NoValidMembership');
    }
    return import(/* webpackChunkName: "signup-no-membership-desktop" */ '../Signup/NoValidMembership/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableHowItWorks = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "signup-no-membership" */ '../Signup/HowItWorks');
    }
    return import(/* webpackChunkName: "signup-no-membership-desktop" */ '../Signup/HowItWorks/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadableMembership = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "signup-membership" */ '../Signup/Membership');
    }
    return import(/* webpackChunkName: "signup-membership-desktop" */ '../Signup/Membership/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});
export const LoadablePayment = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "signup-connect-payment" */ '../Signup/ConnectPayment');
    }
    return import(/* webpackChunkName: "signup-connect-payment-desktop" */ '../Signup/ConnectPayment/Desktop');
  },

  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadableSupport = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "login" */ '../Support1/')
    } else {
      return import(/* webpackChunkName: "login" */ '../Support1/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const LoadablePaymentCheck = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "login" */ '../Payments/PaymentCheck')
    } else {
      return import(/* webpackChunkName: "login" */ '../Payments/PaymentCheck/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadablePaymentCheckNoResult = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "login" */ '../Payments/PaymentCheckNoResult')
    } else {
      return import(/* webpackChunkName: "login" */ '../Payments/PaymentCheckNoResult/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadablePaymentFailure = Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "login" */ '../Payments/PaymentFailed')
    } else {
      return import(/* webpackChunkName: "login" */ '../Payments/PaymentFailed/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});
const LoadablePaymentSuccess= Loadable({
  loader: () => {
    if (isMobile) {
      return import(/* webpackChunkName: "login" */ '../Payments/PaymentSuccess')
    } else {
      return import(/* webpackChunkName: "login" */ '../Payments/PaymentSuccess/Desktop');
    }
  },
  loading: () => {
    return <Loader isLoading />;
  },
});

const Routes = ({
  location,
  isAuthenticated,
  userRole,
  hasMembership,
  paymentLink,
}) => {
  return (
    <Switch location={location}>
      <Route
        exact
        path="/"
        render={props => {
          return (
            <LoadableWelcome
              {...props}
              preloadLogin={LoadableLogin.preload}
              isAuthenticated={isAuthenticated}
            />
          );
        }}
      />
      <Route
        path="/login"
        render={props => (
          <ThemeProvider theme={defaultTheme}>
            <LoadableLogin {...props} />
          </ThemeProvider>
        )}
      />
      <Route path="/password-recovery/:token" component={LoadablePassword} />
      <Route path="/password-recovery" component={LoadablePasswordRecovery} />
      <Route
        path="/signup/:user"
        render={props => {
          return <LoadableSignup {...props} />;
        }}
      />
      <Route
        path="/how-it-works"
        render={props => {
          return <LoadableHowItWorks {...props} />;
        }}
      />
      <Route
        path="/membership"
        render={props => {
          return <LoadableMembership {...props} />;
        }}
      />
      <Route
        path="/connect-payment"
        render={props => {
          return <LoadablePayment paymentLink={paymentLink} {...props} />;
        }}
      />
      <Route
        path="/no-membership"
        render={props => <LoadableSignupNoMembership {...props} />}
      />

      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/booking"
        authenticated={isAuthenticated}
        component={LoadableBooking}
      />
      <ProtectedRoute
        allowedRoles={['family']}
        role={userRole}
        path="/favorites"
        authenticated={isAuthenticated}
        component={LoadableFavorites}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/chat/:userId"
        authenticated={isAuthenticated}
        component={Chat}
      />
      <ProtectedRoute
        allowedRoles={['family']}
        role={userRole}
        path="/angel-profile"
        authenticated={isAuthenticated}
        component={AngelProfile}
      />
      <ProtectedRoute
        allowedRoles={['angel']}
        role={userRole}
        path="/families"
        authenticated={isAuthenticated}
        component={LoadableAngelFamilies}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/calendar"
        authenticated={isAuthenticated}
        component={LoadableCalendar}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/payments"
        authenticated={isAuthenticated}
        component={LoadablePayments}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/profile"
        authenticated={isAuthenticated}
        component={LoadableProfile}
      />
      <ProtectedRoute
        allowedRoles={['family', 'angel']}
        role={userRole}
        path="/support"
        authenticated={isAuthenticated}
        component={Support}
      />
      <ProtectedRoute
        allowedRoles={['family']}
        role={userRole}
        path="/angel/:id"
        authenticated={isAuthenticated}
        component={LoadableAngel}
      />
      <ProtectedRoute
      allowedRoles={['family', 'angel']}
      role={userRole}
      path="/support1"
      authenticated={isAuthenticated}
      component={LoadableSupport}
      />
      <Route
        path="/db-payments/"
        component={LoadablePaymentCheck}
      />
      <Route
        path="/no-result"
        component={LoadablePaymentCheckNoResult}
      />
      <Route
        path="/db-payment/result/success"
        component={LoadablePaymentSuccess}
      />
      <Route
        path="/db-payment/result/failed/"
        component={LoadablePaymentFailure}
      />
      <Route
        path="/verification/:status"
        render={props => {
          return <LoadablePaymentMethodVerification {...props} />;
        }}
      />

      <Route
        render={() => {
          return <div> 404 </div>;
        }}
      />
    </Switch>
  );
};

export default Routes;
