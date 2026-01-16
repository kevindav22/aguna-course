import Image from 'next/image';
import Button from './button';
import { FiTrash, FiArrowRight } from 'react-icons/fi';
import priceFormatter from '@/app/utils/price-formatter';
import { useRouter } from 'next/navigation';

export const cartList = [
  {
    id: 1,
    name: 'SportOn Product 1',
    category: 'Running',
    qty: 2,
    price: 45000,
    imgUrl: 'product-1.png',
  },
  {
    id: 2,
    name: 'SportOn Product 2',
    category: 'Running',
    price: 5000,
    qty: 5,
    imgUrl: 'product-2.png',
  },
  {
    id: 3,
    name: 'SportOn Product 3',
    category: 'Running',
    price: 90000,
    qty: 1,
    imgUrl: 'product-3.png',
  },
   {
    id: 4,
    name: 'SportOn Product 3',
    category: 'Running',
    price: 90000,
    qty: 1,
    imgUrl: 'product-3.png',
  },
    {
    id: 5,
    name: 'SportOn Product 3',
    category: 'Running',
    price: 90000,
    qty: 1,
    imgUrl: 'product-3.png',
  },
     {
    id: 6,
    name: 'SportOn Product 3',
    category: 'Running',
    price: 90000,
    qty: 1,
    imgUrl: 'product-3.png',
  },
];

const CartPopup = () => {
  const {push} = useRouter();
  const totalPrice = cartList.reduce((total, item) => total + item.price * item.qty, 0);

  const handleCheckout = () => {
    push('/checkout');
  };

  return (
    <div className="absolute bg-white right-0 top-12 shadow-xl shadow-black/10 border border-gray-200 w-90 z-10">
      <div className="p-4 border-b border-gray-200 font-bold text-center">Shopping Cart</div>
      {cartList.map((item) => (
        <div key={item.id} className="border-b border-gray-200 p-4 flex gap-3">
          <div className="bg-primary-light aspect-square w-16 flex justify-center text-center">
            <Image src={`/images/products/${item.imgUrl}`} width={63} height={63} alt={item.name} className="aspect-square object-contain" />
          </div>
          <div className="self-center">
            <div className="text-sm font-medium">{item.name}</div>
            <div className="flex gap-3 font-medium text-xs">
              <div>{item.category}</div>
              <div>{item.qty} x</div>
              <div className="text-primary">{priceFormatter(item.price)}</div>
            </div>
          </div>
          <Button size="small" variant="ghost" className="w-7 h-7 p-0! self-center ml-auto">
            <FiTrash />
          </Button>
        </div>
      ))}
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold">
          <div className="text-sm">Total</div>
          <div className="text-primary text-xs">{priceFormatter(totalPrice)}</div>
        </div>
        <Button onClick={handleCheckout} variant="dark" size="small" className="w-full mt-4">
          Checkout Now <FiArrowRight />
        </Button>
      </div>
    </div>
  );
};
export default CartPopup;
