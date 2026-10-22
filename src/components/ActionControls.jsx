import React, { useState, useRef, useEffect } from 'react';
import { Play, FileText, ChevronDown } from 'lucide-react';
import { DEFAULT_EXAMPLES } from '../algorithms/types.js';

export default function ActionControls({
  onLoadExample,
  onRunSimulation
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="action-buttons-row">
      <div className="dropdown-container" ref={dropdownRef}>
        <button
          type="button"
          className="btn-load-example"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FileText size={16} />
          <span>Load example</span>
          <ChevronDown size={14} className="chevron-icon" />
        </button>

        {dropdownOpen && (
          <div className="example-dropdown-menu">
            <div className="dropdown-menu-header">Select an Example Scenario</div>
            {DEFAULT_EXAMPLES.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                className="dropdown-item"
                onClick={() => {
                  onLoadExample(idx);
                  setDropdownOpen(false);
                }}
              >
                <div className="dropdown-item-title">{ex.name}</div>
                <div className="dropdown-item-desc">{ex.description}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        className="btn-run-simulation"
        onClick={onRunSimulation}
      >
        <Play size={16} fill="currentColor" />
        <span>Run simulation</span>
      </button>
    </div>
  );
}

