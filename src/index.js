import React from "react";
import ReactDOM from "react-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
 //import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import * as serviceWorker from "./serviceWorker";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

library.add(faStroopwafel);
ReactDOM.render(
  <>
    {" "}
    <App /> <ToastContainer />{" "}
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
