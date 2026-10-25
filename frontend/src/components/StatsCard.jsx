import React from 'react';

export default function StatsCard({ title, value, change, changeType, icon: Icon, iconClass }) {
  return (
    <div className="glass-card stat-card h-100">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <span className="text-secondary small fw-medium text-uppercase letter-spacing-1">{title}</span>
          <h2 className="fs-3 fw-bold mt-2 mb-1 text-white">{value}</h2>
          {change && (
            <div className="d-flex align-items-center gap-1 mt-2">
              <span className={`badge-soft badge-soft-${changeType || 'primary'} small`}>
                {change}
              </span>
              <span className="text-secondary small ms-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`icon-wrapper ${iconClass || 'icon-primary'}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
