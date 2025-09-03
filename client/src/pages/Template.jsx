import React from 'react';
import { useEffect, useState } from 'react';
import authService from '../services/authService';
import { Outlet } from 'react-router-dom';
import '../styles/Template.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { setAuth } from '../store/authSlice';
import { useSelector } from 'react-redux';

function Template() {

  const auth = useSelector((state) => state.auth);
  // console.log('Auth state:', auth);
  const isLoggedin = !! auth.token;

  return (
    <div className={`explore-wrapper ${isLoggedin ? 'row-layout' : 'column-layout'}`}>
      {isLoggedin ? <Sidebar /> : <Navbar />}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Template;
