import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  Database, 
  Server 
} from 'lucide-react';
import { API_BASE_URL } from '../services/api';

const sampleChartData = [
  { month: 'Jun', applied: 4, interviews: 1 },
  { month: 'Jul', applied: 7, interviews: 2 },
  { month: 'Aug', applied: 10, interviews: 4 },
  { month: 'Sep', applied: 14, interviews: 5 },
  { month: 'Oct', applied: 12, interviews: 3 },
];

const placeholderApplications = [
  {
    id: 1,
    company: 'Stripe',
    role: 'Full Stack Engineer',
    location: 'Remote',
    status: 'INTERVIEWING',
    statusBadge: 'badge-soft-warning',
    statusLabel: 'Interviewing',
    date: 'Oct 22, 2026',
    salary: '$140k - $165k'
  },
  {
    id: 2,
    company: 'Datadog',
    role: 'Backend Java Developer',
    location: 'New York, NY (Hybrid)',
    status: 'APPLIED',
    statusBadge: 'badge-soft-primary',
    statusLabel: 'Applied',
    date: 'Oct 20, 2026',
    salary: '$135k - $155k'
  },
  {
    id: 3,
    company: 'Linear',
    role: 'Software Engineer - Platform',
    location: 'San Francisco, CA',
    status: 'OFFER',
    statusBadge: 'badge-soft-success',
    statusLabel: 'Offer Received',
    date: 'Oct 15, 2026',
    salary: '$150k - $175k'
  },
  {
    id: 4,
    company: 'Shopify',
    role: 'Senior Java / Spring Engineer',
    location: 'Remote',
    status: 'WISHLIST',
    statusBadge: 'badge-soft-secondary',
    statusLabel: 'Wishlist',
    date: 'Oct 12, 2026',
    salary: '$145k - $170k'
  }
];

export default function DashboardPlaceholder() {
  return (
    <div className="row g-4 mt-1">
      {/* Analytics Chart Section */}
      <div className="col-12 col-lg-8">
        <div className="glass-card p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="text-white fw-bold mb-1">Application Velocity & Funnel</h5>
              <p className="text-secondary small mb-0">Overview of applications submitted vs interviews scheduled</p>
            </div>
            <div className="badge-soft badge-soft-primary">
              Live Recharts Engine
            </div>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sampleChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApplied" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    borderColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: '8px',
                    color: '#f8fafc' 
                  }} 
                />
                <Area type="monotone" dataKey="applied" name="Applications" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorApplied)" />
                <Area type="monotone" dataKey="interviews" name="Interviews" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorInterviews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* System Architecture Readiness Card */}
      <div className="col-12 col-lg-4">
        <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="icon-wrapper icon-cyan" style={{ width: '36px', height: '36px' }}>
                <Layers size={18} />
              </div>
              <h5 className="text-white fw-bold mb-0">Phase 1 Architecture</h5>
            </div>
            <p className="text-secondary small mb-3">
              The project shell and foundation are prepared and verified for future phases.
            </p>

            <div className="d-flex flex-column gap-3">
              <div className="p-3 rounded-3" style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Server size={16} className="text-indigo" />
                  <span className="text-white fw-semibold small">Backend Service</span>
                </div>
                <div className="text-secondary small">Spring Boot 3.3 (Java 21) &bull; Port 8080</div>
                <div className="text-primary-accent small mt-1 font-monospace">{API_BASE_URL}</div>
              </div>

              <div className="p-3 rounded-3" style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Database size={16} className="text-success" />
                  <span className="text-white fw-semibold small">Database Layer</span>
                </div>
                <div className="text-secondary small">MySQL 8.0 &bull; <code>jobtrack_db</code></div>
                <div className="badge-soft badge-soft-success small mt-1">JPA / Hibernate Ready</div>
              </div>

              <div className="p-3 rounded-3" style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <ShieldCheck size={16} className="text-warning" />
                  <span className="text-white fw-semibold small">Security Pipeline</span>
                </div>
                <div className="text-secondary small">Pre-wired for Spring Security & JWT</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table Placeholder Shell */}
      <div className="col-12">
        <div className="glass-card p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <h5 className="text-white fw-bold mb-1">Tracked Applications</h5>
              <p className="text-secondary small mb-0">Preview shell for managing application stages and interview schedules</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-secondary-outline btn-sm">Filter Status</button>
              <button className="btn btn-secondary-outline btn-sm">Export CSV</button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table custom-table align-middle mb-0">
              <thead>
                <tr>
                  <th>Company & Role</th>
                  <th>Location</th>
                  <th>Salary Range</th>
                  <th>Date Tracked</th>
                  <th>Stage</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {placeholderApplications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon-wrapper icon-primary" style={{ width: '40px', height: '40px' }}>
                          <Building2 size={18} />
                        </div>
                        <div>
                          <div className="fw-semibold text-white">{app.company}</div>
                          <div className="text-secondary small">{app.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1 text-secondary small">
                        <MapPin size={14} />
                        <span>{app.location}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-slate-300 small fw-medium">{app.salary}</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1 text-secondary small">
                        <Calendar size={14} />
                        <span>{app.date}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge-soft ${app.statusBadge}`}>
                        {app.statusLabel}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-link text-secondary p-0 text-decoration-none" title="View details">
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
