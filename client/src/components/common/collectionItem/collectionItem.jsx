import React from "react";
import CustomButton from "../customButton/customButton";
import { Link } from "react-router-dom";

import "./collectionItem.scss";

const CollectionItem = ({ ...props }) => {
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${props.coverPhoto})` }}
      >
        <Link to={`/projects/${props._id}`}>
          <CustomButton
            onClick={() => {
              props.onProjectSelect(props._id);
              console.log(props);
            }}
          >
            View Project
          </CustomButton>
        </Link>
      </div>
      <div className="collection-footer">
        <span className="name">{props.name}</span>
        <span className="price">{props.allocation}</span>
      </div>
    </div>
  );
};

export default CollectionItem;
