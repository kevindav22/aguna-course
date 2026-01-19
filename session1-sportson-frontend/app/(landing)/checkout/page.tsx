'use client';
import { useState } from 'react';
import CartItems from '../components/checkout/cart-items';
import OrderInformation from '../components/checkout/order-information';
import { CustomerInfo, useCartStore } from '@/app/hooks/use-cart-store';
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const { push } = useRouter();
  const { setCustomerInfo } = useCartStore();
  const [formData, setFormData] = useState<CustomerInfo>({
    customerName: '',
    customerContact: '',
    customerAddress: '',
  });

  const handlePayment = () => {
    if (!formData.customerName || !formData.customerContact || !formData.customerAddress) {
      alert('Please fill all the fields');
      return;
    }


    setCustomerInfo(formData);
    push('/payment');
  };

  return (
    <main className="bg-gray-100 min-h-[80vh] py-20">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-11">Checkout</h1>
        <div className="grid grid-cols-2 gap-14">
          <OrderInformation formData={formData} setFormData={setFormData} />
          <CartItems handlePayment={handlePayment} />
        </div>
      </div>
    </main>
  );
};
export default Checkout;
