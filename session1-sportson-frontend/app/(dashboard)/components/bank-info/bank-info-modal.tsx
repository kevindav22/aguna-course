import Button from '@/app/(landing)/components/ui/button';
import Modal from '../ui/modal';
import ImageUploadPreview from '../ui/image-upload-preview';
import { useEffect, useState } from 'react';
import { Bank } from '@/app/types';
import { createBank, updateBank } from '@/app/services/bank.service';
import { toast } from 'react-toastify';

type TBankInfoModalProps = {
  isOpen: boolean;
  bank: Bank | null;
  onSuccess: () => void;
  onClose: () => void;
};

const BankInfoModal = ({ isOpen, bank, onSuccess, onClose }: TBankInfoModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Bank>>({
    accountName: '',
    bankName: '',
    accountNumber: '',
  });

  const isEditMode = !!bank;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateBank(bank!._id, formData);
      } else {
        await createBank(formData);
      }
      setFormData({
        accountName: '',
        bankName: '',
        accountNumber: '',
      });
      onSuccess?.();
      onClose();
      toast.success(isEditMode ? 'Bank info updated successfully' : 'Bank info created successfully');
    } catch (error) {
      console.error(isEditMode ? 'Failed to update bank info' : 'Failed to create bank info');
      toast.error(isEditMode ? 'Failed to update bank info' : 'Failed to create bank info');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && bank) {
      setFormData({
        accountName: bank.accountName,
        bankName: bank.bankName,
        accountNumber: bank.accountNumber,
      });
    } else if (isOpen) {
      setFormData({
        accountName: '',
        bankName: '',
        accountNumber: '',
      });
    }
  }, [bank, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Bank Account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="bankName">Bank Info Name</label>
              <input type="text" id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e. g. Mandiri, BCA, BNI" />
            </div>
            <div className="input-group-admin">
              <label htmlFor="accountNumber">Account Number</label>
              <input type="text" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="008098098" />
            </div>
            <div className="input-group-admin">
              <label htmlFor="accountName">Account Name / Holder</label>
              <input type="text" id="accountName" name="accountName" value={formData.accountName} onChange={handleChange} placeholder="Holder Name as registered on the account" />
            </div>
          </div>
        </div>

        <Button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="ml-auto mt-3 rounded-lg">
          {isEditMode ? 'Update Bank Info' : 'Create Bank Info'}
        </Button>
      </form>
    </Modal>
  );
};
export default BankInfoModal;
