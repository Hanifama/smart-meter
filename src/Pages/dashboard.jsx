import React from "react";

const Dashboard = ({ userProfile }) => {
  return (
    <div className="flex h-screen justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center bg-white shadow-2xl h-3/4 w-4/5 relative rounded-3xl">
        <h1 className="text-blue-600 text-3xl font-bold mt-5 mb-2">Hallo Dashboard</h1>
        {userProfile && (
          <div className="text-center mt-4">
            <p className="text-gray-600">Selamat datang, {userProfile.fullName}!</p>
            <p className="text-gray-600">Email: {userProfile.email}</p>
            {/* Tambahkan informasi dasar lainnya sesuai kebutuhan */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
