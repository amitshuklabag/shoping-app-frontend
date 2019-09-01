import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
const loading = {
  margin: "1em",
  fontSize: "24px"
};
class ResetComponent extends Component {
  constructor(props) {
    super(props);
    this.State = {
    };
  }

  render() {
    const { isLoading , value } = this.props;
    const { password: passwordError, cpassword: cpasswordError } = this.props.errors;
    if (value === false) {
    return (
        <>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <CardGroup>
                  <Card
                    className="p-4">
                    <CardBody>
                    
                      <h1> Problem resetting password. Please send another reset link.</h1>
                      <Link to={"/login"}>
                        <Button>Go Home</Button>
                      </Link>
                      <Link to={"/forgot-password"}>
                        <Button>Forgot Password</Button>
                      </Link>
        </CardBody>
        </Card>
 </CardGroup>
 </Col>
 </Row>
 </Container>
 </div>
        </>
      );
    }
    if (isLoading) {
      return (
        <>
          <div>
            <div style={loading}>Loading User Data...</div>
          </div>
        </>
      );
    }
    if (value === true) {
      return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card
                  className="p-4">
                  <CardBody>
                    <Form onSubmit={this.props.updatePassword} noValidate>
                      <h1>Reset Password</h1>
        
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-key top" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="password"
                          
                          onChange={this.props.onInputChange}
                        />
                        {passwordError ? (
                          <p style={{ color: "red" }}>{passwordError}</p>
                        ) : null}
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-key" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="cpassword"
                          placeholder="Conform Password"
                          autoComplete="current-password"
                          onChange={this.props.onInputChange}
                        />
                        {cpasswordError ? (
                          <p style={{ color: "red" }}>{cpasswordError}</p>
                        ) : null}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="success"
                            className="px-4"

                          >
                            {isLoading ? "Please wait.." : " Update Password"}
                            {/* Login */}
                          </Button>
                        </Col>
                       
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
    
  } else {
  return <p><h1>Your link has been expired.Please send another reset link.</h1></p>;
}
  }
}


export default ResetComponent;
