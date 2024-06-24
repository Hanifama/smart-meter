import React, { useEffect, useState } from "react";
import { getProfileData } from "../server/index";
import UserProfileCard from "../components/Elements/Card/UserProfile";
import ApplicationCard from "../components/Elements/Card/Apss";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Elements/SideBar/Index";
import LineChart from "../components/Elements/Chart/Index";
import Company from "./company";
import Navbar from "../components/Elements/Navbar/Index";
import UpdateSection from "../components/Elements/Card/Tscard";
import MapComponent from "../components/Fragments/MapUser";

const Dashboard4 = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const data = await getProfileData(token);
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
                <Sidebar />

                <Company />
                <MapComponent/>

            </div>
        </div>
    );
};

export default Dashboard4;
