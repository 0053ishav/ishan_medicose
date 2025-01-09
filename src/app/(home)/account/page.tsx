"use client";
import { getLoggedInUser } from "@/actions/user.actions";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AccountPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getLoggedInUser();
      setUser(userData);
    };
    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <p className="text-center text-gray-500">
          <Loader2 className="animate-spin" />
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Account Details
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={user.firstName}
              readOnly
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={user.lastName || "Not Provided"}
              readOnly
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            value={user.phone || "Not Provided"}
            readOnly
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="text"
            value={user.dateOfBirth}
            readOnly
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Address</label>
          <textarea
            value={user.address}
            readOnly
            rows={3}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={user.city}
              readOnly
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              value={user.state}
              readOnly
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            type="text"
            value={user.postalCode}
            readOnly
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
          />
        </div>
        <p className="text-slate-700 flex justify-center items-center">
          <Link href="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default AccountPage;