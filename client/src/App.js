import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import HomePage from "./components/pages/homePage/homePage";
import Dashboard from "./components/pages/dashboard/dashboard";
import Header from "./components/common/header/header";
import Contact from "./components/pages/contact/contact";

import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <ToastContainer />
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    );
  }
}

export default App;
