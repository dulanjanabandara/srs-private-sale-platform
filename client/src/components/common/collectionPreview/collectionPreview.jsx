import React from "react";
import CollectionItem from "../collectionItem/collectionItem";

import "./collectionPreview.scss";

const CollectionPreview = (props) => {
  return (
    <div className="collection-preview">
      <div className="preview">
        {props.projects
          // .filter((project, idx) => idx < 4)
          .map((project) => (
            <CollectionItem
              key={project._id}
              {...project}
              onProjectSelect={project.onProjectSelect}
            />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
