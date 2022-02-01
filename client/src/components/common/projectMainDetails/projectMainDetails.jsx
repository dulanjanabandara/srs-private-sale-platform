import React, { Component } from "react";
import ProjectSecondaryDetails from "./../projectSecondaryDetails/projectSecondaryDetails";

import "./projectMainDetails.scss";

class ProjectMainDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggleOn: false,
    };

    this.handleSecondaryDetailsComponent =
      this.handleSecondaryDetailsComponent.bind(this);
  }

  handleSecondaryDetailsComponent() {
    this.setState({ isToggleOn: !this.state.isToggleOn });
  }

  render() {
    const { ...projectProps } = this.props;

    return (
      <React.Fragment>
        <div className="main">
          <div className="main-content">
            <div className="project-highlight">
              <div className="project-container">
                <img
                  className="selected-project"
                  src={this.props.project.coverPhoto}
                  alt="selected project"
                />
              </div>
            </div>
            <div className="project-details">
              <div className="title">
                <h1>{this.props.project.name}</h1>
                <h3>{this.props.project.status}</h3>
              </div>
              <button onClick={this.handleSecondaryDetailsComponent}>
                More Details
                {/* {console.log({ ...projectProps })} */}
              </button>
            </div>
          </div>
        </div>
        <hr />
        {this.state.isToggleOn && <ProjectSecondaryDetails {...projectProps} />}
      </React.Fragment>
    );
  }
}

export default ProjectMainDetails;
