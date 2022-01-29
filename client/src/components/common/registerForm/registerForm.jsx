import React from "react";
import Joi, { errors } from "joi-browser";
import Form from "../form/form";
import * as userService from "../../../services/userService.js"; // Just a way of importing.
import auth from "../../../services/authService";

import "bootstrap/dist/css/bootstrap.css";

// import "./loginForm.css";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      email: "",
      discordName: "",
      password: "",
      passwordConfirm: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().min(4).label("Username"),
    email: Joi.string().required().email().label("Email"),
    discordName: Joi.string().required().label("Discord Name"),
    password: Joi.string().required().min(8).label("Password"),
    passwordConfirm: Joi.string().required().label("Confirm Password"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwtW("token", response.data.token);
      window.location = "/dashboard";
      // this.props.history.push("/dashboard");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("discordName", "Discord Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("passwordConfirm", "Confirm Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
