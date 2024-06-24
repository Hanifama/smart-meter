import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
  const navigate = useNavigate();

  const handleButton = (route) => {
    navigate(route);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Hallo User</h1>
      <button 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => handleButton('/login')}
      >
        Login
      </button>
      <button 
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        onClick={() => handleButton('/register')}
      >
        Register
      </button>
    </div>
  );
};

export default ProfileCard;
