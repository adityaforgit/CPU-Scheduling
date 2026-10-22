import React, { useState } from 'react';
import { X, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';
import { ALGORITHMS, ALGORITHM_DETAILS } from '../algorithms/types.js';

export default function HowItWorksModal({ isOpen, onClose, initialAlgorithm = ALGORITHMS.FCFS }) {
  const [activeTab, setActiveTab] = useState(initialAlgorithm);

  if (!isOpen) return null;

  const currentDetails = ALGORITHM_DETAILS[activeTab] || ALGORITHM_DETAILS[ALGORITHMS.FCFS];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container-card how-it-works-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-left">
            <BookOpen size={20} className="text-blue" />
            <div>
              <h3 className="modal-title-text">How CPU Scheduling Works</h3>
              <p className="modal-subtitle-text">Fundamental Operating System Scheduling Concepts</p>
            </div>
          </div>
          <button type="button" className="modal-x-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        {/* Algorithm Tabs */}
        <div className="modal-tabs-scroller">
          {Object.entries(ALGORITHM_DETAILS).map(([key, details]) => (
            <button
              key={key}
              type="button"
              className={`modal-pill-tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {details.shortName}
            </button>
          ))}
        </div>

        <div className="modal-scroll-body">
          <div className="algo-header-badge-row">
            <h4 className="algo-guide-name">{currentDetails.shortName} · {currentDetails.name}</h4>
            <span className="algo-badge-tag">{currentDetails.type}</span>
          </div>

          <p className="algo-guide-desc">{currentDetails.description}</p>

          <div className="formulas-explanation-box">
            <h5 className="box-section-heading">Key Scheduling Metrics & Formulas</h5>
            <div className="formulas-card-grid">
              <div className="f-card">
                <span className="f-title">Turnaround Time (TAT)</span>
                <code>Completion Time - Arrival Time</code>
              </div>
              <div className="f-card">
                <span className="f-title">Waiting Time (WT)</span>
                <code>Turnaround Time - Burst Time</code>
              </div>
              <div className="f-card">
                <span className="f-title">Response Time (RT)</span>
                <code>First CPU Allocation - Arrival Time</code>
              </div>
              <div className="f-card">
                <span className="f-title">CPU Utilization</span>
                <code>(Busy CPU Time / Total Time) × 100</code>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer-bar">
          <button type="button" className="btn-close-modal" onClick={onClose}>
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}

