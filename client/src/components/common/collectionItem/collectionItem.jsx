import React from "react";
import { Link } from "react-router-dom";
// import CustomButton from "../customButton/customButton";

import "./collectionItem.scss";

const CollectionItem = ({ ...props }) => {
  return (
    <div className="collection-item">
      <Link to={`/projects/${props._id}`}>
        <div
          className="image"
          style={{ backgroundImage: `url(${props.coverPhoto})` }}
          onClick={() => {
            props.onProjectSelect(props._id);
          }}
        >
          {/* <Link to={`/projects/${props._id}`}>
          <CustomButton
            onClick={() => {
              props.onProjectSelect(props._id);
            }}
          >
            View Project
          </CustomButton>
        </Link> */}
        </div>
      </Link>
      <div className="collection-footer">
        <span className="name">{props.name}</span>
        <span className="price">{props.allocation}</span>
      </div>
    </div>
  );
};

export default CollectionItem;
