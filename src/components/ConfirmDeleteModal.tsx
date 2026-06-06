import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  loading?: boolean;
}

export default function ConfirmDeleteModal({ open, onClose, onConfirm, itemName, loading }: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Confirm Deletion">
      <div className="flex flex-col items-center text-center py-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 mb-4">
          <AlertTriangle className="h-7 w-7 text-danger" />
        </div>
        <p className="text-dark-panel font-medium mb-1">Delete this item?</p>
        <p className="text-sm text-dark-panel/60 mb-6">
          You're about to delete <span className="font-semibold text-dark">{itemName}</span>. This action cannot be undone.
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-warm-border px-4 py-2.5 text-sm font-semibold text-dark-panel/70 hover:bg-warm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-danger px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
