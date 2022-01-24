import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";

import "./App.css";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="content">
        <Route path="/login" component={LoginForm} />
      </div>
    </div>
  );
}

export default App;
