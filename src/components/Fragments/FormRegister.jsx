import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button/Index";
import InputForm from "../Elements/Input/Index";
import Modal from "../Elements/Modal/Index";
import Loader from "../Elements/Loader/Index";
import { registerUser, fetchCompanies, DEFAULT_GUID_APPLICATION } from "../../server/index";

const FormRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    companyGuild: "",
  });
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSuccessModalClosed, setIsSuccessModalClosed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsFormValid(true);

    const validateInputs = () => {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phoneNumber || !formData.companyGuild) {
        setModalMessage("Mohon Lengkapi Data Anda Dengan Lengkap");
        setIsModalOpen(true);
        setLoading(false);
        setIsFormValid(false);
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setModalMessage("Passwords do not match.");
        setIsModalOpen(true);
        setLoading(false);
        return false;
      }

      return true;
    };

    if (!validateInputs()) return;

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      guidAplication: DEFAULT_GUID_APPLICATION,
      companyGuid: formData.companyGuild,
      role: "user-pelanggan"
    };

    try {
      const response = await registerUser(userData);
      if (response.status === 200) {
        console.log("Email sent to:", formData.email);
        setModalMessage(response.data.message || "Registration successful!");
      } else {
        const errorMessage = response.data.message || "Registration failed. Please try again later.";
        setModalMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again later.";
      setModalMessage(errorMessage);
    } finally {
      setIsModalOpen(true);
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsSuccessModalClosed(true);
  };

  const renderLoader = () => {
    if (isLoading) {
      return <Loader />;
    } else {
      navigate("/verifikasi", { state: { email: formData.email } });
    }
  };

  useEffect(() => {
    if (isSuccessModalClosed && isFormValid) {
      renderLoader();
    }
  }, [isSuccessModalClosed, isFormValid]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label
            className="absolute left-3 bg-white px-1 text-gray-500 transition-all  -top-3.5 text-sm">
            pilihan <span className="text-red-600 text-base">*</span>
          </label>
          <select
            name="companyGuild"
            value={formData.companyGuild}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            required
          >
            <option>Pilihan</option>
            {companies.map((company) => (
              <option key={company.guid} value={company.guid}>{company.name}</option>
            ))}
          </select>
        </div>
        <InputForm
          label="Full Name"
          type="text"
          placeholder="Masukan Nama Anda"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <InputForm
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputForm
          label="Password"
          type="password"
          placeholder="****"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <InputForm
          label="Confirm Password"
          type="password"
          placeholder="****"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <InputForm
          label="Phone Number"
          type="text"
          placeholder="Your Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <Button variant="bg-primary w-full" disabled={isLoading}>
          {isLoading ? <Loader /> : "Register"}
        </Button>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h3 className="text-lg font-bold mb-4">Notification!</h3>
        <div className="p-4">{modalMessage}</div>
      </Modal>
    </>
  );
};

export default FormRegister;
