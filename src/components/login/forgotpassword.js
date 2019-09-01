import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
class ForgotComponent extends Component {
  constructor(props) {
    super(props);
    this.State = {
    };

  }

  render() {
    const { isLoading } = this.props;
    //const { email: emailError } = this.props.errors;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card
                  className="p-4"
                  style={{ marginTop: "50px", marginBottom: "50px" }}
                >
                  <CardBody>
                    <Form onSubmit={this.props.sendEmail} noValidate>
                      <h1>Forgot Password</h1>
                      {/* <p className="text-muted"></p> */}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-envelope" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          name="email"
                          placeholder="email"
                          autoComplete="username"
                          onChange={this.props.handleChange('email')}
                        />
                        {/* {emailError ? (
                          <p style={{ color: "red" }}>{emailError}</p>
                        ) : null} */}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"

                          >
                            {isLoading ? "Please wait.." : " Send Confirmation"}
                          </Button>
                        </Col>
                        <Button
                          variant="primary"
                          className="px-4"
                          onClick={() => {
                            this.props.history.goBack();
                          }}
                        >
                          <i className="fa fa-sign-in-alt left"></i>Log In
                        </Button>
                        <br />  
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
  }
}

export default withRouter(ForgotComponent);
