"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { newsletterSubscription } from "@/lib/appwrite";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please provide a valid email address.");
      return;
    }
    try {
      const result = await newsletterSubscription(email, "subscribe");

      if (result.success) {
        setMessage(result.message);
        setEmail("");
      } else {
        setMessage(result.message || "An error occured. Please try again.");
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-700">
            About Us
          </h3>
          <p className="text-gray-600">
            Your trusted online pharmacy providing quality medicines, health
            products, and professional advice. Serving you with care and
            convenience.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-700">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/about"
                className="text-gray-600 hover:text-slate-700 transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-600 hover:text-slate-700 transition-colors"
              >
                Email Us
              </a>
            </li>
            <li>
              <a
                href="/faq"
                className="text-gray-600 hover:text-slate-700 transition-colors"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="text-gray-600 hover:text-slate-700 transition-colors"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-700">
            Contact Us
          </h3>
          <ul className="space-y-2">
            <li className="text-gray-600 cursor-pointer">
              📍{" "}
              <a
                href="https://maps.app.goo.gl/3XGmrCJQEQV1K2eq8"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                Yamunanagar, Haryana - 135001
              </a>
            </li>
            <li className="text-gray-600">
              📞{" "}
              <a
                href="tel:+917082606617"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                +91 7082606617
              </a>
            </li>
            <li className="text-gray-600 text-xs cursor-pointer">
              ✉️{" "}
              <a href="mailto:enquirywithishanmedicose@gmail.com">
                enquirywithishanmedicose@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-700">
            Subscribe
          </h3>
          <p className="text-gray-600 mb-4">
            Sign up for the latest updates and offers directly in your inbox.
          </p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors"
            >
              Subscribe
            </Button>
            {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
          </form>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Ishan Medicose. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://www.instagram.com/ishan.medicose"
            target="_blank"
            className="text-gray-600 hover:text-slate-700 transition-colors"
            aria-label="Instagram"
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios/50/instagram-new--v1.png"
              alt="instagram"
            />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_MOBILE_NUMBER}
            target="_blank"
            className="text-gray-600 hover:text-slate-700 transition-colors"
            aria-label="Whatsapp"
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios/50/whatsapp--v1.png"
              alt="instagram"
            />
          </a>
        </div>
      </div>
      <div className="md:hidden h-12"></div>
    </footer>
  );
};

export default Footer;