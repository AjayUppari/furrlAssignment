import { Component } from "react"
import CartContext from "../../context"

class ProductDetails extends Component{
    render(){
        return(
            <CartContext.Consumer>
                {
                    value => {
                        const { wishList } = value
                        console.log(wishList)

                        return(
                            <h1>Products List</h1>
                        )
                    }
                }
            </CartContext.Consumer>
        )
    }
}

export default ProductDetails