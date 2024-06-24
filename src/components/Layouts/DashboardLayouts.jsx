// /src/components/layouts/DashboardLayouts.jsx

import React from "react";
import Navbar from "../Elements/Navbar/Index";
import Sidebar from "../Elements/SideBar/Index";

const DashboardLayouts = ({ children, type }) => {
  const dashboardComponents = {
    dashboard1: (
      <div className="flex h-screen justify-center items-center w-full relative">
        <Navbar />
        <div className="h-screen flex">
        <Sidebar />

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
          <div className="flex-1 p-4">
          <h1>Dashboard 1</h1>
          {children}
        </div>
        </div>
      </div>
    ),
    dashboard2: (
      <div className="flex h-screen justify-center items-center w-full relative">
        <Navbar />
        <Sidebar />
        <div className="flex-1 p-4">
          <h1>Dashboard 2</h1>
          {children}
        </div>
      </div>
    ),
    dashboard3: (
      <div className="flex h-screen justify-center items-center w-full relative">
        <Navbar />
        <Sidebar />
        <div className="flex-1 p-4">
          <h1>Dashboard 3</h1>
          {children}
        </div>
      </div>
    ),
    dashboard4: (
      <div className="flex h-screen justify-center items-center w-full relative">
        <Navbar />
        <Sidebar />
        <div className="flex-1 p-4">
          <h1>Dashboard 4</h1>
          {children}
        </div>
      </div>
    ),
  };

  const selectedDashboard = dashboardComponents[type] || <div>Invalid Dashboard Type</div>;

  return selectedDashboard;
};

export default DashboardLayouts;
