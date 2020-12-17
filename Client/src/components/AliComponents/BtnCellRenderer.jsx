import React, { Component } from "react";
class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    alert("hello");
    console.log("props", this.props);
  }
  render() {
    return <button onClick={this.btnClickedHandler}>Video Call</button>;
  }
}
export default BtnCellRenderer;
