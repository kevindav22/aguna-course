'use client';
import Button from '@/app/(landing)/components/ui/button';
import { FiPlus } from 'react-icons/fi';
import ProductTable from '../../components/products/product-table';
import ProductModal from '../../components/products/product-modal';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types';
import { deleteProduct, getAllProduct } from '@/app/services/product.service';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/ui/delete-modal';

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDeleteId, setProductToDeleteId] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await getAllProduct();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const hadleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProductToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDeleteId) return;
    try {
      await deleteProduct(productToDeleteId);
      fetchProducts();
      toast.success('Product deleted successfully');
      setIsDeleteModalOpen(false);
      setProductToDeleteId('');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Product Management</h1>
          <p className="opacity/50">Manage your inventory, prices and stock</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-lg">
          <FiPlus size={24} />
          Add Product
        </Button>
      </div>
      <ProductTable products={products} onDelete={handleDelete} onEdit={hadleEdit} />
      <ProductModal product={selectedProduct} onSuccess={fetchProducts} isOpen={isModalOpen} onClose={handleCloseModal} />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} />
    </div>
  );
};
export default ProductManagement;
