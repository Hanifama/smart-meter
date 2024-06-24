import jwt_decode from 'jwt-decode';

const getUserRole = () => {
  const userToken = localStorage.getItem('userToken'); // Ambil token dari localStorage

  if (userToken) {
    try {
      const decodedToken = jwt_decode(userToken); // Decode token untuk mendapatkan payload
      const userRole = decodedToken.role; // Ambil role dari payload token

      return userRole; // Kembalikan role pengguna
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Kembalikan null jika terjadi kesalahan dalam decoding
    }
  } else {
    return null; // Kembalikan null jika token tidak tersedia
  }
};

export default getUserRole;
