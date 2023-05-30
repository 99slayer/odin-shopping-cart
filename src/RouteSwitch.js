import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';

export const RouteSwitch = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='homepage' element={<HomePage />}></Route>
            <Route path='shoppage' element={<ShopPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
