import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import Explanation from 'Components/Explanation';
import React from 'react';
import WithRole from 'Components/WithRole';

import routes, {
  LoadableDetails,
  LoadableFamilyHome,
  LoadableAngelHome,
} from '../routes';

export default class Payments extends React.PureComponent {
  componentDidMount() {
    LoadableDetails.preload();
  }

  isColumnWhite = () => {
    if (
      this.props.location.pathname.includes('/payments/payment/') ||
      this.props.location.pathname.includes('/payments/families/')
    ) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <WithRole>
        {role => {
          return (
            <DesktopAppLayout>
              <DesktopAppLayout.LeftColumn>
                {role === 'family' ? (
                  <Route path="/payments" component={LoadableFamilyHome} />
                ) : (
                  <Route path="/payments" component={LoadableAngelHome} />
                )}
              </DesktopAppLayout.LeftColumn>
              <DesktopAppLayout.RightColumn>
                <TransitionGroup>
                  <CSSTransition
                    classNames="fade"
                    unmountOnExit
                    mountOnEnter
                    timeout={{ enter: 600, exit: 0 }}
                    key={
                      this.props.location.key || this.props.location.pathname
                    }
                  >
                    <Switch>
                      {routes(this.props.match.path)
                        .filter(route => route.path !== '/payments')
                        .reduce((routes, route, i) => {
                          if (route.allowedRoles.includes(role)) {
                            routes.push(
                              <Route
                                key={i}
                                exact={route.exact}
                                path={route.path}
                                component={route.component}
                              />
                            );
                          }

                          return routes;
                        }, [])}
                      <Route component={Explanation} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </DesktopAppLayout.RightColumn>
            </DesktopAppLayout>
          );
        }}
      </WithRole>
    );
  }
}
