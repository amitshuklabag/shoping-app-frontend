import React, { Component } from "react";
import axios from "axios";
import ProductComponent from "../../components/productlist/index";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Sidebar from "../Layout/Sidebar";
import { Pagination, Container } from "react-bootstrap";
import { Card } from "reactstrap";
import { BASE_URL } from "../../BASE_URL ";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      name: "",
      order: "",
      category: "",
      value: "",
      sort: "",
      currentPage: 1,
      totalPageRec: 0,
      pageLimit: "6",
      skip: 0
    };
  }

  componentDidMount = async () => {
    // await this.onSubmit();
    await this.onPrice();
    this.showData();
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      await this.onPrice();
    }
    //   if(prevProps.product!=this.product){
    //     await this.onSubmit();
    //  }
  };

  onCall = () => {
    this.setState({ product: "" }, this.onPrice);
  };
  onPrice = async () => {
    const { sort, category } = this.state;
    this.setState({ product: "" });

    const data = { sort, category };
    const response = await axios.post(
      `${BASE_URL}searchProductById/` + this.props.match.params.id,
      data
    );

    if (response) {
      this.setState({ name: "" });
      const result = response.data.result;
      this.setState({ product: result });
    }
  };

  showData = async () => {
    try {
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
  // componentDidMount = async () => {
  //   this.setState({ product: "" });
  //   // const { category } = this.state;
  //   // const data = { category };
  //   const response = await axios.post(
  //     "http://192.168.2.118:8080/searchProductById/" + this.props.match.params.id
  //   );
  //   console.log("ID IN CATGEPRY ", response);
  //   if (response) {
  //     const result = response.data.result;

  //     console.log("sadknsauidfbhndfewnhdfuiqwbd".result);
  //     this.setState({ product: result });
  //   }
  //   // this.getData();
  // };
  // getData = async () => {
  //   const { currentPage, pageLimit } = this.state;
  //   const skip = (currentPage - 1) * pageLimit;
  //   const limit = pageLimit;
  //   const rese = await axios.get("http://192.168.2.118:8080/productCount");
  //   var count = rese.data.result;
  //   if (count % pageLimit != 0) {
  //     const a = count % pageLimit;
  //     const b = pageLimit - a;
  //     count = count + b;
  //   }
  //   this.setState({ totalPageRec: count})
  //   console.log("Product -API", rese);
  //   const obj = { skip, limit };
  //   const res = await axios.post("http://192.168.2.118:8080/getProduct", obj);
  //   console.log("Product " ,res);
  //   // var result;
  //   // var n = 0;
  //   // for (n = 0; n < res.data.response.length; n++) {
  //     const result = res.data.result;
  //     console.log(result);
  //     this.setState({ product: result, skip });

  //   if (!result) {
  //     console.log("error");
  //   }
  // };

  // onSearch = async () => {
  //   // e.preventDefault();
  //   this.setState({ product: "" });
  //   const { sort } = this.state;
  //   const data = { sort };
  //   const response = await axios.post(
  //     "http://192.168.2.118:8080/searchProductByPrice",
  //     data
  //   );
  //   if (response) {
  //     this.props.history.push("/product-list");
  //     const result = response.data.result;
  //     this.setState({ product: result });
  //   }
  // };
  onsearchCatagory = async () => {
    this.setState({ product: "" });
    // const { category } = this.state;
    // const data = { category };
    const response = await axios.post(
      "http://192.168.2.118:8080/searchProductById/" +
        this.props.match.params.id
    );

    if (response) {
      const result = response.data.result;

      this.setState({ product: result });
    }
  };
  onSubmit = async () => {
    // e.preventDefault();
    const { name } = this.state;
    let product = [];

    const data = { name };
    const response = await axios.post(`${BASE_URL}searchProductByPrice1`, data);

    if (response) {
      this.setState({ name: "" });
      var n;
      var m;
      const result = response.data.result;
      for (n = 0; n < result.length; n++) {
        for (m = 0; m < result[n].length; m++) {
          product.push(result[n][m]);
        }
      }
      this.setState({
        product
      });
    }
  };
  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  handlePageChange = (page, e) => {
    this.setState({
      currentPage: page
    });
  };
  getPaginator = () => {
    const { currentPage, totalPageRec, pageLimit, skip } = this.state;
    let active = currentPage;
    let items = [];
    let totalPages = Math.floor(totalPageRec / pageLimit);
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => this.onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    const paginationBasic = (
      <div>
        <Pagination size="sm">{items}</Pagination>
      </div>
    );

    return paginationBasic;
  };

  onPageChange = async pageNumber => {
    this.setState({ currentPage: pageNumber }, this.getData);
    // console.log("pagination data: ", res);
  };
  render() {
    const { product, name, category } = this.state;

    return (
      <>
        <div>
          <Header
            onSubmit={this.onSubmit}
            onChange={this.onInputChange}
            name={name}
            onClick={this.onPrice}
          />

          {this.props.children}
          <div className="row-data">
            <div className="col-md-1">
              <Sidebar
                onPrice={this.onPrice}
                onChange={this.onInputChange}
                category={category._id}
                sort={name}
              />
            </div>
            <div className="col-md-11">
              <div className="product-container">
                <ul className="product-list">
                  {product && product.length ? (
                    product.map(product => {
                      return (
                        <li className="product-list_item">
                          <ProductComponent obj={product} key={product._id} />
                        </li>
                      );
                    })
                  ) : (
                    <>
                      <div className="records">
                        {" "}
                        <h1 className="far fa-frown" />
                        <br />{" "}
                        <h1>
                          Sorry, we couldn't find any matches please try again
                        </h1>
                      </div>{" "}
                    </>
                  )}
                </ul>
              </div>
              <span>{this.getPaginator()}</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default ProductList;
