import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "../../../services/httpService";
import config from "../../../config.json";
import "react-toastify/dist/ReactToastify.css";
import CollectionPreview from "../../common/collectionPreview/collectionPreview";
import Pagination from "../../common/pagination/pagination";
import { paginate } from "../../../utils/paginate";
import ListGroup from "../../common/listGroup/listGroup";
import { getStatuses } from "../../../services/statusService";
import { getProjects } from "../../../services/projectService.js";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      statuses: [],
      currentPage: 1,
      pageSize: 4, // Needs to change according to the backend settings
      selectedStatus: null,
    };
  }

  async populateProjects() {
    const { data: dataProject } = await getProjects();
    const { data: projects } = dataProject;
    this.setState({ projects });
  }

  async populateStatuses() {
    const { data: dataStatus } = await getStatuses();
    const { data: allStatuses } = dataStatus;
    const statuses = [{ _id: "", name: "All" }, ...allStatuses];
    this.setState({ statuses });
  }

  async componentDidMount() {
    await this.populateProjects();
    await this.populateStatuses();
    // this.setState({ projects, statuses });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleStatusSelect = (status) => {
    this.setState({ selectedStatus: status });
  };

  render() {
    const { length: count } = this.state.projects;
    const { pageSize, currentPage, projects: allProjects } = this.state;

    if (count === 0) return <p>There are no projects</p>;

    const projects = paginate(allProjects, currentPage, pageSize);

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="shop-page">
          <ListGroup
            items={this.state.statuses}
            selectedStatus={this.state.selectedStatus}
            onItemSelect={this.handleStatusSelect}

            // textProperty="name"
            // valueProperty="_id"
          />
          <CollectionPreview projects={projects} />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
