import React from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div id="nav-bar">
      <h1 id="heading">TOASTER WAREHOUSE</h1>
      <div id="nav-links">
        <Link to="/" id="home-link">
          HOME
        </Link>
        <Link to="/shoppage" id="shop-link">
          SHOP
        </Link>
      </div>
    </div>
  );
};
