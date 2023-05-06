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
  const [added, setAdded] = useState<boolean>(false);

  const handleAddToCart = () => {
    cartStore.addProduct({
      id,
      name,
      image,
      quantity,
      unit_amount,
    });
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="my-4 btn-primary btn w-full"
      >
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart</span>}
      </button>
    </>
  );
};

export default AddCart;
