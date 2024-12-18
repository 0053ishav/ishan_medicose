"use client";

import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import ReusableForm from "./Form";
import AlertModal from "./AlertModal"
import getUnsplashImage from "@/lib/unsplashApi";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(null); // State to hold the image URL

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      const image = await getUnsplashImage("pharmacy"); 
      setBackgroundImageUrl(image);
    };

    fetchBackgroundImage();
  }, []);



  const fields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "subject", label: "Subject", type: "text" },
    { name: "message", label: "Message", type: "textarea", required: true, rows: 4, },
  ];

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setSuccess(false)

    const templateParams = {
      from_name: formData.name,
      to_name: "Ishan Medicose",
      to_email: "ishanmedicose8684@gmail.com",
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const result = await emailjs.send(
        "service_kpbzm3d",
        "template_r6dncle",
        templateParams,
        "YGj73JeqXFcvpfQJU"
      );
      console.log("Email sent successfully:", result);
      setSuccessMessage(
        "Thank you for contacting us! We will get back to you soon."
      );
      setSuccess(true);
      setShowModal(true)
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Something went wrong. Please try again later.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="py-10 bg-gradient-to-tr from-emerald-500 via-transparent to-pharma-emerald">
      <div className="container mx-auto px-4 flex gap-4">

        <div
          className="flex-1 bg-cover bg-center rounded-lg shadow-md"
          style={{ backgroundImage: `url(${backgroundImageUrl})`, height: "400px" }}
        />

        <div
          className="flex-none w-full md:w-1/2 bg-white bg-opacity-80 rounded-lg shadow-xl py-10 px-6 relative z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >

          <ReusableForm
            fields={fields}
            onSubmit={handleSubmit}
            loading={loading}
            successMessage={successMessage!}
            errorMessage={errorMessage!}
          />
        </div>

        <div
          className="flex-1 bg-cover bg-center rounded-lg shadow-md"
          style={{ backgroundImage: `url(${backgroundImageUrl})`, height: "400px" }}
        />
      </div>

      <AlertModal
        isOpen={showModal}
        message={
          loading
            ? "Sending your message... Please wait."
            : success
            ? "Your message has been sent! We'll get back to you soon."
            : "Oops! There was an issue sending your message. Please try again."
        }
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};
  
export default ContactForm;
