import Stripe from 'stripe';
import Product from './components/Product';

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });
  const products = await stripe.products.list();

  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      const features = product.metadata.features || '';
      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount as number,
        image: product.images[0],
        description: product.description as string,
        currency: prices.data[0].currency,
        metadata: { features },
      };
    }),
  );

  return productWithPrices;
};

const Home = async () => {
  const products = await getProducts();

  return (
    <main className="grid grid-cols-fluid gap-12">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </main>
  );
};

export default Home;
