import { Component } from "react";
import CartContext from "../../context";
import Navbar from "../navbar";
import { Link } from "react-router-dom";
import { FiShare } from "react-icons/fi";
import emptyWishlistImage from '../../assets/emptyWishlist.c12c0656.svg'
import "./index.css";

class WishList extends Component {
  displayWishlistProducts = (wishList) => {
    return (
      <ul className="productsContainer">
        {wishList.map((eachItem, index) => {
          return (
            <li
              className="productItem"
              style={{ width: "49%" }}
              key={eachItem.id}
            >
              <div className="imageItem">
                <Link
                  className="linkComponent"
                  to={`/productDetails/${eachItem.id}`}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                    }}
                    src={eachItem.images[0].src}
                    alt="productImage"
                  />
                </Link>
                <button
                  type="button"
                  className="productOptionsButton wishListshareButton"
                >
                  <FiShare />
                </button>
              </div>
              <Link
                className="linkComponent"
                to={`/productDetails/${eachItem.id}`}
              >
                <p>{eachItem.brand[0].name}</p>
                <p>{eachItem.title}</p>
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    {`Rs ${eachItem.MRP.value}`}
                  </span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  displayEmptyWishlist = () => {
    return(
      <div className="emptyWishList">
        <img className="wishlistimage" src={emptyWishlistImage} alt="empty wishlist" />
        <p>Looks like your wishlist is empty</p>
        <Link style={{width: "100%"}} to="/">
          <button className="continueShoppingBtn" type="button">Continue shopping</button>
        </Link>
      </div>
    )
  };
  render() {
    return (
      <CartContext.Consumer>
        {(value) => {
          const { wishList } = value;

          return (
            <div>
              <Navbar />
              {wishList.length > 0
                ? this.displayWishlistProducts(wishList)
                : this.displayEmptyWishlist()}
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default WishList;
