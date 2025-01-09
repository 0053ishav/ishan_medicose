'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-CartContext';
import { useCartSheet } from '@/hooks/use-CartSheetProvider';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CartSheet = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { isCartOpen, closeCart } = useCartSheet();

  const [couponCode, setCouponCode] = useState<string>('');
  // const [discount, setDiscount] = useState<number>(0);
  // const [error, setError] = useState<string>('');

  // // Handle coupon code validation
  // const handleApplyCoupon = () => {
  //   if (couponCode === 'DISCOUNT10') {
  //     setDiscount(10);
  //     setError('');
  //   } else if (couponCode === 'DISCOUNT20') {
  //     setDiscount(20);
  //     setError('');
  //   } else {
  //     setDiscount(0);
  //     setError('Invalid coupon code.');
  //   }
  // };

  const total = cart.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);
  
  const router = useRouter();

  const handleCheckout= () => {
    alert('Proceed to checkout')
    router.push("/checkout");
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="bg-white shadow-lg rounded-lg p-4 overflow-auto">
        <SheetTitle className="text-xl font-semibold text-gray-800">
          Your Cart
        </SheetTitle>
        <SheetDescription className='text-xs'>
        Review the items in your cart before proceeding. Adjust quantities or remove items as needed, and click "Checkout" when you're ready to complete your order.
        </SheetDescription>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 text-center text-lg">
              Your cart is empty! 🛒
            </p>
            <button
              onClick={closeCart}
              className="mt-4 px-6 py-2 bg-pharma-emerald text-white rounded-md hover:bg-pharma-emerald-dark"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            {/* Cart Items */}
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm"
                  onClick={() =>  router.push(`/product/${item.id}`)}
                >
                  <div className="flex items-center">
                    <img
                      src={item.imageUrl || '/file_not_found.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <p className="text-gray-700 font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                      <span className="text-gray-500 text-sm line-through mr-2">
                        ₹{item.price}
                      </span>
                        ₹{item.discountedPrice} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Coupon Code Section */}
            {/* <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleApplyCoupon}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Apply Coupon
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div> */}

            {/* Total Section */}
            <div className="space-y-2">
              <div className="flex justify-between text-black">
                <span>Subtotal:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <span className='text-sm text-muted-foreground'>Shipping and taxes calculated at checkout.</span>
              {/* {discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount:</span>
                  <span>- {discount}%</span>
                </div>
              )} */}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCheckout}
                className="w-full py-2 bg-pharma-emerald text-white rounded-md hover:bg-pharma-emerald-dark"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
            <div className='flex items-center justify-center cursor-pointer'>
              <span className='text-muted-foreground'>or</span>
              <div onClick={closeCart} className='flex flow-row'>
              <span className='text-pharma-emerald ml-2'>Continue Shopping</span>
              <ArrowRight className='text-pharma-emerald'/>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
