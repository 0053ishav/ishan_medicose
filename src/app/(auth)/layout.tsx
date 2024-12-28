import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      <div className="auth-asset">
        <div>
          <Image
            src="/Logo/logo-no-background.svg"
            width={500}
            height={500}
            alt="Ishan Medicose Logo"
          />
        </div>
      </div>
      {children}
    </main>
  );
}