import React, { Component } from "react";
import Form from "./../form/form";
import Joi from "joi-browser";
import auth from "../../../services/authService";
import { toast } from "react-toastify";
import { joinProject } from "../../../services/projectService";

import "./fundProject.scss";

class FundProject extends Form {
  state = {
    _id: this.props.project._id,
    data: {
      contributionAmount: "",
      contributingWallet: "",
      transactionLink: "",
    },
    errors: {},
  };

  schema = {
    contributionAmount: Joi.number().required().label("Contribution Amount"),
    contributingWallet: Joi.string().required().label("Contributing Wallet"),
    transactionLink: Joi.string().required().label("Transaction Link"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await joinProject(
        this.state._id,
        data.contributionAmount,
        data.contributingWallet,
        data.transactionLink
      );
      toast.success("Fund Successful! Admin will approve your request.", {
        theme: "colored",
      });
      //   window.location = "/";
      // this.props.history.push("/dashboard");
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        // errors.email = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { ...projectProps } = this.props;
    // console.log({ ...projectProps });
    // console.log(this.props.project._id);

    return (
      <div>
        <h1>FUND</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("contributionAmount", "Contribution Amount")}
          {this.renderInput("contributingWallet", "Contributing Wallet")}
          {this.renderInput("transactionLink", "Transaction Link")}
          {this.renderButton("Fund")}
        </form>
      </div>
    );
  }
}

export default FundProject;
