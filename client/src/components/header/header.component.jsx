import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./header.component.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";

const Header = ({}) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/signin">
        LOGIN
      </Link>
      {/* {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )} */}
    </div>
  </div>
);

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });

// export default connect(mapStateToProps)(Header);

export default Header;
