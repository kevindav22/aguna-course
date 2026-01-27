import { Bank } from '@/app/types';
import { FiCreditCard, FiEdit2, FiTrash2 } from 'react-icons/fi';

type TBankInfoListProps = {
  banks: Bank[];
  onEdit: (bank: Bank) => void;
  onDelete: (id: string) => void;
};
const BankInfoList = ({ banks, onEdit, onDelete }: TBankInfoListProps) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {banks.map((data) => (
        <div key={data._id} className="bg-white rounded-lg border border-gray-200">
          <div className="flex justify-between p-5">
            <div className="flex gap-2 items-center">
              <div className="bg-blue-50 text-blue-600 rounded w-12 h-12 flex justify-center items-center">
                <FiCreditCard size={24} />
              </div>
              <div>
                <div className="font-semibold">{data.bankName}</div>
                <div className="text-xs opacity-50">Bank Transfer</div>
              </div>
            </div>
            <div className="flex gap-2 text-gray-500">
              <button onClick={() => onEdit(data)} className="cursor-pointer">
                <FiEdit2 size={20} />
              </button>
              <button onClick={() => onDelete(data._id)} className="cursor-pointer">
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
          <div className="p-5 font-medium">
            <div className="text-xs opacity-50"> Account Number</div>
            <div>{data.accountNumber}</div>
          </div>
          <div className="border-t border-gray-200 p-5 py-3 text-xs">
            <span className="opacity-50">Holder: </span>
            {data.accountName}
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default BankInfoList;
