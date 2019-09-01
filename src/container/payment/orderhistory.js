import React, { Component, Fragment } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import OrderComponent from "../../components/payment/orderhistory";

import Headers from "../../components/home/header";

import { Link } from "react-router-dom";
import { MDBBtn, MDBIcon } from "mdbreact";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import Footer from "../Layout/Footer";
class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = { product: [],  category: [], Cid: localStorage.getItem("Cid") };
  }
  componentDidMount = async () => {
    const {product} = this.state;
    const token = localStorage.getItem("token");
    if(!token){
      this.props.history.push("/login")
    }
    const { Cid } = this.state;
    const data = { Cid };
    const res = await axios.post("http://192.168.2.118:8080/orderhistory" , data);
    console.log("amit",res);
    // const result = res.data.result1;
   
         
    this.setState({ product: res.data.result});
    // console.log("adadaabdvbsudgh" , result);
   
    if (!product) {
      console.log("error");
    }
  };
  render() {
    const { product , category } = this.state;
    return (
      <>
        {product.length ? (
          <>
          <Headers/>
          <div className="order-history">
                        <h2>Order History</h2>

            <Table striped bordered hover variant="dark" className="css-serial">
              <thead>
                <tr class="table-active" textAlign="center" >
                  <th align="center" >S.No.</th>
                  <th align="center">Product Image</th>
                  <th align="center">Product</th>
                  <th align="center"> Price</th>
                  <th align="center">Quantity</th>
                  {/* <th align="center">Amount</th> */}
                    <th>Date</th>
                  <th>Transaction Id</th>
                  {/* <th>Status</th> */}
                  {/* <th colSpan="2">Action</th> */}
                </tr>
              </thead>
              <tbody>
             
                {product && product.length
                  ? product.map(product => {
                      return (
                        <OrderComponent
                          obj={product}
                          key={product._id}
                        />
                      );
                    })
                  : null}
              </tbody>
            </Table>
            </div>
<Footer/>
          </>
        ) : (
          <>
          <Headers/>
              <div className="order-history">
                <h2>Order History</h2>

            <Table className="order">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Product Image</th>
                  <th>Product Title</th>
                  <th>Product Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Transaction Id</th>
                  {/* <th colSpan="2">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {product && product.length
                  ? product.map(product => {
                      return <OrderComponent obj={product} key={product._id} />;
                    })
                  : null}
              </tbody>
            </Table>
            <div style={{ margin: "0 auto", textAlign: "center" }}>
              <MDBIcon icon="ban" className={"icons"} />
              <p align="center">
                {" "}
                Currrently No orders are available in the Order list
              </p>
              <Button
                 color={"primary"}
                value={"Go to home"}
                onClick={() => {
                  this.props.history.push("/");
                }}
              >
                <i className="fa fa-plus left"> Start Shopping </i>{" "}
              </Button>
            </div>
            </div>
            <Footer/>
          </>
        )}
      </>
    );
  }
}
export default OrderList;
