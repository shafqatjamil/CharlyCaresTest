// @flow
import 'moment/locale/nl';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { IntlProvider, addLocaleData } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { Route, BrowserRouter } from 'react-router-dom';
import { setLocale } from 'yup/lib/customLocale';
import { ThemeProvider } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import moment from 'moment';
import React, { Component } from 'react';
import ScrollToTop from 'Components/ScrollToTop';
import SplashScreen from 'Components/SplashScreen';

import { getAuthStatus, getUserRole } from '../../data/auth/selectors';
import API from '../../data/user/api';
import defaultTheme from '../../themes/default';
import Routes from './routes';

// $FlowFixMe
import formErrors from '../../translations/formErrors';
import axios from '../../axios';

// $FlowFixMe

type State = {
  locale: string,
  translations: Object,
};

type Props = {
  isAuthenticated: boolean,
  userRole: string,
};

const closeRoutes = ['/calendar/unavailable', '/calendar'];

const getLocale = () => {
  const allowed = ['nl', 'en'];
  const defaultLocale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    'nl';

  if (allowed.includes(defaultLocale)) {
    return defaultLocale;
  } else if (defaultLocale === 'en-US') {
    return 'en';
  } else {
    return 'nl';
  }
};

function registerPushToken(platform, pushToken) {
  axios
    .post('/push_token', { pushToken, platform })
    .then(res => {
      if (typeof window.Android !== 'undefined') {
        window.Android.isSuccesFullyRegistered();
      }
    })
    .catch(err => console.log(err));
}

class App extends Component<Props, State> {
  constructor(props) {
    super(props);

    window.registerPushToken = registerPushToken;

    this.state = {
      locale: getLocale(),
      translations: {},
      hasMembership: true,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setLocale();
    if (this.props.isAuthenticated) {
      this.setState({ isLoading: true }, () => {
        API.getProfile().then(({ data }) => {
          this.setState(state => {
            return {
              ...state,
              hasMembership: data.data.has_membership,
              paymentLink: data.data.payment_link,
              isLoading: false,
            };
          });
        });
      });
    }
  }

  setLocale = (locale: string = 'nl') => {
    let intl;
    let translation;
    if (locale === 'en') {
      intl = import(/*webpackChunkName: "intl"*/ `react-intl/locale-data/en`);
      translation = import(/*webpackChunkName: "translations"*/ `../../translations/en.json`);
    } else {
      intl = import(/*webpackChunkName: "intl"*/ `react-intl/locale-data/nl`);
      translation = import(/*webpackChunkName: "translations"*/ `../../translations/nl.json`);
    }
    Promise.all([translation, intl]).then(res => {
      addLocaleData([...res[1]]);
      moment.locale(this.state.locale);
      setLocale(formErrors.nl);
      this.setState({
        translations: res[0],
      });
    });
  };

  render() {
    if (!Object.keys(this.state.translations).length || this.state.isLoading) {
      return <SplashScreen />;
    }
    return (
      <IntlProvider
        messages={this.state.translations}
        locale={this.state.locale}
      >
        <BrowserRouter>
          <ScrollToTop>
            {isMobile ? (
              <Route
                exact
                render={({ location }) => (
                  <ThemeProvider theme={defaultTheme}>
                    <TransitionGroup
                      childFactory={child => {
                        if (closeRoutes.includes(location.pathname)) {
                          return React.cloneElement(child, {
                            classNames: 'close',
                          });
                        }
                        return child;
                      }}
                      component={null}
                    >
                      <CSSTransition
                        classNames="fade"
                        unmountOnExit
                        mountOnEnter
                        timeout={{ enter: 200, exit: 0 }}
                        key={location.key || location.pathname}
                      >
                        <Routes
                          userRole={this.props.userRole}
                          isAuthenticated={this.props.isAuthenticated}
                          hasMembership={this.state.hasMembership}
                          paymentLink={this.state.paymentLink}
                          location={location}
                        />
                      </CSSTransition>
                    </TransitionGroup>
                  </ThemeProvider>
                )}
              />
            ) : (
              <ThemeProvider theme={defaultTheme}>
                <Routes
                  userRole={this.props.userRole}
                  isAuthenticated={this.props.isAuthenticated}
                  hasMembership={this.state.hasMembership}
                  paymentLink={this.state.paymentLink}
                />
              </ThemeProvider>
            )}
          </ScrollToTop>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: getAuthStatus(state),
  userRole: getUserRole(state),
});

export default hot(module)(connect(mapStateToProps)(App));
