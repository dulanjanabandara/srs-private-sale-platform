import React from "react";

import "./listGroup.scss";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, selectedStatus, onItemSelect } =
    props;

  console.log(selectedStatus);
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedStatus
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
