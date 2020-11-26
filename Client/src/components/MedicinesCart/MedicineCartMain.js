import React, { Component } from "react";
import axios from "axios";
import Header from "./components/Header";
import Products from "./components/Products";
import QuickView from "./components/QuickView";
import "./scss/style.scss";

class MedicineCartMain extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
     
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      modalActive: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  // Fetch Initial Set of Products from external API
  async getProducts() {
    let url = "http://localhost:5000/medicine/get";
    await axios.get(url).then((response) => {
      this.setState({
        products: response.data.medicines,
      });
    });
    const { match: { params } } = this.props;
    const pharmacyname = params.name;
    const products = this.state.products;
    console.log(products)
   const filtered = products.filter((t) => t.pharmacyName === pharmacyname);
   console.log(filtered)
    this.setState({products : filtered});

  }

  componentDidMount() {
    const cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
    this.sumTotalItems(cartItem);
    this.sumTotalAmount(cartItem);
  }

  componentWillMount() {
    this.getProducts();
    const cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
    // const labTestItem = JSON.parse(localStorage.getItem("labTest")) || [];

    this.setState({ cart: cartItem});
    this.sumTotalItems(cartItem);
    this.sumTotalAmount(cartItem);
  }

  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }
  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }
  // Filter by Category
  handleCategory(event) {
    this.setState({ category: event.target.value });
    console.log(this.state.category);
  }
  // Add to Cart
  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      console.log("hi");
      let index = cartItem.findIndex((x) => x.id === productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      console.log(index);
      console.log(productQty);
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      this.setState({
        cart: cartItem,
      });
    } else {
      cartItem.push(selectedProducts);
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
    }
    this.setState({
      cart: cartItem,
      cartBounce: true,
    });
    setTimeout(
      function () {
        this.setState({
          cartBounce: false,
          quantity: 1,
        });
        console.log(this.state.quantity);
        console.log(this.state.cart);
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }
  handleRemoveProduct(id, e) {
    let cartItem = this.state.cart;
    console.log(cartItem);
    let index = cartItem.findIndex((x) => x.id === id);
    cartItem.splice(index-1, 1);
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    this.setState({
      cart: cartItem,
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }
  // handleRemoveLabTest(id, e) {
  //   let labTest = this.state.labTest;
  //   console.log(labTest);
  //   let index = labTest.findIndex((x) => x.id === id);
  //   labTest.splice(index, 1);
  //   localStorage.setItem("labTest", JSON.stringify(labTest));
  //   this.setState({
  //     labTest: labTest,
  //   });
  //   this.sumTotalLabTestsAmount(this.state.labTest);
  //   e.preventDefault();
  // }
  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function (item) {
      return item.id === productID;
    });
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total,
    });
    localStorage.setItem("totalItems", JSON.stringify(total));
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    
    this.setState({
      totalAmount: total,
    });
    localStorage.setItem("totalAmount", JSON.stringify(total));
  }

  // sumTotalLabTestsAmount(){
  //   let total = 0;
  //   let labtest = this.state.labTest;
  //   for (var i = 0; i < labtest.length; i++) {
  //     total += labtest[i].price ;
  //   }
  //   return total;
  // }

  //Reset Quantity
  updateQuantity(qty) {
    console.log("quantity added...");
    this.setState({
      quantity: qty,
    });
  }
  // Open Modal
  openModal(product) {
    this.setState({
      quickViewProduct: product,
      modalActive: true,
    });
  }
  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false,
    });
  }

  render() {
    console.log(this.state.cart);
    console.log(this.state.products);
    return (
      <div className="container">
        <Header
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          removeLabTest={this.handleRemoveLabTest}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          handleCategory={this.handleCategory}
          categoryTerm={this.state.category}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
        />
        <Products
          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          openModal={this.openModal}
        />

        <QuickView
          product={this.state.quickViewProduct}
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default MedicineCartMain;
