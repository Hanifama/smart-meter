// components/FormEditProfile.js

import React, { useState } from "react";
import Button from "../Elements/Button/Index";
import InputForm from "../Elements/Input/Index";
import Modal from "../Elements/Modal/Index";
import Loader from "../Elements/Loader/Index";
import { editProfile } from "../../server/index";

const FormEditProfile = () => {
  const [formData, setFormData] = useState({
    newName: "",
    newPhoneNumber: "",
    newAddress: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("userToken");

    try {
      const response = await editProfile(token, formData.newName, formData.newPhoneNumber, formData.newAddress);
      setModalMessage("Profile updated successfully.");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error during profile update:", error);
      setModalMessage("Failed to update profile. Please try again.");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-md rounded-lg bg-white">
        <InputForm
          label="Full Name"
          type="text"
          name="newName"
          placeholder="Your New Name"
          value={formData.newName}
          onChange={handleChange}
        />
        <InputForm
          label="Phone Number"
          type="text"
          name="newPhoneNumber"
          placeholder="Your New Phone Number"
          value={formData.newPhoneNumber}
          onChange={handleChange}
        />
        <InputForm
          label="Address"
          type="text"
          name="newAddress"
          placeholder="Your New Address"
          value={formData.newAddress}
          onChange={handleChange}
        />
        <Button variant="bg-primary w-full" disabled={isLoading}>
          {isLoading ? <Loader /> : "Update Profile"}
        </Button>
        <button          
          className="bg-tranparent text-primary font-semibold px-4 py-2 rounded-lg w-full"
        >
          Kembali
        </button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Notification</h3>
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
};

export default FormEditProfile;
