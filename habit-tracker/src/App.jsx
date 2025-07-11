import React from 'react'

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home'
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
import {PulseLoader} from 'react-spinners';
import Dashboard from './pages/Dashboard';
import { HabitDetailPage } from './pages/habitPages/HabitDetailPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';



function App() {

  const { isAuthChecked, isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authInfo());

  }, [dispatch]);

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated && window.location.pathname !== '/') {
      navigate('/');
    }
  }, [isAuthenticated])

  if (!isAuthChecked) {
    
    return( 
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className='sweet-loading'>
        <PulseLoader
          color={'#36cba7'}
          loading={true}
          size={50}
          aria-label='Loading Spinner'
          data-testid="loader"
        />
      </div>
    </div>);
  }

  return (

    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        
        <Route element={<RequireAuth />}>
          <Route path='user/profile' element={<ProfilePage />} ></Route>
          <Route path='dashboard' element={<Dashboard/>}>
            <Route path='habits/:habitId' element={<HabitDetailPage/>}></Route>
            
          </Route>
          
        </Route>
        <Route path='blog' element={<Blogs />}></Route>
        <Route path='blog/:id' element={<BlogDetails />}></Route>
         <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
         <Route path='/about' element={<AboutPage/>}></Route>
         <Route path='/contact' element={<ContactPage/>}></Route>


      </Route>

      <Route path='/auth/login' element={<LoginPage />}></Route>
      <Route path='/auth/register' element={<RegisterPage />}></Route>
      <Route path='/auth/confirm-email' element={<ConfirmEmailPage />}></Route>
      <Route path='/auth/forgot-password' element={<ForgotPasswordPage/>}></Route>
      <Route path='/auth/reset-password' element={<ResetPasswordPage/>}></Route>
     
      {AdminRoutes}

    </Routes>

  )
}

export default App
