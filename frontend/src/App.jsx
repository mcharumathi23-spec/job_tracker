import React from 'react';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <DashboardPage />
      </main>
      <footer className="py-4 border-top border-secondary border-opacity-10 mt-auto">
        <div className="container-fluid px-3 px-md-5 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <span className="text-secondary small">
            &copy; {new Date().getFullYear()} Mini JobTrack &bull; Full-Stack Job Application Tracker
          </span>
          <span className="badge-soft badge-soft-secondary small">
            Phase 1: Environment & Project Foundation
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
