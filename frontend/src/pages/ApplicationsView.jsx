import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  Globe, 
  MapPin, 
  Calendar, 
  Building, 
  Briefcase,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import jobService from '../services/jobService';
import { APPLICATION_STATUS, STATUS_OPTIONS } from '../utils/constants';

export default function ApplicationsView({ 
  onOpenCreate, 
  onOpenEdit, 
  onOpenView, 
  onOpenDelete, 
  triggerRefresh,
  showToast 
}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await jobService.getJobs(statusFilter, search);
      setJobs(data);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to fetch job applications.', 'error');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, showToast]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs, triggerRefresh]);

  const handleStatusChange = async (jobId, newStatus) => {
    setUpdatingStatusId(jobId);
    try {
      const updated = await jobService.updateJobStatus(jobId, newStatus);
      setJobs((prev) => prev.map((j) => (j.id === jobId ? updated : j)));
      showToast(`Status updated to "${APPLICATION_STATUS[newStatus]?.label || newStatus}"`, 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update status.', 'error');
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('');
  };

  return (
    <div className="container-fluid px-3 px-md-5 py-4">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fs-3 fw-bold text-white mb-1">My Applications</h2>
          <p className="text-secondary small mb-0">
            Track and manage all your active job applications in one unified pipeline.
          </p>
        </div>

        <div>
          <button
            id="btn-create-application"
            className="btn btn-primary-gradient d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm"
            onClick={onOpenCreate}
          >
            <Plus size={18} />
            <span className="fw-semibold">+ Create Application</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-3 mb-4">
        <div className="row g-2 align-items-center">
          {/* Search Box */}
          <div className="col-12 col-md-5">
            <div className="position-relative">
              <Search size={16} className="text-secondary position-absolute top-50 translate-middle-y ms-3" />
              <input
                id="search-input"
                type="text"
                className="form-control ps-5"
                placeholder="Search by company or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-12 col-sm-6 col-md-4">
            <div className="d-flex align-items-center gap-2">
              <Filter size={16} className="text-secondary flex-shrink-0 d-none d-sm-block" />
              <select
                id="status-filter-select"
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses ({jobs.length})</option>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset button */}
          <div className="col-12 col-sm-6 col-md-3 text-sm-end">
            {(search || statusFilter) && (
              <button 
                className="btn btn-secondary-outline btn-sm d-inline-flex align-items-center gap-1"
                onClick={handleResetFilters}
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Applications Table / Cards */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary my-4" role="status">
            <span className="visually-hidden">Loading applications...</span>
          </div>
          <p className="text-secondary small">Loading applications...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="glass-card p-5 text-center my-3">
          <div className="icon-wrapper icon-primary mx-auto mb-3" style={{ width: '56px', height: '56px' }}>
            <Briefcase size={28} className="text-indigo" />
          </div>
          <h4 className="fs-5 fw-bold text-white mb-2">No Applications Found</h4>
          <p className="text-secondary small max-w-sm mx-auto mb-4" style={{ maxWidth: '420px' }}>
            {search || statusFilter 
              ? 'No applications match your active search and filter criteria. Try resetting filters.'
              : 'You haven\'t tracked any job applications yet. Click below to add your first application!'}
          </p>
          {search || statusFilter ? (
            <button className="btn btn-secondary-outline btn-sm" onClick={handleResetFilters}>
              Clear Filters
            </button>
          ) : (
            <button 
              id="btn-empty-create-app"
              className="btn btn-primary-gradient px-3 py-2 d-inline-flex align-items-center gap-2"
              onClick={onOpenCreate}
            >
              <Plus size={16} />
              <span>+ Create Application</span>
            </button>
          )}
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="table-responsive">
            <table className="table custom-table mb-0 align-middle">
              <thead>
                <tr>
                  <th scope="col" className="ps-4">Company & Role</th>
                  <th scope="col">Location</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Job Link</th>
                  <th scope="col" className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => {
                  const statusConfig = APPLICATION_STATUS[job.status] || {
                    label: job.status,
                    badgeClass: 'badge-soft-secondary'
                  };

                  return (
                    <tr key={job.id} id={`job-row-${job.id}`}>
                      {/* Company & Role */}
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="icon-wrapper icon-primary p-2 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                            <Building size={18} className="text-indigo" />
                          </div>
                          <div>
                            <div className="fw-bold text-white fs-6">{job.jobRole}</div>
                            <div className="text-secondary small d-flex align-items-center gap-1">
                              <span>{job.companyName}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td>
                        <div className="d-flex align-items-center gap-1 text-secondary small">
                          <MapPin size={13} />
                          <span>{job.location || 'Remote'}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td>
                        <div className="d-flex align-items-center gap-1 text-secondary small">
                          <Calendar size={13} />
                          <span>{job.applicationDate ? job.applicationDate.split('T')[0] : 'N/A'}</span>
                        </div>
                      </td>

                      {/* Status Dropdown with Instant PATCH */}
                      <td>
                        <div className="d-inline-block">
                          <select
                            className={`form-select form-select-sm status-select-sm border-0 ${statusConfig.badgeClass}`}
                            value={job.status}
                            onChange={(e) => handleStatusChange(job.id, e.target.value)}
                            disabled={updatingStatusId === job.id}
                            title="Change status"
                            aria-label={`Change status for ${job.jobRole}`}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-dark text-white">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      {/* Job URL */}
                      <td>
                        {job.jobUrl ? (
                          <a 
                            href={job.jobUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary-accent small text-decoration-none d-inline-flex align-items-center gap-1"
                            title="Open external job post"
                          >
                            <Globe size={13} />
                            <span>Listing</span>
                          </a>
                        ) : (
                          <span className="text-secondary small">&mdash;</span>
                        )}
                      </td>

                      {/* Action buttons: View, Edit, Delete */}
                      <td className="text-end pe-4">
                        <div className="d-inline-flex align-items-center gap-1">
                          {/* View Button */}
                          <button
                            type="button"
                            className="btn-action-icon"
                            title="View Details"
                            onClick={() => onOpenView(job)}
                            id={`btn-view-${job.id}`}
                            aria-label="View application"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit Button */}
                          <button
                            type="button"
                            className="btn-action-icon"
                            title="Edit Application"
                            onClick={() => onOpenEdit(job)}
                            id={`btn-edit-${job.id}`}
                            aria-label="Edit application"
                          >
                            <Edit3 size={16} />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            className="btn-action-icon btn-delete"
                            title="Delete Application"
                            onClick={() => onOpenDelete(job)}
                            id={`btn-delete-${job.id}`}
                            aria-label="Delete application"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
