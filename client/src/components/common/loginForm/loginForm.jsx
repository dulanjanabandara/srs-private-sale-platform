import React from "react";
import Joi from "joi-browser";
import Form from "../form/form";
import { login } from "../../../services/authService";
import "bootstrap/dist/css/bootstrap.css";

// import "./loginForm.css";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.email, data.password);
    } catch (ex) {
      // console.log(ex.response);
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
