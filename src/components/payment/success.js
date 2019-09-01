import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from "mdbreact";
import React, { Component } from "react";
import { Container } from "react-bootstrap";

import { withRouter, Link } from "react-router-dom";
class SuccessComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="success_Container">
          <Container className="trans_Container">
            <MDBCard>
              <MDBCardBody cascade className="text-center">
                <MDBCardTitle>
                  <strong>
                    <h1
                      className="far fa-check-circle fa-5x amber-text pr-3"
                      aria-hidden="true"
                    />
                    <h1 className="transaction">Thank You!For Purchase</h1>
                    <h2>Transaction Successfull.. </h2>
                  </strong>
                </MDBCardTitle>
                <MDBCardText>
                  {/* <span className="float-center font-weight-bold">
              <strong className="trans_id"> Your Transaction Id :- {}</strong>
            </span> */}
                </MDBCardText>
                <Link to="/">
                  <button type="button" class="btn btn-info btn-rounded btn-lg">
                    Continue Shopping
                    <i class="fas fa-heart ml-2" aria-hidden="true" />
                  </button>
                </Link>
              </MDBCardBody>
            </MDBCard>
          </Container>
        </div>
      </>
    );
  }
}
export default SuccessComponent;
