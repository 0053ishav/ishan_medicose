import React from "react";
import { Button } from "@/components/ui/button";

const AlertModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="flex flex-col justify-between">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-3 text-center text-gray-600">Notification</h2>
            <p className="text-lg text-gray-600 text-center">{message}</p>
          </div>
          <Button
            onClick={handleClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out mt-4"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;