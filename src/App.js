import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import ProductList from "./components/productList";
import ProductDetails from "./components/productDetails";
import WishList from './components/cart'
import CartContext from "./context";

class App extends Component {
  state = {
    wishList: []
  }

  addToWishList = (product) => {
    console.log('wishlist add method called')
    this.setState((prevState) => ({
      wishList: [...prevState.wishList, product]
    }))
  }

  render() {
    const { wishList } = this.state
    
    return (
      <CartContext.Provider value={{
        wishList,
        handleWishList: this.addToWishList,
      }}>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/productDetails/:id" component={ProductDetails} />
          <Route exact path="/wishlist" component={WishList} />
        </Switch>
      </CartContext.Provider>
    );
  }
}

export default App;
