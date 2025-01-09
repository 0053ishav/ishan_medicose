"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMedia } from "react-use";
import NavButton from "@/components/NavButton";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, MenuIcon } from "lucide-react";
import Image from "next/image";
import useLogo from "@/hooks/use-Logo";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/product",
    label: "Products",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const logo = process.env.NEXT_PUBLIC_APPWRITE_LOGO_AUTH_MOBILE_NAVIGATION!;
  const { logoUrl, loading } = useLogo(logo, "nav");
  
  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };
  if (isMobile) {

    if (loading) {
      return <Loader2 size={20} className="w-24 animate-spin text-white"/>;
    }
  if (!logoUrl) {
    return <div className="text-white">Logo not found</div>;
  }
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <span className="inline-flex items-center">
              <MenuIcon className="size-4" />
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <SheetTitle>
          <Image
            src={logoUrl}
            alt="Ishan Medicose logo"
            width={200}
            height={200}
           />
          </SheetTitle>
          <SheetDescription>
          </SheetDescription>
          {/* <SheetHeader> */}

          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "success" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};

export default Navigation;