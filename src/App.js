import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import ProductList from "./components/productList";
import ProductDetails from "./components/productDetails";
import WishList from './components/wishlist'
import Cart from './components/cart'
import CartContext from "./context";

class App extends Component {
  state = {
    wishList: [],
    cart: [],
    totalPrice: 0,
    totalProducts: 0
  }

  addToWishList = (product) => {
    this.setState((prevState) => ({
      wishList: [...prevState.wishList, product]
    }))
  }

  addToCart = (product) => {
    const { cart } = this.state
    //check product exists in cart 

    const productPresenceInCart = cart.filter((eachProduct) => eachProduct.shopifyId === product.shopifyId)
    const remainingProducts = cart.filter((eachProduct) => eachProduct.shopifyId !== product.shopifyId)


    if(productPresenceInCart.length > 0){
      // increase the quantity of the product
      productPresenceInCart[0].quantity += 1

      this.setState((prevState) => ({
        cart: [...remainingProducts,  ...productPresenceInCart],
        totalPrice: prevState.totalPrice + (parseInt(product.price.value) * (parseInt(productPresenceInCart[0].quantity)))
      }))
    }
    else{
      //add product as new item into cart

      this.setState((prevState) => ({
        cart: [...prevState.cart, {...product, quantity: 1}],
        totalPrice: prevState.totalPrice + (parseInt(product.price.value)),
        totalProducts: prevState.cart.length + 1
      }))
    }
  }

  removeCProductFromCart = (product) => {
    const { cart } = this.state
    const updatedCartList = cart.filter(eachProduct => eachProduct.shopifyId !== product.shopifyId)

    this.setState({
      cart: updatedCartList
    })
  }

  render() {
    const { wishList, cart, totalPrice, totalProducts } = this.state
    return (
      <CartContext.Provider value={{
        wishList,
        cart,
        totalPrice,
        totalProducts,
        handleWishList: this.addToWishList,
        handleCart: this.addToCart,
        removeProductFromCart: this.removeCProductFromCart
      }}>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/productDetails/:id" component={ProductDetails} />
          <Route exact path="/wishlist" component={WishList} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    );
  }
}

export default App;
