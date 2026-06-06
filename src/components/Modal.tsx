import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-dark/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="animate-scale-in relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-warm-border overflow-hidden">
        <div className="flex items-center justify-between border-b border-warm-border px-6 py-4">
          <h2 className="text-lg font-bold text-dark">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-dark-panel/40 hover:bg-dark/5 hover:text-dark-panel transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
