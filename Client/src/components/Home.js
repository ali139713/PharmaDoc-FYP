import React from "react";
import CardCarousel from "./CardCarousel";
import MainCarousel from "./MainCarousel";
import PopularProducts from "./PopularProducts";
import "./Home.css";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        className="mt-10"
      >
        {/* <CardCarousel /> */}
        <MainCarousel />
        <PopularProducts />
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
