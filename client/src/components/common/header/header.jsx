import React from "react";
import { NavLink, Link } from "react-router-dom";

import "./header.scss";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <Link to="/">HOME</Link>
      <div className="options">
        {!currentUser && (
          <React.Fragment>
            {" "}
            <NavLink className="option" to="/login">
              LOGIN
            </NavLink>
            <NavLink className="option" to="/register">
              REGISTER
            </NavLink>
          </React.Fragment>
        )}
        {currentUser && (
          <React.Fragment>
            {" "}
            <NavLink className="option" to="/profile">
              {currentUser.username.toUpperCase()}
            </NavLink>
            <NavLink className="option" to="/logout">
              LOGOUT
            </NavLink>
          </React.Fragment>
        )}
        <NavLink className="option" to="/contact">
          CONTACT
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

// {currentUser ? (
//   <div className='option' onClick={() => auth.signOut()}>
//     SIGN OUT
//   </div>
// ) : (
//   <Link className='option' to='/signin'>
//     SIGN IN
//   </Link>
// )}
