import React, { useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardView from './pages/DashboardView';
import ApplicationsView from './pages/ApplicationsView';
import FindJobsView from './pages/FindJobsView';
import JobModal from './components/JobModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ToastAlert from './components/ToastAlert';
import jobService from './services/jobService';

function MainApp() {
  const { isAuthenticated, loading } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'applications' | 'find-jobs'

  // Modal states
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [jobModalMode, setJobModalMode] = useState('create'); // 'create' | 'edit' | 'view'
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobModalLoading, setJobModalLoading] = useState(false);

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Refresh trigger for views
  const [refreshCounter, setRefreshCounter] = useState(0);
  const triggerRefresh = () => setRefreshCounter((c) => c + 1);

  // Toast state
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Job Modal Handlers
  const handleOpenCreateJob = () => {
    setSelectedJob(null);
    setJobModalMode('create');
    setJobModalOpen(true);
  };

  const handleOpenEditJob = (job) => {
    setSelectedJob(job);
    setJobModalMode('edit');
    setJobModalOpen(true);
  };

  const handleOpenViewJob = (job) => {
    setSelectedJob(job);
    setJobModalMode('view');
    setJobModalOpen(true);
  };

  const handleCloseJobModal = () => {
    setJobModalOpen(false);
    setSelectedJob(null);
  };

  const handleSaveJob = async (formData) => {
    setJobModalLoading(true);
    try {
      if (jobModalMode === 'create') {
        await jobService.createJob(formData);
        showToast(`Created application for ${formData.companyName}!`, 'success');
      } else if (jobModalMode === 'edit' && selectedJob) {
        await jobService.updateJob(selectedJob.id, formData);
        showToast(`Updated application for ${formData.companyName}!`, 'success');
      }
      handleCloseJobModal();
      triggerRefresh();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save job application.', 'error');
    } finally {
      setJobModalLoading(false);
    }
  };

  // Delete Modal Handlers
  const handleOpenDeleteJob = (job) => {
    setJobToDelete(job);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setJobToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    setDeleteLoading(true);
    try {
      await jobService.deleteJob(jobToDelete.id);
      showToast(`Deleted application for ${jobToDelete.companyName}.`, 'success');
      handleCloseDeleteModal();
      triggerRefresh();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete application.', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading application...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <ToastAlert toast={toast} onClose={() => setToast(null)} />
        <main className="flex-grow-1">
          {authView === 'login' ? (
            <LoginPage onNavigateRegister={() => setAuthView('register')} />
          ) : (
            <RegisterPage onNavigateLogin={() => setAuthView('login')} />
          )}
        </main>
        <footer className="py-4 border-top border-secondary border-opacity-10 mt-auto">
          <div className="container-fluid px-3 px-md-5 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
            <span className="text-secondary small">
              &copy; {new Date().getFullYear()} Mini JobTrack &bull; Full-Stack Career Management
            </span>
            <span className="badge-soft badge-soft-primary small">
              JWT &bull; Spring Security &bull; MySQL
            </span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Toast notifications */}
      <ToastAlert toast={toast} onClose={() => setToast(null)} />

      {/* Navigation bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenCreateJob={handleOpenCreateJob} 
      />

      {/* Main views */}
      <main className="flex-grow-1">
        {activeTab === 'dashboard' && (
          <DashboardView 
            key={`dash-${refreshCounter}`}
            onOpenCreateModal={handleOpenCreateJob}
            onNavigateApplications={() => setActiveTab('applications')}
            onViewJob={handleOpenViewJob}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsView 
            triggerRefresh={refreshCounter}
            onOpenCreate={handleOpenCreateJob}
            onOpenEdit={handleOpenEditJob}
            onOpenView={handleOpenViewJob}
            onOpenDelete={handleOpenDeleteJob}
            showToast={showToast}
          />
        )}

        {activeTab === 'find-jobs' && (
          <FindJobsView onNavigateApplications={() => setActiveTab('applications')} />
        )}
      </main>

      {/* Job Create/Edit/View Modal */}
      <JobModal 
        isOpen={jobModalOpen}
        mode={jobModalMode}
        job={selectedJob}
        onClose={handleCloseJobModal}
        onSave={handleSaveJob}
        loading={jobModalLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={deleteModalOpen}
        job={jobToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />

      {/* Footer */}
      <footer className="py-4 border-top border-secondary border-opacity-10 mt-auto">
        <div className="container-fluid px-3 px-md-5 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <span className="text-secondary small">
            &copy; {new Date().getFullYear()} Mini JobTrack &bull; Full-Stack Job Application Tracker
          </span>
          <span className="badge-soft badge-soft-success small">
            <span className="live-dot me-1"></span>
            Spring Boot 3.3.5 &bull; React 19 &bull; MySQL 8
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
