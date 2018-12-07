import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  authenticated,
  hasMembership,
  allowedRoles = '',
  role,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return authenticated === true &&
        role &&
        role !== '' &&
        allowedRoles.includes(role) ? (
        <Component {...props} />
      ) : (
        <Redirect
          exact
          to={{ pathname: '/', state: { from: props.location } }}
        />
      );
    }}
  />
);

export default ProtectedRoute;
