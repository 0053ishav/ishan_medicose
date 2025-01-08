const Footer = () => {
    return (
      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-700">About Us</h3>
            <p className="text-gray-600">
              Your trusted online pharmacy providing quality medicines, health products, and professional advice. 
              Serving you with care and convenience.
            </p>
          </div>
  
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-700">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-slate-700 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-slate-700 transition-colors">
                  Email Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-slate-700 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-600 hover:text-slate-700 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
  
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-700">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                📍 Yamunanagar, Haryana - 135001
              </li>
              <li className="text-gray-600">📞 +91 7082606617</li>
              <li className="text-gray-600 text-xs">✉️ enquirywithishanmedicose@gmail.com</li>
            </ul>
          </div>
  
          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-700">Subscribe</h3>
            <p className="text-gray-600 mb-4">
              Sign up for the latest updates and offers directly in your inbox.
            </p>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <button
                type="submit"
                className="w-full bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-300 pt-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Pharmacy Website. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="#"
              className="text-gray-600 hover:text-slate-700 transition-colors"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-slate-700 transition-colors"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 19c11 0 16-9 16-16H5l7 7-7 7z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-slate-700 transition-colors"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.121 14.121A3 3 0 1116.95 11.2 3 3 0 0114.12 14.12z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16.95 11.2a8.001 8.001 0 11-9.9 0M9.88 21.12A8 8 0 1114.12 2.88"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  