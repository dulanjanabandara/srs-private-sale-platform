import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/pages/homePage/homePage";
import Dashboard from "./components/pages/dashboard/dashboard";
import Header from "./components/common/header/header";
import Contact from "./components/pages/contact/contact";
import LoginForm from "./components/common/loginForm/loginForm";
import RegisterForm from "./components/common/registerForm/registerForm";
import Logout from "./components/common/logout/logout";
import NotFound from "./components/pages/notFoundPage/notFoundPage";
import ProjectDetails from "./components/pages/projectDetailsPage/projectDetails";
import auth from "./services/authService";

// import LoginPage from "./components/pages/loginPage/loginPage";
// import RegisterPage from "./components/pages/registerPage/registerPage";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const currentUser = auth.getCurrentUser();
    this.setState({ currentUser });
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route path="/projects/:id" component={ProjectDetails} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/contact" component={Contact} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={HomePage} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
