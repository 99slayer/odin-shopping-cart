import React, { useState } from "react";
import "./styles/App.css";
import { NavBar } from "./components/NavBar";
import { Outlet } from "react-router-dom";

const App = () => {
  const [productList, setProductList] = useState({
    1: {
      name: "Toast Master 5000",
      cost: 125.99,
      count: 0,
      image: "toaster-1.jpg",
    },
    2: {
      name: "Toastie Classic",
      cost: 35.99,
      count: 0,
      image: "toaster-2.jpg",
    },
    3: {
      name: "Toastie Classic 2",
      cost: 40.0,
      count: 0,
      image: "toaster-3.jpg",
    },
    4: {
      name: "Toast Box",
      cost: 50.0,
      count: 0,
      image: "toaster-4.jpg",
    },
    5: {
      name: "Toast Box Supreme",
      cost: 70.0,
      count: 0,
      image: "toaster-5.jpg",
    },
    6: {
      name: "Toast Box Lite",
      cost: 35.99,
      count: 0,
      image: "toaster-6.jpg",
    },
    7: {
      name: "Industrial Toaster",
      cost: 200.0,
      count: 0,
      image: "toaster-7.jpg",
    },
    8: {
      name: "The Original",
      cost: 40.0,
      count: 0,
      image: "toaster-8.jpg",
    },
    9: {
      name: "Multi-Toast 5",
      cost: 85.0,
      count: 0,
      image: "toaster-9.jpg",
    },
  });

  return (
    <>
      <NavBar></NavBar>
      <Outlet context={[productList, setProductList]} />
    </>
  );
};

export default App;
