/**
 * Mini JobTrack Constants matching backend JobStatus enum.
 */
export const APPLICATION_STATUS = {
  SAVED: { label: 'Saved', color: '#64748b', badgeClass: 'badge-soft-secondary' },
  APPLIED: { label: 'Applied', color: '#6366f1', badgeClass: 'badge-soft-primary' },
  INTERVIEW: { label: 'Interview', color: '#f59e0b', badgeClass: 'badge-soft-warning' },
  OFFER: { label: 'Offer Received', color: '#10b981', badgeClass: 'badge-soft-success' },
  REJECTED: { label: 'Rejected', color: '#ef4444', badgeClass: 'badge-soft-danger' },
  WITHDRAWN: { label: 'Withdrawn', color: '#94a3b8', badgeClass: 'badge-soft-secondary' },
};

export const STATUS_OPTIONS = [
  { value: 'SAVED', label: 'Saved' },
  { value: 'APPLIED', label: 'Applied' },
  { value: 'INTERVIEW', label: 'Interview' },
  { value: 'OFFER', label: 'Offer Received' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'WITHDRAWN', label: 'Withdrawn' },
];

export const JOB_LOCATIONS = ['Remote', 'Hybrid', 'On-site'];
