import React from 'react';
import { Cpu, BookOpen } from 'lucide-react';

export default function Navbar({ onOpenHowItWorks }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="cpu-icon-box">
            <Cpu size={24} className="cpu-icon" />
          </div>
          <div>
            <h1 className="app-title">CPU Scheduling Visualizer</h1>
            <p className="app-subtitle">Explore how operating systems schedule processes</p>
          </div>
        </div>

        <button
          type="button"
          className="how-it-works-btn"
          onClick={onOpenHowItWorks}
        >
          <BookOpen size={16} />
          <span>How it works</span>
        </button>
      </div>
    </header>
  );
}
