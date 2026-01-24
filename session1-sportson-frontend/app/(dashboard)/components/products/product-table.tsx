import priceFormatter from '@/app/utils/price-formatter';
import Image from 'next/image';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const ProductTable = () => {
  const productsData = [
    {
      _id: 1,
      name: 'SportOn Product 1',
      imageUrl: '/images/products/product-1.png',
      category: 'Running',
      price: 19000,
      stock: 10,
    },
    {
      _id: 2,
      name: 'SportOn Product 2',
      imageUrl: '/images/products/product-2.png',
      category: 'Sport',
      price: 66000,
      stock: 75,
    },
    {
      _id: 3,
      name: 'SportOn Product 3',
      imageUrl: '/images/products/product-3.png',
      category: 'Fashion',
      price: 25000,
      stock: 90,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((data) => (
            <tr key={data._id} className="border-b border-gray-200 last:border-b-0">
              <td className="px-6 py-4 font-medium">
                <div className="flex items-center gap-2">
                  <div className="aspect-square bg-gray-100 rounded-md">
                    <Image src={data.imageUrl} alt="data.name" width={52} height={52} className="aspect-square object-contain" />
                  </div>
                  <span>{data.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">
                <div className="rounded-md bg-gray-200 px-2 py-1 w-fit">{data.category}</div>
              </td>
              <td className="px-6 py-4 font-medium ">
                {/**/}
                {priceFormatter(data.price)}
              </td>
              <td className="px-6 py-4 font-medium ">
                {/**/}
                {data.stock} units
              </td>
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
export default ProductTable;
