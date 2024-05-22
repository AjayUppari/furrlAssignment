import React from "react";

const CartContext = React.createContext({
    wishList: [],
    handleWishList: () => {}
})

export default CartContext