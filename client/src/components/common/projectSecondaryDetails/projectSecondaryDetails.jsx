import React, { Component } from "react";
import FundProject from "./../fundProject/fundProject";
import { Link } from "react-router-dom";

import "./projectSecondaryDetails.scss";

class ProjectSecondaryDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggleOn: false,
    };

    this.handleFundingDetailsComponent =
      this.handleFundingDetailsComponent.bind(this);
  }

  handleFundingDetailsComponent() {
    this.setState({ isToggleOn: !this.state.isToggleOn });
  }

  render() {
    const { ...projectProps } = this.props;

    return (
      <React.Fragment>
        <h2>Project Secondary Details</h2>
        <button onClick={this.handleFundingDetailsComponent}>
          Fund to the Project
        </button>
        {/* {console.log({ ...projectProps })} */}
        {this.state.isToggleOn && <FundProject {...projectProps} />}
      </React.Fragment>
    );
  }
}

export default ProjectSecondaryDetails;
