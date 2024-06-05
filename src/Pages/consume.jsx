import React, { useEffect, useState } from 'react';
import ProfileCard from './User';
import Loader from '../components/Elements/Loader/Index';

const IndexUser = () => {
  const user = {
    name: "Test User",
    username: "Testtt",
    email: "Test@example.com",
    phone: "123-456-7890",
    website: "www.example.com",
    company: {
      name: "Jayaa Jayaa Jayaa",
      catchPhrase: "Lorem ipsum dolor sit amet",
      bs: "lorem ipsum dolor sit amet"
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        // Tampilkan konten sesuai kebutuhan setelah proses loading selesai      
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-5 text-center">User Profile</h1>
          <ProfileCard {...user} />
        </div>
      )}
    </>

  );
};

export default IndexUser;
