import React from "react";
import '../styles/NavBar.css';
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div id="nav-bar">
      <h1 id="heading">SHOPPING PROJECT</h1>
      <div id="nav-links">
        <Link to='/homepage'>HOME</Link >
        <Link to='/shoppage'>SHOP</Link>
      </div>
    </div>
  );
};