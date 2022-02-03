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
                <hr />
                <h4>Description: {this.props.project.description}</h4>
                <h4>Allocation{this.props.project.allocation}</h4>
                <h4>Fee: {this.props.project.fee}</h4>
                <h4>Start Date: {this.props.project.startDate}</h4>
                <h4>Status:{this.props.project.status}</h4>
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
