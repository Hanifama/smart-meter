import React, { useState } from 'react';
import Button from '../Button/Index';

const DeviceTable = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    registrationDate: '',
    status: 'Active' // Default status
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset form fields when modal is closed
    setNewDevice({
      name: '',
      registrationDate: '',
      status: 'Active'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice({
      ...newDevice,
      [name]: value
    });
  };

  const handleSave = () => {
    // Handle saving new device (e.g., send to backend)
    console.log('Saving new device:', newDevice);
    // Close modal after saving
    closeModal();
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Daftar Perangkat</h2>
        <button 
          onClick={openModal}
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
        >
          Tambah Data
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Nama Perangkat</th>
              <th className="border px-4 py-2 text-left">Tanggal Pendaftaran</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((device, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{device.name}</td>
                <td className="border px-4 py-2">{device.registrationDate}</td>
                <td className="border px-4 py-2 flex items-center">
                  {device.status === 'Active' ? (
                    <div className="rounded-full w-3 h-3 bg-green-500 mr-2"></div>
                  ) : (
                    <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
                  )}
                  <span>{device.status}</span>
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 ml-2 rounded hover:bg-red-700">Delete</button>
                  <button className="bg-gray-500 text-white px-2 py-1 ml-2 rounded hover:bg-gray-700">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-75 transition-opacity"></div>
          <div className="absolute bg-white rounded-lg p-8 max-w-md transform transition-transform duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="text-center">
              <h1 className="text-lg text-primary font-medium mb-4">Tambah Perangkat Baru</h1>
              
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={newDevice.name}
                  onChange={handleInputChange}
                  placeholder="Nama Perangkat"
                  className="input-field"
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="date"
                  name="registrationDate"
                  value={newDevice.registrationDate}
                  onChange={handleInputChange}
                  placeholder="Tanggal Pendaftaran"
                  className="input-field"
                />
              </div>
              
              <div className="mb-4">
                <select
                  name="status"
                  value={newDevice.status}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleSave}
                  type="button"
                  className="mr-4 px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
                >
                  Simpan
                </button>
                
                <button
                  onClick={closeModal}
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:text-sm"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceTable;
