'use client';
import Button from '@/app/(landing)/components/ui/button';
import { FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import BankInfoList from '../../components/bank-info/bank-info-list';
import BankInfoModal from '../../components/bank-info/bank-info-modal';
import { Bank } from '@/app/types';
import { deleteBank, getAllBank } from '@/app/services/bank.service';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/ui/delete-modal';

const BankInfoManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bankToDeleteId, setBankToDeleteId] = useState('');

  const fetchBanks = async () => {
    try {
      const data = await getAllBank();
      setBanks(data);
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
  };

  const handleEdit = (bank: Bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBankToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bankToDeleteId) return;
    try {
      await deleteBank(bankToDeleteId);
      fetchBanks();
      toast.success('Bank deleted successfully');
      setBankToDeleteId('');
      setIsDeleteModalOpen(false);
      fetchBanks();
    } catch (error) {
      toast.error('Failed to delete bank');
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Bank Info Management</h1>
          <p className="opacity/50">Manage destination accounts for customer transfer</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-lg">
          <FiPlus size={24} />
          Add Bank Info
        </Button>
      </div>
      <BankInfoList banks={banks} onEdit={handleEdit} onDelete={handleDelete} />
      <BankInfoModal isOpen={isModalOpen} onSuccess={fetchBanks} bank={selectedBank} onClose={handleCloseModal} />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} />
    </div>
  );
};
export default BankInfoManagement;
