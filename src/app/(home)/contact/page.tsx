import ContactForm from "@/components/ContactForm";
import React from "react";

function contactPage() {
  return (
<div className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <ContactForm />
      </div>
    </div>
  );
}

export default contactPage;
