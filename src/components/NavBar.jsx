import React, { useState } from "react";
import Logo from "../assets/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SearchNormal1, ShoppingCart, User } from "iconsax-react";

function NavBar({ onSearch }) {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="home-navbar">
      <div className="logo-container">
        <img src={Logo} alt="logo" onClick={() => navigate("/home")}/>
      </div>
      <div className="nav-items">
        <p>Category</p>
        <p>Deals</p>
        <p>What's New</p>
        <p>Delivery</p>
      </div>
      <div className="search-bar">
        <input
          name="search"
          type="text"
          placeholder="Search Product"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <SearchNormal1 size="20" color="#FF8A65" style={{ position: "absolute", right: "10px" }} />
      </div>
      <div className="account">
        <User size="24" color="#000000" />
        Account
      </div>
      <div className="cart" onClick={() => navigate("/cart")}>
        <ShoppingCart size="24" color="#000000" />
        Cart<span>{cart?.length || 0}</span>
      </div>
    </div>
  );
}

export default NavBar;
