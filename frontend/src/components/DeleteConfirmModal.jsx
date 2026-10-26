import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, job, onClose, onConfirm, loading }) {
  if (!isOpen || !job) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(6px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border border-danger border-opacity-30 shadow-2xl">
          <div className="modal-header d-flex align-items-center gap-2">
            <div className="icon-wrapper icon-danger bg-danger bg-opacity-20 text-danger p-2" style={{ width: '38px', height: '38px', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} />
            </div>
            <h5 className="modal-title fw-bold text-white mb-0">Confirm Deletion</h5>
            <button 
              type="button" 
              className="btn-close btn-close-white ms-auto" 
              onClick={onClose}
              disabled={loading}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            <p className="text-secondary mb-2">
              Are you sure you want to permanently delete this application?
            </p>
            <div className="p-3 rounded-3 my-2" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div className="fw-bold text-white fs-6">{job.jobRole}</div>
              <div className="text-secondary small">{job.companyName} {job.location ? `• ${job.location}` : ''}</div>
            </div>
            <p className="text-danger small mb-0 mt-3">
              This action cannot be undone. All notes and history will be removed.
            </p>
          </div>

          <div className="modal-footer d-flex justify-content-end gap-2">
            <button 
              type="button" 
              className="btn btn-secondary-outline" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="button" 
              id="btn-confirm-delete"
              className="btn btn-danger d-flex align-items-center gap-2 px-3"
              onClick={onConfirm}
              disabled={loading}
              style={{ background: '#dc2626', borderColor: '#b91c1c' }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  <span>Delete Application</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
