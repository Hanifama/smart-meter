import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfileCard = ({ user }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const handleUpdatePassword = () => {
    navigate('/update-password');
  };

  const handleUpdateProfile = () => {
    navigate('/update-profile');
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const formData = new FormData();
      formData.append('file', e.target.elements.file.files[0]);

      const response = await axios.post('https://sso.pptik.id/api/v1/images/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      setError(error.message || 'Error uploading image');
    }
  };

  return (
    <div className="w-full mx-auto p-4 shadow-md rounded-lg bg-white">
      <div className="flex items-center justify-start">
        
        <div
          className="h-20 w-20 rounded-full mr-9 bg-gray-300 flex items-center justify-center cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={user.imageProfile} // URL gambar profil
            alt="Profile"
            className="h-16 w-16 rounded-full"
          />
        </div>

        <div className="flex">
          <div className="mr-8">
            <div className="mb-4">
              <h3 className="font-semibold">Nama</h3>
              <p>{user.name}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Email</h3>
              <p>{user.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Alamat</h3>
              <p>{user.address}</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <h3 className="font-semibold">Role User</h3>
              <p>Default : User-Pelanggan</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">No Telp</h3>
              <p>{user.phoneNumber}</p>
            </div>
          </div>
        </div>


      </div>

      <div className="mt-4 flex">
        <button
          onClick={handleUpdatePassword}
          className="bg-primary hover:bg-gray-600 text-white font-semibold rounded-lg w-full"
        >
          Update Password
        </button>
        <button
          onClick={handleUpdateProfile}
          className="bg-tranparent text-primary font-semibold px-4 py-2 rounded-lg w-full"
        >
          Update Profile
        </button>
      </div>

      {/* Modal untuk unggah gambar */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Upload Profile Image</h3>
            <form onSubmit={handleUploadImage}>
              <input type="file" name="file" accept="image/*" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg mt-4">
                Upload
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg mt-4 ml-2"
              >
                Cancel
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
