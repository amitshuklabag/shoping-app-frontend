import React, { Component } from "react";
import {
  Button,
  Label,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
import Headers from "../../components/home/header";

class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.State = {};
  }

  render() {
    const { isLoading } = this.props;
    const {
      name: nameError,
      email: emailError,
      password: passwordError,
      cpassword: cpasswordError,
      mobile_no: mobile_noError,
      gender: genderError
    } = this.props.errors;

    return (
      <div>
        <Headers />
        <div className="login_loginContainer__2JMrT">
          <Container className="container1">
            <Form
              onSubmit={this.props.onRegister}
              noValidate
              className="signup"
            >
              <Row>
                <Col>
                  <h1>Register</h1>
                </Col>
                <Col>
                  {" "}
                  <div className="icon-cancel">
                    <Link to={"/login"}>
                      <i className="fas fa-times-circle" />{" "}
                    </Link>
                  </div>
                </Col>
              </Row>

              <p className="text-muted">Create your account</p>

              <InputGroup className="mb-2">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-user left" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  autoComplete="name"
                  onChange={this.props.onInputChange}
                />
              </InputGroup>
              {nameError ? <p style={{ color: "red" }}>{nameError}</p> : null}

              <InputGroup className="mb-2">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-envelope" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  onChange={this.props.onInputChange}
                />
              </InputGroup>
              {emailError ? <p style={{ color: "red" }}>{emailError}</p> : null}

              <Row>
                <Col md="9" lg="7" xl="6">
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-key" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="password"
                      onChange={this.props.onInputChange}
                    />
                  </InputGroup>
                  {passwordError ? (
                    <p style={{ color: "red" }}>{passwordError}</p>
                  ) : null}
                </Col>
                <Col md="9" lg="7" xl="6">
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-lock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="cpassword"
                      placeholder="Confirm password"
                      autoComplete="password"
                      onChange={this.props.onInputChange}
                    />
                  </InputGroup>{" "}
                  {cpasswordError ? (
                    <p style={{ color: "red" }}>{cpasswordError}</p>
                  ) : null}
                </Col>
              </Row>

              <Row>
                <Col md="9" lg="7" xl="6">
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-phone-square" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="mobile_no"
                      placeholder="Mobile no."
                      autoComplete="mobile_no"
                      onChange={this.props.onInputChange}
                    />
                  </InputGroup>{" "}
                  {mobile_noError ? (
                    <p style={{ color: "red" }}>{mobile_noError}</p>
                  ) : null}
                </Col>
                <Col md="9" lg="7" xl="6">
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-user-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Label for="gender" />
                    <Input
                      type="select"
                      name="gender"
                      id="gender"
                      onChange={this.props.onInputChange}
                    >
                      <option value={""}>- Gender-</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                      <option value={"other"}>Other</option>
                    </Input>
                  </InputGroup>
                  {genderError ? (
                    <p style={{ color: "red" }}>{genderError}</p>
                  ) : null}
                </Col>
              </Row>
              <InputGroup className="mb-2">
                <Label for="file"> Upload your picture </Label>
                <Input
                  type="file"
                  autoComplete="file"
                  onChange={this.props.onfileChange}
                />
              </InputGroup>

              <InputGroup align="center">
                <div className="imgPreview">{this.props.$imagePreview}</div>
              </InputGroup>

              <Button color="success" block>
                {isLoading ? "please wait.." : "Create Account"}
              </Button>
              <Link to="/login">
                <p>Already have an account!! Click here</p>
              </Link>
            </Form>

          </Container>
        </div>
       
      </div>
    );
  }
}

export default SignupComponent;