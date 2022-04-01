import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./index.css";
import SignupComponent from "../../components/signup";
const BASE_URL = "http://192.168.2.118:8080/";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      mobile_no: "",
      gender: "",
      file: "",
      imageUpdated: false,
      imagePreviewUrl: "",
      toastId: null,
      errors: {},
      isLoading: false
    };
  }

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.history.push("/");
    }
  };

  onRegister = async e => {
    e.preventDefault();
    this.setState({
      isLoading: true,
      errors: {}
    });
    try {
      const {
        name,
        email,
        password,
        cpassword,
        mobile_no,
        gender,
        file
      } = this.state;
      const obj = { name, email, password, cpassword, mobile_no, gender };
      
      const data = {
        name,
        email,
        password,
        cpassword,
        mobile_no,
        gender,
        file
      };
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element);
        }
      }
      const result1 = await axios.post(
        "http://192.168.2.118:8080/addUser",
        body
      );
      if (result1) {
        this.setState({
          name: "",
          email: "",
          password: "",
          cpassword: "",
          mobile_no: "",
          gender: "",
          file: "",
          isLoading: false
        });
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.success("You are Successfully signup");
        }
        this.props.history.push("/login");
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(
          `${(error.response &&
            error.response.data &&
            error.response.data.message[0].msg) ||
          "Unknown error"}`
        );
      }
      this.props.history.push("/signup");
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

  onfileChange = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      file: e.target.files[0] ? e.target.files[0] : null,
      imageUpdated: true
    });
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  render() {
    let { imagePreviewUrl, file } = this.state;
    let $imagePreview = (
      <img src={BASE_URL + file} alt={""} width="150px" height="150px" />
    );
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} alt={""} width="150px" height="150px" />
      );
    }

    return (
      <SignupComponent
        name={this.state.name}
        email={this.state.email}
        password={this.state.password}
        cpassword={this.state.cpassword}
        mobile_no={this.state.mobile_no}
        gender={this.state.gender}
        file={this.state.file}
        errors={this.state.errors}
        isLoading={this.state.isLoading}
        onInputChange={this.onInputChange}
        onfileChange={this.onfileChange}
        onRegister={this.onRegister}
        $imagePreview={$imagePreview}
      />
    );
  }
}
export default Signup;
