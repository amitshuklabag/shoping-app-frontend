import React, { Component } from "react";
import { Link } from "react-router-dom";
const BASE_URL = "http://192.168.2.118:8080/";

export default class SimilarProductsComponent extends Component {
  render() {
    return (
      <>
        <div className={"animate"}>
          <div className="container ">
            <div>
              <Link to={"/product-details/" + this.props.obj._id}>
                <img
                  src={BASE_URL + this.props.obj.thumbnail}
                  alt={"No img"}
                  className="ig"
                />
              </Link>
              <h5 className="textcenter">{this.props.obj.name}</h5>
              <h5 className="textcenter">
                {" "}
                <b> $ </b>{" "}
                {this.props.obj.price ? this.props.obj.price.toFixed(2) : 0.0}
              </h5>
            </div>
          </div>
        </div>
      </>
    );
  }
}
