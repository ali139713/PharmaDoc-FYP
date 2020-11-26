import React, { Component } from "react";
import SearchList from "./SearchList";
// import 'bulma/bulma';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        "Gynecologist",
        "Skin Specialist",
        "Child Specialist",
        "Orthopedic Surgeon",
        "ENT Specialist",
        "Diabetes specialist",
        "Eye Specialist",
      ],
    };
  }
  render() {
    return (
      <div
        className={
          "container " +
          (window.outerHeight < document.querySelector("body").scrollHeight
            ? ""
            : "vh-100")
        }
      >
        <SearchList name={this.state.list} />
      </div>
    );
  }
}

export default App;
