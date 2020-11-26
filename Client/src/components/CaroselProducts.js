import React, { useState } from "react";
import range from "lodash/range";
import styled from "styled-components";
import ItemsCarousel from "react-items-carousel";
import slider1 from "../../src/Images/company1.webp";
import slider2 from "../../src/Images/company2.webp";
import slider3 from "../../src/Images/company3.webp";
import slider4 from "../../src/Images/company4.webp";
const noOfItems = 15;
const noOfCards = 4;
const autoPlayDelay = 2500;
const chevronWidth = 60;
const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 100%;
  margin: 0 auto;
`;

// const img = "https://raw.githubusercontent.com/GedalyaKrycer/unit-19-react-homework-employee-directory/master/my-app/src/img/richard-stevens-img.png";
const SlideItem = styled.div`
  height: 200px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

export default class AutoPlayCarousel extends React.Component {
  state = {
    items: [
      { id: 1, img: slider1 },
      { id: 2, img: slider2 },
      { id: 3, img: slider3 },
      { id: 4, img: slider4 },
      { id: 5, img: slider2 },
    ],
    activeItemIndex: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () =>
    this.setState((prevState) => ({
      activeItemIndex:
        (prevState.activeItemIndex + 1) % (noOfItems - noOfCards + 1),
    }));

  onChange = (value) => this.setState({ activeItemIndex: value });

  render() {
    const { items } = this.state;
    const carouselItems = items.map((index) => (
      <SlideItem key={index}>
        {/* <img src="https://raw.githubusercontent.com/GedalyaKrycer/unit-19-react-homework-employee-directory/master/my-app/src/img/richard-stevens-img.png"></img> */}
        <img src={index.img}></img>
        {/* <button style={{position:'fixed', textAlign:'center', marginTop:'150px', width:'max-filled'}}>Add to Cart</button> */}
      </SlideItem>
    ));
    return (
      <Wrapper style={{ margin: "25px" }}>
        <ItemsCarousel
          gutter={30}
          outsideChevron={true}
          infiniteLoop={true}
          numberOfCards={noOfCards}
          activeItemIndex={this.state.activeItemIndex}
          requestToChangeActive={this.onChange}
          rightChevron={<button>{">"}</button>}
          leftChevron={<button>{"<"}</button>}
          chevronWidth={chevronWidth}
          outsideChevron
          children={carouselItems}
        />
      </Wrapper>
    );
  }
}
