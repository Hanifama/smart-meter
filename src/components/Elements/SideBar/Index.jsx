import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faListAlt, faHistory, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('userToken');

    
    navigate('/login');
  };

  return (
    <div id="sideBar" className="relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64 md:-ml-64 md:fixed md:top-0 md:z-30 md:h-screen md:shadow-xl animated faster">
      <div className="flex flex-col">
        <div className="text-right hidden md:block mb-4">
          <button id="sideBarHideBtn">
            <i className="fad fa-times-circle"></i>
          </button>
        </div>

        {/* Sidebar menu user role */}
        {userRole === 'superAdmin' && (
          <>
            <p className="uppercase text-xs text-gray-600 mb-4 tracking-wider">Nama Fitur</p>
            <a href="/register" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Register
            </a>
            <a href="/login" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Login
            </a>
            <a href="/verifikasi" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Aktivasi Akun
            </a>
            <a href="/forgot-password" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Lupa Password
            </a>
            <a href="/update-profile" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Update Profile
            </a>
            <a href="/update-password" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Update Password
            </a>
          </>
        )}

        {userRole === 'user-pelanggan' && (
          <>
            <p className="uppercase text-xs text-gray-600 mb-4 tracking-wider">Home</p>
            <a href="/dashboard" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              Dashboard
            </a>
            <a href="/dashboard/listperangkat" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              <FontAwesomeIcon icon={faListAlt} className="mr-2" />
              List Perangkat
            </a>
            <a href="/dashboard/riwayat" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              <FontAwesomeIcon icon={faHistory} className="mr-2" />
              Riwayat
            </a>
            <a href="/dashboard/profile" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </a>

            <hr className='border-t border-black mb-5 mt-3' />

            {/* Logout */}
            <a onClick={handleLogout} className="cursor-pointer mb-3 capitalize font-medium text-base text-red-500 hover:text-red-700 transition ease-in-out duration-500">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </a>
          </>
        )}

        {userRole === 'admin-cabang-instansi' && (
          <>
            <p className="uppercase text-xs text-gray-600 mb-4 tracking-wider">Nama Fitur</p>
            <a href="/manage-user" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Manajemen User
            </a>
            <a href="/manajemen-perangkat" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Manajemen Perangkat
            </a>
            <a href="/riwayat-device" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Riwayat Device
            </a>
          </>
        )}

        {userRole === 'admin-instansi' && (
          <>
            <p className="uppercase text-xs text-gray-600 mb-4 tracking-wider">Nama Fitur</p>
            <a href="/manage-user" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Manajemen User
            </a>
            <a href="/manajemen-perangkat" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Manajemen Perangkat
            </a>
            <a href="/riwayat-device" className="mb-3 capitalize font-medium text-base hover:text-secondary transition ease-in-out duration-500">
              Riwayat Device
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
