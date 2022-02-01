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
    statuses: [
      { _id: 1, name: "My Projects", linkUrl: "" },
      { _id: 2, name: "Settings", linkUrl: "" },
      { _id: 3, name: "Delete Account", linkUrl: "" },
    ],
    selectedStatus: null,
  };

  handleStatusSelect = (status) => {
    this.setState({ selectedStatus: status });
  };

  render() {
    return (
      <div>
        <h1>Dashboard Page</h1>
        <SideBar />
        <Route path="/dashboard/my-projects" component={MyProjects} />
        <Route path="/dashboard/settings" component={Settings} />
        <Route path="/dashboard/delete-account" component={DeleteAccount} />

        {/* <ListGroup
          items={this.state.statuses}
          selectedStatus={this.state.selectedStatus}
          onItemSelect={this.handleStatusSelect}
        /> */}
      </div>
    );
  }
}

export default Dashboard;
