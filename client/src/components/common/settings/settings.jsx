import React, { Component } from "react";
import auth from "../../../services/authService";
import { getMe } from "./../../../services/userService";

import "./settings.scss";

class Settings extends Component {
  state = {
    me: {
      _id: "",
      username: "",
      email: "",
      discordName: "",
      role: "",
      profilePhoto: "",
    },
  };

  mapToViewModel(me) {
    return {
      _id: me.id,
      username: me.username,
      email: me.email,
      discordName: me.discordName,
      role: me.role,
      profilePhoto: me.profilePhoto,
    };
  }

  async componentDidMount() {
    try {
      const { data } = await getMe();
      const { data: me } = data;
      this.mapToViewModel(me);
      // console.log(me);
      this.setState({ me: this.mapToViewModel(me) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>
        <p>{this.state.me.username}</p>
      </div>
    );
  }
}

export default Settings;
