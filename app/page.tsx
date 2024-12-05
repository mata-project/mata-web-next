import Link from 'next/link';
import Image from 'next/image';

// Mock product data
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '$19.99',
    image: '/product1.png',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$29.99',
    image: '/product2.png',
  },
];

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52"></div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center rounded-lg bg-gray-50 p-4"
            >
              <Image
                src={product.image}
                width={200}
                height={200}
                alt={product.name}
                className="mb-2"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-700">{product.price}</p>
              <Link
                href={`/product/${product.id}`}
                className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-400"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
