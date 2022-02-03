import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CollectionPreview from "../../common/collectionPreview/collectionPreview";
import Pagination from "../../common/pagination/pagination";
import SearchBox from "../../common/searchBox/searchBox";
import { paginate } from "../../../utils/paginate";
import ListGroup from "../../common/listGroup/listGroup";
import { getStatuses } from "../../../services/statusService";
import { getProjects } from "../../../services/projectService.js";

import "./homePage.scss";

class HomePage extends Component {
  state = {
    projects: [],
    statuses: [],
    currentPage: 1,
    pageSize: 4, // Needs to change according to the backend settings
    searchQuery: "",
    selectedStatus: null,
  };

  async componentDidMount() {
    const { data: dataProject } = await getProjects();
    const { data: projects } = dataProject;
    // console.log(projects);

    const { data: dataStatus } = await getStatuses();
    const { data: allStatuses } = dataStatus;
    const statuses = [{ _id: "", name: "All" }, ...allStatuses];
    // console.log(statuses);

    this.setState({ projects, statuses });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleStatusSelect = (status) => {
    this.setState({ selectedStatus: status, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedStatus: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedStatus,
      searchQuery,
      projects: allProjects,
    } = this.state;

    let filtered = allProjects;
    if (searchQuery)
      filtered = allProjects.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedStatus && selectedStatus._id)
      filtered = allProjects.filter((p) => p.status._id === selectedStatus._id);

    const projects = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: projects };
  };

  render() {
    const { length: count } = this.state.projects;
    const { pageSize, currentPage, searchQuery } = this.state;

    if (count === 0) return <p>There are no projects</p>;

    const { totalCount, data: projects } = this.getPagedData();

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="home-page">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <p>Showing {totalCount} movies in the database.</p>
          <div className="page-content">
            <ListGroup
              items={this.state.statuses}
              selectedStatus={this.state.selectedStatus}
              onItemSelect={this.handleStatusSelect}
              // textProperty="name"
              // valueProperty="_id"
            />
            <div className="page-main-content">
              <CollectionPreview projects={projects} />
              <Pagination
                className="pagination"
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
