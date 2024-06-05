import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Ubah sesuai dengan URL json-server

export const DEFAULT_GUID_APPLICATION = "PROJECT-02b92ac2-9142-4e84-9661-7f27877ec645-2024";
export const DEFAULT_GUID_COMPANY = "COMPANY-1a34bc56-7890-4def-1234-9a8b7c6d5e4f-2024";

export const fetchRoles = async () => {
  return axios.get(`${API_URL}/roles`);
};

export const registerUser = async (userData) => {
  const newUser = {
    ...userData,
    guidApplication: DEFAULT_GUID_APPLICATION,
    companyGuild: DEFAULT_GUID_COMPANY
  };
  return axios.post(`${API_URL}/users`, newUser);
};

export const checkEmailExists = async (email) => {
  const response = await axios.get(`${API_URL}/users?email=${email}`);
  return response.data.length > 0;
};
