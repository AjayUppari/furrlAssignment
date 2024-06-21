import React from "react";

const CartContext = React.createContext({
    wishList: [],
    cart: [],
    totalPrice: 0,
    totalProducts: 0,
    handleWishList: () => {},
    handleCart: () => {},
    removeProductFromCart: () => {}
})

export default CartContext