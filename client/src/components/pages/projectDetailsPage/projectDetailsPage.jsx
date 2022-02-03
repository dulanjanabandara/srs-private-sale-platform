import React, { Component } from "react";

import CollectionPreview from "../../common/collectionPreview/collectionPreview";
import ListGroup from "../../common/listGroup/listGroup";
import Pagination from "../../common/pagination/pagination";
import SearchBox from "../../common/searchBox/searchBox";
import ProjectMainDetails from "../../common/projectMainDetails/projectMainDetails";
import { getProjects, getProject } from "../../../services/projectService";
import { getStatuses } from "../../../services/statusService";
import { paginate } from "../../../utils/paginate";

import "./projectDetailsPage.scss";

class ProjectDetails extends Component {
  state = {
    projects: [],
    statuses: [],
    currentPage: 1,
    pageSize: 4, // Needs to change according to the backend settings
    searchQuery: "",
    selectedStatus: null,
    data: {
      _id: "",
      name: "",
      status: "",
      blockchain: "",
      description: "",
      websiteLink: "",
      twitterLink: "",
      pitchDeck: "",
      documents: "",
      allocation: "",
      fee: "",
      allocationPerNft: "",
      minContributionPerNft: "",
      maxContributionPerNft: "",
      maxContributionPerWallet: "",
      multiTokenDeal: false,
      token1Price: "",
      token2Price: "",
      pricePerToken: "",
      noOfTotalTokens: "",
      noOfDistributedTokens: "",
      vestingSchedule: "",
      coverPhoto: "",
      createdAt: "",
      startDate: "",
    },
  };

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
    await this.handleProjectDetails(this.props.match.params.id);
  }

  mapToViewModel(project) {
    return {
      _id: project._id,
      name: project.name,
      status: project.status.name,
      blockchain: project.blockchain,
      description: project.description,
      websiteLink: project.websiteLink,
      twitterLink: project.twitterLink,
      pitchDeck: project.pitchDeck,
      documents: project.documents,
      allocation: project.allocation,
      fee: project.fee,
      allocationPerNft: project.allocationPerNft,
      minContributionPerNft: project.minContributionPerNft,
      maxContributionPerNft: project.maxContributionPerNft,
      maxContributionPerWallet: project.maxContributionPerWallet,
      multiTokenDeal: project.multiTokenDeal,
      token1Price: project.token1Price,
      token2Price: project.token2Price,
      pricePerToken: project.pricePerToken,
      noOfTotalTokens: project.noOfTotalTokens,
      noOfDistributedTokens: project.noOfDistributedTokens,
      vestingSchedule: project.vestingSchedule,
      coverPhoto: project.coverPhoto,
      createdAt: project.createdAt,
      startDate: project.startDate,
    };
  }

  // handleSave = () => {};

  handleProjectDetails = async (projectId) => {
    try {
      const { data: dataProject } = await getProject(projectId);
      const { data: project } = dataProject;
      this.setState({ data: this.mapToViewModel(project) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

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
      <div>
        {/* <h1>Project Details - {this.props.match.params.id} </h1> */}
        <div>
          <ProjectMainDetails project={this.state.data} />
        </div>

        <ListGroup
          items={this.state.statuses}
          selectedStatus={this.state.selectedStatus}
          onItemSelect={this.handleStatusSelect}
          // textProperty="name"
          // valueProperty="_id"
        />
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <CollectionPreview
          projects={projects}
          onProjectSelect={this.handleProjectDetails}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default ProjectDetails;
