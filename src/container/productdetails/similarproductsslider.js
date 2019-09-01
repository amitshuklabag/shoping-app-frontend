import React, { Component } from "react";
import axios from "axios";
import Slider from "react-slick";
import SimilarProductsComponent from "../../components/productdetails/similarproductsslider";
import { withRouter } from "react-router-dom";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3
};
class SimilarSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      category: ""
    };
  }
  componentDidMount = async () => {
    await this.similarProduct();
  };

  similarProduct = async () => {
    try {
      console.log(this.props);
      const res = await axios.post(
        "http://192.168.2.118:8080/getItem/" + this.props.match.params.id
      );
      this.setState({ category: res.data.result.category });
      const data = { category: res.data.result.category };

      const result = await axios.post(
        "http://192.168.2.118:8080/searchProductByCat",
        data
      );
      this.setState({ product: result.data.result });
    } catch (error) {
      console.log("product fetch err: ", error);
    }
  };
  render() {
    const { product } = this.state;
    console.log(product ? product.length : "");
    console.log("product ? product.length");

    return (
      <>
        <h4 className={"h4"}> Similar products</h4>
        <Slider {...settings}>
          {product && product.length
            ? product.map(product => {
                console.log("fffffffffffff");
                return (
                  <SimilarProductsComponent obj={product} key={product._id} />
                );
              })
            : null}
        </Slider>
      </>
    );
  }
}
export default withRouter(SimilarSlider);
