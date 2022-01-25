import React, { Component } from "react";
import axios from "axios";
import CollectionPreview from "../../common/collectionPreview/collectionPreview";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    };
  }

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:8080/api/v1/projects");
    const { data: projects } = data;

    this.setState({ projects });
  }

  render() {
    return (
      <div className="shop-page">
        <CollectionPreview projects={this.state.projects} />
      </div>
    );
  }
}

export default HomePage;
