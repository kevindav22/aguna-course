'use client';
import Button from '@/app/(landing)/components/ui/button';
import { FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import CategoryTable from '../../components/categories/categories-table';
import CategoryModal from '../../components/categories/categories-modal';
import { Category } from '@/app/types';
import { deleteCategory, getAllCategories } from '@/app/services/category.service';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/ui/delete-modal';

const CategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState('');

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategoryToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleToDeleteConfirm = async () => {
    if (!categoryToDeleteId) return;
    try {
      await deleteCategory(categoryToDeleteId);
      fetchCategories();
      toast.success('Category deleted successfully');
      setIsDeleteModalOpen(false);
      setCategoryToDeleteId('');
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Category Management</h1>
          <p className="opacity/50">Organize your product into categories</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-lg">
          <FiPlus size={24} />
          Add Category
        </Button>
      </div>
      <CategoryTable categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
      <CategoryModal isOpen={isModalOpen} onClose={handleCloseModal} category={selectedCategory} onSuccess={fetchCategories} />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleToDeleteConfirm} />
    </div>
  );
};
export default CategoryManagement;
