import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

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
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
