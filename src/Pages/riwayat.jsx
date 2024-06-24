import React, { useEffect, useState } from "react";
import { getProfileData } from "../server/index";
import ApplicationCard from "../components/Elements/Card/Apss";
import Sidebar from "../components/Elements/SideBar/Index";
import LineChart from "../components/Elements/Chart/Index";
import Navbar from "../components/Elements/Navbar/Index";
import UpdateSection from "../components/Elements/Card/Tscard";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Riwayat = () => {
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
                    navigate("/dashboard/riwayat");
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

                {profileData && (


                    <div className="p-4">
                        <UpdateSection user={profileData.data.user} />
                    </div>

                )}
            </div>
        </div>
    );
};

export default Riwayat;
