import priceFormatter from '@/app/utils/price-formatter';
import Image from 'next/image';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const categoryData = [
  {
    _id: 1,
    name: 'Badmintoon',
    imageUrl: '/images/categories/category-badminton.png',
    description: 'Lorem ipsum ',
  },
  {
    _id: 2,
    name: 'Running',
    imageUrl: '/images/categories/category-running.png',
    description: 'Lorem ipsum ',
  },
  {
    _id: 3,
    name: 'Swimming',
    imageUrl: '/images/categories/category-swimming.png',
    description: 'Lorem ipsum  ',
  },
];

const CategoryTable = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Category Name</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((data) => (
            <tr key={data._id} className="border-b border-gray-200 last:border-b-0">
              <td className="px-6 py-4 font-medium">
                <div className="flex items-center gap-2">
                  <div className="aspect-square bg-gray-100 rounded-md">
                    <Image src={data.imageUrl} alt="data.name" width={52} height={52} className="aspect-square object-contain" />
                  </div>
                  <span>{data.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium ">{data.description}</td>
              <td className="px-6 py-8 flex items-center gap-3 text-gray-600 ">
                <button>
                  <FiEdit2 size={20} />
                </button>
                <button>
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CategoryTable;
