import React, { useState } from 'react';
import { Terminal, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function StepLog({ logs = [], colorMap = {} }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!logs || logs.length === 0) return null;

  const handleCopy = (e) => {
    e.stopPropagation();
    const text = logs.map(l => `[t = ${l.time}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card step-log-card">
      <div className="card-header log-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="card-header-title">
          <Terminal size={20} className="header-icon-blue" />
          <h2 className="card-title">Scheduling Event Log ({logs.length} events)</h2>
        </div>

        <div className="log-header-actions">
          <button
            type="button"
            className="btn-copy-log"
            onClick={handleCopy}
            title="Copy log to clipboard"
          >
            {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            type="button"
            className="toggle-expand-btn"
            aria-label={isExpanded ? 'Collapse log' : 'Expand log'}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="card-body log-body">
          <div className="log-entries-scroller">
            {logs.map((entry, idx) => (
              <div key={idx} className="log-line">
                <span className="log-timestamp">{entry.time} ms</span>
                <span className="log-msg-text">{entry.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
