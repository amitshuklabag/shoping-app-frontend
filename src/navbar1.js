import React from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavItem,
  Collapse,
  NavbarToggler
} from "reactstrap";

const NavbarHeadForCard = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarToggler />
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">
              GitHub
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarHeadForCard;
