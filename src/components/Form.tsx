'use client';
import React, { useState } from "react";
import confetti from "canvas-confetti";
import AlertModal from "@/components/AlertModal";

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  rows?: number;
}

interface ReusableFormProps {
  fields: FormField[];
  onSubmit: (formData: any) => void;
  loading: boolean;
  successMessage?: string;
  errorMessage?: string;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  onSubmit,
  loading,
  successMessage,
  errorMessage,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [clickCount, setClickCount] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClick = () => {
    if (clickCount < 4) {
      setClickCount((prev) => prev + 1);
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          zIndex: 100,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          zIndex: 100,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }

    if (clickCount === 4) {
      setIsTimeout(true);
      setTimeout(() => {
        setIsTimeout(false);
        setClickCount(0);
      }, 5000);
    }
  };

  const handleWhatsAppClick = () => {
    const whatsappURL = process.env.NEXT_PUBLIC_MOBILE_NUMBER;

    if (whatsappURL) {
      window.open(whatsappURL, "_blank");
    } else {
      setModalMessage("Unable to open WhatsApp chat. Please try again later.");
      setShowModal(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-300 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        {successMessage && (
          <div className="text-green-600 text-center mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-md font-medium text-gray-700"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                rows={field.rows || 4}
                required={field.required}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-pharma-emerald"
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                required={field.required}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-pharma-emerald"
              />
            )}
          </div>
        ))}
        <div className="flex justify-between z-50 relative">
          <button
            className="bg-white fill-foreground p-2 rounded-md shadow-lg cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-inner"
            aria-label="Chat on WhatsApp"
            onClick={handleWhatsAppClick}
          >
            <img
              alt="Chat on WhatsApp"
              src="/whatsapp.png"
              className="w-6 h-6"
            />
          </button>

          <button
            onClick={handleClick}
            className={`bg-white fill-foreground p-2 rounded-md shadow-lg cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-inner -rotate-90 ${
              isTimeout ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
            disabled={isTimeout}
          >
            🎉
          </button>

          {isTimeout && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg">
              Please wait...
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-2 mt-4 text-white font-semibold rounded-lg ${
              loading ? "bg-gray-400" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "Sending..." : "Email Us"}
          </button>
        </div>
      </form>

      {showModal && (
        <AlertModal
          title="Error"
          message={modalMessage}
          onClose={() => setShowModal(false)}
          isOpen={showModal}
        />
      )}
    </div>
  );
};

export default ReusableForm;