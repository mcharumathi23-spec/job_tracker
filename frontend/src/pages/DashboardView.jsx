import React, { useState, useEffect, useCallback } from 'react';
import { 
  Briefcase, 
  Send, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Plus, 
  ArrowRight,
  TrendingUp,
  BarChart3,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import StatsCard from '../components/StatsCard';
import jobService from '../services/jobService';
import { APPLICATION_STATUS } from '../utils/constants';

export default function DashboardView({ onOpenCreateModal, onNavigateApplications, onViewJob }) {
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [statsData, jobsData] = await Promise.all([
        jobService.getJobStats(),
        jobService.getJobs()
      ]);
      setStats(statsData);
      setRecentJobs(jobsData.slice(0, 5));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard metrics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="container-fluid px-3 px-md-5 py-5 text-center">
        <div className="spinner-border text-primary my-5" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading metrics...</span>
        </div>
        <p className="text-secondary">Loading your live dashboard metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid px-3 px-md-5 py-5">
        <div className="alert alert-danger glass-card p-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <AlertCircle size={24} className="text-danger flex-shrink-0" />
            <div>
              <h6 className="fw-bold mb-1">Could not load dashboard</h6>
              <p className="small mb-0 text-secondary">{error}</p>
            </div>
          </div>
          <button className="btn btn-secondary-outline btn-sm" onClick={loadData}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const total = stats?.totalApplications ?? 0;
  const applied = stats?.applied ?? 0;
  const interviews = stats?.interview ?? 0;
  const offers = stats?.offer ?? 0;
  const rejections = stats?.rejected ?? 0;
  const saved = stats?.saved ?? 0;
  const withdrawn = stats?.withdrawn ?? 0;

  // Chart data from real backend metrics
  const chartData = [
    { name: 'Saved', count: saved, fill: '#64748b' },
    { name: 'Applied', count: applied, fill: '#6366f1' },
    { name: 'Interview', count: interviews, fill: '#f59e0b' },
    { name: 'Offer', count: offers, fill: '#10b981' },
    { name: 'Rejected', count: rejections, fill: '#ef4444' },
    { name: 'Withdrawn', count: withdrawn, fill: '#94a3b8' }
  ];

  return (
    <div className="container-fluid px-3 px-md-5 py-4">
      {/* Hero / Header Section */}
      <div className="row align-items-center mb-4 g-3">
        <div className="col-12 col-md-8">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge-soft badge-soft-primary">
              <Sparkles size={13} className="text-indigo" />
              Live Career Tracking
            </span>
          </div>
          <h1 className="display-6 fw-bold text-white mb-2">
            Mini JobTrack Dashboard
          </h1>
          <p className="text-secondary mb-0 fs-6">
            Track applications, monitor your interview pipeline, and unlock career analytics in real time.
          </p>
        </div>

        <div className="col-12 col-md-4 text-md-end">
          <button 
            id="btn-dashboard-create-app"
            className="btn btn-primary-gradient d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm"
            onClick={onOpenCreateModal}
          >
            <Plus size={18} />
            <span>+ Create Application</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl">
          <StatsCard 
            title="Total Applications" 
            value={total} 
            icon={Briefcase} 
            iconClass="icon-primary" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl">
          <StatsCard 
            title="Applied" 
            value={applied} 
            icon={Send} 
            iconClass="icon-cyan" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl">
          <StatsCard 
            title="Interviews" 
            value={interviews} 
            icon={Clock} 
            iconClass="icon-warning" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl">
          <StatsCard 
            title="Offers" 
            value={offers} 
            icon={CheckCircle2} 
            iconClass="icon-success" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl">
          <StatsCard 
            title="Rejections" 
            value={rejections} 
            icon={XCircle} 
            iconClass="icon-danger bg-danger bg-opacity-20 text-danger" 
          />
        </div>
      </div>

      {/* When total applications is zero, show empty state prompt */}
      {total === 0 ? (
        <div className="glass-card p-5 text-center my-4">
          <div className="icon-wrapper icon-primary mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
            <Briefcase size={32} className="text-indigo" />
          </div>
          <h3 className="fs-4 fw-bold text-white mb-2">No Applications Tracked Yet</h3>
          <p className="text-secondary max-w-md mx-auto mb-4" style={{ maxWidth: '500px' }}>
            Start your job hunt pipeline by logging your first application. You will be able to track interview rounds, take notes, and visualize your progress!
          </p>
          <button 
            id="btn-create-first-app"
            className="btn btn-primary-gradient px-4 py-2 fs-6 d-inline-flex align-items-center gap-2"
            onClick={onOpenCreateModal}
          >
            <Plus size={18} />
            <span>Create Your First Application</span>
          </button>
        </div>
      ) : (
        <div className="row g-4 mb-4">
          {/* Recharts Status Distribution Chart */}
          <div className="col-12 col-lg-7">
            <div className="glass-card p-4 h-100">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="icon-wrapper icon-primary p-2" style={{ width: '36px', height: '36px' }}>
                    <BarChart3 size={18} className="text-indigo" />
                  </div>
                  <div>
                    <h5 className="fs-6 fw-bold text-white mb-0">Application Pipeline Status</h5>
                    <span className="text-secondary small">Real-time status breakdown</span>
                  </div>
                </div>
              </div>

              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      allowDecimals={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '0.5rem',
                        color: '#f8fafc'
                      }}
                      formatter={(val) => [`${val} applications`, 'Count']}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Applications Preview */}
          <div className="col-12 col-lg-5">
            <div className="glass-card p-4 h-100 d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="icon-wrapper icon-cyan p-2" style={{ width: '36px', height: '36px' }}>
                    <Calendar size={18} />
                  </div>
                  <h5 className="fs-6 fw-bold text-white mb-0">Recent Applications</h5>
                </div>
                <button 
                  className="btn btn-link text-primary-accent p-0 small text-decoration-none d-flex align-items-center gap-1"
                  onClick={onNavigateApplications}
                >
                  <span>View All</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="table-responsive flex-grow-1">
                <table className="table custom-table table-borderless mb-0">
                  <tbody>
                    {recentJobs.map((job) => {
                      const statusConfig = APPLICATION_STATUS[job.status] || {
                        label: job.status,
                        badgeClass: 'badge-soft-secondary'
                      };
                      return (
                        <tr key={job.id} style={{ cursor: 'pointer' }} onClick={() => onViewJob(job)}>
                          <td className="ps-0 py-2">
                            <div className="fw-semibold text-white small">{job.companyName}</div>
                            <div className="text-secondary" style={{ fontSize: '0.75rem' }}>{job.jobRole}</div>
                          </td>
                          <td className="text-end py-2">
                            <span className={`badge-soft ${statusConfig.badgeClass} small`}>
                              {statusConfig.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
