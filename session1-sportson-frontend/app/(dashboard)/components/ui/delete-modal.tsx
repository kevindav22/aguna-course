import Button from '@/app/(landing)/components/ui/button';
import Modal from './modal';

type TDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({ isOpen, onClose, onConfirm }: TDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Item">
      <p>Are you sure you want to delete permanent this item?</p>
      <div className="flex gap-5 mt-5">
        <Button variant="ghost" onClick={onClose} className="w-full rounded-md">
          Cancel
        </Button>
        <Button onClick={onConfirm} className="w-full rounded-md">
          Yes, Delete
        </Button>
      </div>
    </Modal>
  );
};
export default DeleteModal;
