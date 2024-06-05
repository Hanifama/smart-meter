import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-75 transition-opacity"></div>
          <div
            className="absolute bg-white rounded-lg p-8 max-w-md transform transition-transform duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="text-center">
              {children}
            </div>
            <div className="mt-6">
              <button
                onClick={onClose}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
