'use client';
import Button from '@/app/(landing)/components/ui/button';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import CategoryTable from '../../components/categories/categories-table';
import CategoryModal from '../../components/categories/categories-modal';

const CategoryManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Category Management</h1>
          <p className="opacity/50">Organize your product into categories</p>
        </div>
        <Button onClick={() => setIsOpen(true)} className="rounded-lg">
          <FiPlus size={24} />
          Add Category
        </Button>
      </div>
      <CategoryTable />
      <CategoryModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};
export default CategoryManagement;
