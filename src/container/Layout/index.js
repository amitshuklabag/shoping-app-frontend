import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <div className="row">
          <div className="col-md-2"  >
            <Sidebar  />
          </div>
          <div className="col-md-10">{this.props.children}</div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Layout;
