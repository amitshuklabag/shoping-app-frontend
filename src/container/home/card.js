import React, { Component } from "react";
import axios from "axios";
import Slider from "react-slick";
import CardComponent from "../../components/home/card";
import { NavLink, Link } from "react-router-dom";
import Footer from "../Layout/Footer";
import { FormControl } from "react-bootstrap";
import Headers from "../../components/home/header";

import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  CardFooter
} from "reactstrap";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  arrows: true
};
const settings1 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  swipeToSlide: true,
  arrows: true,
  centerMode: true,
  centerPadding: "40px",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
};
const popularvisit = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 5000,
  cssEase: "linear"
};

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      products: [],
      data: [],
      category: "",
      option: [],

      selectedCategory: "",
      Cid: localStorage.getItem("Cid")
    };
  }
  componentDidMount = async () => {
    const { Cid, product } = this.state;
    const data = { Cid };
    const res = await axios.post(
      "http://192.168.2.118:8080/getproductlimit",
      data
    );
    const dataresult = res.data.result;
    console.log("dadad", dataresult);
    var n;
    for (n = 0; n < dataresult.length; n++) {
      // this.setState({ product: product.push(dataresult[n]) });
      product.push(dataresult[n][0]);
      console.log("proihdsbf",product);
    }
    if (!dataresult) {
      console.log("error");
    }

    const response = await axios.get("http://192.168.2.118:8080/newProduct");
    const result1 = response.data.result;
    this.setState({ products: result1 });
    if (!result1) {
      console.log("error");
    }

    const response1 = await axios.get("http://192.168.2.118:8080/visitProduct");
    const result2 = response1.data.result;
    this.setState({ data: result2 });
    if (!result2) {
      console.log("error");
    }
  };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { product } = this.state;
    const { products } = this.state;
    const { data } = this.state;

    return (
      <>
        <Headers />
        <div>
          {localStorage.getItem("Cid") ? (
            <>
              <h4 className={"h4"}> Recently visited products</h4>
              <Slider {...settings}>
                {product && product.length
                  ? product.map(product => {
                      return <CardComponent obj={product} key={product._id} />;
                    })
                  : null}
              </Slider>{" "}
            </>
          ) : null}
          <div className={"multi1"}>
            <h4 className={"h4"}>Featured products</h4>
            <Slider {...settings1}>
              {products && products.length
                ? products.map(products => {
                    return <CardComponent obj={products} key={products._id} />;
                  })
                : null}
            </Slider>
          </div>

          <div className={"rowgap"} />

          <div className={"multi"}>
            <h4 className={"h4"}> Popular products</h4>
            <Slider {...popularvisit}>
              {data && data.length
                ? data.map(data => {
                    return <CardComponent obj={data} key={data._id} />;
                  })
                : null}
            </Slider>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}
export default CardContainer;
