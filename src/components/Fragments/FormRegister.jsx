import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button/Index";
import InputForm from "../Elements/Input/Index";
import Modal from "../Elements/Modal/Index";
import { registerUser, fetchRoles, checkEmailExists, DEFAULT_GUID_APPLICATION, DEFAULT_GUID_COMPANY } from "../../server/index";

const FormRegister = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: ""
  });
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await fetchRoles();
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    getRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phoneNumber || !formData.role) {
      setModalMessage("All fields are required.");
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setModalMessage("Passwords do not match.");
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }

    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      setModalMessage("Email already exists. Please use a different email.");
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }

    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      guidApplication: DEFAULT_GUID_APPLICATION,
      companyGuild: DEFAULT_GUID_COMPANY,
      role: parseInt(formData.role, 10)
    };

    try {
      const response = await registerUser(userData);
      if (response.status === 201) {
        setTimeout(() => {
          setModalMessage("Registration successful!");
          setIsModalOpen(true);
          setIsLoading(false);
          setTimeout(() => {
            setIsModalOpen(false);
            navigate("/login");
          }, 2000);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            role: ""
          });
        }, 2000);
      } else {
        setModalMessage("Registration failed. Please try again later.");
        setIsModalOpen(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setModalMessage("Registration failed. Please try again later.");
      setIsModalOpen(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <InputForm
          label="Full Name"
          type="text"
          placeholder="Your Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
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
        <InputForm
          label="Confirm Password"
          type="password"
          placeholder="****"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <InputForm
          label="Phone Number"
          type="text"
          placeholder="Your Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <Button variant="bg-blue-600 w-full">Register</Button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Pemberitahuan !! </h3>
        <div className="p-4">{modalMessage}</div>
      </Modal>
    </>
  );
};

export default FormRegister;
