export const ALGORITHMS = {
  FCFS: 'FCFS',
  SJF: 'SJF',
  SRTF: 'SRTF',
  ROUND_ROBIN: 'ROUND_ROBIN',
  PRIORITY: 'PRIORITY',
  LJF: 'LJF',
  LRTF: 'LRTF'
};

export const ALGORITHM_DETAILS = {
  [ALGORITHMS.FCFS]: {
    id: ALGORITHMS.FCFS,
    name: 'First Come First Serve',
    shortName: 'FCFS',
    subtitle: 'First Come First Serve',
    type: 'Non-preemptive',
    description: 'Processes are executed in the order they arrive in the ready queue (non-preemptive).',
    timeComplexity: 'O(n log n)',
    hasQuantum: false,
    hasPriority: false
  },
  [ALGORITHMS.SJF]: {
    id: ALGORITHMS.SJF,
    name: 'Shortest Job First',
    shortName: 'SJF',
    subtitle: 'Shortest Job First',
    type: 'Non-preemptive',
    description: 'Selects the arrived process with the smallest burst time. Once scheduled, it executes to completion without interruption.',
    timeComplexity: 'O(n²)',
    hasQuantum: false,
    hasPriority: false
  },
  [ALGORITHMS.SRTF]: {
    id: ALGORITHMS.SRTF,
    name: 'Shortest Remaining Time First',
    shortName: 'SRTF',
    subtitle: 'Shortest Remaining Time First',
    type: 'Preemptive',
    description: 'Preemptive version of SJF. Preempts currently executing process if a newly arrived process requires less remaining CPU time.',
    timeComplexity: 'O(n²)',
    hasQuantum: false,
    hasPriority: false
  },
  [ALGORITHMS.ROUND_ROBIN]: {
    id: ALGORITHMS.ROUND_ROBIN,
    name: 'Round Robin',
    shortName: 'Round Robin',
    subtitle: 'Time Quantum Scheduling',
    type: 'Preemptive',
    description: 'Each process is assigned a fixed time slot called a Time Quantum. If not finished when quantum expires, it is moved to the back of the queue.',
    timeComplexity: 'O(n)',
    hasQuantum: true,
    hasPriority: false
  },
  [ALGORITHMS.PRIORITY]: {
    id: ALGORITHMS.PRIORITY,
    name: 'Priority Scheduling',
    shortName: 'Priority',
    subtitle: 'Priority Scheduling',
    type: 'Configurable',
    description: 'CPU is assigned to the process with highest priority. Supports both Preemptive and Non-Preemptive scheduling modes.',
    timeComplexity: 'O(n²)',
    hasQuantum: false,
    hasPriority: true
  },
  [ALGORITHMS.LJF]: {
    id: ALGORITHMS.LJF,
    name: 'Longest Job First',
    shortName: 'LJF',
    subtitle: 'Longest Job First',
    type: 'Non-preemptive',
    description: 'Selects the arrived process with the largest burst time. Once scheduled, it runs to completion before CPU is reassigned.',
    timeComplexity: 'O(n²)',
    hasQuantum: false,
    hasPriority: false
  },
  [ALGORITHMS.LRTF]: {
    id: ALGORITHMS.LRTF,
    name: 'Longest Remaining Time First',
    shortName: 'LRTF',
    subtitle: 'Longest Remaining Time First',
    type: 'Preemptive',
    description: 'Preemptive version of LJF. At each scheduling step, selects the process with the maximum remaining CPU burst time.',
    timeComplexity: 'O(n²)',
    hasQuantum: false,
    hasPriority: false
  }
};

// Exact screenshot default example: P1 (0, 5, 2), P2 (1, 3, 1), P3 (2, 8, 3)
export const DEFAULT_EXAMPLES = [
  {
    name: 'Screenshot Default (3 Processes)',
    description: 'Exact reference scenario: P1(0,5), P2(1,3), P3(2,8).',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 2 },
      { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 1 },
      { id: 'P3', arrivalTime: 2, burstTime: 8, priority: 3 }
    ],
    timeQuantum: 2,
    priorityHigherValueIsHigher: false,
    priorityMode: 'non-preemptive'
  },
  {
    name: 'Standard Mix (4 Processes)',
    description: 'Good balance of varying arrival and burst times for demonstrating preemption.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 2 },
      { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 1 },
      { id: 'P3', arrivalTime: 2, burstTime: 8, priority: 4 },
      { id: 'P4', arrivalTime: 3, burstTime: 6, priority: 3 }
    ],
    timeQuantum: 2,
    priorityHigherValueIsHigher: false,
    priorityMode: 'preemptive'
  },
  {
    name: 'Convoy Effect / SJF Comparison',
    description: 'A heavy first process followed by short processes to demonstrate the Convoy Effect.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 12, priority: 3 },
      { id: 'P2', arrivalTime: 1, burstTime: 2, priority: 1 },
      { id: 'P3', arrivalTime: 2, burstTime: 3, priority: 2 },
      { id: 'P4', arrivalTime: 4, burstTime: 1, priority: 4 }
    ],
    timeQuantum: 3,
    priorityHigherValueIsHigher: false,
    priorityMode: 'non-preemptive'
  },
  {
    name: 'Gaps & Idle CPU Periods',
    description: 'Processes arriving with gaps between them to clearly demonstrate idle states.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 3, priority: 2 },
      { id: 'P2', arrivalTime: 5, burstTime: 4, priority: 1 },
      { id: 'P3', arrivalTime: 12, burstTime: 2, priority: 3 },
      { id: 'P4', arrivalTime: 13, burstTime: 5, priority: 4 }
    ],
    timeQuantum: 2,
    priorityHigherValueIsHigher: false,
    priorityMode: 'non-preemptive'
  }
];

export const PROCESS_COLORS = [
  '#2563eb', // Blue (matches P1 in screenshot)
  '#8b5cf6', // Purple/Violet (matches P2 in screenshot)
  '#10b981', // Teal/Emerald (matches P3 in screenshot)
  '#f59e0b', // Amber/Orange
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#6366f1', // Indigo
  '#f97316'  // Orange
];

export const IDLE_COLOR = '#94a3b8'; // Slate
