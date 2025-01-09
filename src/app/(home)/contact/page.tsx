import ContactForm from "@/components/ContactForm";
import React from "react";

function contactPage() {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-700">Get in Touch With Us</h2>
        <p className="text-muted-foreground text-center mb-10">
          We’re here to help! Whether you have a question about our services, need assistance, or want to provide feedback, feel free to reach out to us. 
          Our team is dedicated to making your experience as smooth as possible.
        </p>
        
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Operating Hours</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg shadow-md p-4">
              <span className="text-indigo-500 text-2xl mr-4">✔</span>
              <p className="text-gray-700 text-left">Address: Yamunanagar, Haryana, 135001</p>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg shadow-md p-4">
              <span className="text-indigo-500 text-2xl mr-4">✔</span>
              <p className="text-gray-700 text-left">Monday to Saturday: 10:00 AM – 10:00 PM</p>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg shadow-md p-4">
              <span className="text-indigo-500 text-2xl mr-4">✔</span>
              <p className="text-gray-700 text-left">Email: enquirywithishanmedicose@gmail.com</p>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg shadow-md p-4">
              <span className="text-indigo-500 text-2xl mr-4">✔</span>
              <p className="text-gray-700 text-left">Sunday: 12:00 PM – 10:00 PM</p>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg shadow-md p-4">
              <span className="text-indigo-500 text-2xl mr-4">✔</span>
              <p className="text-gray-700 text-left">Phone: +917082606617</p>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg shadow-md p-4">
              <span className="text-indigo-500 text-2xl mr-4">✔</span>
              <p className="text-gray-700 text-left">Delivery Available</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default contactPage;
