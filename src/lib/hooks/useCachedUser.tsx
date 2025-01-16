'use client';
import { useState, useEffect } from 'react';
import { getLoggedInUser } from '@/actions/user.actions';
import { parseStringify } from '../utils';

export const useCachedUser = () => {
  const [user, setUser] = useState<{ userId: any; firstName: any; email: any; wish: any; cart: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000;

  const filterUserData = (userData: any) => {
    if (!userData) return null;
    const { userId, firstName, email, wish, cart } = userData;
    return { userId, firstName, email, wish, cart };
  };

  const fetchUser = async () => {
    try {
      let cachedUser = null;
      if (typeof window !== 'undefined') {
        const cachedData = localStorage.getItem('user');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const { expiration, data } = parsedData;


          if (Date.now() < expiration) {
            cachedUser = data;
          } else {
            localStorage.removeItem('user');
          }
        }
      }

      if (cachedUser) {
        setUser(cachedUser);
      } else {
        const userData = await getLoggedInUser();
        const filteredUserData = filterUserData(parseStringify(userData));
        setUser(filteredUserData);

        if (filteredUserData && typeof window !== 'undefined') {
          const cacheData = {
            data: filteredUserData,
            expiration: Date.now() + CACHE_EXPIRATION_MS,
          };
          localStorage.setItem('user', JSON.stringify(cacheData));
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading };
};