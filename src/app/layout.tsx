import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/lib/hooks/use-CartContext";
import { CartSheetProvider } from "@/lib/hooks/use-CartSheetProvider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ishan Medicose",
  description: "Pharmacy Ishan Medicose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >

        <CartProvider>
        <CartSheetProvider>
          {children}
        </CartSheetProvider>
        </CartProvider> 
      </body>
    </html>
  );
}
