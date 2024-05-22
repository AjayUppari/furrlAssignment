import { Component } from "react"
import CartContext from "../../context"

class WishList extends Component{
    render(){
        return(
            <CartContext.Consumer>
                {
                    value => {
                        const { wishList } = value
                        console.log(wishList)

                        return(
                            <h1>wish List</h1>
                        )
                    }
                }
            </CartContext.Consumer>
        )
    }
}

export default WishList