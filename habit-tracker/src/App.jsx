import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUserFromToken } from './features/auth/authSlice';
import { logout } from './features/auth/authSlice';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import { AdminRoutes } from './AdminRoutes';
import { isTokenExpired } from './utils/handleJwt';
import './App.css'
import { useEffect } from 'react';
import RequireAuth from './components/RequireAuth';
import { Blogs } from './pages/blogPages/Blogs';
import BlogDetails from './pages/blogPages/BlogDetails';

function App() {
  
  const isAuthChecked=useSelector((state) => state.auth.isAuthChecked);

  const dispatch = useDispatch();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      dispatch(setUserFromToken(token));
    }
    else if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      dispatch(logout());
    }
    else {
      dispatch(logout());
    }
    
  },[]);

  if(!isAuthChecked){
    console.log("isAuthChecked false");
    return <div className="flex items-center justify-center h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth> 
            }
            />
          <Route path='blog' element={<Blogs/>}></Route>
          <Route path='blog/:id' element={<BlogDetails/>}></Route>
        </Route>

        


        <Route path='/auth/login' element={<LoginPage/>}></Route>
        <Route path='/auth/register' element={<RegisterPage/>}></Route> 
        <Route path='/auth/confirm-email' element={<ConfirmEmailPage/>}></Route>

        {AdminRoutes}
        
      </Routes>
    </Router>
  )
}

export default App
