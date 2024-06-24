import React, { useState } from 'react';
import InputForm from '../Input/Index';

const ApplicationCard = ({ application }) => {
  const [showModal, setShowModal] = useState(false);
  const [literAmount, setLiterAmount] = useState('');
  const [harga, setHarga] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);    
    setLiterAmount('');
    setHarga('');
  };

  const handleSave = () => {
    console.log(`Saving data: ${literAmount} liters, ${harga} price`);
    closeModal();
  };

  return (
    <div className="card bg-secondary border-teal-400 shadow-md text-white text-center p-5">
      <div className="card-body flex flex-col items-center">
        <div className="text-center">
          <h1 className="h6">{application.name}</h1>
          <p className="text-white text-xs"></p>

          <ul className="mt-2 p-4">
            <li className="text-sm font-light"><i className="fad fa-check-double"></i> status: {application.isActive ? "Active" : "Inactive"}</li>
            <li className="text-sm font-light"><i className="fad fa-check-double"></i> saldo: 100K</li>
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={openModal}
          type="button"
          className="mr-4 px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm">
        + Saldo
        </button>
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
            <div className="text-start">
              <h1 className="text-lg text-primary font-medium mb-2">Tambah Saldo</h1>
              <p className='text-gray-500 text-sm'>Masukan Detail Pesanan untuk Memesan</p>
              <div className="mb-4 mt-5">                
                <InputForm
                  type="number"
                  label="jumlah liter"
                  id="literAmount"
                  name="literAmount"
                  value={literAmount}
                  onChange={(e) => setLiterAmount(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="mb-4">
                
                <InputForm
                  type="number"
                  label="harga"
                  id="harga"
                  name="harga"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
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

export default ApplicationCard;
