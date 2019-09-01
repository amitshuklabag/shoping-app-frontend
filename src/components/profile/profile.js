import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  Label,
  CardBody,
  Col,
  Container,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  CardHeader,
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  Input,
} from "reactstrap";
import Footer from "../../container/Layout/Footer";
import Headers from "../../components/home/header";

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    const { isLoading } = this.props;
    const {
      name: nameError,
      email: emailError,
      mobile_no: mobile_noError,
      gender: genderError,
    } = this.props.errors;
    return (
      <div>
       <Headers/>
        <div className="app flex-row align-items-center">
          <Container className="profile-container">
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4 profile-card" style={{ marginTop: "50px" }}>
                  <CardBody className="p-4">
                    <Form onSubmit={this.props.onSubmit} noValidate>
                      <h1 align="center">Profile</h1>
                      <InputGroup align="center">
                        <div className="imgPreview">
                          {this.props.$imagePreview}
                        </div>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Label for="file"> Upload your picture </Label>
                        <Input
                          type="file"
                          autoComplete="file"
                          value={this.file}
                          onChange={this.props.onChangefile}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
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
                          value={this.props.name}
                          onChange={this.props.onInputChange}
                        />
                        {nameError ? (
                          <p style={{ color: "red" }}>{nameError}</p>
                        ) : null}
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                           <i className="fa fa-envelope left" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="email"
                          placeholder="Email"
                          autoComplete="email"
                          value={this.props.email}
                          onChange={this.props.onInputChange}
                        />
                        {emailError ? (
                          <p style={{ color: "red" }}>{emailError}</p>
                        ) : null}
                      </InputGroup>
                      <InputGroup className="mb-3">
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
                          value={this.props.mobile_no}
                          onChange={this.props.onInputChange}
                        />
                        {mobile_noError ? (
                          <p style={{ color: "red" }}>{mobile_noError}</p>
                        ) : null}
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Label for="gender" />
                        <Input
                          type="select"
                          name="gender"
                          id="gender"
                          onChange={this.props.onInputChange}
                        >
                          <option value={""}>{this.props.gender}</option>
                          <option value={"male"}>Male</option>
                          <option value={"female"}>Female</option>
                          <option value={"other"}>Other</option>
                        </Input>
                      {genderError ? (
                        <p style={{ color: "red" }}>{genderError}</p>
                      ) : null}
                      </InputGroup>
                      <Button color="success" block>
                        {isLoading ? "please wait.." : "Update Profile"}
                      </Button>
                      <br />
                      <Button
                        // variant="info"
                        block
                        color="primary"
                        align="center" // className="flex-center"
                        onClick={() => {
                          this.props.history.goBack();
                        }}
                      >
                        Back
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(ProfileComponent);
