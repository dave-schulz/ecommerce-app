'use client';

import { FC } from 'react';
import { useCartStore } from '@/store';
import Image from 'next/image';
import formatPrice from '@/util/price-format';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import basket from '@/public/images/basket.png';

const Cart: FC = ({}) => {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return (acc + item.unit_amount * item.quantity) as number;
  }, 0);

  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        <h1>Here is your shopping list</h1>
        {cartStore.cart.map((item) => (
          <div className="flex py-4 gap-4">
            <Image
              className="rounded-md h-24"
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
            />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-1">
                <h2>Quantity: {item.quantity}</h2>
                <button
                  onClick={() =>
                    cartStore.removeProduct({
                      id: item.id,
                      name: item.name,
                      image: item.image,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoRemoveCircle />
                </button>
                <button
                  onClick={() =>
                    cartStore.addProduct({
                      id: item.id,
                      name: item.name,
                      image: item.image,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoAddCircle />
                </button>
              </div>
              <p className="text-sm">{formatPrice(item.unit_amount)}</p>
            </div>
          </div>
        ))}

        {cartStore.cart.length > 0 && (
          <>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
              Checkout
            </button>
          </>
        )}
        {!cartStore.cart.length && (
          <div className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
            <h1>Uuuuh... The cart is still empty..</h1>
            <Image src={basket} alt="empty basket" width={200} height={200} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
