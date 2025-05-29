import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUserFromToken } from './features/auth/authSlice';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css'
import { useEffect } from 'react';

function App() {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUserFromToken(token));
    }
  },[]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path='/auth/login' element={<LoginPage/>}></Route>
        <Route path='/auth/register' element={<RegisterPage/>}></Route> 
      </Routes>
    </Router>
  )
}

export default App
