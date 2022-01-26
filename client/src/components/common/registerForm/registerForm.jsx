import React from "react";
import Joi from "joi-browser";
import Form from "../form/form";

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
    username: Joi.string().required().min(3).label("Username"),
    email: Joi.string().required().email().label("Email"),
    discordName: Joi.string().required().label("Discord Name"),
    password: Joi.string().required().min(8).label("Password"),
    passwordConfirm: Joi.string().required().label("Confirm Password"),
  };

  doSubmit = () => {
    // call the server
    console.log("Submitted");
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
