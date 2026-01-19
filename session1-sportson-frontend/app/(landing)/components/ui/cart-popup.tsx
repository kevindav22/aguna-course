import Image from 'next/image';
import Button from './button';
import { FiTrash, FiArrowRight } from 'react-icons/fi';
import priceFormatter from '@/app/utils/price-formatter';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/app/hooks/use-cart-store';
import { getImageUrl } from '@/app/lib/api';

const CartPopup = () => {
  const { push } = useRouter();
  const { items, removeItem } = useCartStore();
  const totalPrice = items.reduce((total, item) => total + item.price * item.qty, 0);

  const handleCheckout = () => {
    push('/checkout');
  };

  return (
    <div className="absolute bg-white right-0 top-16 shadow-xl shadow-black/10 border border-gray-200 w-90 z-10">
      <div className="p-4 border-b border-gray-200 font-bold text-center">Shopping Cart</div>
      {items.length ? (
        items.map((item) => (
          <div key={item._id} className="border-b border-gray-200 p-4 flex gap-3">
            <div className="bg-primary-light aspect-square w-16 flex justify-center text-center">
              <Image src={getImageUrl(item.imageUrl)} width={63} height={63} alt={item.name} className="aspect-square object-contain " />
            </div>
            <div className="self-center">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="flex gap-3 font-medium text-xs">
                <div>{item.qty} x</div>
                <div className="text-primary">{priceFormatter(item.price)}</div>
              </div>
            </div>
            <Button onClick={() => removeItem(item._id)} size="small" variant="ghost" className="w-7 h-7 p-0! self-center ml-auto">
              <FiTrash />
            </Button>
          </div>
        ))
      ) : (
        <div className="p-4 font-medium text-gray-500 text-sm opacity-50">Shopping Cart is Empty</div>
      )}
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
