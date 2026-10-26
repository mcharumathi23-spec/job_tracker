import React from 'react';
import { Briefcase, Activity, Plus, Compass, LogOut, User, FolderKanban } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab, onOpenCreateJob }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg app-navbar px-3 py-2">
      <div className="container-fluid">
        {/* Brand */}
        <button 
          className="navbar-brand d-flex align-items-center gap-2 btn btn-link text-decoration-none p-0 border-0" 
          onClick={() => setActiveTab('dashboard')} 
          id="brand-logo"
        >
          <div className="icon-wrapper icon-primary p-2" style={{ width: '38px', height: '38px' }}>
            <Briefcase size={20} className="text-indigo" />
          </div>
          <span className="brand-gradient fs-5 fw-bold">Mini JobTrack</span>
        </button>

        {/* Mobile toggler */}
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

        {/* Navigation links & user controls */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-lg-1">
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-decoration-none border-0 d-flex align-items-center gap-2 ${activeTab === 'dashboard' ? 'text-white fw-semibold active' : 'text-secondary'}`}
                onClick={() => setActiveTab('dashboard')}
                id="nav-tab-dashboard"
              >
                <Activity size={16} className={activeTab === 'dashboard' ? 'text-primary-accent' : ''} />
                <span>Dashboard</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-decoration-none border-0 d-flex align-items-center gap-2 ${activeTab === 'applications' ? 'text-white fw-semibold active' : 'text-secondary'}`}
                onClick={() => setActiveTab('applications')}
                id="nav-tab-applications"
              >
                <FolderKanban size={16} className={activeTab === 'applications' ? 'text-primary-accent' : ''} />
                <span>My Applications</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-decoration-none border-0 d-flex align-items-center gap-2 ${activeTab === 'find-jobs' ? 'text-white fw-semibold active' : 'text-secondary'}`}
                onClick={() => setActiveTab('find-jobs')}
                id="nav-tab-find-jobs"
              >
                <Compass size={16} className={activeTab === 'find-jobs' ? 'text-primary-accent' : ''} />
                <span>Find Jobs</span>
              </button>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Quick Create Application button */}
            <button 
              type="button" 
              className="btn btn-primary-gradient d-flex align-items-center gap-2 btn-sm px-3 py-2"
              id="btn-navbar-new-app"
              onClick={onOpenCreateJob}
            >
              <Plus size={16} />
              <span>Track Job</span>
            </button>

            {/* User Profile Badge */}
            {user && (
              <div className="d-flex align-items-center gap-2 px-2 py-1 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div className="icon-wrapper icon-primary" style={{ width: '28px', height: '28px', borderRadius: '50%' }}>
                  <User size={14} className="text-indigo" />
                </div>
                <div className="d-none d-md-block text-start lh-1">
                  <div className="fw-semibold text-white small" style={{ fontSize: '0.8rem' }}>{user.name}</div>
                  <div className="text-secondary small" style={{ fontSize: '0.7rem' }}>{user.email}</div>
                </div>
              </div>
            )}

            {/* Logout button */}
            <button
              type="button"
              className="btn btn-secondary-outline btn-sm d-flex align-items-center gap-1 py-2 px-3"
              onClick={logout}
              id="btn-logout"
              title="Sign Out"
            >
              <LogOut size={15} />
              <span className="d-none d-sm-inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
