import React, { Component } from "react";
import { Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { InputGroupText, InputGroup, InputGroupAddon } from "reactstrap";
class ForgotComponent extends Component {
  render() {
    const { email, isLoading } = this.props;
    const { email: emailError } = this.props.errors;
    return (
      <div className="login_Container">
        <form
          onSubmit={this.props.sendEmail}
          noValidate
          className="login_form"
        >
          <h2 align="center">Forgot Password</h2>
          <br />
          <ToastContainer />
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-envelope" />
              </InputGroupText>
            </InputGroupAddon>
          
              <FormControl
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={this.props.handleChange("email")}
             
              />
         
          </InputGroup>
            {emailError ? <p className=" text-danger">{emailError}</p> : null}
          <Button type="submit" color="success" block>
            {" "}
            {isLoading ? "please wait.." : "Submit"}
          </Button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp;
          <div className="b">
            <Link to={"/login"} align="center">
              <p> Sign in</p>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default ForgotComponent;
