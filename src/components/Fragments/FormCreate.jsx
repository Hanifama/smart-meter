import React, { useState, useEffect } from 'react';
import { Alert } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputForm from '../Elements/Input/Index';
import Button from '../Elements/Button/Index';
import { jwtDecode } from 'jwt-decode';

const UserFormCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: '',
        guidAplication: '',
        companyGuid: '',
        guid: ''
    });

    const roles = [
        {
            id: 1,
            name: "Super Admin",
            value: "superAdmin"
        },
        {
            id: 2,
            name: "Admin Instansi",
            value: "admin-instansi"
        },
        {
            id: 3,
            name: "Admin Cabang Instansi",
            value: "admin-cabang-instansi"
        },
        {
            id: 4,
            name: "User Pelanggan",
            value: "user-pelanggan"
        },
        {
            id: 5,
            name: "User Umum",
            value: "user-umum"
        },
    ];

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [decodedToken, setDecodedToken] = useState(null);

    function generateUUID() {
        return 'USER-' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    useEffect(() => {
        
        const token = localStorage.getItem('userToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            
            setDecodedToken(decodedToken);
            
            setFormData(prevState => ({
                ...prevState,
                guidAplication: decodedToken.guidAplication,
                companyGuid: decodedToken.companyGuid,
                guid: generateUUID()
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try {
            const response = await axios.post('https://sso.pptik.id/api/v1/users/add', formData);
            console.log('Data successfully submitted:', response.data);

            if (response.data.success) {
                setSuccess(true);
                setError('');
            } else {
                console.error('Invalid server response:', response.data);
                setError(response.data.message || 'Invalid server response.');
                setSuccess(false);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error submitting data:', error.response.data);
                setError(error.response.data.message || 'Error submitting data.');
            } else {
                console.error('Error submitting data:', error);
                setError('Error submitting data.');
            }
            setSuccess(false);
        }
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate('/company');
            }, 3000); // 3000ms = 3 detik
        }
    }, [success, navigate]);

    return (
        <div>
            {decodedToken && (
                <div>
                    <h2>Token Data:</h2>
                    <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto max-w-lg mt-8">
                <h1 className="text-2xl items-center font-bold mb-4">Silakan tambahkan pengguna baru</h1>
                {error && <Alert color="red">{error}</Alert>}
                {success && <Alert color="green">Data User berhasil ditambah!</Alert>}
                <div>
                    <InputForm label="Name" name="name" value={formData.name} onChange={handleChange} required />
                    <InputForm label="Email" name="email" value={formData.email} onChange={handleChange} type="email" required />
                    <InputForm label="Password" name="password" value={formData.password} onChange={handleChange} required />
                    <InputForm label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    <div className="mb-4">
                        <select name="role" value={formData.role} onChange={handleChange} required>
                            <option value="">Select Role</option>
                            {roles.map(role => (
                                <option key={role.value} value={role.value}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <Button type="submit" variant="bg-blue-400">Tambah</Button>
            </form>
        </div>
    );
};

export default UserFormCreate;
