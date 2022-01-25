import React from "react";

import "./collectionItem.scss";

const CollectionItem = (props) => {
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${props.coverPhoto})` }}
      />
      <div className="collection-footer">
        <span className="name">{props.name}</span>
        <span className="price">{props.allocation}</span>
      </div>
    </div>
  );
};

export default CollectionItem;
