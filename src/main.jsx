import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from './Pages/login.jsx'
import ErrorPage from './Pages/errorpage.jsx'
import Dashboard from './Pages/dashboard.jsx'
import RegisterPage from './Pages/register.jsx';
import Verification from './Pages/verification.jsx';
import UpdatePasswordPage from './Pages/updatepassword.jsx';
import ForgotPassword from './Pages/forgotpassword.jsx';
import ProfileCard from './Pages/User.jsx';
import Company from './Pages/company.jsx';
import RegisterUser from './Pages/createnewuser.jsx';
import RegDevice from './Pages/dashDevice.jsx'
import Dashboard4 from './Pages/dashManagemen.jsx'
import UpdateProfile from './Pages/updateprofile.jsx'
import UserByCompany from './Pages/userbycom.jsx'
import Riwayat from './Pages/riwayat.jsx'
import ProfilePage from './Pages/dashProfile.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProfileCard />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/dashboard/listperangkat",
    element: <RegDevice />
  },
  {
    path: "/dashboard/riwayat",
    element: <Riwayat />
  },
  {
    path: "/dashboard/profile",
    element: <ProfilePage />
  },
  
  {
    path: "/dashboard/manageuser",
    element: <Dashboard4 />
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: '/verifikasi',
    element: <Verification />
  },
  {
    path: '/update-password',
    element: <UpdatePasswordPage />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/update-profile",
    element: <UpdateProfile/>
  },
  {
    path: "/user/add",
    element: <RegisterUser />
  },
  //cek data dev
  {
    path: "/company",
    element: <Company />
  },
  {
    path: "/role",
    element: <UserByCompany/>
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
