import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
class NotFound extends Component {
  render() {
    return (
      <>
        <div className="notmatch">
          <div className="nomatch_form">
            <Link to="/">
              <Button className="notmatch-btn" color="success">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
export default NotFound;