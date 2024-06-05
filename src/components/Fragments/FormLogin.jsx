// FormLogin.jsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button/Index";
import InputForm from "../Elements/Input/Index";
import Modal from "../Elements/Modal/Index";
import Loader from "../Elements/Loader/Index";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsModalOpen(false);

    try {
      // Simulate API call to validate user credentials
      setTimeout(async () => {
        // Replace this with your actual API call
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`);
        const data = await response.json();

        if (data.length > 0 && data[0].password === formData.password) {
          // Simpan data pengguna ke local storage
          localStorage.setItem('userProfile', JSON.stringify(data[0]));
          dispatch({ type: 'LOGIN_SUCCESS', payload: data[0] });
          setIsLoading(false);
          console.log("Data profil pengguna:", data[0]);
          navigate('/');
        } else {
          setIsModalOpen(true);
          setIsLoading(false);
        }
      }, 3000); // Simulate 3 seconds delay for loader
    } catch (error) {
      console.error('Error during login:', error);
      setIsModalOpen(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputForm 
          label="Email" 
          type="email" 
          placeholder="example@gmail.com" 
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputForm
          label="Password" 
          type="password" 
          placeholder="****" 
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button variant="bg-blue-600 w-full" disabled={isLoading}>
          {isLoading ? <Loader /> : "Login"}
        </Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3 className="text-lg font-bold mb-4">Error</h3>
        <p className="text-red-500">Email atau password salah</p>
      </Modal>
    </>
  );
};

export default FormLogin;
