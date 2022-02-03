import React, { Component } from "react";
import auth from "../../../services/authService";
import CollectionPreview from "./../collectionPreview/collectionPreview";
import { getMyProjects } from "./../../../services/userService";

import "./myProjects.scss";

class MyProjects extends Component {
  state = {
    myProjects: [],
    currentUser: "",
  };

  async populateProjects() {
    const currentUser = auth.getCurrentUser();
    const { data: dataProjects } = await getMyProjects(currentUser.id);
    const { data: myProjects } = dataProjects;
    this.setState({ myProjects });
  }

  componentDidMount() {
    this.populateProjects();
  }

  render() {
    return (
      <div>
        <CollectionPreview
          projects={this.state.myProjects}
          // onProjectSelect={this.handleProjectDetails}
        />
      </div>
    );
  }
}

export default MyProjects;
