import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="flex flex-col md:flex-row items-center mb-12">
        <div className="md:w-1/2 flex justify-center md:justify-start mb-6 md:mb-0">
          <Image
            src="/Logo/logo-no-background.svg"
            width={500}
            height={500}
            alt="Ishan Medicose Logo"
          />
        </div>

        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-semibold text-slate-800 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Ishan Medicose</strong> is your trusted online pharmacy,
            providing high-quality medicines, health products, and professional
            healthcare advice. We aim to serve our customers with care and
            convenience, ensuring you receive the best healthcare products at
            competitive prices.
          </p>
          <p className="text-lg text-gray-700">
            With years of experience, we strive to make healthcare accessible
            and affordable for everyone. Whether you're looking for prescription
            medications, over-the-counter products, or wellness supplements,
            we've got you covered.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-12 mb-12">
        <h2 className="text-3xl font-semibold text-slate-800 text-center mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
          At <strong>Ishan Medicose</strong>, our mission is to provide our
          customers with reliable, affordable, and convenient access to health
          products and services. We believe that everyone deserves access to
          quality healthcare, and we work hard to make it available to all
          through our online pharmacy.
        </p>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-semibold text-slate-800 text-center mb-6">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">
              Quality Products
            </h3>
            <p className="text-gray-700">
              We provide only the highest quality medicines and health products,
              sourced from trusted brands and manufacturers.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">
              Expert Advice
            </h3>
            <p className="text-gray-700">
              Our team of experienced pharmacists is always available to offer
              professional advice and guidance on the use of health products.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">
              Fast & Reliable Delivery
            </h3>
            <p className="text-gray-700">
              We offer fast and reliable delivery services, ensuring your health
              products reach you in a timely and secure manner.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 mb-12">
        <h2 className="text-3xl font-semibold text-slate-800 text-center mb-6">
          Our Values
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-6">
          At <strong>Ishan Medicose</strong>, we are guided by our core values
          of integrity, transparency, and customer satisfaction. We believe in
          building lasting relationships with our customers by offering
          high-quality products, transparent pricing, and excellent customer
          service.
        </p>
        <ul className="list-disc pl-8 text-gray-700 max-w-3xl mx-auto">
          <li className="mb-3">
            Customer-Centric: Our customers are our top priority, and we always
            aim to meet their needs.
          </li>
          <li className="mb-3">
            Integrity: We conduct our business with the highest standards of
            ethics and integrity.
          </li>
          <li className="mb-3">
            Innovation: We constantly explore new ways to improve our services
            and meet the evolving needs of our customers.
          </li>
          <li className="mb-3">
            Community Focused: We are committed to giving back to the community
            by supporting health initiatives and causes.
          </li>
        </ul>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-semibold text-slate-800 text-center mb-6">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-6">
          If you have any questions or need assistance, feel free to reach out
          to us. We are here to help!
        </p>
        <div className="text-center">
          <p className="text-lg text-gray-700">
            📞{" "}
            <a
              href="tel:+917082606617"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              {" "}
              +91 7082606617
            </a>
          </p>
          <p className="text-lg text-gray-700">
            ✉️{" "}
            <a
              href="mailto:enquirywithishanmedicose@gmail.com"
              className="text-slate-700 hover:text-slate-800"
            >
              enquirywithishanmedicose@gmail.com
            </a>
          </p>
          <p className="text-lg text-gray-700">
            📍{" "}
            <a
              href="https://maps.app.goo.gl/3XGmrCJQEQV1K2eq8"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Yamunanagar, Haryana - 135001
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;