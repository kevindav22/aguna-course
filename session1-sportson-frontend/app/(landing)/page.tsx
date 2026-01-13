import CategoriesSection from './components/home/categories';
import HeroSection from './components/home/hero';
import ProductSection from './components/home/products';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <ProductSection />
    </main>
  );
}
