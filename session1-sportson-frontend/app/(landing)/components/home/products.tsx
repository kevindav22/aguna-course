import Image from 'next/image';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import Button from '../../components/ui/button';
import priceFormatter from '@/app/utils/price-formatter';

const productsList = [
  {
    id: 1,
    name: 'SportOn Product 1',
    category: 'Running',
    price: 45000,
    imgUrl: 'product-1.png',
  },
  {
    id: 2,
    name: 'SportOn Product 2',
    category: 'Running',
    price: 5000,
    imgUrl: 'product-2.png',
  },
  {
    id: 3,
    name: 'SportOn Product 3',
    category: 'Running',
    price: 90000,
    imgUrl: 'product-3.png',
  },
  {
    id: 4,
    name: 'SportOn Product 4',
    category: 'Running',
    price: 80000,
    imgUrl: 'product-4.png',
  },
  {
    id: 5,
    name: 'SportOn Product 5',
    category: 'Running',
    price: 3200,
    imgUrl: 'product-5.png',
  },
  {
    id: 6,
    name: 'SportOn Product 6',
    category: 'Running',
    price: 70000,
    imgUrl: 'product-6.png',
  },
  {
    id: 7,
    name: 'SportOn Product 8',
    category: 'Running',
    price: 70000,
    imgUrl: 'product-7.png',
  },
  {
    id: 8,
    name: 'SportOn Product 8',
    category: 'Running',
    price: 70000,
    imgUrl: 'product-8.png',
  },
];

const ProductSection = () => {
  return (
    <section id="product-section" className="container mx-auto py-16">
      <h2 className="font-bold italic text-4xl text-center mb-11">
        <span className="text-primary">OUR</span> PRODUCTS
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {productsList.map((product) => (
          <Link href={`/product/${product.name}`} key={product.id} className="p-1.5 bg-white hover:drop-shadow-xl duration-300">
            <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative">
              <Image src={`/images/products/${product.imgUrl}`} width={300} height={300} alt={product.name} className="aspect-square object-contain" />
              <Button className="w-10 h-10 p-2! absolute top-0 right-0">
                <FiPlus />
              </Button>
            </div>
            <h3 className="font-medium text-lg mb-1.5 mt-4">{product.name}</h3>
            <div className="flex justify-between mb-8">
              <div className="text-gray-500">{product.category}</div>
              <div className="font-medium text-primary">
                {priceFormatter(product.price)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default ProductSection;
