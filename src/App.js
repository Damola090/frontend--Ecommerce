import { useState, useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { Navigate } from 'react-router-dom'; 

import ProtectedRoutes from './components/route/ProtectedRoute';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';

import Login from './components/user/Login'
import Register from './components/user/Register' 
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';


import { loadUser } from './actions/userActions'
import store from './store'

import { useSelector } from 'react-redux'

function App() {

  useEffect( ()=> {
    store.dispatch(loadUser())

  }, [])

  return (
  <Router>
     <Header />
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:Keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} exact/>

          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectedRoutes />} >
            <Route path="/shipping" element={<Shipping />} />

          </Route>

          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/password/forgot' element={<ForgotPassword />} exact/>
          <Route path='/password/reset/:token' element={<NewPassword />} exact/>
          <Route element={<ProtectedRoutes />} >
            <Route path='/me' element={<Profile />} exact/>
            <Route path='/me/update' element={<UpdateProfile />} exact />
            <Route path='/password/update' element={<UpdatePassword />} exact />

          </Route>
    </Routes>
     <Footer />
  </Router>
  );
}

export default App;
