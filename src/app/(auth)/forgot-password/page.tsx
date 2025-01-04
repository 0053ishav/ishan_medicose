'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { resetPassword } from "@/lib/appwrite";
import Image from "next/image";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await resetPassword(email);
      
      if (response) {
        setMessage("A password reset link has been sent to your email.");
        setTimeout(() => router.push("/sign-in"), 3000);
      }
    } catch (error) {
            setMessage("Error occurred. Please try again. Check your email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='flex-center size-full max-sm:px-6'>
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
      Forgot Password
      </h1>
      <p className="text-16 font-normal text-gray-600">Please enter your email address to receive a password reset link.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-between items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input p-2 w-full"
          required
        />
      </form>
        <Button type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? <Loader2 size={20} className="animate-spin" /> : "Send Reset Link"}
        </Button>

      {message && <p>{message}</p>}
        </header>
    </section>
        </section>
  );
};

export default ForgotPasswordPage;
