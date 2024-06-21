import { Component } from "react";
import CartContext from "../../context";
import Navbar from "../navbar";

//react icons
import { TbBookmark } from "react-icons/tb";
import { FiShare } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";


//react slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// material ui imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./index.css";

class ProductDetails extends Component {
  state = {
    productItemDetails: {},
  };

  componentDidMount() {
    this.findProductDetails();
  }

  findProductDetails = async () => {
    let isProductFound = false;
    let productDetails = {};
    let pageNumber = 1;

    let productsList = await this.fetchProductDetails(pageNumber);

    while (isProductFound === false) {
      for (let i = 0; i < productsList.length; i++) {
        if (
          productsList[i].shopifyId === parseInt(this.props.match.params.id)
        ) {
          productDetails = productsList[i];
          isProductFound = true;
          break;
        }
      }

      if (isProductFound === false) {
        pageNumber += 1;
      } else {
        break;
      }
    }

    this.setState({
      productItemDetails: productDetails,
    });
  };

  fetchProductDetails = async (pageNumber) => {
    const url = "https://api.furrl.in/api/v2/listing/getListingProducts";
    const bodyString = JSON.stringify({
      input: {
        page: pageNumber,
        pageSize: 50,
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

    return jsonData.data.getListingProducts.products;
  };

  displayProductDetails = (handleWishList, handleCart) => {
    const imageSliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const { productItemDetails } = this.state;



    if (Object.keys(productItemDetails).length > 0) {
      return (
        <>
          <div style={{minHeight: "100vh"}}>
            <Slider {...imageSliderSettings}>
              {productItemDetails.images.map((eachImage) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  className="productImage"
                  id={eachImage.id}
                  src={eachImage.src}
                  alt="product image"
                />
              ))}
            </Slider>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "20px"
              }}
            >
              <div className="productDetails">
                <p>{productItemDetails.title}</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p className="price">{`₹${productItemDetails.price.value}`}</p>
                  <p className="discountPercentage">{`${productItemDetails.discountPercent}%`}</p>
                </div>
              </div>

              <div>
                <button onClick={() => handleWishList(productItemDetails)} className="productActionsButtons" type="button">
                  <TbBookmark />
                </button>
                <button className="productActionsButtons" type="button">
                  <FiShare />
                </button>
              </div>
            </div>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <p>Delivery</p>
              </AccordionSummary>
              <AccordionDetails>
                <p>Enter pin code to check the service availability</p>
                <input className="pincodeInput" placeholder="Enter Pincode" type="number" />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                Returns and size exchanges enabled
              </AccordionSummary>
              <AccordionDetails>
              Furrl takes pride in bringing you new-age homegrown brands that create pieces for you with utmost care and pleasure! <br />
              - Easy returns and size exchanges enabled for this product. <br />
              - Exchange or return requests should be raised within 7 days of delivery. <br />
              - In case of a product defect, a replacement or return request needs to be raised within 3 days of delivery. <br />
              </AccordionDetails>
            </Accordion>

            <button onClick={() => handleCart(productItemDetails)} type="button" className="addtoCartBtn">
              <BsHandbag style={{marginRight: "10px"}} />
              Add to bag
            </button>
          </div>
      </>
      );
    }
  };

  render() {

    return (
      <CartContext.Consumer>
        {(value) => {
          const { handleWishList, handleCart } = value;

          return (
            <>
              <Navbar />
              <div className="productDetailsContent">
                {this.displayProductDetails(handleWishList, handleCart)}
              </div>
            </>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default ProductDetails;
