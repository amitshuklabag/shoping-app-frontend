import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FormControl } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,

  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
 Input, FormGroup
} from "reactstrap";
import Slider from "./card";
class Headers extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      product: [],
      products: [],
      data: [],
      category: "",
      option: [],
      categoryValue: [],
      selectedCategory: "",
      Cid: localStorage.getItem("Cid"),
      
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }


  componentDidMount = async () => {

    axios.get("http://192.168.2.118:8080/getCategory1").then(res => {
      //  console.log(res);
      const result = res.data;

      // console.log("category",result);
      const option = [];
      if (result.result1 && result.result1.length) {
      }
      this.setState({
        option,
        categoryValue: result.result1
      });
    });
  };

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ product: "" });

    const { category } = this.state;
    console.log("d", category);
    this.props.history.push("/product-list/" + this.state.category);
  };
  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { categoryValue, option } = this.state;

    return (
     <CardHeader className="navbar navbar-expand-md navbar-light">
          <Navbar light expand="md">
           
            <NavbarBrand>
              <NavLink link to="" className="navbar-text">
                {" "}
                Fashion Junction
              </NavLink>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <FormControl
                    as="select"
                    name="category"
                    color=" #3a3838"
                    value={this.name}
                    onClick={this.onSubmit}
                    onChange={this.onInputChange}
                  >
                    <option value="" >Select Category</option>
                    {categoryValue && categoryValue.length
                      ? categoryValue.map(category => {
                          return (
                            <option value={category._id}>
                              {category.category}
                            </option>
                          );
                        })
                      : null}
                    )
                  </FormControl>
                </UncontrolledDropdown>
              </Nav>
              
              
              {localStorage.getItem("token") ? (
                <>
                      <NavLink link to="/profile" className="navbar-text">
                      
                      profile
                  </NavLink>
                      <NavLink link to="/order-history" className="navbar-text">
                        
                   Order-History
                     
                  </NavLink>
                      <NavLink link to="/logout" className="navbar-text">
                        
                     
                      Logout
                  </NavLink>
             
                    </>
                  ) : (
                      <>
                        {" "}
                        <NavLink link to="/login" className="navbar-text">
                        
                          Login{" "}
                        </NavLink>
                       
                  <NavLink link to="/signup" className="navbar-text">
                          {" "}
                          Signup
                  </NavLink>{" "}
                      </>
                    )}
            </Collapse>
          </Navbar>
        </CardHeader>
    );
  }
}

export default withRouter(Headers);