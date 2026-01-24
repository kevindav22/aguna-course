'use client';
import Button from '@/app/(landing)/components/ui/button';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import TransactionsTable from '../../components/transactions/transactions-table';
import TransactionsModal from '../../components/transactions/transactions-modal';

const TransactionsManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };


  const handleViewDetails = () => {
  setIsOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Transactions Management</h1>
          <p className="opacity/50">Verify incoming payments and manage orders</p>
        </div>
        <Button onClick={() => setIsOpen(true)} className="rounded-lg">
          <FiPlus size={24} />
          Add Transactions
        </Button>
      </div>
      <TransactionsTable onViewDetails={handleViewDetails} />
      <TransactionsModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};
export default TransactionsManagement;
