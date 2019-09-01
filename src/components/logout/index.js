import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class Logout extends Component {
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("login");
      toast.isActive("Log Out Succesfully");
    }
  };

  render() {
    return (
      <div>
        toast.isActive("Log Out Succesfully");
        <Link to={"/"} onClick={localStorage.clear()}>
          LOG OUT

        </Link>
      </div>
    );
  }
}
export default Logout;
