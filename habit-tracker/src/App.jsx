import React from 'react'

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import { AdminRoutes } from './AdminRoutes';
import './App.css'
import { useEffect } from 'react';
import RequireAuth from './components/RequireAuth';
import { Blogs } from './pages/blogPages/Blogs';
import BlogDetails from './pages/blogPages/BlogDetails';
import { ProfilePage } from './pages/ProfilePage';
import { authInfo } from './features/auth/authInfoThunks';

function App() {
  
  const {isAuthChecked,isAuthenticated}=useSelector((state) => state.auth);

  const navigate=useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(authInfo());

  },[dispatch]);

  useEffect(()=>{
    if(isAuthChecked &&!isAuthenticated && window.location.pathname!=='/'){
      navigate('/');
    }
  },[isAuthenticated])

  if(!isAuthChecked){
    console.log("isAuthChecked false");
    return <div className="flex items-center justify-center h-screen bg-gray-100">Loading...</div>;
  }

  return (
    
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth> 
            }
            />
          <Route path='user/profile'element={<ProfilePage/>} ></Route>
          <Route path='blog' element={<Blogs/>}></Route>
          <Route path='blog/:id' element={<BlogDetails/>}></Route>
        </Route>

        


        <Route path='/auth/login' element={<LoginPage/>}></Route>
        <Route path='/auth/register' element={<RegisterPage/>}></Route> 
        <Route path='/auth/confirm-email' element={<ConfirmEmailPage/>}></Route>

        {AdminRoutes}
        
      </Routes>
   
  )
}

export default App
