import React, { Component } from "react";
import axios from "axios";
import ProductdetailsComponent from "../../components/productdetails";
import {
  CardHeader,
  Collapse,
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SimilarSlider from "../../container/productdetails/similarproductsslider";
import Footer from "../Layout/Footer";
import { Button } from "react-bootstrap";

class Productdetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      data: "",
      quantity: 1,
      toastId: null,
      products: {},
      Cid: localStorage.getItem("Cid")
    };
  }

  componentDidMount = async () => {
    await this.fetchProduct();
    await this.showprofile();
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      await this.fetchProduct();
    }
  };

  fetchProduct = async () => {
    try {
      const res = await axios.post(
        "http://192.168.2.118:8080/getItem/" + this.props.match.params.id
      );
      console.log(res);
      this.setState({ product: res.data.result });
    } catch (error) {
      console.log("product fetch err: ", error);
    }
  };

  showprofile = async () => {
    try {
      const { Cid } = this.state;
      const data = { Cid };
      const response = await axios.post(
        "http://192.168.2.118:8080/profile",
        data
      );
      this.setState({ products: response.data.result });
    } catch (error) {
      console.log("product fetch err: ", error);
    }
  };

  add = e => {
    e.preventDefault();
    if (this.state.quantity < this.state.product["quantity"]) {
      this.setState({
        quantity: this.state.quantity + 1
      });
    } else {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.info("Stock limit reach");
      }
    }
    console.log("Stock limit reach");
  };

  subtract = e => {
    e.preventDefault();
    this.setState({
      quantity: this.state.quantity - 1
    });
    console.log("No product added");
  };

  onClick = e => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
      toast.success("You need to login to make purchase");
    }
  };
  back = e => {
    this.props.history.goBack();
  };
  handleToken = async (token, amount, productid, quantity) => {
    console.log(token);
    const { Cid } = this.state;
    const data = { Cid };
    const resp = await axios.post("http://192.168.2.118:8080/payment", {
      data,
      token,
      amount,
      productid,
      quantity
    });

    const { success } = resp.data;
    console.log("Response:", resp.data);
    if (success) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.success("Payment has been successfully done! ");
      }
      this.props.history.push("/success");
    } else {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.danger("Something went wrong");
      }
      this.props.history.push("/failure");
    }
  };

  render() {
    const { product, quantity, products } = this.state;

    return (
      <>
        <CardHeader className="head">
          {" "}
          <div className="details-navbar">
            <Navbar light expand="md" link to="/">
              <Button onClick={this.back}>
                {" "}
                <i className=" fa fa-arrow-circle-left"> Back </i>
              </Button>
              <NavbarBrand link to="/" />{" "}
              <NavLink link to="" className="navbar-text">
                {" "}
                Fashion Junction
              </NavLink>
              <NavbarToggler onClick={this.toggle} />
              <Nav className="ml-auto details-navbar" navbar>
                <Collapse isOpen={this.state.isOpen} navbar>
                  {localStorage.getItem("token") ? (
                    <>
                      <NavLink link to="/profile" className="product-header">
                        &nbsp;&nbsp; &nbsp;&nbsp; profile
                      </NavLink>
                      <NavLink
                        link
                        to="/order-history"
                        className="product-header"
                      >
                        &nbsp;&nbsp; &nbsp;&nbsp; Order-History
                      </NavLink>
                      <NavLink link to="/logout" className="product-header">
                        &nbsp;&nbsp; &nbsp;&nbsp; Logout
                      </NavLink>
                    </>
                  ) : (
                    <>
                      {" "}
                      <NavLink link to="/login" className="navbar-text">
                        &nbsp;&nbsp; &nbsp;&nbsp; Login{" "}
                      </NavLink>
                      <NavLink link to="/signup" className="navbar-text">
                        {" "}
                        &nbsp;&nbsp; &nbsp;&nbsp; Signup
                      </NavLink>{" "}
                    </>
                  )}
                </Collapse>
              </Nav>
            </Navbar>
          </div>
        </CardHeader>

        <ProductdetailsComponent
          obj={product}
          key={product._id}
          object={products}
          // key1={products._id}
          quantity={quantity}
          incQuantity={this.add}
          decQuantity={this.subtract}
          handleToken={this.handleToken}
          onClick={this.onClick}
        />

        <SimilarSlider />

        <Footer />
      </>
    );
  }
}
export default Productdetails;
