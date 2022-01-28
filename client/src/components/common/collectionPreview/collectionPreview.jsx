import React from "react";
import CollectionItem from "../collectionItem/collectionItem";

import "./collectionPreview.scss";

const CollectionPreview = ({ projects }) => {
  return (
    <React.Fragment>
      <div className="collection-preview">
        {/* <h1 className="title">PROJECTS</h1> */}
        <div className="preview">
          {projects
            // .filter((project, idx) => idx < 4)
            .map(({ _id, ...otherProjectProps }) => (
              <CollectionItem key={_id} {...otherProjectProps} />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CollectionPreview;
