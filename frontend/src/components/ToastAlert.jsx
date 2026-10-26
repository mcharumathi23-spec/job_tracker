import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastAlert({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="toast-container-custom">
      <div 
        className={`alert ${isSuccess ? 'alert-success bg-opacity-90' : isError ? 'alert-danger bg-opacity-90' : 'alert-info bg-opacity-90'} border-0 shadow-lg text-white d-flex align-items-center justify-content-between p-3 rounded-3`}
        style={{
          background: isSuccess ? '#065f46' : isError ? '#991b1b' : '#1e3a8a',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        role="alert"
      >
        <div className="d-flex align-items-center gap-2">
          {isSuccess && <CheckCircle2 size={20} className="text-emerald-400" />}
          {isError && <AlertCircle size={20} className="text-red-400" />}
          {!isSuccess && !isError && <Info size={20} className="text-cyan-400" />}
          <span className="fw-medium small">{toast.message}</span>
        </div>
        <button 
          type="button" 
          className="btn btn-sm btn-link text-white p-0 ms-2" 
          onClick={onClose}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
