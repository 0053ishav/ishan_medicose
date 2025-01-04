"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/lib/appwrite"; // Import resetPassword action from appwrite.ts
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!userId || !secret) {
      setMessage("Invalid token or user ID.");
      return;
    }

    setLoading(true);

    try {
      // Call the resetPassword function from appwrite.ts
      await updatePassword(userId, secret, password);

      setMessage("Password has been reset successfully.");
      setTimeout(() => router.push("/sign-in"), 3000); // Redirect to sign-in page after successful reset
    } catch (error) {
      console.error("Password reset error", error);
      setMessage("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex-center size-full max-sm:px-6">
      <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <Image
            src="/Logo/logoPlus.png"
            width={44}
            height={44}
            alt="Ishan Medicose logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            <span className="text-[#398378] mr-1">
            Ishan 
            </span>
            <span className="text-[#2dc8a6]">
              Medicose
              </span>
          </h1>
        </Link>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Reset Password
            </h1>
            <p className="text-16 font-normal text-gray-600">
              Please enter your new password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-center gap-2"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="input p-2 w-full rounded-md"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="input p-2 w-full rounded-md"
              required
            />
            <Button type="submit" onClick={handleSubmit} disabled={loading} className="w-full mt-2">
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          {message && <p>{message}</p>}
        </header>
      </section>
    </section>
  );
};

export default ResetPasswordPage;
