import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  images?: string[];
  description?: string;
  unit_amount?: number;
  quantity: number;
}

interface CartState {
  isOpen: boolean;
  cart: CartItem[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
    }),
    { name: 'cart-store' },
  ),
);
