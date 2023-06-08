import React from "react";
import "./styles/App.css";
import { NavBar } from "./components/NavBar";
import { Outlet } from "react-router-dom";

//This is the base page layout**
const App = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet />
    </>
  );
};

export default App;
