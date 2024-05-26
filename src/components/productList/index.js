import { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import { TbBookmark } from "react-icons/tb";
import CartContext from "../../context";
import "./index.css";

class ProductsList extends Component {
  state = {
    productsList: [],
    pageNumber: 1,
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    const url = "https://api.furrl.in/api/v2/listing/getListingProducts";
    const bodyString = JSON.stringify({
      input: {
        page: 1,
        pageSize: 11,
        filters: [],
        id: "#HomeHunts",
        entity: "vibe",
      },
    });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyString,
    };

    const response = await fetch(url, options);
    const jsonData = await response.json();

    let updatedData = this.state.productsList;
    updatedData = updatedData.concat(jsonData.data.getListingProducts.products);

    console.log(updatedData);

    this.setState({
      productsList: updatedData,
    });
  };

  handleScroll = (event) => {
    const wrappedElement = document.getElementById("scrollContainer");
    if (
      wrappedElement.scrollHeight - wrappedElement.scrollTop ===
      wrappedElement.clientHeight
    ) {
      console.log("end point");
      // scrolling reached to bottom, fetch API for new products at this point
      this.setState(
        (prevState) => ({
          pageNumber: prevState.pageNumber + 1,
        }),
        this.fetchProducts
      );
    }
  };

  onClickAddToWishList = (event, productDetails, handleWishList) => {
    console.log(event)
    event.stopPropagation()
    handleWishList(productDetails)
  }

  displayProducts = () => {
    const { productsList } = this.state;

    return (
      <CartContext.Consumer>
        {(value) => {
          const { handleWishList, wishList } = value;
          console.log(wishList);

          return productsList.map((eachItem, index) => {
            let styles = {};
            let imageStyles = {};

            if ((index + 1) % 3 === 0) {
              styles = {
                width: "100vw",
                height: "500px",
              };
              imageStyles = {
                width: "100%",
                height: "300px",
              };
            } else {
              styles = {
                width: "49%",
              };
              imageStyles = {
                width: "100%",
                height: "200px",
              };
            }

            return (
              <>
                <Link
                  to={`/productDetails/${eachItem.id}`}
                  style={styles}
                  key={eachItem.id}
                  className="productItem"
                >
                  <img
                    style={imageStyles}
                    src={eachItem.images[0].src}
                    alt="productImage"
                  />
                  <button
                    type="button"
                    onClick={() => handleWishList(eachItem)}
                    className="productOptionsButton"
                  >
                    <TbBookmark className="" />
                  </button>
                  <p>{eachItem.brand[0].name}</p>
                  <p>{eachItem.title}</p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>
                      {`Rs ${eachItem.MRP.value}`}
                    </span>
                  </p>
                </Link>
              </>
            );
          });
        }}
      </CartContext.Consumer>
    );
  };

  render() {
    const { productsList } = this.state;
    return (
      <>
        <Navbar />
        <div
          id="scrollContainer"
          onScroll={this.handleScroll}
          className="productsContainer"
        >
          {productsList.length > 0 && this.displayProducts()}
        </div>
      </>
    );
  }
}

export default ProductsList;
