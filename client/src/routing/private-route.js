import React from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  children,
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) =>
  // <Route
  //   {...rest}
  //   render={(props) =>
  //     !isAuthenticated && !loading ? (
  //       <Navigate replace to="/login" />
  //     ) : (
  //       <Component {...props} />
  //     )
  //   }
  // />

  !isAuthenticated && !loading ? children : <Navigate to="/login" />;

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
