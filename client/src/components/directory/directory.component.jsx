import React from "react";

import ProjectItem from "../project-item/project-item.component";

import "./directory.styles.scss";

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        { title: "project 1", id: 1 },
        { title: "project 2", id: 2 },
        { title: "project 3", id: 3 },
      ],
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map((section) => (
          <ProjectItem key={section.id} title={section.title} />
        ))}
      </div>
    );
  }
}

export default Directory;
