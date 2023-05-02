'use client';

import { FC } from 'react';
import { useCartStore } from '@/store';

const Cart: FC = ({}) => {
  const cartStore = useCartStore();

  return <div>Cart</div>;
};

export default Cart;
