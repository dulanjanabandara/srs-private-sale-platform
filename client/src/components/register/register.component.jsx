import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../redux/auth/auth.actions";
import Alert from "../alert/alert.component";
import { setAlert } from "../../redux/alert/alert.actions";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    discordName: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, discordName, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    console.log("Form data", e);
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Password do not match", "danger");
    } else {
      register({ username, email, discordName, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <div className="register-form">
      <h1 className="heading">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <Alert />
      <br />
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="text"
          placeholder="Discord Name"
          name="discordName"
          value={discordName}
          onChange={(e) => onChange(e)}
        />
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="8"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength="8"
            value={confirmPassword}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="link">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
