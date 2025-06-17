import React from 'react'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from './store'
import {GoogleOAuthProvider} from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom'
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
