import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'; // Import Provider dari react-redux
import store from './redux/store'; // Import store Redux Anda

import LoginPage from './Pages/login.jsx'
import RegisterPage from './Pages/register.jsx'
import ErrorPage from './Pages/errorpage.jsx'
import UserProfile from './Pages/consume.jsx'
import Verification from './Pages/verification.jsx'
import Dashboard from './Pages/dashboard.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Dashboard/>    
  },
  {
    path : "/login",
    element : <LoginPage/>,
    errorElement : <ErrorPage/>
  },
  {
    path : "/register",
    element : <RegisterPage/>
  },
  {
    path : "/verifikasi",
    element : <Verification/>
  },
  {
    path : "/profile",
    element : <UserProfile/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
