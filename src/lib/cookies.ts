import Cookies from 'js-cookie';

// Fetch the guest cart from cookies
export const getGuestCart = (): { id: string; quantity: number }[] => {
  const cart = Cookies.get('guest_cart');
  return cart ? JSON.parse(cart) : [];
};

// Save the guest cart in cookies
export const saveGuestCart = (cart: { id: string; quantity: number }[]) => {
  Cookies.set('guest_cart', JSON.stringify(cart), { expires: 7 });
};

// Clear the guest cart cookies
export const clearGuestCart = () => {
  Cookies.remove('guest_cart');
};
