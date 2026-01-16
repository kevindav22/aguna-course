'use client';
import { useState } from 'react';
import { FiArrowRight, FiChevronDown, FiChevronUp, FiShoppingBag } from 'react-icons/fi';
import Button from '../ui/button';
import { useRouter } from 'next/navigation';

const ProducAction = () => {
  const { push } = useRouter();
  const [qty, setQty] = useState(1);

  const checkout = () => {
    push('/checkout');
  };

  return (
    <div className="flex gap-5">
      <div className="border border-gray-500 inline-flex w-fit min-w-20.5">
        <div className="aspect-square text-xl font-medium border-r border-gray-500 flex justify-center items-center">
          <span>{qty}</span>
        </div>
        <div className="flex flex-col">
          <button onClick={() => setQty(qty + 1)} className="border-b border-gray-500 cursor-pointer h-1/2 aspect-square flex items-center justify-center">
            <FiChevronUp />
          </button>
          <button onClick={() => setQty(qty > 1 ? qty - 1 : qty)} className="cursor-pointer h-1/2 aspect-square flex items-center justify-center">
            <FiChevronDown />
          </button>
        </div>
      </div>
      <Button className="px-20 w-full">
        <FiShoppingBag size={24} /> Add to Cart
      </Button>
      <Button onClick={checkout} variant="dark" className="px-20 w-full">
        Checkout Now <FiArrowRight size={24} />
      </Button>
    </div>
  );
};
export default ProducAction;
