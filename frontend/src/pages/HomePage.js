import React from "react";
import "./HomePage.css";
import vineyard from "../assets/images/vineyard.jpg"; // ✅ Correct import path

export default function HomePage() {
  return (
    <div
      className="homepage-hero"
      style={{ backgroundImage: `url(${vineyard})` }} // ✅ Inline background image
    >
      <div className="homepage-overlay">
        <h1 className="text-danger hero-title"> Welcome to Winery App</h1>
        <p className="lead hero-subtitle">
          Use the navigation above to manage wines or users.
        </p>
      </div>
    </div>
  );
}
