import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase/Firebase";
import { useHistory } from "react-router-dom";
import { getTotalNumberOfItems } from "../../redux/reducer/cart";
import { setSearchItem } from "../../redux/action/search";
function Header() {
  const { user } = useSelector((state) => state.auth);
  const { basket } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const history = useHistory();
  const login = () => {
    if (user) {
      auth.signOut();
      history.push("/");
    }
  };

  const searchProduct = (event) => {
    if (history.location.pathname === "/") {
      dispatch(setSearchItem(event.target.value));
    } else {
      history.push("/");
    }
  };

  return (
    <nav className="header">
      <Link to="/">
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
          className="header__logo"
        />
      </Link>
      <div className="header__search">
        <input
          type="text"
          className="header__searchInput"
          onChange={searchProduct}
        />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"} className="header__link">
          <div onClick={login} className="header_options">
            <span className="header_optionLineOne">Hello,{user?.email}</span>
            <span className="header_optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to={user ? "/orders" : "/login"} className="header__link">
          <div className="header_options">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>

        <a
          target="_blank"
          href="https://www.primevideo.com/?ref_=dvm_pds_amz_in_as_s_g_146|m_lgAX6a65c_c386629063406"
          className="header__link"
        >
          <div className="header_options">
            <span className="header_optionLineOne">Try</span>
            <span className="header_optionLineTwo">Prime</span>
          </div>
        </a>

        <Link to="/checkout" className="header__link">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header__basketCount">
              {getTotalNumberOfItems(basket)}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
