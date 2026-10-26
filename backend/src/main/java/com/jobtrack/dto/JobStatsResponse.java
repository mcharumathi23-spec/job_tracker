package com.jobtrack.dto;

import java.util.List;

/**
 * Dashboard KPIs and status distribution response.
 */
public class JobStatsResponse {

    private long totalApplications;
    private long applied;
    private long interviews;
    private long offers;
    private long rejections;
    private long saved;
    private long withdrawn;
    private List<StatusDistribution> statusDistribution;

    public JobStatsResponse() {
    }

    public JobStatsResponse(long totalApplications, long applied, long interviews,
                            long offers, long rejections, long saved, long withdrawn,
                            List<StatusDistribution> statusDistribution) {
        this.totalApplications = totalApplications;
        this.applied = applied;
        this.interviews = interviews;
        this.offers = offers;
        this.rejections = rejections;
        this.saved = saved;
        this.withdrawn = withdrawn;
        this.statusDistribution = statusDistribution;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public long getApplied() {
        return applied;
    }

    public void setApplied(long applied) {
        this.applied = applied;
    }

    public long getInterviews() {
        return interviews;
    }

    public void setInterviews(long interviews) {
        this.interviews = interviews;
    }

    public long getOffers() {
        return offers;
    }

    public void setOffers(long offers) {
        this.offers = offers;
    }

    public long getRejections() {
        return rejections;
    }

    public void setRejections(long rejections) {
        this.rejections = rejections;
    }

    public long getSaved() {
        return saved;
    }

    public void setSaved(long saved) {
        this.saved = saved;
    }

    public long getWithdrawn() {
        return withdrawn;
    }

    public void setWithdrawn(long withdrawn) {
        this.withdrawn = withdrawn;
    }

    public List<StatusDistribution> getStatusDistribution() {
        return statusDistribution;
    }

    public void setStatusDistribution(List<StatusDistribution> statusDistribution) {
        this.statusDistribution = statusDistribution;
    }

    public static class StatusDistribution {
        private String status;
        private String label;
        private long count;
        private String color;

        public StatusDistribution() {
        }

        public StatusDistribution(String status, String label, long count, String color) {
            this.status = status;
            this.label = label;
            this.count = count;
            this.color = color;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }
    }
}
