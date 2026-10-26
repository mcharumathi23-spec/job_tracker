import apiClient from './api';

/**
 * Job Application CRUD and Dashboard analytics service.
 */
export const jobService = {
  /**
   * Retrieve applications with optional status and search filters.
   */
  async getJobs(status = '', search = '') {
    const params = {};
    if (status) params.status = status;
    if (search && search.trim()) params.search = search.trim();

    const response = await apiClient.get('/jobs', { params });
    return response.data;
  },

  /**
   * Retrieve a single application by ID.
   */
  async getJobById(id) {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  },

  /**
   * Create a new job application.
   */
  async createJob(jobData) {
    const response = await apiClient.post('/jobs', jobData);
    return response.data;
  },

  /**
   * Update an existing job application.
   */
  async updateJob(id, jobData) {
    const response = await apiClient.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  /**
   * Update status of an application.
   */
  async updateJobStatus(id, status) {
    const response = await apiClient.patch(`/jobs/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete an application by ID.
   */
  async deleteJob(id) {
    const response = await apiClient.delete(`/jobs/${id}`);
    return response.data;
  },

  /**
   * Retrieve dashboard KPI metrics and status distribution.
   */
  async getJobStats() {
    const response = await apiClient.get('/jobs/stats');
    return response.data;
  }
};

export default jobService;
