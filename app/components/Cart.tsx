'use client';

import { FC } from 'react';
import { useCartStore } from '@/store';
import Image from 'next/image';
import formatPrice from '@/util/price-format';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import basket from '@/public/images/basket.png';
import { motion, AnimatePresence } from 'framer-motion';
import Checkout from './Checkout';

const Cart: FC = ({}) => {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return (acc + item.unit_amount * item.quantity) as number;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        layout
        className="bg-white absolute right-0 top-0 w-full lg:w-2/5 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        {cartStore.onCheckout === 'cart' && (
          <button
            onClick={() => cartStore.toggleCart()}
            className="text-sm font-bold pb-12"
          >
            Back to store 🏃‍♂️
          </button>
        )}

        {cartStore.onCheckout === 'checkout' && (
          <button
            onClick={() => cartStore.setCheckout('cart')}
            className="text-sm font-bold pb-12"
          >
            Check your cart 🏃‍♂️
          </button>
        )}

        {cartStore.onCheckout === 'cart' && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div layout key={item.id} className="flex py-4 gap-4">
                <Image
                  className="rounded-md h-24"
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                />
                <motion.div>
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
                </motion.div>
              </motion.div>
            ))}
          </>
        )}

        <motion.div layout>
          {cartStore.cart.length > 0 && cartStore.onCheckout === 'cart' ? (
            <>
              <p>Total: {formatPrice(totalPrice)}</p>
              <button
                onClick={() => cartStore.setCheckout('checkout')}
                className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white"
              >
                Checkout
              </button>
            </>
          ) : null}
        </motion.div>

        {cartStore.onCheckout === 'checkout' && <Checkout />}

        <AnimatePresence>
          {!cartStore.cart.length && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
            >
              <h1>Uuuuh... The cart is still empty..</h1>
              <Image src={basket} alt="empty basket" width={200} height={200} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
