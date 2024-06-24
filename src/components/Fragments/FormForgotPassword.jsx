import React, { useState } from "react";
import Button from "../Elements/Button/Index";
import InputForm from "../Elements/Input/Index";
import Modal from "../Elements/Modal/Index";
import Loader from "../Elements/Loader/Index";
import { forgotPassword } from "../../server/index"; 
import { Link, useNavigate } from "react-router-dom";

const FormForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await forgotPassword(email);
      setModalMessage("Password reset link has been sent to your email.");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error during forgot password:", error);
      setModalMessage("Failed to send password reset link. Please try again.");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/login');
};


  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-md rounded-lg">
        <InputForm
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="bg-primary w-full mt-2" disabled={isLoading}>
          {isLoading ? <Loader /> : "Kirim Kode Riset"}
        </Button>
        <div className="text-center mb-2">
          <Link to="/login" className="text-primary">kembali</Link>
        </div>
      </form>        
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Notification</h3>
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
};

export default FormForgotPassword;
