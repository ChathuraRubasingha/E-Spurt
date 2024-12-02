import React, { useState } from "react";
import "../styles/Home.css";
import HeaderBar from "../components/HeaderBar";
import NavBar from "../components/NavBar";
import CardItem from "../components/Products/CardItem";
import { Products } from "../components/Products/ProductList";

function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState(Products);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = Products.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="home-wrapper">
      <HeaderBar />
      <div className="home-container">
        <NavBar onSearch={handleSearch} />
        <div className="home-hero">
          <div className="hero-text-wrapper">
            <h1>
              Grab Upto 50% Off On
              <br />
              Selected items
            </h1>
            <div className="hero-button">Buy Now</div>
          </div>
        </div>
        <h1 style={{ padding: "20px 0" }}>Latest Items For You!</h1>
        <div className="home-products">
          {filteredProducts.map((item, index) => (
            <CardItem
              key={index}
              image={item.image}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
