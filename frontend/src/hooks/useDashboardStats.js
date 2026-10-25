import { useState } from 'react';

/**
 * Custom hook providing placeholder state for dashboard metrics and analytics
 * during Phase 1 (frontend shell setup).
 */
export function useDashboardStats() {
  const [stats] = useState({
    totalApplications: 12,
    activeInterviews: 3,
    offersReceived: 1,
    rejections: 2,
    responseRate: '42%',
  });

  return { stats };
}
