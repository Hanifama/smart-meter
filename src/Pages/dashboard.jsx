import React, { useEffect, useState } from "react";
import { getProfileData } from "../server/index";
import ApplicationCard from "../components/Elements/Card/Apss";
import Sidebar from "../components/Elements/SideBar/Index";
import LineChart from "../components/Elements/Chart/Index";
import Navbar from "../components/Elements/Navbar/Index";
import UpdateSection from "../components/Elements/Card/Tscard";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken'); // Ambil token dari localStorage
        const data = await getProfileData(token);
        setProfileData(data); // Simpan data profil di state
            const decoded = jwtDecode(token); // Decode token
            setDecodedToken(decoded); // Simpan decoded token di state
    
            // Pengecekan role pengguna sebelum menampilkan data
            if (decoded && (decoded.role !== "admin-instansi" && decoded.role !== "admin-cabang-instansi")) {
              // Redirect ke halaman lain jika role tidak sesuai
              navigate("/dashboard");
              return;
            }
    
            setProfileData(data); // Simpan data profil di state
      } catch (error) {
        setError(error.message || 'Error fetching profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="h-screen flex">
      <Sidebar userRole={decodedToken && decodedToken.role} />
        <div className="flex-1 p-4">
          <h1>Dashboard</h1>
          <div className="flex space-x-4 mt-2 p-1">
            <div className="p-2 mr-4">
              <p>Nama Perangkat</p>
              <p>Smart Meter Lingkar</p>
            </div>
            <div className="p-2 mr-10">
              <p>Lokasi</p>
              <p>Lingkar Selatan</p>
            </div>
            <div className="p-2 ml-5">
              <p>Role </p>
              <p>User Pelanggan</p>
            </div>
          </div>

          {profileData && (
            <div className="mt-6 flex gap-6">
              {/* Application Cards Section */}
              <div className="w-1/5">
                <div className="space-y-4">
                  {profileData.data.user.applications.map((app) => (
                    <ApplicationCard key={app.guidAplication} application={app} className="p-2" />
                  ))}
                </div>
              </div>

              {/* Update Section */}
              <div className="w-4/5">
                <UpdateSection user={profileData.data.user} />
              </div>
            </div>
          )}
          <LineChart/> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
