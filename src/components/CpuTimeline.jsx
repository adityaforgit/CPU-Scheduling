import React, { useState } from 'react';
import { BarChart2, Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { IDLE_COLOR } from '../algorithms/types.js';

export default function CpuTimeline({
  timeline = [],
  totalTime = 0,
  processStats = []
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!timeline || timeline.length === 0) return null;

  // Determine tick interval based on total time (e.g., step of 2 for totalTime <= 20, 5 for <= 50, etc.)
  const step = totalTime <= 20 ? 2 : totalTime <= 50 ? 5 : 10;
  const axisTicks = [];
  for (let t = 0; t <= totalTime; t += step) {
    axisTicks.push(t);
  }
  if (!axisTicks.includes(totalTime)) {
    axisTicks.push(totalTime);
  }

  // Check if IDLE exists in timeline
  const hasIdle = timeline.some((t) => t.processId === 'IDLE');

  return (
    <div className="card cpu-timeline-card">
      <div className="card-header timeline-header">
        <div className="timeline-header-left">
          <div className="card-header-title">
            <BarChart2 size={20} className="header-icon-blue" />
            <h2 className="card-title">CPU Timeline</h2>
          </div>
          <p className="card-subtitle">Execution order over time</p>
        </div>

        {/* Legend on top right */}
        <div className="timeline-legend">
          {hasIdle && (
            <div className="legend-entry">
              <span className="legend-dot idle-dot" />
              <span className="legend-label">Idle</span>
            </div>
          )}
          {processStats.map((p) => (
            <div key={p.id} className="legend-entry">
              <span
                className="legend-dot"
                style={{ backgroundColor: p.color }}
              />
              <span className="legend-label">{p.id}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-body timeline-body">
        <div className="timeline-scroll-container">
          <div className="timeline-visual-area">
            {/* Horizontal Continuous Bar */}
            <div className="gantt-main-bar">
              {timeline.map((slice, idx) => {
                const widthPercent = totalTime > 0 ? (slice.duration / totalTime) * 100 : 0;
                const isIdle = slice.processId === 'IDLE';
                const isHovered = hoveredIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`timeline-segment ${isIdle ? 'segment-idle' : ''} ${isHovered ? 'hovered' : ''}`}
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: isIdle ? undefined : slice.color
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span className="segment-label">{slice.processId}</span>

                    {/* Hover tooltip */}
                    {isHovered && (
                      <div className="segment-tooltip">
                        <div className="tooltip-heading">
                          {isIdle ? 'CPU IDLE' : `Process ${slice.processId}`}
                        </div>
                        <div className="tooltip-row">
                          <span>Start: <strong>{slice.startTime} ms</strong></span>
                          <span>End: <strong>{slice.endTime} ms</strong></span>
                        </div>
                        <div className="tooltip-row">
                          <span>Duration: <strong>{slice.duration} ms</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Time Axis with ticks */}
            <div className="timeline-axis-track">
              {axisTicks.map((t) => {
                const leftPercent = totalTime > 0 ? (t / totalTime) * 100 : 0;
                return (
                  <div
                    key={t}
                    className="axis-tick-marker"
                    style={{ left: `${leftPercent}%` }}
                  >
                    <div className="tick-pipe" />
                    <span className="tick-val">{t}</span>
                  </div>
                );
              })}
            </div>

            {/* Centered Axis Label */}
            <div className="axis-title-label">Time (ms)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

