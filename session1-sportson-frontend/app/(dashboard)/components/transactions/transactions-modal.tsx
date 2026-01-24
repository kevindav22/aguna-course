import Button from '@/app/(landing)/components/ui/button';
import Modal from '../ui/modal';
import Image from 'next/image';
import priceFormatter from '@/app/utils/price-formatter';
import { FiCheck, FiX } from 'react-icons/fi';

type TTransactionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TransactionsModal = ({ isOpen, onClose }: TTransactionsModalProps) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex gap-6">
        <div>
          <h4 className="font-semibold text-sm mb-2">Payment Proof</h4>
          <Image src="/images/payments/buktitf.jpg" alt="payment proof" width={200} height={401} />
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">Order Details</h4>
          <div className="bg-gray-100 rounded-md flex flex-col gap-2.5 p-4 text-sm mb-5">
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Date</div>
              <div className="text-right">23/03/2026 19</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Customer</div>
              <div className="text-right">John doeh</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Contact</div>
              <div className="text-right">0882 3363 8984</div>
            </div>
            <div className="flex justify-between gap-10 font-medium">
              <div className="opacity-50 whitespace-nowrap">Shipping Address</div>
              <div className="text-right">Surakarta Hadiningrat, Indonesia 575565</div>
            </div>
          </div>
          <h4 className="font-semibold text-sm mb-2">Items Purchased</h4>
          <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-2">
            <div className="bg-gray-100 rounded aspect-square w-8 h-8">
              <Image src="/images/products/product-1.png" alt="product image" width={30} height={30} />
            </div>
            <div className="font-medium text-sm">SportOn HyperFast Shoes</div>
            <div className="font-medium ml-auto text-sm">3 Units</div>
          </div>
          <div className="flex justify-between font-semibold text-sm mt-4">
            <h4>Total</h4>
            <div className="text-primary">{priceFormatter(890000)}</div>
          </div>
          <div className="flex justify-end gap-5 mt-10 ">
            <Button className="text-primary! bg-primary-light! rounded-md " size="small">
              <FiX size={20} /> Reject
            </Button>
            <Button className="bg-[#50C252]! rounded-md" size="small">
              <FiCheck size={20} /> Approve
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default TransactionsModal;
