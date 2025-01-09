import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Ishan Medicose?",
      answer:
        "Ishan Medicose is your trusted online pharmacy providing quality medicines, health products, and professional advice. We aim to serve you with care and convenience.",
    },
    {
      question: "How can I place an order?",
      answer:
        "You can place an order by browsing our product catalog, adding items to your cart, and completing the checkout process. For assistance, feel free to contact us.",
    },
    {
      question: "Do you offer home delivery?",
      answer:
        "Yes, we provide home delivery for all our products. Delivery times may vary based on your location.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept a variety of payment methods, including credit/debit cards, UPI, net banking, and cash on delivery (COD) for selected locations.",
    },
    {
      question: "Are the medicines authentic?",
      answer:
        "Absolutely! We source our medicines directly from certified distributors and manufacturers to ensure authenticity and quality.",
    },
    {
      question: "Can I return or exchange a product?",
      answer:
        "Yes, you can return or exchange products under our return policy. Returns are accepted for unopened and undamaged products within 7 days of delivery.",
    },
    {
      question: "Do I need a prescription to buy medicines?",
      answer:
        "Yes, for prescription medications, you need to upload a valid prescription during checkout. Our team will verify it before processing your order.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach us via email at enquirywithishanmedicose@gmail.com or call us at +91 7082606617. We're happy to assist you!",
    },
    {
      question: "Do you offer discounts or promotions?",
      answer:
        "Yes, we regularly offer discounts and promotional offers. Subscribe to our newsletter to stay updated.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we prioritize your privacy and security. All personal information is securely stored and processed in compliance with applicable regulations.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-slate-700 mb-8">
        Frequently Asked Questions (FAQ)
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold text-slate-700 mb-2">
              {faq.question}
            </h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
