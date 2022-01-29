import React from "react";
import CollectionItem from "../collectionItem/collectionItem";

import "./collectionPreview.scss";

const CollectionPreview = ({ projects }) => {
  return (
    <div className="collection-preview">
      {/* <h1 className="title">PROJECTS</h1> */}
      <div className="preview">
        {projects
          // .filter((project, idx) => idx < 4)
          .map((p) => (
            <CollectionItem key={p._id} {...p} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
