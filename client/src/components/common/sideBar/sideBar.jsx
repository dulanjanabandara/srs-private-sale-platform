import React from "react";
import { Link } from "react-router-dom";

import "./sideBar.scss";

const SideBar = (props) => {
  const { items, textProperty, valueProperty, selectedStatus, onItemSelect } =
    props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <Link
          key={item[valueProperty]}
          to={item.linkUrl}
          style={{ textDecoration: "none" }}
        >
          <li
            className={
              item === selectedStatus
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        </Link>
      ))}
    </ul>
  );
};

SideBar.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default SideBar;
