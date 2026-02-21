import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className={`w-full ${widths[size]} bg-white rounded-2xl shadow-2xl`}>
        <div className="flex items-center justify-between px-7 py-5 border-b border-primary-100">
          <h3 className="text-lg font-serif font-semibold text-primary-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-primary-400 hover:bg-primary-100 hover:text-primary-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-7 py-5">{children}</div>
      </div>
    </div>
  );
}
