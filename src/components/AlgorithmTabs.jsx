import React from 'react';
import { ALGORITHMS, ALGORITHM_DETAILS } from '../algorithms/types.js';

export default function AlgorithmTabs({ selectedAlgorithm, onSelectAlgorithm }) {
  const tabs = [
    ALGORITHMS.FCFS,
    ALGORITHMS.SJF,
    ALGORITHMS.SRTF,
    ALGORITHMS.ROUND_ROBIN,
    ALGORITHMS.PRIORITY,
    ALGORITHMS.LJF,
    ALGORITHMS.LRTF
  ];

  return (
    <div className="algorithm-tabs-row" role="tablist" aria-label="CPU Scheduling Algorithms">
      {tabs.map((key) => {
        const details = ALGORITHM_DETAILS[key];
        const isSelected = selectedAlgorithm === key;

        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={`algo-tab-card ${isSelected ? 'active' : ''}`}
            onClick={() => onSelectAlgorithm(key)}
          >
            <div className="algo-tab-title">{details.shortName}</div>
            <div className="algo-tab-subtitle">{details.subtitle}</div>
          </button>
        );
      })}
    </div>
  );
}

