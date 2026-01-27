'use client';
import { useEffect, useState } from 'react';
import TransactionsTable from '../../components/transactions/transactions-table';
import TransactionsModal from '../../components/transactions/transactions-modal';
import { Transaction } from '@/app/types';
import { getAllTransactions, updateTransaction } from '@/app/services/transactions.service';
import { toast } from 'react-toastify';

const TransactionsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setIsSelectedTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSelectedTransaction(null);
  };

  const handleViewDetails = (transactions: Transaction) => {
    setIsModalOpen(true);
    setIsSelectedTransaction(transactions);
  };

  const handleStatusChange = async (id: string, status: 'paid' | 'rejected') => {
    try {
      const formData = new FormData();
      formData.append('status', status);
      await updateTransaction(id, formData);
      toast.success('Transaction status updated successfully');
      await fetchTransactions();
    } catch (error) {
      toast.error('Failed to update transaction status');
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Transactions Management</h1>
          <p className="opacity/50">Verify incoming payments and manage orders</p>
        </div>

      </div>
      <TransactionsTable transactions={transactions} onViewDetails={handleViewDetails} />
      <TransactionsModal transaction={selectedTransaction} onStatusChange={handleStatusChange} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
export default TransactionsManagement;
