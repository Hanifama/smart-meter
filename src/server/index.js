import axios from 'axios';

const API_URL = 'https://sso.pptik.id/api/v1'; 

export const DEFAULT_GUID_APPLICATION = "PROJECT-02b92ac2-9142-4e84-9661-7f27877ec645-2024";

export const fetchCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/companies/perusahaan`);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

export const getProfileData = async (token) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile data');
  }

  const data = await response.json();
  return data;
};

export const registerUser = async (userData) => {
  const newUser = {
    ...userData,
    guidAplication: DEFAULT_GUID_APPLICATION
  };
  return axios.post(`${API_URL}/users/register`, newUser);  
};

export const loginUser = async (email, password, guidApplication = DEFAULT_GUID_APPLICATION) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      email: email,
      password: password,
      guidAplication: guidApplication
    })
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
};

export const activateAccount = async ({ email, guidAplication = DEFAULT_GUID_APPLICATION, otp }) => {
  try {
    const response = await axios.post(`${API_URL}/users/activate`, { email, guidAplication, otp });
    return response.data;
  } catch (error) {
    console.error("Error activating account:", error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/users/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ email })
  });

  if (!response.ok) {
    throw new Error('Failed to send password reset link');
  }

  const data = await response.json();
  return data;
};

export const updatePassword = async (data) => {
  const token = localStorage.getItem('userToken'); // Retrieve the token
  console.log('Token retrieved:', token); // Log token to verify

  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.post(
      `${API_URL}/users/edit-password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    console.log('Error:', error.response); // Log error response to check details
    throw error;
  }
};

export const editProfile = async (token, newName, newPhoneNumber, newAddress) => {
  const response = await fetch(`${API_URL}/users/edit-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${token}`
    },
    body: new URLSearchParams({
      newName: newName,
      newPhoneNumber: newPhoneNumber,
      newAddress: newAddress
    })
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  const data = await response.json();
  return data;
};

