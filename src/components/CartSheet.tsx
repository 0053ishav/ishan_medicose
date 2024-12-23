'use client';

import { Sheet, SheetContent, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-CartContext';
import { useCartSheet } from '@/hooks/use-CartSheetProvider';
import React, { useState } from 'react';

const CartSheet = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { isCartOpen, closeCart } = useCartSheet();

  const [couponCode, setCouponCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [error, setError] = useState<string>('');

  // Handle coupon code validation
  const handleApplyCoupon = () => {
    // Example of simple coupon validation
    if (couponCode === 'DISCOUNT10') {
      setDiscount(10);
      setError('');
    } else if (couponCode === 'DISCOUNT20') {
      setDiscount(20);
      setError('');
    } else {
      setDiscount(0);
      setError('Invalid coupon code.');
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedTotal = total - (total * discount) / 100;

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right">
        <SheetTitle>Your Cart</SheetTitle>
        <SheetClose asChild>
          {/* <button className="absolute top-2 right-2 text-xl">&times;</button> */}
        </SheetClose>

        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between mb-4">
                  <span>{item.name}</span>
                  <span>₹{item.price} x {item.quantity}</span>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Coupon Code Section */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={handleApplyCoupon}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Apply Coupon
              </button>
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>

            <div className="mt-4 flex justify-between">
              <span>Total: ₹{total}</span>
              {discount > 0 && <span>Discount: {discount}%</span>}
            </div>

            <div className="mt-4 flex justify-between">
              <span>
                <strong>Final Total: ₹{discountedTotal.toFixed(2)}</strong>
              </span>
              <button onClick={clearCart} className="text-red-500">
                Clear Cart
              </button>
            </div>
          </div>
        )}

        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </button>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
