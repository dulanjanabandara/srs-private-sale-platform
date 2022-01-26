import React, { Component } from "react";
import LoginForm from "./../../common/loginForm/loginForm";

class LoginPage extends Component {
  state = {};
  render() {
    return (
      <div className="sign-in-and-sign-up">
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
