import { Component } from "react"
import CartContext from "../../context"
import Navbar from "../navbar"
import { Link } from "react-router-dom"
import { FiShare } from "react-icons/fi";
import './index.css'

class WishList extends Component{
    render(){
        return(
            <CartContext.Consumer>
                {
                    value => {
                        const { wishList } = value
                        console.log(wishList)

                        return(
                            <div>
                                <Navbar />
                                <ul className="productsContainer" >
                                {
                                    wishList.map((eachItem, index) => {
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
                                          <li className="productItem" style={styles} key={eachItem.id}>
                                            <div className="imageItem">
                                              <Link className="linkComponent" to={`/productDetails/${eachItem.id}`}>
                                                <img
                                                  style={imageStyles}
                                                  src={eachItem.images[0].src}
                                                  alt="productImage"
                                                />
                                              </Link>
                                              <button
                                                type="button"
                                                // onClick={() => handleWishList(eachItem)}
                                                className="productOptionsButton wishListshareButton"
                                              >
                                                <FiShare className="" />
                                              </button>
                                            </div>
                                            <Link className="linkComponent" to={`/productDetails/${eachItem.id}`}>
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
                                      })
                                }
                                </ul>
                            </div>
                        )
                    }
                }
            </CartContext.Consumer>
        )
    }
}

export default WishList