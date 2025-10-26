import React from "react";
import "./HomePage.css";
import vineyard from "../assets/images/vineyard.jpg"; 

export default function HomePage() {
  return (
    <div
      className="homepage-hero"
      style={{ backgroundImage: `url(${vineyard})` }} 
    >
      <div className="homepage-overlay">
        <h1 className="text-danger hero-title"> Welcome to Winery App</h1>
        <p className="lead hero-subtitle">
          Use the navigation above to manage wines users or orders.
        </p>
      </div>
    </div>
  );
}
