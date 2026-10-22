import React from 'react';
import { Settings, Info, Clock, ArrowUpDown } from 'lucide-react';
import { ALGORITHMS, ALGORITHM_DETAILS } from '../algorithms/types.js';

export default function AlgorithmSettingsCard({
  selectedAlgorithm,
  timeQuantum,
  onChangeTimeQuantum,
  priorityMode,
  onChangePriorityMode,
  priorityHigherValueIsHigher,
  onChangePriorityDirection,
  onOpenDetails
}) {
  const currentDetails = ALGORITHM_DETAILS[selectedAlgorithm] || {};

  return (
    <div className="card algorithm-settings-card">
      <div className="card-header">
        <div className="card-header-title">
          <Settings size={20} className="header-icon-blue" />
          <h2 className="card-title">Algorithm settings</h2>
        </div>
      </div>

      <div className="card-body">
        <div className="settings-inner-box">
          <div className="settings-box-header">
            <div className="settings-box-title">
              {currentDetails.shortName} · {currentDetails.name}
            </div>
            <button
              type="button"
              className="info-circle-btn"
              onClick={onOpenDetails}
              title="Learn how this algorithm works"
              aria-label="Algorithm details"
            >
              <Info size={17} />
            </button>
          </div>

          <p className="settings-box-desc">{currentDetails.description}</p>

          {/* Round Robin Time Quantum Controls */}
          {selectedAlgorithm === ALGORITHMS.ROUND_ROBIN && (
            <div className="settings-custom-controls">
              <div className="control-label-row">
                <Clock size={16} className="text-blue" />
                <label htmlFor="quantum-input" className="control-field-label">
                  Time Quantum (Q):
                </label>
              </div>
              <div className="quantum-stepper-wrap">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => onChangeTimeQuantum(Math.max(1, Number(timeQuantum) - 1))}
                  aria-label="Decrease time quantum"
                >
                  -
                </button>
                <input
                  id="quantum-input"
                  type="number"
                  min="1"
                  max="100"
                  value={timeQuantum}
                  onChange={(e) => onChangeTimeQuantum(e.target.value)}
                  className="quantum-number-input"
                />
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => onChangeTimeQuantum(Number(timeQuantum) + 1)}
                  aria-label="Increase time quantum"
                >
                  +
                </button>
              </div>
              <div className="quantum-quick-presets">
                {[1, 2, 3, 4, 5].map((q) => (
                  <button
                    key={q}
                    type="button"
                    className={`preset-pill ${Number(timeQuantum) === q ? 'active' : ''}`}
                    onClick={() => onChangeTimeQuantum(q)}
                  >
                    Q = {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Priority Controls */}
          {selectedAlgorithm === ALGORITHMS.PRIORITY && (
            <div className="settings-custom-controls">
              <div className="priority-option-group">
                <span className="control-field-label">Scheduling Mode:</span>
                <div className="btn-toggle-pair">
                  <button
                    type="button"
                    className={`toggle-option ${priorityMode === 'non-preemptive' ? 'active' : ''}`}
                    onClick={() => onChangePriorityMode('non-preemptive')}
                  >
                    Non-Preemptive
                  </button>
                  <button
                    type="button"
                    className={`toggle-option ${priorityMode === 'preemptive' ? 'active' : ''}`}
                    onClick={() => onChangePriorityMode('preemptive')}
                  >
                    Preemptive
                  </button>
                </div>
              </div>

              <div className="priority-option-group">
                <span className="control-field-label">Priority Direction:</span>
                <div className="btn-toggle-pair">
                  <button
                    type="button"
                    className={`toggle-option ${!priorityHigherValueIsHigher ? 'active' : ''}`}
                    onClick={() => onChangePriorityDirection(false)}
                  >
                    Lower number is higher (e.g. 1 &gt; 5)
                  </button>
                  <button
                    type="button"
                    className={`toggle-option ${priorityHigherValueIsHigher ? 'active' : ''}`}
                    onClick={() => onChangePriorityDirection(true)}
                  >
                    Higher number is higher (e.g. 5 &gt; 1)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

