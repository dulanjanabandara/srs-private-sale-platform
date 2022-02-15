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

        {console.log({ ...projectProps })}
        <p>
          Quisquam elementum, explicabo vitae vivamus, at ante malesuada, donec
          dictum eaque accumsan, illum nesciunt netus maxime. Atque? Placeat
          atque dicta occaecati taciti! Pulvinar etiam hac risus maxime iure.
          Ultrices quisquam eu sint doloribus officia natus voluptatem. Id sequi
          nullam adipisicing quisque dictumst litora proident, fuga, sodales
          quam purus. Odit rutrum. Ad, error, dis litora! Sem libero, nullam
          dolorum! Senectus debitis! Elementum laborum nostrum facere amet
          sodales. Similique fugit proin, molestie diamlorem ipsa, veritatis
          ornare deleniti mus? Dolorum facere phasellus sociosqu, quisquam! Eget
          necessitatibus sint iste conubia accusantium adipisci aliquam nisi,
          viverra, lacinia neque ligula? Luctus do? Adipiscing numquam, voluptas
          rerum.
        </p>
        {this.props.project.status === "In-Progress" ? (
          <button onClick={this.handleFundingDetailsComponent}>
            Fund to the Project
          </button>
        ) : null}

        <hr />
        {this.state.isToggleOn && <FundProject {...projectProps} />}
      </React.Fragment>
    );
  }
}

export default ProjectSecondaryDetails;
