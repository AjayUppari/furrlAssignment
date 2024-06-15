import { Component } from "react";
import CartContext from "../../context";

class ProductDetails extends Component {
  componentDidMount() {
    this.fetchProductDetails();
  }

  fetchProductDetails = async () => {
    // const productId = this.props.match.params.id

    const url =
      "https://furrl.in/productDetail?id=645f7c08bd480a8cd4f62f0d&ref=vibeResults_HomeHunts&_rsc=1bbh9";

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(url, options);
    const jsonData = await response.json()

    console.log(jsonData);
  };

  render() {
    return (
      <CartContext.Consumer>
        {(value) => {
          const { wishList } = value;

          return <h1>Products List</h1>;
        }}
      </CartContext.Consumer>
    );
  }
}

export default ProductDetails;
