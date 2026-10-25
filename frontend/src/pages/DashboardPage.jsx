import React from 'react';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Compass, 
  Sparkles 
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import DashboardPlaceholder from '../components/DashboardPlaceholder';
import { useDashboardStats } from '../hooks/useDashboardStats';

export default function DashboardPage() {
  const { stats } = useDashboardStats();

  return (
    <div className="container-fluid px-3 px-md-5 py-4">
      {/* Hero / Header Section */}
      <div className="row align-items-center mb-4 g-3">
        <div className="col-12 col-md-8">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge-soft badge-soft-primary">
              <Sparkles size={13} className="text-indigo" />
              Full-Stack Application Dashboard
            </span>
          </div>
          <h1 className="display-6 fw-bold text-white mb-2">
            Mini JobTrack
          </h1>
          <p className="text-secondary mb-0 fs-6">
            Discover job listings, track personal applications, streamline your interview pipeline, and unlock career analytics.
          </p>
        </div>

        <div className="col-12 col-md-4 text-md-end">
          <div className="d-inline-flex gap-2">
            <button className="btn btn-secondary-outline d-flex align-items-center gap-2">
              <Compass size={16} />
              <span>Job Explorer</span>
            </button>
            <button className="btn btn-primary-gradient d-flex align-items-center gap-2">
              <Briefcase size={16} />
              <span>Track Job</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatsCard 
            title="Total Applications" 
            value={stats.totalApplications} 
            change="+4 this week" 
            changeType="primary"
            icon={Briefcase} 
            iconClass="icon-primary" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatsCard 
            title="Active Interviews" 
            value={stats.activeInterviews} 
            change="+2 upcoming" 
            changeType="warning"
            icon={Clock} 
            iconClass="icon-warning" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatsCard 
            title="Offers Received" 
            value={stats.offersReceived} 
            change="1 pending decision" 
            changeType="success"
            icon={CheckCircle2} 
            iconClass="icon-success" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatsCard 
            title="Interview Rate" 
            value={stats.responseRate} 
            change="+8% vs avg" 
            changeType="primary"
            icon={TrendingUp} 
            iconClass="icon-cyan" 
          />
        </div>
      </div>

      {/* Main Dashboard Placeholder Section */}
      <DashboardPlaceholder />
    </div>
  );
}
