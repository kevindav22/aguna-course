import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

const categoriesList = [
  {
    id: 1,
    name: 'Running',
    imgUrl: 'category-running.png',
  },
  {
    id: 2,
    name: 'Tennis',
    imgUrl: 'category-tennis.png',
  },
  {
    id: 3,
    name: 'Basketball',
    imgUrl: 'category-basketball.png',
  },
  {
    id: 4,
    name: 'Football',
    imgUrl: 'category-football.png',
  },
  {
    id: 5,
    name: 'Badminton',
    imgUrl: 'category-badminton.png',
  },
  {
    id: 6,
    name: 'Swimming',
    imgUrl: 'category-swimming.png',
  },
];

const CategoriesSection = () => {
  return (
    <section id="category-section" className="container mx-auto py-16">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Browse By Categories</h2>
        <Link href="#" className="flex gap-2 text-primary font-medium">
          <span className="self-ceter">See All Categories</span>
          <FiArrowRight className="self-center" />
        </Link>
      </div>
      <div className="grid grid-cols-6 gap-12 mt-8">
        {categoriesList.map((category) => (
          <div key={category.id} className="flex justify-center rounded-lg bg-gradient-to-r from-[#F1F1F1] to-[#F7F7F7] w-full aspect-square">
            <div className="self-center">
              <Image src={`/images/categories/${category.imgUrl}`} width={86} height={86} alt={category.name} />
              <div className="text-primary font-medium text-xl text-center mt-[10px]">{category.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default CategoriesSection;
