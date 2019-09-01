import axios from "axios";
import React, { Component } from "react";
import { toast } from "react-toastify";
class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      Cid: localStorage.getItem("Cid"),
    };
  }
  notify = () =>
    (this.toastId = toast.isActive("Profile Update Successfully", {
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { name, } = this.state;
    return <SuccessComponent notify={this.notify} name={name} />;
  }
}
export default Success;
