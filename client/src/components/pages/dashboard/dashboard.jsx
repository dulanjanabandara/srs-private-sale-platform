import React, { Component } from "react";
import { Route } from "react-router-dom";
import SideBar from "../../common/sideBar/sideBar";
import MyProjects from "./../../common/myProjects/myProjects";
import Settings from "./../../common/settings/settings";
import DeleteAccount from "./../../common/deleteAccount/deleteAccount";

import "./dashboard.scss";
// import ListGroup from "./../../common/listGroup/listGroup";

class Dashboard extends Component {
  state = {
    statuses: [],
    selectedStatus: null,
  };

  handleStatusSelect = (status) => {
    this.setState({ selectedStatus: status });
  };

  populateStatuses() {
    const statuses = [
      { _id: 1, name: "My Projects", linkUrl: "/dashboard/my-projects" },
      { _id: 2, name: "Settings", linkUrl: "/dashboard/settings" },
      { _id: 3, name: "Delete Account", linkUrl: "/dashboard/delete-account" },
    ];

    this.setState({ statuses });
  }

  componentDidMount() {
    this.populateStatuses();
  }

  render() {
    return (
      <div className="dashboard-content">
        <SideBar
          items={this.state.statuses}
          selectedStatus={this.state.selectedStatus}
          onItemSelect={this.handleStatusSelect}
        />
        <Route path="/dashboard/my-projects" component={MyProjects} />
        <Route path="/dashboard/settings" component={Settings} />
        <Route path="/dashboard/delete-account" component={DeleteAccount} />
      </div>
    );
  }
}

export default Dashboard;
