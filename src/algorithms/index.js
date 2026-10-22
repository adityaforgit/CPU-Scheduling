import { ALGORITHMS, PROCESS_COLORS, IDLE_COLOR } from './types.js';
import { simulateFCFS } from './fcfs.js';
import { simulateSJF } from './sjf.js';
import { simulateSRTF } from './srtf.js';
import { simulatePriorityNonPreemptive, simulatePriorityPreemptive } from './priority.js';
import { simulateRoundRobin } from './roundRobin.js';
import { simulateLJF } from './ljf.js';
import { simulateLRTF } from './lrtf.js';

export function validateProcesses(processes, algorithm, options = {}) {
  const errors = [];

  if (!Array.isArray(processes) || processes.length === 0) {
    errors.push('Please add at least one process to simulate.');
    return { isValid: false, errors };
  }

  const idSet = new Set();
  processes.forEach((p, idx) => {
    const rowNum = idx + 1;
    const pid = String(p.id || '').trim();

    if (!pid) {
      errors.push(`Row ${rowNum}: Process ID cannot be empty.`);
    } else if (idSet.has(pid)) {
      errors.push(`Process ID "${pid}" is duplicated. Each process must have a unique ID.`);
    } else {
      idSet.add(pid);
    }

    const at = Number(p.arrivalTime);
    if (isNaN(at) || at < 0 || !Number.isFinite(at)) {
      errors.push(`Process ${pid || '#' + rowNum}: Arrival Time must be a non-negative number (0 or greater).`);
    }

    const bt = Number(p.burstTime);
    if (isNaN(bt) || bt <= 0 || !Number.isFinite(bt)) {
      errors.push(`Process ${pid || '#' + rowNum}: Burst Time must be a positive number greater than 0.`);
    }

    const pr = Number(p.priority);
    if (isNaN(pr) || !Number.isFinite(pr)) {
      errors.push(`Process ${pid || '#' + rowNum}: Priority must be a valid number.`);
    }
  });

  if (algorithm === ALGORITHMS.ROUND_ROBIN) {
    const tq = Number(options.timeQuantum);
    if (isNaN(tq) || tq <= 0 || !Number.isFinite(tq)) {
      errors.push('Time Quantum for Round Robin must be a positive number greater than 0.');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function runSimulation(processes, algorithm, options = {}) {
  const validation = validateProcesses(processes, algorithm, options);
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors
    };
  }

  // Sanitize process inputs into numbers
  const cleanedProcesses = processes.map((p, index) => ({
    id: String(p.id).trim(),
    arrivalTime: Math.max(0, Math.round(Number(p.arrivalTime))),
    burstTime: Math.max(1, Math.round(Number(p.burstTime))),
    priority: Number(p.priority) || 0,
    color: PROCESS_COLORS[index % PROCESS_COLORS.length]
  }));

  let result;
  switch (algorithm) {
    case ALGORITHMS.FCFS:
      result = simulateFCFS(cleanedProcesses);
      break;
    case ALGORITHMS.SJF:
      result = simulateSJF(cleanedProcesses);
      break;
    case ALGORITHMS.SRTF:
      result = simulateSRTF(cleanedProcesses);
      break;
    case ALGORITHMS.PRIORITY:
      if (options.priorityMode === 'preemptive') {
        result = simulatePriorityPreemptive(cleanedProcesses, options.priorityHigherValueIsHigher);
      } else {
        result = simulatePriorityNonPreemptive(cleanedProcesses, options.priorityHigherValueIsHigher);
      }
      break;
    case 'PRIORITY_NON_PREEMPTIVE':
      result = simulatePriorityNonPreemptive(cleanedProcesses, options.priorityHigherValueIsHigher);
      break;
    case 'PRIORITY_PREEMPTIVE':
      result = simulatePriorityPreemptive(cleanedProcesses, options.priorityHigherValueIsHigher);
      break;
    case ALGORITHMS.ROUND_ROBIN:
      result = simulateRoundRobin(cleanedProcesses, options.timeQuantum);
      break;
    case ALGORITHMS.LJF:
      result = simulateLJF(cleanedProcesses);
      break;
    case ALGORITHMS.LRTF:
      result = simulateLRTF(cleanedProcesses);
      break;
    default:
      return {
        success: false,
        errors: [`Unknown algorithm: ${algorithm}`]
      };
  }

  // Calculate detailed process stats
  const colorMap = {};
  cleanedProcesses.forEach(p => {
    colorMap[p.id] = p.color;
  });
  colorMap['IDLE'] = IDLE_COLOR;

  const processStats = result.procs.map(proc => {
    const completionTime = proc.completionTime;
    const turnaroundTime = completionTime - proc.arrivalTime;
    const waitingTime = turnaroundTime - proc.burstTime;
    const responseTime = proc.firstStartTime !== null ? proc.firstStartTime - proc.arrivalTime : 0;

    return {
      id: proc.id,
      arrivalTime: proc.arrivalTime,
      burstTime: proc.burstTime,
      priority: proc.priority,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime,
      firstStartTime: proc.firstStartTime,
      color: colorMap[proc.id]
    };
  });

  // Calculate timeline metrics
  const timeline = result.timeline.map(slice => ({
    ...slice,
    color: colorMap[slice.processId] || IDLE_COLOR
  }));

  const totalTime = timeline.length > 0 ? timeline[timeline.length - 1].endTime : 0;
  const busyTime = timeline
    .filter(t => t.processId !== 'IDLE')
    .reduce((sum, t) => sum + t.duration, 0);
  const idleTime = timeline
    .filter(t => t.processId === 'IDLE')
    .reduce((sum, t) => sum + t.duration, 0);

  const n = processStats.length;
  const totalWaitingTime = processStats.reduce((acc, p) => acc + p.waitingTime, 0);
  const totalTurnaroundTime = processStats.reduce((acc, p) => acc + p.turnaroundTime, 0);
  const totalResponseTime = processStats.reduce((acc, p) => acc + p.responseTime, 0);

  const avgWaitingTime = n > 0 ? (totalWaitingTime / n) : 0;
  const avgTurnaroundTime = n > 0 ? (totalTurnaroundTime / n) : 0;
  const avgResponseTime = n > 0 ? (totalResponseTime / n) : 0;
  const cpuUtilization = totalTime > 0 ? (busyTime / totalTime) * 100 : 0;
  const throughput = totalTime > 0 ? (n / totalTime) : 0;

  return {
    success: true,
    algorithm,
    options,
    timeline,
    processStats,
    logs: result.logs,
    colorMap,
    metrics: {
      totalTime,
      busyTime,
      idleTime,
      cpuUtilization: Number(cpuUtilization.toFixed(2)),
      avgWaitingTime: Number(avgWaitingTime.toFixed(2)),
      avgTurnaroundTime: Number(avgTurnaroundTime.toFixed(2)),
      avgResponseTime: Number(avgResponseTime.toFixed(2)),
      throughput: Number(throughput.toFixed(3)),
      processCount: n
    }
  };
}
