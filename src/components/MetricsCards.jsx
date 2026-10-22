import React from 'react';
import { Clock, RefreshCw, BarChart2, TrendingUp } from 'lucide-react';

export default function MetricsCards({ metrics }) {
  if (!metrics) return null;

  return (
    <div className="summary-cards-row">
      {/* 1. Average Waiting Time */}
      <div className="summary-stat-card">
        <div className="stat-card-left">
          <div className="stat-icon-circle blue-circle">
            <Clock size={20} className="stat-icon blue-icon" />
          </div>
          <div className="stat-text-group">
            <span className="stat-label">Average waiting time</span>
            <div className="stat-value-text">
              {metrics.avgWaitingTime} <span className="stat-unit">ms</span>
            </div>
          </div>
        </div>
        <div className="stat-trend-icon">
          <TrendingUp size={20} className="trend-icon-blue" />
        </div>
      </div>

      {/* 2. Average Turnaround Time */}
      <div className="summary-stat-card">
        <div className="stat-card-left">
          <div className="stat-icon-circle purple-circle">
            <RefreshCw size={20} className="stat-icon purple-icon" />
          </div>
          <div className="stat-text-group">
            <span className="stat-label">Average turnaround time</span>
            <div className="stat-value-text">
              {metrics.avgTurnaroundTime} <span className="stat-unit">ms</span>
            </div>
          </div>
        </div>
        <div className="stat-trend-icon">
          <TrendingUp size={20} className="trend-icon-purple" />
        </div>
      </div>

      {/* 3. CPU Utilization */}
      <div className="summary-stat-card">
        <div className="stat-card-left">
          <div className="stat-icon-circle teal-circle">
            <BarChart2 size={20} className="stat-icon teal-icon" />
          </div>
          <div className="stat-text-group">
            <span className="stat-label">CPU utilization</span>
            <div className="stat-value-text">
              {metrics.cpuUtilization}%
            </div>
          </div>
        </div>
        <div className="stat-trend-icon">
          <TrendingUp size={20} className="trend-icon-teal" />
        </div>
      </div>
    </div>
  );
}
