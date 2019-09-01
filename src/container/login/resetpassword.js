import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import ResetComponent from "../../components/login/resetpassword";
import Validator, { ValidationTypes } from "js-object-validation";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      value: "",
      password: "",
      updated: false,
      isLoading: true,
      error: false,
      errors: {},
    };
  }
  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.history.push("/product-list");
    }
    await axios
      .get("http://192.168.2.112:8080/reset/" + this.props.match.params.token1)
      .then(response => {
        // console.log("response.data.message");
        // console.log(response.data.message);
        console.log(response);

        if (response.data.success === true) {
          this.setState({
            email: response.data.email,
            updated: false,
            isLoading: false,
            error: false,
            value: response.data.success
          });
        }
        console.log("success");
        console.log(response.data.success);
      })
      .catch(error => {
        console.log(error.response.data);
        this.setState({
          updated: false,
          isLoading: false,
          error: true
        });
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };



  updatePassword = e => {
    e.preventDefault();
    this.setState({
      errors: {}
    })
    try {
      const { password, cpassword } = this.state;
      const obj = { password, cpassword }
      const validations = {

        password: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.PASSWORD]: true,
          [ValidationTypes.MINLENGTH]: 8,
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EQUAL]: "password"
        }
      };
      const messages = {

        password: {
          [ValidationTypes.REQUIRED]: "Please enter password.",
          [ValidationTypes.MINLENGTH]: "Please enter at least 8 characters.",
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: "Please enter confirm password.",
          [ValidationTypes.EQUAL]: "Password and confirm password didn't match"
        }
      };
      const { isValid, errors } = Validator(obj, validations, messages);
      if (!isValid) {
        this.setState({
          errors,
          isLoading: false
        });
        return;
      }
      axios.put("http://192.168.2.112:8080/updatePasswordViaEmail", {
        email: this.state.email,
        resetPasswordToken: this.props.match.params.token,
        password: this.state.password
      })
        .then(response => {
          console.log(response.data);
          if (response.data.success === true) {
            this.setState({
              updated: true,
              error: false
            });
            toast.success("Password updated successfully")
            this.props.history.push("/login")
          } else {
            this.setState({
              updated: false,
              error: true
            });
          }
        })
    } catch (error) {
      console.log(error)
      this.setState({ isLoading: false });
      toast.error(`${(error.response && error.response.data && error.response.data.message[0].msg) || "Unknown error"}`);
      this.props.history.push("/signup")

    }
  };
  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <ResetComponent
        password={this.state.password}
        isLoading={this.state.isLoading}
        errors={this.state.errors}
        updatePassword={this.updatePassword}
        onInputChange={this.onInputChange}
      />
    );
  }
}

export default withRouter(ResetPassword);
