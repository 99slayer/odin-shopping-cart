import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";

export const HomePage = () => {
  return (
    <div id="home-page">
      <ProductDisplay />
      <Reviews />
      <About />
    </div>
  );
};

const ProductDisplay = () => {
  return (
    <div id="product-display">
      <img alt="" src="toaster-1.jpg"></img>
      <p>
        Introducing the next leap forward in toaster technology! The Toast
        Master 5000 combines turbo charged industrial strength toast chambers
        with varied and sophisticated user settings. Toasting the perfect slice
        has never been easier!
      </p>
    </div>
  );
};

const reviewList = [
  '"I look forward to breakfast every morning now!"',
  "\"I've spent years looking for the perfect toaster, and now I've found it.\"",
  '"These toaster are the best! I don\'t go anywhere without one!"',
  '"Toaster Warehouse saved my marriage!"',
  '"These make the perfect Valentine\'s Day gift. Nothing is more romantic than toast!"',
  '"I\'ve been let down by alot of toasters so I was skeptical at first, but boy was I wrong!"',
  '"Toaster Warehouse are pioneers in the field of toasters."',
  '"When I need a toaster, I know who to call."',
  '"These toasters can\'t be beat!"',
  '"Only Toaster Warehouse brand toasters touch my counter top."',
  '"Busting out one of these beauties at a family gathering makes you the life of the party."',
  '"I thought I knew what was possible with toast. But my toast journey was just beginning!"',
  '"A couple slices and you\'ll understand why these guys are the best!"',
];

const currentRevs = [0, 1, 2];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUnique(arr) {
  if (arr.length === 0) {
    return getRandom(0, reviewList.length - 1);
  } else {
    let newIndex = getRandom(0, reviewList.length - 1);

    while (arr.includes(newIndex)) {
      newIndex = getRandom(0, reviewList.length - 1);
    }

    return newIndex;
  }
}

const Reviews = () => {
  const [review1, setReview1] = useState(reviewList[0]);
  const [review2, setReview2] = useState(reviewList[1]);
  const [review3, setReview3] = useState(reviewList[2]);

  useEffect(() => {
    setInterval(() => {
      const index = getUnique(currentRevs);
      currentRevs.splice(0, 1, index);
      setReview1(reviewList[index]);
    }, 5000);

    setInterval(() => {
      const index = getUnique(currentRevs);
      currentRevs.splice(1, 1, index);
      setReview2(reviewList[index]);
    }, 5000);

    setInterval(() => {
      const index = getUnique(currentRevs);
      currentRevs.splice(2, 1, index);
      setReview3(reviewList[index]);
    }, 5000);
  }, []);

  return (
    <div id="reviews">
      <h2 id="review-header" aria-label="review header">
        SATISFIED CUSTOMER REVIEWS
      </h2>
      <ul id="review-cont">
        <li id="review-column-1" className="review-column">
          {review1}
        </li>
        <li id="review-column-2" className="review-column">
          {review2}
        </li>
        <li id="review-column-3" className="review-column">
          {review3}
        </li>
      </ul>
    </div>
  );
};

const About = () => {
  return (
    <div id="about">
      <h2 id="about-header">ABOUT US</h2>
      <p id="about-text">
        Toaster Warehouse was first founded in 1892 in a small town called Loaf
        Shire. It's founder John Goodenbread had a saying,
        <strong id="motto">
          {" 'Reasonably quality products at reasonably affordable prices.' "}
        </strong>
        This motto continues to guide our company all these years later. From
        our warehouse to your counter, nothing brings the family together like
        toast!
      </p>
    </div>
  );
};
