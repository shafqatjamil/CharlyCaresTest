import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import Explanation from 'Components/Explanation';
import DesktopTransitionWrapper from 'Components/DesktopTransitionWrapper';
import React, { PureComponent } from 'react';

import routes, { LoadableProfileHome, LoadableAngel } from '../routes';
import { getUserRole } from '../../../data/auth/selectors';

class Profile extends PureComponent {
  render() {
    return (
      <DesktopAppLayout>
        <DesktopAppLayout.LeftColumn isWhite>
          {this.props.role === 'family' ? (
            <Route path="/profile" component={LoadableProfileHome} />
          ) : (
            <Route path="/profile" component={LoadableAngel} />
          )}
        </DesktopAppLayout.LeftColumn>
        <DesktopAppLayout.RightColumn>
          <TransitionGroup component={DesktopTransitionWrapper}>
            <CSSTransition
              classNames="fade"
              unmountOnExit
              mountOnEnter
              timeout={{ enter: 600, exit: 0 }}
              key={this.props.location.key || this.props.location.pathname}
            >
              <Switch>
                {routes(this.props.match.path)
                  .filter(route => route.path !== '/profile')
                  .reduce((routes, route, i) => {
                    if (route.allowedRoles.includes(this.props.role)) {
                      routes.push(
                        <Route
                          key={i}
                          exact
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
  }
}

export default connect(state => ({
  role: getUserRole(state),
}))(Profile);
