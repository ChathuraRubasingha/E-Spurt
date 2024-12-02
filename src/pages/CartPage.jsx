import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/CartPage.css";
import HeaderBar from "../components/HeaderBar";
import NavBar from "../components/NavBar";
import { ArrowLeft, Trash } from "iconsax-react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState(cart);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = cart.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  useEffect(() => {
    setFilteredProducts(cart);
  }, [cart]);

  return (
    <div className="cart-page">
      <HeaderBar />
      <div className="cart-wrapper">
        <NavBar onSearch={handleSearch} />
        <div className="cart-container">
          <div className="left-cart-container">
            <h1 className="shopping-cart">Your Shopping Cart</h1>
            <div className="cart-item-list">
              {cart.length === 0 ? (
                <p
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <ArrowLeft
                    size="24"
                    color="#ff7f00"
                    variant="Bold"
                    onClick={() => navigate("/home")}
                    style={{ cursor: "pointer" }}
                  />
                  Your cart is empty. Go and Shop
                </p>
              ) : (
                <div className="cart-items">
                  {filteredProducts.map((item) => (
                    <div className="cart-item" key={item.title}>
                      <img src={item.image} alt={item.title} />
                      <p>{item.title}</p>
                      <p>${item.price}</p>
                      <div className="quantity-controls">
                        <button
                          className="quantity-controls-buttons"
                          onClick={() => updateQuantity(item.title, "decrease")}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="quantity-controls-buttons"
                          onClick={() => updateQuantity(item.title, "increase")}
                        >
                          +
                        </button>
                      </div>
                      <Trash
                        size="24"
                        color="#ff7f00"
                        variant="Bold"
                        onClick={() => removeFromCart(item.title)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="right-cart-container">
            <h1>Summary</h1>
            <div className="summary-container">
              <div className="summary-row">
                <p>Number of Items:</p>
                <p>{cart.length}</p>
              </div>
              <div className="summary-row">
                <p>Sub Total:</p>
                <p>${calculateTotal().toFixed(2)}</p>
              </div>
              <div className="summary-row">
                <p>Shipping:</p>
                <p>$0</p>
              </div>
              <hr />
              <div className="summary-row">
                <h2 style={{ fontWeight: "500", fontSize: "24px" }}>
                  Total Price:
                </h2>
                <h2>${calculateTotal().toFixed(2)}</h2>
              </div>
            </div>
            <div className="check-out">Check Out</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
