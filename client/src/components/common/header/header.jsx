import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">HOME</Link>
      <div className="options">
        <Link className="option" to="/contact">
          CONTACT
        </Link>
      </div>
    </div>
  );
};

export default Header;
