import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbBookmark } from "react-icons/tb";
import { BsHandbag } from "react-icons/bs";
import "./index.css";

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <IoMenu className='navItem' />
      <Link style={{'fontSize': '30px', 'textDecoration': 'none', 'color': '#9475EB'}} to="/">Furrl</Link>
      <div className="navItems">
        <Link className='navItem' to="/wishlist">
          <TbBookmark />
        </Link>
        <Link className='navItem' to="/cart">
          <BsHandbag />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
