'use client'
import React, { useState } from "react";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import BottomNavigation from "@/components/BottomNavigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const [announcementHeight, setAnnouncementHeight] = useState(0);

  return (
    <>
      <AnnouncementBar onHeightChange={setAnnouncementHeight} />
      <div style={{ marginTop: `${announcementHeight}px` }} className="transition-all duration-300">
        <Header />
        <main className="px-3 lg:px-14 bg-gray-50">
          <Toaster />
          {children}
        </main>
        <BottomNavigation />
        <Footer/>
      </div>
    </>
  );
};

export default DashboardLayout;
