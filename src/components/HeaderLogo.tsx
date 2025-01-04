import Link from "next/link";
import Image from "next/image";
import React from "react";
import useLogo from "@/hooks/use-Logo";
import { Loader2 } from "lucide-react";

const HeaderLogo = () => {
  const logo = process.env.NEXT_PUBLIC_APPWRITE_LOGO_HEADER!;
  const { logoUrl, loading } = useLogo(logo, "header");

  if (loading) {
    return <Loader2 size={20} className="w-24 animate-spin text-white"/>;
  }

  if (!logoUrl) {
    return <div className="text-white">Logo not found</div>;
  }

  return (
    <Link href="/">
      <div className="items-center hidden lg:flex focus:outline-none focus:ring-none focus:border-none">
        <Image
          src={logoUrl}
          alt="logo"
          className="outline-none focus:outline-none"
          height={100}
          width={200}
        />
      </div>
    </Link>
  );
};

export default HeaderLogo;
