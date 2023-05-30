import React from "react";
import '../styles/HomePage.css';

export const HomePage = () => {
  return (
    <div id="homepage">
      <ProductDisplay />
      <Reviews />
      <About />
    </div>
  );
};

const ProductDisplay = () => {
  return (
    <div id="product-display">
      <ul id="display-cont">
        <ProductImage />
        <ProductImage />
        <ProductImage />
        <ProductImage />
      </ul>
    </div>
  )
}

const ProductImage = (props) => {
  const { x, y } = props;

  return (
    <li className="product-image">
      <img alt="" />
    </li>
  )
}

const Reviews = () => {
  return (
    <div id="reviews">

    </div>
  )
}

const About = () => {
  return (
    <div id="about">

    </div>
  )
}