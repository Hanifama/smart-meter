import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Elements/Button/Index";
import InputForm from "../Elements/Input/Index";
import Modal from "../Elements/Modal/Index";
import Loader from "../Elements/Loader/Index";
import { loginUser } from "../../server/index";

const FormLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

    // Validasi inputan kosong
    if (!formData.email || !formData.password) {
      setModalMessage("Mohon isi dengan lengkap data anda");
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    setIsModalOpen(false);

    try {
      const response = await loginUser(formData.email, formData.password);
      console.log('API Response:', response); // Log response untuk debugging

      if (response && response.statusCode === 200) {  
        const { userToken } = response.data;
        localStorage.setItem("userToken", userToken);
        console.log('Token saved:', userToken);

        setTimeout(() => {
          setIsLoading(false);
          setModalMessage("Selamat login Anda berhasil");
          setIsModalOpen(true);

          setTimeout(() => {
            setIsModalOpen(false);
            navigate('/dashboard');
          }, 2000);
        }, 1000);

      } else if (response && response.statusCode === 500) {
        setModalMessage("Email atau password salah");
        setIsModalOpen(true);
        setIsLoading(false);
      } else {
        throw new Error(`Unexpected status code: ${response ? response.statusCode : 'undefined'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoading(false);
      setModalMessage("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
      setIsModalOpen(true);
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
        <div className="text-right mb-2">
          <Link to="/forgot-password" className="text-primary-600">Lupa Password?</Link>
        </div>
        <Button variant="bg-primary w-full" disabled={isLoading}>
          {isLoading ? <Loader /> : "Login"}
        </Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3 className="text-lg font-bold mb-4">Pemberitahuan !</h3>
        <p className={modalMessage.includes("berhasil") ? "text-green-500" : "text-red-500"}>
          {modalMessage}
        </p>
      </Modal>
    </>
  );
};

export default FormLogin;
