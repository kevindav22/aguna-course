import { FiCreditCard } from 'react-icons/fi';
import CardWithHeader from '../ui/card-with-header';

const paymentList = [
  {
    id: 1,
    bank_name: 'BCA',
    account_number: 1212121212,
    account_holder: 'John Doe',
  },
  {
    id: 2,
    bank_name: 'BNI',
    account_number: 99988899888,
    account_holder: 'Fred Smith',
  },
  {
    id: 3,
    bank_name: 'BRI',
    account_number: 55555555,
    account_holder: 'Frenky Herman',
  },
];

const PaymentOptions = () => {
  return (
    <CardWithHeader title="Payment Options">
      {paymentList.map((payment) => (
        <div key={payment.id} className="flex gap-5 p-5 border-b border-gray-100">
          <div className="bg-blue-100 p-4 text-blue-500 h-fit self-center">
            <FiCreditCard size={24} />
          </div>
          <div className="self-center">
            <div className="font-bold">{payment.bank_name}</div>
            <div className="text-sm">{payment.account_number}</div>
            <div className="text-sm opacity-70">{payment.account_holder}</div>
          </div>
          <div className="ml-auto bg-blue-50 text-gray-800 text-xs h-fit self-center px-2 py-1">Bank Transfer</div>
        </div>
      ))}
    </CardWithHeader>
  );
};
export default PaymentOptions;
