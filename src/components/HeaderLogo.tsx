import Link from "next/link";
import Image from "next/image";
import React from "react";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex focus:outline-none focus:ring-none focus:border-none">
        <Image
          src="/Logo/logo-white.png"
          className="outline-none focus:outline-none"
          height={100}
          width={200}
          alt="logo"
        />
      </div>
    </Link>
  );
};

export default HeaderLogo;