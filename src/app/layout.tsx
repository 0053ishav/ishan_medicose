import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/hooks/use-CartContext";
import { CartSheetProvider } from "@/lib/hooks/use-CartSheetProvider";
import { WishlistProvider } from "@/components/WishlistContext";

export const metadata: Metadata = {
  title: "Ishan Medicose",
  description: "Pharmacy Ishan Medicose",
  icons:{ 
    icon: [
      '/favicon_ioPlus/favicon.ico?v=4',
    ],
    apple: [
      '/favicon_ioPlus/apple-touch-icon.png?v=4',
    ],
    shortcut: [
      '/favicon_ioPlus/apple-touch-icon.png'
    ]
},
  manifest: '/favicon_ioPlus/site.webmanifest'
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans bg-gray-50 antialiased"
      >

        <WishlistProvider>
        <CartProvider>
        <CartSheetProvider>
          {children}
        </CartSheetProvider>
        </CartProvider> 
          </WishlistProvider>
      </body>
    </html>
  );
}
