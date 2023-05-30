import './styles/App.css';
import React from 'react';
import { NavBar } from './components/NavBar';
import { Outlet } from 'react-router-dom';

//This is the base page layout**
const App = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet />
    </>
  );
}

export default App;
