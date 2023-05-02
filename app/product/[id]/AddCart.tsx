'use client';

import { useCartStore } from '@/store';
import { FC, useState } from 'react';
import formatPrice from '@/util/price-format';

export interface AddCartProps {
  id: string;
  name: string;
  image: string;
  quantity: number | 1;
  unit_amount: number;
}

const AddCart: FC<AddCartProps> = ({
  id,
  name,
  image,
  quantity,
  unit_amount,
}) => {
  const cartStore = useCartStore();
  const [added, setAdded] = useState([]);

  return (
    <>
      <button
        onClick={() =>
          cartStore.addProduct({
            id,
            name,
            image,
            quantity,
            unit_amount,
          })
        }
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700"
      >
        Add to cart
      </button>
    </>
  );
};

export default AddCart;
