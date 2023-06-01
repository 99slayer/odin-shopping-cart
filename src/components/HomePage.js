import React, { useState, useEffect } from "react";
import '../styles/HomePage.css';

export const HomePage = () => {
  return (
    <div id="homepage">
      <ProductDisplay />
      <ReviewComponent />
      <About />
    </div>
  );
};

const ProductDisplay = () => {
  return (
    <div id="product-display">
      <ul id="display-cont">
        <ProductImage imageSrc="product-1.png" />
        <ProductImage imageSrc="product-2.png" />
        <ProductImage imageSrc="product-3.png" />
        <ProductImage imageSrc="product-4.png" />
      </ul>
    </div>
  )
}

const ProductImage = (props) => {
  const { imageSrc } = props;

  return (
    <li className="product-image">
      <img alt="" src={imageSrc} />
    </li>
  )
}

const reviewList = [
  'review 1',
  'review 2',
  'review 3',
  'review 4',
  'review 5',
  'review 6'
];

const currentRevs = [0, 1, 2];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getUnique(arr) {
  if (arr.length === 0) {
    return getRandom(0, reviewList.length - 1);
  } else {
    let newIndex = getRandom(0, reviewList.length - 1);

    while (arr.includes(newIndex)) {
      newIndex = getRandom(0, reviewList.length - 1);
    };

    return newIndex;
  };
};

const ReviewComponent = () => {
  const [review1, setReview1] = useState(reviewList[0]);
  const [review2, setReview2] = useState(reviewList[1]);
  const [review3, setReview3] = useState(reviewList[2]);

  useEffect(() => {
    setInterval(() => {
      let index = getUnique(currentRevs);
      currentRevs.splice(0, 1, index);
      setReview1(reviewList[index]);
    }, 4000);
    setInterval(() => {
      let index = getUnique(currentRevs);
      currentRevs.splice(1, 1, index);
      setReview2(reviewList[index]);
    }, 4000);
    setInterval(() => {
      let index = getUnique(currentRevs);
      currentRevs.splice(2, 1, index);
      setReview3(reviewList[index]);
    }, 4000);
  }, [])

  return (
    <div id="reviews">
      <ul id="review-cont">
        <li id="review-column-1" className="review-column">{review1}</li>
        <li id="review-column-2" className="review-column">{review2}</li>
        <li id="review-column-3" className="review-column">{review3}</li>
      </ul>
    </div>
  )
}

const About = () => {
  return (
    <div id="about">

    </div>
  )
}