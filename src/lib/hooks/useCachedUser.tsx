'use client'
import { useState, useEffect } from "react";
import { getLoggedInUser } from "@/actions/user.actions";
import { parseStringify } from "../utils";

export const useCachedUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let cachedUser = null;
        if (typeof window !== "undefined") {
          cachedUser = localStorage.getItem("user");
        }
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        } else {
          const userData = await getLoggedInUser();
          setUser(parseStringify(userData));

          if (userData && typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(userData));
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};