import React, { useState, useEffect } from 'react';
import { X, Briefcase, Building, MapPin, Calendar, Globe, FileText, CheckCircle } from 'lucide-react';
import { STATUS_OPTIONS } from '../utils/constants';

export default function JobModal({ isOpen, mode = 'create', job = null, onClose, onSave, loading = false }) {
  const [formData, setFormData] = useState({
    companyName: '',
    jobRole: '',
    location: '',
    applicationDate: new Date().toISOString().split('T')[0],
    status: 'APPLIED',
    jobUrl: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (job) {
      setFormData({
        companyName: job.companyName || '',
        jobRole: job.jobRole || '',
        location: job.location || '',
        applicationDate: job.applicationDate ? job.applicationDate.split('T')[0] : new Date().toISOString().split('T')[0],
        status: job.status || 'APPLIED',
        jobUrl: job.jobUrl || '',
        notes: job.notes || ''
      });
    } else {
      setFormData({
        companyName: '',
        jobRole: '',
        location: 'Remote',
        applicationDate: new Date().toISOString().split('T')[0],
        status: 'APPLIED',
        jobUrl: '',
        notes: ''
      });
    }
    setErrors({});
  }, [job, isOpen]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const isEdit = mode === 'edit';
  const isCreate = mode === 'create';

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.jobRole.trim()) {
      newErrors.jobRole = 'Job role is required';
    }
    if (!formData.applicationDate) {
      newErrors.applicationDate = 'Application date is required';
    }
    if (formData.jobUrl && formData.jobUrl.trim()) {
      try {
        new URL(formData.jobUrl.trim());
      } catch {
        newErrors.jobUrl = 'Please enter a valid URL (e.g. https://...)';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) {
      onClose();
      return;
    }
    if (!validate()) return;
    onSave(formData);
  };

  const title = isCreate 
    ? 'Track New Job Application' 
    : isEdit 
      ? 'Edit Job Application' 
      : 'Application Details';

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(6px)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border border-secondary border-opacity-25 shadow-2xl">
          {/* Modal Header */}
          <div className="modal-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <div className="icon-wrapper icon-primary p-2" style={{ width: '38px', height: '38px' }}>
                <Briefcase size={18} className="text-indigo" />
              </div>
              <h5 className="modal-title fw-bold text-white mb-0" id="modal-title">
                {title}
              </h5>
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              disabled={loading}
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body p-4">
              <div className="row g-3">
                {/* Company Name */}
                <div className="col-12 col-md-6">
                  <label className="form-label d-flex align-items-center gap-2" htmlFor="job-company">
                    <Building size={14} className="text-secondary" />
                    <span>Company Name *</span>
                  </label>
                  <input
                    id="job-company"
                    type="text"
                    className={`form-control ${errors.companyName ? 'is-invalid border-danger' : ''}`}
                    placeholder="e.g. Google, Stripe, Spotify"
                    value={formData.companyName}
                    onChange={(e) => {
                      setFormData({ ...formData, companyName: e.target.value });
                      if (errors.companyName) setErrors({ ...errors, companyName: '' });
                    }}
                    disabled={isView || loading}
                    required
                  />
                  {errors.companyName && (
                    <div className="text-danger small mt-1">{errors.companyName}</div>
                  )}
                </div>

                {/* Job Role */}
                <div className="col-12 col-md-6">
                  <label className="form-label d-flex align-items-center gap-2" htmlFor="job-role">
                    <Briefcase size={14} className="text-secondary" />
                    <span>Job Role / Title *</span>
                  </label>
                  <input
                    id="job-role"
                    type="text"
                    className={`form-control ${errors.jobRole ? 'is-invalid border-danger' : ''}`}
                    placeholder="e.g. Senior Frontend Engineer"
                    value={formData.jobRole}
                    onChange={(e) => {
                      setFormData({ ...formData, jobRole: e.target.value });
                      if (errors.jobRole) setErrors({ ...errors, jobRole: '' });
                    }}
                    disabled={isView || loading}
                    required
                  />
                  {errors.jobRole && (
                    <div className="text-danger small mt-1">{errors.jobRole}</div>
                  )}
                </div>

                {/* Location */}
                <div className="col-12 col-md-4">
                  <label className="form-label d-flex align-items-center gap-2" htmlFor="job-location">
                    <MapPin size={14} className="text-secondary" />
                    <span>Location</span>
                  </label>
                  <input
                    id="job-location"
                    type="text"
                    className="form-control"
                    placeholder="e.g. Remote, New York, Hybrid"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={isView || loading}
                  />
                </div>

                {/* Application Date */}
                <div className="col-12 col-md-4">
                  <label className="form-label d-flex align-items-center gap-2" htmlFor="job-date">
                    <Calendar size={14} className="text-secondary" />
                    <span>Application Date *</span>
                  </label>
                  <input
                    id="job-date"
                    type="date"
                    className={`form-control ${errors.applicationDate ? 'is-invalid border-danger' : ''}`}
                    value={formData.applicationDate}
                    onChange={(e) => {
                      setFormData({ ...formData, applicationDate: e.target.value });
                      if (errors.applicationDate) setErrors({ ...errors, applicationDate: '' });
                    }}
                    disabled={isView || loading}
                    required
                  />
                  {errors.applicationDate && (
                    <div className="text-danger small mt-1">{errors.applicationDate}</div>
                  )}
                </div>

                {/* Application Status */}
                <div className="col-12 col-md-4">
                  <label className="form-label d-flex align-items-center gap-2" htmlFor="job-status">
                    <CheckCircle size={14} className="text-secondary" />
                    <span>Status</span>
                  </label>
                  <select
                    id="job-status"
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    disabled={isView || loading}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job URL */}
                <div className="col-12">
                  <label className="form-label d-flex align-items-center gap-2" htmlFor="job-url">
                    <Globe size={14} className="text-secondary" />
                    <span>Job Listing URL</span>
                  </label>
                  <input
                    id="job-url"
                    type="url"
                    className={`form-control ${errors.jobUrl ? 'is-invalid border-danger' : ''}`}
                    placeholder="https://company.com/careers/job-id"
                    value={formData.jobUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, jobUrl: e.target.value });
                      if (errors.jobUrl) setErrors({ ...errors, jobUrl: '' });
                    }}
                    disabled={isView || loading}
                  />
                  {errors.jobUrl && (
                    <div className="text-danger small mt-1">{errors.jobUrl}</div>
                  )}
                  {isView && formData.jobUrl && (
                    <div className="mt-2">
                      <a href={formData.jobUrl} target="_blank" rel="noopener noreferrer" className="text-primary-accent small text-decoration-none">
                        Open Job Listing in new tab &rarr;
                      </a>
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div className="col-12">
                  <label className="form-label d-flex align-items-center gap-2" htmlFor="job-notes">
                    <FileText size={14} className="text-secondary" />
                    <span>Notes & Interview Insights</span>
                  </label>
                  <textarea
                    id="job-notes"
                    rows="3"
                    className="form-control"
                    placeholder="Recruiter contact, interview rounds, salary expectations, tech stack notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    disabled={isView || loading}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer d-flex justify-content-end gap-2">
              <button 
                type="button" 
                className="btn btn-secondary-outline" 
                onClick={onClose}
                disabled={loading}
              >
                {isView ? 'Close' : 'Cancel'}
              </button>

              {!isView && (
                <button 
                  type="submit" 
                  id="btn-modal-save"
                  className="btn btn-primary-gradient d-flex align-items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{isEdit ? 'Update Application' : 'Save Application'}</span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
