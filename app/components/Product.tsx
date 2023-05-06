import formatPrice from '@/util/price-format';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface MetadataProps {
  features: string;
}

export interface ProductsProps {
  id: string;
  name: string;
  image: string;
  unit_amount: number;
  quantity: number | 1;
  description: string;
  features?: string;
  metadata: MetadataProps;
}

const Product: FC<ProductsProps> = ({
  id,
  name,
  image,
  unit_amount,
  description,
  metadata,
}) => {
  const { features } = metadata;

  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { id, name, image, unit_amount, description, features },
      }}
    >
      <div>
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-primary">
            {unit_amount && formatPrice(unit_amount)}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Product;
