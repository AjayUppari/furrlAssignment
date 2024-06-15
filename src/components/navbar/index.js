import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbBookmark } from "react-icons/tb";
import { BsHandbag } from "react-icons/bs";
import CartContext from "../../context";
import "./index.css";

const Navbar = () => {
  return (
    <CartContext.Consumer>
      {(value) => {
        // const { wishList } = value;

        return (
          <div className="navbarContainer">
            <IoMenu className="navItem" />
            <Link
              style={{
                fontSize: "30px",
                textDecoration: "none",
                color: "#9475EB",
              }}
              to="/"
            >
              Furrl
            </Link>
            <div className="navItems">
              <Link to="/wishlist" className="navItem">
                <TbBookmark />
              </Link>
              <Link to="/cart" className="navItem">
                <BsHandbag />
              </Link>
            </div>
          </div>
        );
      }}
    </CartContext.Consumer>
  );
};

export default Navbar;
