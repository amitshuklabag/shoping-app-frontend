import axios from "axios";
import Validator, { ValidationTypes } from "js-object-validation";
import React, { Component } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { BASE_URL }  from "../../BASE_URL ";
import ProfileComponent from "../../components/profile/profile";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      gender: "",
      mobile_no: "",
      file: "",
      errors: {},
      imageUpdated: false,
      imagePreviewUrl: "",
      isLoading: false,
      Cid: localStorage.getItem("Cid"),
      toastId: null,
    };
  }
  notify = () =>
    (this.toastId = toast("Profile Update Successfully", {
      autoClose: 2000,
      closeButton: false, // Remove the closeButton
    }));

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
    try {
      const { Cid } = this.state;
      const obj = { Cid };
      const response = await axios.post(
        "http://192.168.2.118:8080/profile",
        obj,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      this.setState({
        name: response.data.result.name,
        email: response.data.result.email,
        mobile_no: response.data.result.mobile_no,
        gender: response.data.result.gender,
        file: response.data.result.file,
      });
    } catch (error) {
      console.log(error);
    }
  };
  onSubmit = async e => {
    e.preventDefault();
    this.setState({
      isLoading: true,
      errors: {},
    });
    try {
      const {
        name,
        email,
        mobile_no,
        gender,
        file,
        Cid,
        imageUpdated,
      } = this.state;
      const obj = {
        name,
        email,
        gender,
        mobile_no,
      };
      const validations = {
        name: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MAXLENGTH]: 20,
        },
        email: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EMAIL]: true,
        },
        gender: {
          [ValidationTypes.REQUIRED]: true,
        },
        mobile_no: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.NUMERIC]: true,
          [ValidationTypes.MINLENGTH]: 7,
          [ValidationTypes.MAXLENGTH]: 14,
        },
      };
      const messages = {
        name: {
          [ValidationTypes.REQUIRED]: "Please Enter Name",
        },
        email: {
          [ValidationTypes.REQUIRED]: "Please Enter Email ",
        },
        mobile_no: {
          [ValidationTypes.REQUIRED]: "Please Enter Mobile NO",
        },
        gender: {
          [ValidationTypes.REQUIRED]: "Please Select Gender",
        },
      };
      const { isValid, errors } = Validator(obj, validations, messages);
      if (!isValid) {
        this.setState({
          errors,
          isLoading: false,
        });
        return;
      }
      const data = {
        name,
        email,
        mobile_no,
        gender,
        file,
        Cid,
        imageUpdated,
      };
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element);
        }
      }
      const token = localStorage.getItem("token");
      const result = await axios.post(
        "http://192.168.2.118:8080/profileUpdate",
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
     
      if (result) {
        this.setState({
          isLoading: false,
        });
      Swal.fire({
        type: "success",
        title: "Success",
        text: "Profile Updated Sucessfully",
      });
    }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  };
  onInputChange = e => {
    console.log("wdfsewgdfhb");
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null,
      },
    });
  };
  onChangefile = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      file: e.target.files[0] ? e.target.files[0] : null,
      imageUpdated: true,
    });
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  render() {
    const { name, email, gender, mobile_no, isLoading } = this.state;
    let { imagePreviewUrl, file } = this.state;
    let $imagePreview = (
      <img
        height="50%"
        width="50%"
        src={BASE_URL + file}
        className="img-fluid rounded-circle hoverable"
        alt="No Image Selected"
      />
    );
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          height="50%"
          width="50%"
          className="img-fluid rounded-circle hoverable"
          alt="No Image Selected"
        />
      );
    }
    return (
      <ProfileComponent
        imagePreviewUrl={this.state.imagePreviewUrl}
        notify={this.notify}
        errors={this.state.errors}
        name={name}
        file={this.state.file}
        email={email}
        gender={gender}
        mobile_no={mobile_no}
        isLoading={isLoading}
        onChangefile={this.onChangefile}
        onInputChange={this.onInputChange}
        $imagePreview={$imagePreview}
        onSubmit={this.onSubmit}
      />
    );
  }
}
export default Profile;
