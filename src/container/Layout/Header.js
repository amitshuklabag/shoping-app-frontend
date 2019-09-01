import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  CardHeader,
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  Input,
  FormGroup
} from "reactstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { FormControl } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      category: "",
      option: [],
      categoryValue: [],
      name: ""
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  // componentDidMount = async () => {
  //   axios.get("http://192.168.2.118:8080/getCategory1").then(res => {
  //     const result = res.data;
  //     const option = [];
  //     if (result.result1 && result.result1.length) {
  //     }
  //     this.setState({
  //       option,
  //       categoryValue: result.result1
  //     });
  //   });
  // };
  render() {
    const { categoryValue, option } = this.state;

    return (
      <>
        <CardHeader className="navbar navbar-expand-md navbar-light">
          <Navbar light expand="md">
           
            <NavbarBrand>
              <NavLink link to="" className="navbar-text">
                {" "}
                Fashion Junction
              </NavLink>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <FormGroup className="product-header">
              <div className="row">
                <div className="col">
                  <Input
                    type="search"
                    name="name"
                    value={this.props.name}
                    onChange={this.props.onChange}
                    placeholder="Search"
                    row
                  />
                </div>
                <div className="col">
                  <Button color="primary" row onClick={this.props.onSubmit}>
                    Search
                  </Button>
                  &nbsp; &nbsp;
                  <Button color="primary" row onClick={this.props.onClick}>
                    Reset
                  </Button>
                  &nbsp;
                </div>
              </div>
            </FormGroup>
            <Collapse isOpen={this.state.isOpen} navbar>
               
                  <Nav className="ml-auto" navbar>
              {localStorage.getItem("token") ? (
                <>
                    <NavLink link to="/profile" className="product-header">
                      
                      profile
                  </NavLink>
                    <NavLink link to="/order-history" className="product-header">
                          &nbsp;&nbsp; &nbsp;&nbsp;
               Order-History
                 &nbsp;&nbsp; &nbsp;&nbsp;
                  </NavLink>
                    <NavLink link to="/logout" className="product-header">
                        
                     
                      Logout
                  </NavLink>
             
                    </>
                  ) : (
                      <>
                        {" "}
                      <NavLink link to="/login" className="product-header">
                          Login{" "}
                        </NavLink>
                        &nbsp;&nbsp; &nbsp;&nbsp;
                  <NavLink link to="/signup" className="product-header">
                          {" "}
                          Signup
                  </NavLink>{" "}
                      </>
                    )}
              
            </Nav>
            </Collapse>
          </Navbar>
        </CardHeader>
      </>
    );
  }
}
export default withRouter(Header);
