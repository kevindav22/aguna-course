'use client';
import Button from '@/app/(landing)/components/ui/button';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import BankInfoList from '../../components/bank-info/bank-info-list';
import BankInfoModal from '../../components/bank-info/bank-info-modal';

const BankInfoManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Bank Info Management</h1>
          <p className="opacity/50">Manage destination accounts for customer transfer</p>
        </div>
        <Button onClick={() => setIsOpen(true)} className="rounded-lg">
          <FiPlus size={24} />
          Add Bank Info
        </Button>
      </div>
      <BankInfoList />
      <BankInfoModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};
export default BankInfoManagement;
