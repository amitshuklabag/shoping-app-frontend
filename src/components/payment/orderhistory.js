import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BASE_URL } from "../../BASE_URL ";


class OrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Isopen: false,
    };
  }
  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("cliked");
  };

  // onSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.delete(
  //       "http://192.168.2.243:8080/delete/" + this.props.obj._id
  //     );
  //     console.log(res);
  //     alert("Product Deleted Succesfully");
  //     this.props.history.push("./product-list");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  render() {
    const { product, obj , category ,object} = this.props;
    
    return (
      <tr className="animate">
        <td />
        <td align="center">
          
              <img
              height="150px"
              width="150px"
                className="image1"
                alt="NO Image"
                src={BASE_URL + obj.file}
                onClick={this.handleShowDialog}
              
              />
        </td>
        <td className="c" align="center">  
          {obj.name}
          </td>
        <td className="c" align="center">  
          <i class="fas fa-dollar-sign"></i> {obj.price*obj.quantity}
        </td>
        <td align="center">
         {obj.quantity}
        </td>
        {/* <td align="center">
          <i class="fas fa-rupee-sign"></i>    {obj.amount}
        </td> */}
        <td align="center">
          {obj.createTime}
        </td>
         <td align="center">
          {obj.trans_id}
        </td>
      </tr>
    );
  }
}
export default withRouter(OrderComponent);
