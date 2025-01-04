"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/actions/user.actions";
import { useToast } from "@/hooks/use-toast";


const AuthForm = ({ type }: { type: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setEmailError(null);
    try {
      // sign up with appwrite and create payment gateway link token

      if (type === "sign-up") {
        try {
          const userData = {
            firstName: data.firstName!,
            lastName: data.lastName!,
            address: data.address!,
            city: data.city!,
            state: data.state!,
            postalCode: data.postalCode!,
            dateOfBirth: data.dateOfBirth!,
            email: data.email,
            password: data.password,
          };
          await signUp(userData);

          router.push("/sign-in");
        } catch (error: any) {
          if (error.message.includes("already registered")) {
            setEmailError(error.message);
          } else {
            console.error("Error during authentication:", error);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response.flag) {
          router.push("/");
        } else {
          toast({
            title: "Sign In Failed",
            description: response.error,
            variant: "destructive",
          });
        }

      }
    } catch (error) {
      console.error("Error during authentication: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <h1 className="text-24 lg:text-36 font-semibold text-black-1">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Please enter your details
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type === "sign-up" && (
            <>
              <div className="flex gap-4">
                <CustomInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />

                <CustomInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </div>

              <CustomInput
                control={form.control}
                name="address"
                label="Address"
                placeholder="Enter your specific address"
              />

              <CustomInput
                control={form.control}
                name="city"
                label="City"
                placeholder="Enter your city"
              />

              <div className="flex gap-4">
                <CustomInput
                  control={form.control}
                  name="state"
                  label="State"
                  placeholder="ex: Chandigarh"
                />

                <CustomInput
                  control={form.control}
                  name="postalCode"
                  label="Postal Code"
                  placeholder="ex: 160017"
                />
              </div>
              <div className="flex gap-4">
                <CustomInput
                  control={form.control}
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </>
          )}

          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
          {type != 'sign-up' && (
            <p className="text-slate-700"><Link href="/forgot-password">Forgot Password?</Link></p>
          )}
          <div className="flex flex-col gap-4">
            <Button type="submit" className="form-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : type === "sign-in" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          {type === "sign-in"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        <Link
          href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          className="form-link"
        >
          {type === "sign-in" ? "Sign Up" : "Sign In"}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;