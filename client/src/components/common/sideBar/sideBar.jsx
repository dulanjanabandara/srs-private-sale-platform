import React from "react";

import "./sideBar.scss";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/dashboard/my-projects">My Projects</Link>
        </li>
        <li>
          <Link to="/dashboard/settings">Settings</Link>
        </li>
        <li>
          <Link to="/dashboard/delete-account">Delete Account</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
