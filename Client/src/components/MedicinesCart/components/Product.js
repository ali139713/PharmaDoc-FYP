import React, { Component } from "react";
import Counter from "./Counter";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      quickViewProduct: {},
      isAdded: false,
    };
  }
  addToCart(productImage, name, price, id, quantity, prescription) {
    this.setState(
      {
        selectedProduct: {
          productImage: productImage,
          name: name,
          price: price,
          prescription: prescription,
          id: id,
          quantity: quantity,
        },
      },
      function () {
        this.props.addToCart(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAdded: true,
      },
      function () {
        setTimeout(() => {
          this.setState({
            isAdded: false,
            selectedProduct: {},
          });
        }, 3500);
      }
    );
  }
  quickView(productImage, name, price, id) {
    this.setState(
      {
        quickViewProduct: {
          productImage: productImage,
          name: name,
          price: price,
          id: id,
        },
      },
      function () {
        this.props.openModal(this.state.quickViewProduct);
      }
    );
  }
  render() {
    let productImage = this.props.productImage;
    let name = this.props.name;
    let price = this.props.price;
    let prescription = this.props.prescription;
    let id = this.props.id;
    let quantity = this.props.productQuantity;
    return (
      <div className="product">
        <div className="product-image">
          <img
            src={productImage}
            alt={this.props.name}
            onClick={this.quickView.bind(
              this,
              productImage,
              name,
              price,
              id,
              quantity,
              prescription
            )}
          />
        </div>
        <h4 className="product-name">{this.props.name}</h4>
        <h4 className="product-name">{this.props.prescription}</h4>
        {this.props.quantity === 0 &&<h4 className="product-name">Not available.</h4>}
        <p className="product-price">{this.props.price}</p>
        <Counter
          productQuantity={quantity}
          updateQuantity={this.props.updateQuantity}
          resetQuantity={this.resetQuantity}
        />
        <div className="product-action">
          <button
            className={!this.state.isAdded ? "" : "added"}
            type="button"
            onClick={this.addToCart.bind(
              this,
              productImage,
              name,
              price,
              id,
              quantity,
              prescription
            )}
          >
            {!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
