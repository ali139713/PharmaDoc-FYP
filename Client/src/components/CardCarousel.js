import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import MedicineCard from './MedicineCard'
import slider1 from '../Images/slider1.jpg'
import slider2 from '../Images/slider2.jpg'
import slider3 from '../Images/slider3.jpg'
import slider4 from '../Images/slider1.jpg'
class CardCarousel extends Component {
  state = {
    items: [
      {id: 1, img: slider1},
      {id: 2, img: slider2},
      {id: 3, img: slider3},
      {id: 4, img: slider1},
      {id: 5, img: slider2}
    ]
  }
 
  render () {
    const { items } = this.state;
    return (
      <Carousel transitionMs={500} easing="ease" autoPlaySpeed={2000} enableAutoPlay={true} itemsToShow={1} disableArrowsOnEnd={false} focusOnSelect={true} showArrows={true}>
        
        {items.map(item => <div style={{marginTop:'25px'}} key={item.id}><img style={{height:'450px' , width:'1200px'}} src={item.img}></img></div>)}
        {/* <MedicineCard number="1" /> */}
        {/* <MedicineCard number="2" /> */}
        {/* <MedicineCard number="3" /> */}
        {/* <MedicineCard number="4" /> */}
        {/* <MedicineCard number="5" /> */}
      </Carousel>
    )
  }
}
export default CardCarousel;