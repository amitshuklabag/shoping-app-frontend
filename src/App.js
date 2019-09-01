import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./container/login";
import ForgotPassword from "./container/forgot-password";
import ResetPassword from "./container/reset-password";
import Register from "./container/signup";
// import Home from "./components/home/";
import Card from "./components/home/card";
import Profile from "./container/profile/profile";
import ProductList from "./container/productlist/";
import Layout from "./container/Layout";
import CardContainer from "./container/home/card";
import "./App.css";
import Logout from "./components/logout";
import Success from "./components/payment/success";
import Failure from "./components/payment/failure";
import OrderList from "./container/payment/orderhistory";
import Productdetails from "./container/productdetails";
import Footer from "./container/Layout/Footer";
import Sidebar from "./container/Layout/Sidebar";
// import ProductList from "./container/product/index"
// import SideBar from "./container/Layout";

class App extends Component {
  render() {
    const DefaultLayout = ({ component: component, ...rest }) => {
      console.log("default layout calling.........");
      return (
        <Route
          {...rest}
          render={props => (
            <Layout {...props}>
              <Component {...props} />
            </Layout>
          )}
        />
      );
    };
    return (
      <Router>
        <>
          <Switch>
          
                <Route path="/profile" component={Profile} />
                <Route path="/logout" component={Logout} />
                <Route path="/product-list/:id" component={ProductList} />
                <Route path="/product-details/:id" component={Productdetails} />
                <Route path="/success" component={Success} />
                <Route path="/order-history" component={OrderList} />
                <Route exact path="/" component={CardContainer} />

           
                <Route exact path="/" component={CardContainer} />
                <Route path="/login" component={Login} />
                {/* <Route exact path="/" component={Home} /> */}
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/footer" component={Footer} />
                <Route path="/reset/:token1" component={ResetPassword} />
                <Route path="/signup" component={Register} />
                <Route path="/card" component={Card} />
                <Route path="/product-list/:id" component={ProductList} />
                <Route path="/product-details/:id" component={Productdetails} />
                <Route path="/card" component={CardContainer} />
                <Route path="/failure" component={Failure} />
                <Route path="/success" component={Success} />
               
                  <Route path="/Sidebar" component={Sidebar} />

             
          
            {/* <Route path="/sidebar" component={SideBar} /> */}
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
