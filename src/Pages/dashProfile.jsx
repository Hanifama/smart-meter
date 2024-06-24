import React, { useEffect, useState } from "react";
import { getProfileData } from "../server/index";
import UserProfileCard from "../components/Elements/Card/UserProfile";
import Sidebar from "../components/Elements/SideBar/Index";
import Navbar from "../components/Elements/Navbar/Index";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken'); 
        const data = await getProfileData(token);
        setProfileData(data);
        const decoded = jwtDecode(token);
        setDecodedToken(decoded); 

        
        if (decoded && (decoded.role !== "admin-instansi" && decoded.role !== "admin-cabang-instansi")) {          
          navigate("/dashboard/profile");
          return;
        }

        setProfileData(data); 
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
        {profileData && (
          <UserProfileCard user={profileData.data.user} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
