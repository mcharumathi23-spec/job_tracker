import React from 'react';
import { Briefcase, Activity, Plus, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg app-navbar px-3 py-2">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#home" id="brand-logo">
          <div className="icon-wrapper icon-primary p-2" style={{ width: '38px', height: '38px' }}>
            <Briefcase size={20} className="text-indigo" />
          </div>
          <span className="brand-gradient fs-5 fw-bold">Mini JobTrack</span>
        </a>

        <button 
          className="navbar-toggler border-0 text-white" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-lg-1">
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold active d-flex align-items-center gap-2" href="#dashboard">
                <Activity size={16} className="text-primary-accent" />
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#applications">Applications</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#analytics">Analytics</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#job-search">Discover Jobs</a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <div className="badge-soft badge-soft-success d-none d-md-flex align-items-center">
              <span className="live-dot me-1"></span>
              <span>Phase 1 Shell Active</span>
            </div>

            <button 
              type="button" 
              className="btn btn-primary-gradient d-flex align-items-center gap-2 btn-sm px-3 py-2"
              id="btn-new-application"
            >
              <Plus size={16} />
              <span>Track New Job</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
