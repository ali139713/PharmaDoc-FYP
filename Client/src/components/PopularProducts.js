import React, { Component } from 'react';
import  './PopularProducts.css'
import CaroselProducts from './CaroselProducts'
class PopularProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div  >
                <h2>Popular Products</h2>
                <CaroselProducts />
            </div>
        );
    }
}


export default PopularProducts;
