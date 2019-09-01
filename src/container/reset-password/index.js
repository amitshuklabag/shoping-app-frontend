import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Validator, { ValidationTypes } from "js-object-validation";
import { toast } from "react-toastify";
import ResetComponent from "../../components/reset-password";
class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      cPassword: "",
      resetPasswordToken: "",
      updated: false,
      isLoading: true,
      error: false,
      errors: {},
      toastId: null
    };
  }

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        "http://192.168.2.118:8080/reset/" + this.props.match.params.token1
      );
      console.log("upp",response);
      if (response) {
        this.setState({
          email: response.data.user.email,
          resetPasswordToken: response.data.user.resetPasswordToken,
          updated: true
        });
      }
    } catch (error) {
      console.log(error.response.data);
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Something went wrong! in link"
        // footer: '<a href>Why do I have this issue?</a>'
      });
      this.setState({
        updated: false,
        isLoading: false,
        error: true
      });
    }
  };
  updatePassword = async e => {
    e.preventDefault();
    try {
      const { email, password, cpassword } = this.state;
      const obj = { email, password, cpassword };
      const validations = {
        email: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EMAIL]: true
        },
        password: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MINLENGTH]: 4
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EQUAL]: "password"
        }
      };
      const messages = {
        email: {
          [ValidationTypes.REQUIRED]: "Please enter email address",
          [ValidationTypes.EMAIL]: "Please enter valid email address."
        },
        password: {
          [ValidationTypes.REQUIRED]: "Please enter password.",
          [ValidationTypes.MINLENGTH]: "Please enter at least 4 characters."
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: "Please enter confirm password.",
          [ValidationTypes.EQUAL]: "Password and confirm password didn't match."
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

      const result = await axios.put(
        "http://192.168.2.118:8080/updatePasswordViaEmail",
        {
          email: this.state.email,
          password: this.state.password,
          cpassword: this.state.password,
          resetPasswordToken: this.props.match.params.token1
        }
      );
      console.log("update",result);
      if (result) {
        this.setState({
          email: "",
          password: "",
          cpassword: "",
          isLoading: false
        });
        Swal.fire({
          position: "center",
          type: "success",
          title: "Your Password Reset Successfully",
          showConfirmButton: true,
          timer: 1800
        });
        this.props.history.push("/login");
        console.log(result.data);
        this.setState({
          error: false
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({ isLoading: false });
     

      if (!toast.isActive(this.toastId)) {
        this.toastId =  toast.error(
        `${(error.response &&
          error.response.data &&
          error.response.data.message) ||
          "Unknown error"}`
      );
        }
      console.log(error.response.data.message);
    }
  };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null
      }
    });
  };

  render() {
    return (
      <ResetComponent
        email={this.state.email}
        password={this.state.password}
        cpassword={this.state.cpassword}
        isLoading={this.state.isLoading}
        errors={this.state.errors}
        updatePassword={this.updatePassword}
        updated={this.state.updated}
        resetPasswordToken={this.state.resetPasswordToken}
        onInputChange={this.onInputChange}
        error={this.state.error}
      />
    );
  }
}
export default ResetPassword;