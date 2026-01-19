'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import CartPopup from '../ui/cart-popup';
import { useCartStore } from '@/app/hooks/use-cart-store';

const Header = () => {
  const { items } = useCartStore();
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed w-full z-20 backdrop-blur-xl bg-white/50 ">
      <div className="container mx-auto flex justify-between items-center py-6">
        <Link href="/">
          <Image src="/images/logo.svg" alt="sportson logo" width={187} height={44}  />
        </Link>

        <nav className="flex gap-24 font-medium">
          <Link href="/" className='relative after:content-[""] after:bg-primary after:block after:rounded-full after:w-1/2 after:h-0.75 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1'>
            Home
          </Link>
          <Link href="/#category-section">Category</Link>
          <Link href="/#product-section">Explore Products</Link>
        </nav>
        <div ref={cartRef} className="relative flex items-center gap-6">
          <button className="p-2 rounded-full transition hover:bg-gray-100 hover:text-primary active:scale-95">
            <FiSearch size={22} />
          </button>
          <button onClick={() => setIsCartPopupOpen((prev) => !prev)} className="relative p-2 rounded-full transition hover:bg-gray-100 hover:text-primary active:scale-95">
            <FiShoppingBag size={22} />
            {items.length ? <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">{items.length}</span> : null}
          </button>
          {isCartPopupOpen && <CartPopup />}
        </div>
      </div>
    </header>
  );
};

export default Header;
