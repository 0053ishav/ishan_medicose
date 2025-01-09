"use client";

import React, { useEffect, useState } from "react";
import { fetchAnnouncement } from "@/lib/appwrite";

const AnnouncementBar = ({
  onHeightChange,
}: {
  onHeightChange: (height: number) => void;
}) => {
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const loadAnnouncement = async () => {
    try {
      const activeAnnouncement = await fetchAnnouncement();
      if (activeAnnouncement) {
        setAnnouncement(activeAnnouncement.message);
        setIsVisible(true);
      }
    } catch (error) {
      console.error("Error loading announcement:", error);
    }
  };

  useEffect(() => {
    loadAnnouncement();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const bar = document.getElementById("announcement-bar");
      if (bar) {
        onHeightChange(bar.offsetHeight);
      }
    } else {
      onHeightChange(0);
    }
  }, [isVisible, onHeightChange]);

  return (
    isVisible && (
      <div
        id="announcement-bar"
        className="fixed top-0 left-0 w-full bg-green-600 z-50 text-white transition-transform duration-500"
      >
        <div className="py-2 flex justify-between items-center px-4 ">
          <div className="flex-1 text-center">
            <span>{announcement}</span>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="text-sm bg-green-800 px-2 py-1 rounded hover:bg-green-500"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default AnnouncementBar;