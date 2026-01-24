import priceFormatter from '@/app/utils/price-formatter';
import Image from 'next/image';
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';
const transactionsData = [
  {
    _id: 1,
    date: '10/01/2026 19:32',
    customer: 'John Doe',
    contact: '1234567890',
    total: 19000,
    status: 'Pending',
  },
  {
    _id: 2,
    date: '12/01/2026 20:32',
    customer: 'Gibran Rakabum',
    contact: '088223633',
    total: 50000,
    status: 'rejected',
  },
  {
    _id: 3,
    date: '9/01/2026 21:32',
    customer: 'Fahmi Ariwibowo',
    contact: '0895632312',
    total: 800000,
    status: 'paid',
  },
];

type TCategoryTableProps = {
  onViewDetails: () => void;
};

const TransactionsTable = ({ onViewDetails }: TCategoryTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 border-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-600 border-red-300';
      case 'paid':
        return 'bg-green-100 text-green-600 border-green-300';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Contact</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionsData.map((data) => (
            <tr key={data._id} className="border-b border-gray-200 last:border-b-0">
              <td className="px-6 py-4 font-medium ">{data.date}</td>
              <td className="px-6 py-4 font-medium ">{data.customer}</td>
              <td className="px-6 py-4 font-medium ">{data.contact}</td>
              <td className="px-6 py-4 font-medium ">{priceFormatter(data.total)}</td>
              <td className="px-6 py-4 font-medium ">
                <div className={`px-4 py-1 rounded-full border text-center w-fit text-sm uppercase ${getStatusColor(data.status)}`}>{data.status}</div>
              </td>
              <td className="px-6 py-8 flex items-center gap-3 text-gray-600 ">
                <button onClick={onViewDetails} className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 w-fit py-1 px-2 rounded-md'>
                  <FiEye size={18} /> View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TransactionsTable;
