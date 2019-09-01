import axios from "axios";
import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { Input, Label } from "reactstrap";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      option: [],
      categoryValue: [],
      selectedCategory: "",
    };
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
        categoryValue: result.result1,
      });
    });
  };

 
  


  onSubmit = async e => {
    e.preventDefault();

    this.setState({ product: "" });

    const { category } = this.state;
    console.log("d", category);
    this.props.history.push("/product-list/" + this.state.category);
  }
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
      <SideNav
        style={{ background: "darkblue" }}
        className="sidenavigation"
        onSelect={selected => {
          // Add your code here
        }}
      >
        <SideNav.Toggle className="sidenav---sidenav---_2tBP" />
        <SideNav.Nav>
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fas fa-sort" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>
              <h5 className-flex="center"> Categories</h5>
            </NavText>
            <NavItem eventKey="home/cat">
              <NavText>
                <FormControl
                  as="select"
                  name="category"
                  color=" #3a3838"
                  value={this.name}
                  onClick={this.onSubmit}
                  onChange={this.onInputChange}
                >
                  <option value="">Select Category</option>
                  {categoryValue && categoryValue.length ? (
                    categoryValue.map(category => {
                      return (
                        <option value={category._id}>
                          {category.category}
                        </option>
                      );
                    })
                  ) : null}
                  )
                </FormControl>
              </NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="price">
            <NavIcon>
              <i
                className=" fas fa-funnel-dollar"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>
              <h5 className-flex="center"> Sort By Price</h5>
            </NavText>
            <NavItem eventKey="price/high">
              <NavText className="slider-nav">
                <Label checked>
                  <Link to onClick={this.props.onPrice} >             
                      <Input
                    type="radio"
                    name="sort"
                    value={this.props.name}
                   // onClick={this.props.onPrice}
                    onChange={this.props.onChange}
                    value="desending"
                  />
                  </Link>

                  High - Low
                </Label>
                
              </NavText>
            </NavItem>
            <NavItem eventKey="price/high">
              <NavText className="slider-nav">
                <Label checked>
                  <Link to onClick={this.props.onPrice} >    
                  <Input
                    type="radio"
                    name="sort"
                    value={this.props.name}
                    // onClick={this.props.onPrice}
                    onChange={this.props.onChange}
                    value="assending"
                  />
                    </Link>    
                  Low - High
                </Label>
              </NavText>
            </NavItem>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      // <div >
      //   <div className="sidebar">
      //     <nav className="sidebar-nav">
      //       <h5 className-flex="center"> Product-Categories</h5>
      //       <div>
      //         <ul className="nav">
      //           <li className="nav-item nav-dropdown">
      //             <i className="nav-icon cui-puzzle">Categories</i>
      //             <ul className="nav-dropdown-items">
      //               <FormControl
      //                 as="select"
      //                 name="category"
      //                 value={this.props.name}
      //                 onClick={this.props.onSubmit}
      //                 onChange={this.props.onChange}
      //               >
      //                 <option value="">Select Category</option>
      //                 {categoryValue && categoryValue.length ? (
      //                   categoryValue.map(category => {
      //                     return (
      //                       <option value={category._id}>
      //                         {category.category}
      //                       </option>
      //                     );
      //                   })
      //                 ) : null}
      //                 )
      //               </FormControl>
      //             </ul>
      //           </li>
      //         </ul>
      //       </div>
      //       <hr />
      //       {/* <div>
      //           <ul className="nav">
      //             <li className="nav-item nav-dropdown">
      //               <i className="nav-icon cui-puzzle">Sort By Name</i>
      //               <ul className="nav-dropdown-items">
      //                 <li className="nav-item">
      //                   <Label check>
      //                     <Input type="radio" name="sort" value="assending" onChange={this.props.onInputChange}/>
      //                     A - Z
      //                   </Label>
      //                 </li>
      //                 <li className="nav-item">
      //                   <Label check>
      //                     <Input type="radio" name="sort" value="dessending" onChange={this.props.onInputChange} />
      //                     Z - A
      //                   </Label>
      //                 </li>
      //               </ul>
      //             </li>
      //           </ul>
      //         </div> */}
      //       <hr />
      //       <div >
      //         <ul className="nav">
      //           <li className="nav-item nav-dropdown" >
      //             <i className="nav-icon cui-puzzle"   >Sort By Price</i>
      //             <ul className="nav-dropdown-items">
      //               <li className="nav-item">
      //                 <Label checked>
      //                   <Input
      //                     type="radio"
      //                     name="sort"
      //                     value={this.props.name}
      //                     onClick={this.props.onSubmit}
      //                     onChange={this.props.onChange}
      //                     value="desending"
      //                   />
      //                   High - Low
      //                 </Label>
      //               </li>
      //               <li className="nav-item">
      //                 <Label checked>
      //                   <Input
      //                     type="radio"
      //                     name="sort"
      //                     value={this.props.name}
      //                     onClick={this.props.onSubmit}
      //                     onChange={this.props.onChange}
      //                     value="assending"
      //                   />
      //                   Low - High
      //                 </Label>
      //               </li>
      //             </ul>
      //           </li>
      //         </ul>
      //       </div>
      //     </nav>
      //   </div>
      // </div>
    );
  }
}
export default withRouter(Sidebar);
