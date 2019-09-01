import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import ForgotComponent from "../../components/login/forgotpassword";
//import Validator, { ValidationTypes } from "js-object-validation";


class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
      showNullError: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   this.props.history.push("/product-list");
    // }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async e => {
    e.preventDefault();
    const { email } = this.state;
    if (email === "") {
    } else {
      this.setState({
        isLoading: true,
      });
      axios
        .post("http://192.168.2.112:8080/forgotPassword", {
          email,
        })
        .then(response => {
          console.log(response.data);
          if (response.data === "recovery email sent") {
            this.setState({
              isLoading: false,
            });
            toast.success("Email Send successfully!!");
          }
        })
        .catch(error => {
          console.error(error.response.data);
          this.setState({ isLoading: false });
          toast.error(
            `${(error.message &&
              error.response.data &&
              error.response.data.message) ||
              "Unknown Error"}`
          );
        });
    }
  };

  render() {
    return (
      <ForgotComponent
        email={this.state.email}
        isLoading={this.state.isLoading}
        errors={this.state.errors}
        sendEmail={this.sendEmail}
        handleChange={this.handleChange}
      />
    );
  }
}

export default withRouter(ForgotPassword);
