'use client';
import Image from 'next/image';
import Button from '../ui/button';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

const OrderRejected = () => {
  return (
    <div className="bg-white w-160 p-16 flex flex-col justify-center items-center mx-auto">
      <div className="w-20 h-20 bg-primary-light flex justify-center items-center rounded-full mx-auto p-3">
        <FiAlertTriangle size={52} className="text-amber-700" />
      </div>
      <h2 className="text-2xl font-semibold py-4">Order Rejected!</h2>
      <p className="text-center mb-8">
        Sorry your order has been rejected, please try again.
      </p>
    </div>
  );
};
export default OrderRejected;
