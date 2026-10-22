import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart2, PieChart as PieIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { IDLE_COLOR } from '../algorithms/types.js';

export default function RechartsVisualizations({ processStats = [], metrics }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!processStats || processStats.length === 0) return null;

  const barData = processStats.map((p) => ({
    name: p.id,
    'Burst Time': p.burstTime,
    'Waiting Time': p.waitingTime,
    'Turnaround Time': p.turnaroundTime,
    'Response Time': p.responseTime
  }));

  const pieData = [
    { name: 'Busy CPU Time', value: metrics.busyTime, color: '#2563eb' },
    { name: 'Idle CPU Time', value: metrics.idleTime, color: '#94a3b8' }
  ].filter(d => d.value > 0);

  return (
    <div className="card recharts-analytics-card">
      <div className="card-header analytics-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="card-header-title">
          <BarChart2 size={20} className="header-icon-blue" />
          <h2 className="card-title">Performance Analytics (Recharts)</h2>
        </div>
        <button
          type="button"
          className="toggle-expand-btn"
          aria-label={isExpanded ? 'Collapse analytics' : 'Expand analytics'}
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {isExpanded && (
        <div className="card-body analytics-body">
          <div className="analytics-grid">
            {/* 1. Recharts Grouped Bar Chart */}
            <div className="chart-box">
              <h4 className="chart-box-title">Process Timing Comparison</h4>
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#334155', fontSize: 12 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    <Bar dataKey="Burst Time" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Waiting Time" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Turnaround Time" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Response Time" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 2. Recharts Donut Chart */}
            <div className="chart-box">
              <h4 className="chart-box-title">CPU Utilization Ratio</h4>
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="48%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
