import React, { useEffect, useState } from "react";
import { getProfileData } from "../server/index"; 
import Sidebar from "../components/Elements/SideBar/Index";
import Navbar from "../components/Elements/Navbar/Index";
import DeviceTable from "../components/Elements/Table/DeviceTable";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RegDevice = () => {
    const navigate = useNavigate();
    const [decodedToken, setDecodedToken] = useState(null); 
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Data palsu untuk tabel perangkat
    const [devices, setDevices] = useState([
        { name: 'Device 1', registrationDate: '2023-01-01', status: 'Active' },
        { name: 'Device 2', registrationDate: '2023-02-01', status: 'Inactive' },
        { name: 'Device 3', registrationDate: '2023-03-01', status: 'Active' },
        { name: 'Device 4', registrationDate: '2023-04-01', status: 'Inactive' },
    ]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("userToken"); // Ambil token dari localStorage
            const decoded = jwtDecode(token); // Decode token
            setDecodedToken(decoded); // Simpan decoded token di state
    
            // Pengecekan role pengguna sebelum menampilkan data
            if (decoded && (decoded.role !== "admin-instansi" && decoded.role !== "admin-cabang-instansi")) {
              // Redirect ke halaman lain jika role tidak sesuai
              navigate("/dashboard/listperangkat");
              return;
            }
    
            const data = await getProfileData(token);
            setProfileData(data); // Simpan data profil di state
          } catch (error) {
            setError(error.message || "Error fetching profile data");
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, [navigate]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="h-screen flex">
            <Sidebar userRole={decodedToken && decodedToken.role} />
                <DeviceTable data={devices} />
            </div>
        </div>
    );
};

export default RegDevice;
