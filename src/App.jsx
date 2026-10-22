import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AlgorithmTabs from './components/AlgorithmTabs';
import ProcessesCard from './components/ProcessesCard';
import AlgorithmSettingsCard from './components/AlgorithmSettingsCard';
import ActionControls from './components/ActionControls';
import MetricsCards from './components/MetricsCards';
import CpuTimeline from './components/CpuTimeline';
import ProcessResultsTable from './components/ProcessResultsTable';
import RechartsVisualizations from './components/RechartsVisualizations';
import StepLog from './components/StepLog';
import ProcessModal from './components/ProcessModal';
import HowItWorksModal from './components/HowItWorksModal';

import { ALGORITHMS, ALGORITHM_DETAILS, DEFAULT_EXAMPLES, PROCESS_COLORS } from './algorithms/types.js';
import { runSimulation } from './algorithms/index.js';

export default function App() {
  // Default to FCFS and the exact 3-process example from screenshot
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(ALGORITHMS.FCFS);
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [priorityMode, setPriorityMode] = useState('non-preemptive'); // 'non-preemptive' | 'preemptive'
  const [priorityHigherValueIsHigher, setPriorityHigherValueIsHigher] = useState(false);

  const [processes, setProcesses] = useState(DEFAULT_EXAMPLES[0].processes);
  const [simulationResult, setSimulationResult] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // Modals state
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [processModalMode, setProcessModalMode] = useState('add'); // 'add' | 'edit'
  const [editingIndex, setEditingIndex] = useState(null);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  // Run simulation whenever needed or on mount
  const executeSimulation = (procs, algo, options = {}) => {
    const opts = {
      timeQuantum,
      priorityMode,
      priorityHigherValueIsHigher,
      ...options
    };
    const result = runSimulation(procs, algo, opts);
    if (!result.success) {
      setValidationErrors(result.errors);
      setSimulationResult(null);
    } else {
      setValidationErrors([]);
      setSimulationResult(result);
    }
  };

  useEffect(() => {
    executeSimulation(processes, selectedAlgorithm);
  }, []);

  const handleSelectAlgorithm = (algo) => {
    setSelectedAlgorithm(algo);
    executeSimulation(processes, algo);
  };

  const handleChangeTimeQuantum = (newQuantum) => {
    setTimeQuantum(newQuantum);
    executeSimulation(processes, selectedAlgorithm, { timeQuantum: newQuantum });
  };

  const handleChangePriorityMode = (mode) => {
    setPriorityMode(mode);
    executeSimulation(processes, selectedAlgorithm, { priorityMode: mode });
  };

  const handleChangePriorityDirection = (higherIsHigher) => {
    setPriorityHigherValueIsHigher(higherIsHigher);
    executeSimulation(processes, selectedAlgorithm, { priorityHigherValueIsHigher: higherIsHigher });
  };

  const handleLoadExample = (exampleIndex) => {
    const example = DEFAULT_EXAMPLES[exampleIndex];
    if (example) {
      setProcesses(example.processes);
      if (example.timeQuantum !== undefined) setTimeQuantum(example.timeQuantum);
      if (example.priorityMode !== undefined) setPriorityMode(example.priorityMode);
      if (example.priorityHigherValueIsHigher !== undefined) {
        setPriorityHigherValueIsHigher(example.priorityHigherValueIsHigher);
      }
      executeSimulation(example.processes, selectedAlgorithm, {
        timeQuantum: example.timeQuantum ?? timeQuantum,
        priorityMode: example.priorityMode ?? priorityMode,
        priorityHigherValueIsHigher: example.priorityHigherValueIsHigher ?? priorityHigherValueIsHigher
      });
    }
  };

  const handleRunSimulation = () => {
    executeSimulation(processes, selectedAlgorithm);
  };

  const handleDeleteProcess = (index) => {
    const updated = processes.filter((_, i) => i !== index);
    setProcesses(updated);
    executeSimulation(updated, selectedAlgorithm);
  };

  const handleOpenAddModal = () => {
    setProcessModalMode('add');
    setEditingIndex(null);
    setProcessModalOpen(true);
  };

  const handleOpenEditModal = (index) => {
    setProcessModalMode('edit');
    setEditingIndex(index);
    setProcessModalOpen(true);
  };

  const handleSaveProcess = (procData) => {
    if (processModalMode === 'add') {
      const updated = [...processes, procData];
      setProcesses(updated);
      executeSimulation(updated, selectedAlgorithm);
    } else if (processModalMode === 'edit' && editingIndex !== null) {
      const updated = processes.map((p, i) => (i === editingIndex ? { ...p, ...procData } : p));
      setProcesses(updated);
      executeSimulation(updated, selectedAlgorithm);
    }
  };

  return (
    <div className="app-viewport">
      {/* 1. Header */}
      <Navbar onOpenHowItWorks={() => setHowItWorksOpen(true)} />

      <main className="main-viewport">
        <div className="layout-content-box">
          {/* 2. Algorithm Tabs */}
          <AlgorithmTabs
            selectedAlgorithm={selectedAlgorithm}
            onSelectAlgorithm={handleSelectAlgorithm}
          />

          {/* Validation Alert (if any) */}
          {validationErrors.length > 0 && (
            <div className="validation-error-box" role="alert">
              <strong>Please correct the following:</strong>
              <ul>
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. Middle Two Columns: Processes & Algorithm Settings */}
          <div className="two-column-row">
            <ProcessesCard
              processes={processes}
              onOpenAddModal={handleOpenAddModal}
              onOpenEditModal={handleOpenEditModal}
              onDeleteProcess={handleDeleteProcess}
            />

            <AlgorithmSettingsCard
              selectedAlgorithm={selectedAlgorithm}
              timeQuantum={timeQuantum}
              onChangeTimeQuantum={handleChangeTimeQuantum}
              priorityMode={priorityMode}
              onChangePriorityMode={handleChangePriorityMode}
              priorityHigherValueIsHigher={priorityHigherValueIsHigher}
              onChangePriorityDirection={handleChangePriorityDirection}
              onOpenDetails={() => setHowItWorksOpen(true)}
            />
          </div>

          {/* 4. Action Buttons */}
          <ActionControls
            onLoadExample={handleLoadExample}
            onRunSimulation={handleRunSimulation}
          />

          {/* 5. Summary Metrics Cards */}
          {simulationResult && (
            <MetricsCards metrics={simulationResult.metrics} />
          )}

          {/* 6. CPU Timeline (Gantt Chart) */}
          {simulationResult && (
            <CpuTimeline
              timeline={simulationResult.timeline}
              totalTime={simulationResult.metrics.totalTime}
              processStats={simulationResult.processStats}
            />
          )}

          {/* 7. Process Results Table */}
          {simulationResult && (
            <ProcessResultsTable
              processStats={simulationResult.processStats}
              metrics={simulationResult.metrics}
              algorithmName={ALGORITHM_DETAILS[selectedAlgorithm]?.shortName}
            />
          )}

          {/* 8. Performance Analytics (Recharts) */}
          {simulationResult && (
            <RechartsVisualizations
              processStats={simulationResult.processStats}
              metrics={simulationResult.metrics}
            />
          )}

          {/* 9. Chronological Event Log */}
          {simulationResult && (
            <StepLog
              logs={simulationResult.logs}
              colorMap={simulationResult.colorMap}
            />
          )}
        </div>
      </main>

      {/* Add / Edit Process Modal */}
      <ProcessModal
        isOpen={processModalOpen}
        mode={processModalMode}
        initialData={editingIndex !== null ? processes[editingIndex] : null}
        onClose={() => setProcessModalOpen(false)}
        onSave={handleSaveProcess}
      />

      {/* How It Works Educational Modal */}
      <HowItWorksModal
        isOpen={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
        initialAlgorithm={selectedAlgorithm}
      />
    </div>
  );
}
