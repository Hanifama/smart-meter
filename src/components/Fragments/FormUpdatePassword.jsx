import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updatePassword } from '../../server/index'; // Import fungsi API
import InputForm from '../Elements/Input/Index';

const FormUpdatePassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await updatePassword({
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      console.log('API Response:', response);

      if (response.status === 200) {
        setSuccessMessage('Password updated successfully!');
        navigate('/login');
      } else {
        setErrorMessage(response.data.message || 'Failed to update password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to update password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>          
          <InputForm
          label="Email"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <InputForm
          label="Password Saat ini"
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>          
          <InputForm
          label="Password Baru"
            type="password"
            name="newPassword"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>          
          <InputForm
          label="Konfirmasi Password Baru"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 text-sm mt-2">{successMessage}</div>}
        <button 
          type="submit" 
          disabled={isLoading} 
          className={`w-full py-2 px-4 rounded-md text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary'}`}
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
        <div className="text-center mb-2">
          <Link to="/dashboard/profile" className="text-primary-600">kembali</Link>
        </div>
      </form>
    </div>
  );
};

export default FormUpdatePassword;
