'use client';
import priceFormatter from '@/app/utils/price-formatter';
import CardWithHeader from '../ui/card-with-header';
import FileUpload from '../ui/file-upload';
import Button from '../ui/button';
import { FiCheckCircle } from 'react-icons/fi';
import { cartList } from '../ui/cart-popup';
import { useRouter } from 'next/navigation';

const PaymentSteps = () => {
  const { push } = useRouter();
  const uploadAndConfirm = () => {
    push('/order-status/sgklahsgr');
  };

  const totalPrice = cartList.reduce((total, item) => total + item.price * item.qty, 0);
  return (
    <CardWithHeader title="Payment Steps">
      <div className="p-5">
        <ol className="list-decimal text-xs pl-2 flex flex-col gap-4 mb-5">
          <li>
            Transfer the total amount of <b>{priceFormatter(totalPrice)}</b> to your preferred bank account listed under 'Payment Options' (BCA, Mandiri, or BTPN).
          </li>
          <li>
            After completing the transfer, <b>keep the payment receipt</b> or a screenshot of the transfer confirmation. This will be needed for the next step.
          </li>
          <li>
            Upload the payment receipt/screenshot using the <b>'Upload Receipt & Confirm'</b> button below to validate your transaction.
          </li>
        </ol>
        <FileUpload />
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold">
          <div className="text-sm">Total</div>
          <div className="text-primary text-xs">{priceFormatter(totalPrice)}</div>
        </div>
        <Button onClick={uploadAndConfirm} variant="dark" className="w-full mt-4">
          <FiCheckCircle /> Upload Receipt & Confirm
        </Button>
      </div>
    </CardWithHeader>
  );
};
export default PaymentSteps;
