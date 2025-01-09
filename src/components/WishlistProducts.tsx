'use client';

import { useEffect, useState } from 'react';
import { fetchUserWishlist, updateWishlist } from '@/lib/appwrite';
import { fetchProductsByIds } from '@/lib/appwrite';
import { ProductCart } from '@/types';
import { getLoggedInUser } from '@/actions/user.actions';
import { Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const WishlistPage = () => {
  const [products, setProducts] = useState<ProductCart[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedInUser = await getLoggedInUser();

        if (loggedInUser) {
          setUserId(loggedInUser.$id);
          const wishlistData = await fetchUserWishlist(loggedInUser.$id);
          const productDetails = await fetchProductsByIds(wishlistData);
          setProducts(productDetails);
        } else {
          setError('User not logged in.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch wishlist.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 size={30} className='text-gray-500 animate-spin'/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

   const removeFromWishlist = async (product: any) => {
    try {
      await updateWishlist(product.$id, false);
      setProducts((prevProducts) =>
        prevProducts?.filter((p) => p.$id !== product.$id) || []
      );
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };


    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-8">Your Wishlist</h1>
  
        {products && products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 text-lg text-center">
              Your wishlist is empty! 💖
            </p>
            <button
              onClick={() => console.log("Navigate to shopping page")}
              className="mt-4 px-6 py-2 bg-pharma-emerald text-white rounded-md hover:bg-pharma-emerald-dark"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <li
                  key={product.$id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm"
                >

                  <div className='flex flex-row'   onClick={() =>  router.push(`/product/${product.$id}`)}>

                  <img
                    src={product.imageUrl || '/file_not_found.jpg'}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <p className="text-gray-700 font-medium">{product.name}</p>
                    <p className="text-gray-500 text-sm">
                      <span className="text-gray-500 text-sm line-through mr-2">₹{product.price}</span>
                      ₹{product.discountedPrice}
                    </p>
                  </div>
                    </div>

                  <div>
                  <button
                    onClick={() => removeFromWishlist(product)}
                    className="text-red-500 hover:text-red-600 text-sm"
                    >
                    <X/>
                  </button>
                    </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );  
};

export default WishlistPage;