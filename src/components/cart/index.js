import { Component } from "react";
import CartContext from "../../context";
import Navbar from "../navbar";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import emptyCartImage from "../../assets/emptyBag.317aed26.svg";
import "./index.css";

class Cart extends Component {
  displayEmptyCart = () => {
    return (
      <div className="emptyWishList">
        <img
          className="wishlistimage"
          src={emptyCartImage}
          alt="empty wishlist"
        />
        <p>Looks like your cart is empty</p>
        <Link style={{ width: "100%" }} to="/">
          <button className="continueShoppingBtn" type="button">
            Continue shopping
          </button>
        </Link>
      </div>
    );
  };

  displayProductsInCart = (cart, totalPrice, totalProducts, removeProductFromCart) => {
    return (
      <div className="cartContainer">
        <ul className="cartItems">
          {cart.map((eachCartItem, index) => {
            return (
              <li className="cartItem" key={eachCartItem.id}>
                <div className="cartProductImage">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                      marginRight: "10px"
                    }}
                    src={eachCartItem.images[0].src}
                    alt="productImage"
                  />
                </div>
                <div className="cartProductDetails">
                  <p>{eachCartItem.title}</p>
                  <p>{`Rs ${eachCartItem.price.value}`}</p>
                  <p>{`Quanity: ${eachCartItem.quantity}`}</p>
                </div>
                <div>
                  <button onClick={() => removeProductFromCart(eachCartItem)} className="removeFromCartBtn" type="button">
                    <MdDeleteOutline />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="billingContaner">
          <p style={{ fontSize: "20px" }}>
            <span style={{ fontWeight: "bold" }}>Total Price</span> {totalPrice}
          </p>
          <p style={{ fontSize: "20px" }}>
            <span style={{ fontWeight: "bold" }}>Number of Products</span>{" "}
            {totalProducts}
          </p>
        </div>
        <div className="checkout">
          <button className="checkoutBtn">checkout</button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <CartContext.Consumer>
        {(value) => {
          const { cart, totalPrice, totalProducts, removeProductFromCart } = value;

          return (
            <div>
              <Navbar />
              {cart.length > 0
                ? this.displayProductsInCart(cart, totalPrice, totalProducts, removeProductFromCart)
                : this.displayEmptyCart()}
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default Cart;
