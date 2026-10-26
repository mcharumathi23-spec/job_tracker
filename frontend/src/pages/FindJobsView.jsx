import React from 'react';
import { Compass, Sparkles, ExternalLink, Search, CheckCircle } from 'lucide-react';

export default function FindJobsView({ onNavigateApplications }) {
  return (
    <div className="container-fluid px-3 px-md-5 py-4">
      <div className="glass-card p-5 text-center my-4 mx-auto" style={{ maxWidth: '780px' }}>
        <div className="icon-wrapper icon-cyan mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
          <Compass size={32} />
        </div>

        <div className="d-inline-flex align-items-center gap-1 badge-soft badge-soft-primary mb-3">
          <Sparkles size={13} className="text-indigo" />
          <span>Planned Feature &bull; Phase 3</span>
        </div>

        <h2 className="fs-3 fw-bold text-white mb-2">Live Job Market Explorer</h2>
        <p className="text-secondary fs-6 mb-4">
          Direct integration with public job search providers (Adzuna, Indeed, Remotive) is scheduled for Phase 3. 
          When active, you will be able to search thousands of global tech roles and save them directly to your personal pipeline with a single click.
        </p>

        <div className="row g-3 text-start mb-4">
          <div className="col-12 col-md-4">
            <div className="p-3 rounded-3 h-100" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div className="fw-semibold text-white small mb-1 d-flex align-items-center gap-2">
                <Search size={14} className="text-indigo" />
                Aggregated Search
              </div>
              <p className="text-secondary small mb-0">Unified search across remote and regional boards.</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-3 rounded-3 h-100" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div className="fw-semibold text-white small mb-1 d-flex align-items-center gap-2">
                <CheckCircle size={14} className="text-success" />
                1-Click Import
              </div>
              <p className="text-secondary small mb-0">Instantly save job listings into your applications tracker.</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-3 rounded-3 h-100" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div className="fw-semibold text-white small mb-1 d-flex align-items-center gap-2">
                <ExternalLink size={14} className="text-cyan" />
                Salary Insights
              </div>
              <p className="text-secondary small mb-0">Compare market rate benchmarks across roles and seniority.</p>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary-gradient px-4 py-2"
          onClick={onNavigateApplications}
        >
          Go to My Applications
        </button>
      </div>
    </div>
  );
}
