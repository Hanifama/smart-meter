import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserByCompany = () => {
    const [profileData, setProfileData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const getProfileData = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('https://sso.pptik.id/api/v1/users/company', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const responseData = await response.json();
                setProfileData(responseData);
            } else {
                setError('Failed to fetch profile data');
            }
        } catch (error) {
            setError('Error fetching profile data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    // Menampilkan data objek pengguna di console sebelum ditampilkan di UI
    useEffect(() => {
        console.log('Profile Data:', profileData);
    }, [profileData]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Users by Company</h2>
            <ul>
                {/* Tampilkan pengguna di sini */}
                {Array.isArray(profileData) && profileData.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserByCompany;
