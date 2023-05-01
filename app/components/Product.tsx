import formatPrice from '@/util/price-format';
import Image from 'next/image';
import { FC } from 'react';

interface ProductsProps {
  name: string;
  image: string;
  price: number;
}

const Product: FC<ProductsProps> = ({ name, image, price }) => {
  return (
    <div className="text-gray-700">
      <Image
        src={image}
        alt={name}
        width={800}
        height={800}
        className="w-full h-96 object-cover rounded-lg"
      />
      <div className="font-medium py-2">
        <h1>{name}</h1>
        <h2 className="text-sm text-teal-700">{formatPrice(price)}</h2>
      </div>
    </div>
  );
};

export default Product;
