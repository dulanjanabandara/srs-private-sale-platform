import React from "react";
import "./project-item.styles.scss";

const ProjectItem = (props) => (
  <div className="project-item">
    <div className="content">
      <h1 className="title">{props.title}</h1>
    </div>
  </div>
);

export default ProjectItem;
