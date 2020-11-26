import React, { Component } from "react";
import Button from "./SelectionButton";
class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
    };
  }
  componentDidMount = () => {
    this.setState({
      filtered: this.props.name,
    });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      filtered: nextProps.name,
    });
  };
  handleChange = (e) => {
    let currentList = [];

    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.name;
      newList = currentList.filter((item) => {
        const lc = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.name;
    }
    this.setState({
      filtered: newList,
    });
  };
  render() {
    return (
      <div>
        <div style={{ textAlign: "center", marginTop: "5vh" }}>
          <input
            type="text"
            style={{ width: "400px", height: "35px", borderRadius: "5px" }}
            value={this.state.searchTerm}
            onChange={this.handleChange}
            placeholder="Search Specialization"
          ></input>
        </div>

        {this.state.filtered.map((item) => (
          <Button key={item} name={item}></Button>
        ))}
      </div>
    );
  }
}
export default SearchList;
