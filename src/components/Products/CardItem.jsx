import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "../../styles/CardItem.css";
import Star from "../../assets/Icons/star.svg";
import Heart from "../../assets/Icons/Heart.svg";

function CardItem({ image, title, price, description }) {
  const { addToCart, cart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart({ image, title, price, description });
    setAddedToCart(true);
  };

  return (
    <div className="card-wrapper">
      <div className="heart-wrapper">
        <img className="heart" src={Heart} alt="heart" />
      </div>

      <div className="card-container">
        <div className="card-img-section">
          <img src={image} alt={title} />
        </div>
        <div className="card-body-section">
          <div className="card-title">
            <p>{title}</p>
            <p style={{ fontSize: "24px" }}>${price}</p>
          </div>
          <div className="card-description">{description}</div>
          <div className="card-rating">
            <img src={Star} alt="star" />
          </div>
          <div
            className={`add-cart ${addedToCart ? "added" : ""}`}
            onClick={handleAddToCart}
            disabled={addedToCart}
          >
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
