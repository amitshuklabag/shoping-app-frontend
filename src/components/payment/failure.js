import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,

} from "mdbreact";
import React, { Component } from "react";
import { Image, Container } from "react-bootstrap";

class FailureComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Container className="transfail_Container">
          <MDBCard  >
            <MDBCardBody cascade className="text-center">
              <MDBCardTitle>
                <strong>
                  <h1 className="far fa-times-circle fa-10x amber-text pr-3" aria-hidden="true" />
                  <h1 className="transaction" >Sorry!! Try Again..</h1>
                  <h2>Transaction Failed </h2>
                </strong>
              </MDBCardTitle>
              <MDBCardText>
                <span className="float-center font-weight-bold">
                  <strong className="trans_id"> Your Transaction Id :- {}</strong>
                </span>
              </MDBCardText>
              {/* <Link to="/product-list"> */}
                <button type="button" class="btn btn-danger btn-rounded btn-lg" onClick={() => {
                  this.props.history.goBack();
              }}>Try Again <i aria-hidden="true"></i></button>
              {/* </Link> */}
            </MDBCardBody>
          </MDBCard>
        </Container>
      </>
    )
  }
}
export default FailureComponent;
