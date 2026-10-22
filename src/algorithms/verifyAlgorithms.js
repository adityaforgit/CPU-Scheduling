import { runSimulation, validateProcesses } from './index.js';
import { ALGORITHMS, DEFAULT_EXAMPLES } from './types.js';

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ Assertion FAILED: ${message}`);
    process.exit(1);
  } else {
    passedTests++;
  }
}

console.log('=== RUNNING COMPREHENSIVE SCHEDULING ALGORITHM TESTS ===\n');

// 1. Test FCFS
console.log('Test 1: FCFS Standard Order');
const fcfsProcs = [
  { id: 'P1', arrivalTime: 0, burstTime: 3, priority: 1 },
  { id: 'P2', arrivalTime: 2, burstTime: 6, priority: 2 },
  { id: 'P3', arrivalTime: 4, burstTime: 4, priority: 3 },
  { id: 'P4', arrivalTime: 6, burstTime: 5, priority: 4 },
  { id: 'P5', arrivalTime: 8, burstTime: 2, priority: 5 }
];
const fcfsRes = runSimulation(fcfsProcs, ALGORITHMS.FCFS);
assert(fcfsRes.success, 'FCFS simulation succeeded');
// P1: starts 0, ends 3. TAT = 3, WT = 0
// P2: starts 3, ends 9. TAT = 7, WT = 1
// P3: starts 9, ends 13. TAT = 9, WT = 5
// P4: starts 13, ends 18. TAT = 12, WT = 7
// P5: starts 18, ends 20. TAT = 12, WT = 10
const p1 = fcfsRes.processStats.find(p => p.id === 'P1');
const p2 = fcfsRes.processStats.find(p => p.id === 'P2');
const p3 = fcfsRes.processStats.find(p => p.id === 'P3');
assert(p1.completionTime === 3 && p1.waitingTime === 0, 'P1 CT=3, WT=0');
assert(p2.completionTime === 9 && p2.waitingTime === 1, 'P2 CT=9, WT=1');
assert(p3.completionTime === 13 && p3.waitingTime === 5, 'P3 CT=13, WT=5');
assert(fcfsRes.metrics.totalTime === 20, 'Total time is 20');
assert(fcfsRes.metrics.cpuUtilization === 100, 'CPU Utilization is 100%');

// 2. Test SJF (Non-preemptive)
console.log('Test 2: SJF Non-preemptive');
const sjfProcs = [
  { id: 'P1', arrivalTime: 1, burstTime: 7, priority: 1 },
  { id: 'P2', arrivalTime: 2, burstTime: 4, priority: 2 },
  { id: 'P3', arrivalTime: 3, burstTime: 1, priority: 3 },
  { id: 'P4', arrivalTime: 4, burstTime: 4, priority: 4 }
];
const sjfRes = runSimulation(sjfProcs, ALGORITHMS.SJF);
assert(sjfRes.success, 'SJF simulation succeeded');
// At t=0..1: Idle (duration 1)
// At t=1: Only P1 arrived. P1 runs from 1 to 8.
// At t=8: P2(4), P3(1), P4(4) available. Shortest is P3(1) -> runs 8 to 9.
// At t=9: P2(4) vs P4(4) -> tie broken by arrival time (P2 arrived at 2, P4 at 4) -> P2 runs 9 to 13.
// At t=13: P4 runs 13 to 17.
const sjfTimelineIds = sjfRes.timeline.map(t => t.processId);
assert(sjfTimelineIds[0] === 'IDLE' && sjfRes.timeline[0].duration === 1, 'Idle from 0 to 1');
assert(sjfTimelineIds[1] === 'P1', 'P1 runs first');
assert(sjfTimelineIds[2] === 'P3', 'P3 runs after P1 (shortest burst)');
assert(sjfTimelineIds[3] === 'P2', 'P2 runs before P4 due to earlier arrival');
assert(sjfTimelineIds[4] === 'P4', 'P4 runs last');

// 3. Test SRTF (Preemptive SJF)
console.log('Test 3: SRTF Preemption');
const srtfProcs = [
  { id: 'P1', arrivalTime: 0, burstTime: 8, priority: 1 },
  { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1 },
  { id: 'P3', arrivalTime: 2, burstTime: 9, priority: 1 },
  { id: 'P4', arrivalTime: 3, burstTime: 5, priority: 1 }
];
const srtfRes = runSimulation(srtfProcs, ALGORITHMS.SRTF);
assert(srtfRes.success, 'SRTF simulation succeeded');
// t=0: P1 starts (rem 8)
// t=1: P2 arrives (rem 4 < P1 rem 7) -> P2 preempts P1!
// P2 runs 1 to 5, finishes at 5.
// At t=5: P4 has rem 5, P1 has rem 7, P3 has rem 9. P4 runs 5 to 10.
// At t=10: P1 runs 10 to 17.
// At t=17: P3 runs 17 to 26.
const srtfP2 = srtfRes.processStats.find(p => p.id === 'P2');
assert(srtfP2.completionTime === 5, 'P2 finishes at 5');
assert(srtfP2.responseTime === 0, 'P2 response time is 0 (first gets CPU at 1)');
const srtfP1 = srtfRes.processStats.find(p => p.id === 'P1');
assert(srtfP1.completionTime === 17, 'P1 finishes at 17');
assert(srtfP1.waitingTime === 17 - 0 - 8 - 1 + 1, 'P1 waiting time is 9');

// 4. Test Priority Non-Preemptive and Preemptive
console.log('Test 4: Priority Scheduling');
const prioProcs = [
  { id: 'P1', arrivalTime: 0, burstTime: 4, priority: 3 },
  { id: 'P2', arrivalTime: 1, burstTime: 2, priority: 1 } // 1 is highest priority (lowerIsHigher)
];
const prioNPRes = runSimulation(prioProcs, ALGORITHMS.PRIORITY, { priorityMode: 'non-preemptive', priorityHigherValueIsHigher: false });
assert(prioNPRes.timeline[0].processId === 'P1' && prioNPRes.timeline[0].endTime === 4, 'Non-preemptive priority runs P1 to completion');

const prioPRes = runSimulation(prioProcs, ALGORITHMS.PRIORITY, { priorityMode: 'preemptive', priorityHigherValueIsHigher: false });
assert(prioPRes.timeline[0].processId === 'P1' && prioPRes.timeline[0].endTime === 1, 'Preemptive priority preempts P1 at t=1');
assert(prioPRes.timeline[1].processId === 'P2' && prioPRes.timeline[1].endTime === 3, 'P2 runs from 1 to 3');
assert(prioPRes.timeline[2].processId === 'P1' && prioPRes.timeline[2].endTime === 6, 'P1 finishes 3 to 6');

// 5. Test Round Robin with Time Quantum
console.log('Test 5: Round Robin with Time Quantum 2');
const rrProcs = [
  { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 1 },
  { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1 },
  { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 1 },
  { id: 'P4', arrivalTime: 4, burstTime: 1, priority: 1 }
];
const rrRes = runSimulation(rrProcs, ALGORITHMS.ROUND_ROBIN, { timeQuantum: 2 });
assert(rrRes.success, 'Round robin simulation succeeded');
// t=0: P1 enters queue. P1 runs 0..2 (rem 3).
// During [0,2], P2 (at 1) and P3 (at 2) arrive. Ready queue: [P2, P3].
// P1 re-queued: [P2, P3, P1].
// P2 runs 2..4 (rem 2). During [2,4], P4 arrives at 4. Ready queue: [P3, P1, P4, P2].
// P3 runs 4..6 (finishes).
// P1 runs 6..8 (rem 1). Ready queue: [P4, P2, P1].
// P4 runs 8..9 (finishes). Ready queue: [P2, P1].
// P2 runs 9..11 (finishes). Ready queue: [P1].
// P1 runs 11..12 (finishes).
const rrP3 = rrRes.processStats.find(p => p.id === 'P3');
assert(rrP3.completionTime === 6, 'P3 finishes at 6');
const rrP4 = rrRes.processStats.find(p => p.id === 'P4');
assert(rrP4.completionTime === 9, 'P4 finishes at 9');

// 6. Test Idle CPU periods & CPU Utilization formula
console.log('Test 6: CPU Idle Period & Utilization Calculation');
const gapProcs = [
  { id: 'P1', arrivalTime: 0, burstTime: 2, priority: 1 },
  { id: 'P2', arrivalTime: 10, burstTime: 2, priority: 1 }
];
const gapRes = runSimulation(gapProcs, ALGORITHMS.FCFS);
assert(gapRes.metrics.totalTime === 12, 'Total time is 12');
assert(gapRes.metrics.busyTime === 4, 'Busy time is 4 (2+2)');
assert(gapRes.metrics.idleTime === 8, 'Idle time is 8 (from 2 to 10)');
// 4 / 12 = 33.33%
assert(gapRes.metrics.cpuUtilization === 33.33, 'CPU Utilization is 33.33%');

// 7. Test Input Validation
console.log('Test 7: Input Validation Errors');
const emptyRes = runSimulation([], ALGORITHMS.FCFS);
assert(!emptyRes.success, 'Empty processes rejected');

const dupRes = runSimulation([
  { id: 'P1', arrivalTime: 0, burstTime: 2, priority: 1 },
  { id: 'P1', arrivalTime: 1, burstTime: 2, priority: 1 }
], ALGORITHMS.FCFS);
assert(!dupRes.success && dupRes.errors.some(e => e.includes('duplicated')), 'Duplicate IDs rejected');

const negRes = runSimulation([
  { id: 'P1', arrivalTime: -2, burstTime: 2, priority: 1 }
], ALGORITHMS.FCFS);
assert(!negRes.success && negRes.errors.some(e => e.includes('Arrival Time')), 'Negative arrival time rejected');

const zeroBtRes = runSimulation([
  { id: 'P1', arrivalTime: 0, burstTime: 0, priority: 1 }
], ALGORITHMS.FCFS);
assert(!zeroBtRes.success && zeroBtRes.errors.some(e => e.includes('Burst Time')), 'Zero burst time rejected');

// 8. Test all DEFAULT_EXAMPLES across all algorithms
console.log('Test 8: Default examples across all 8 algorithms');
for (let exIdx = 0; exIdx < DEFAULT_EXAMPLES.length; exIdx++) {
  const example = DEFAULT_EXAMPLES[exIdx];
  for (const algoKey of Object.keys(ALGORITHMS)) {
    const algo = ALGORITHMS[algoKey];
    const res = runSimulation(example.processes, algo, {
      timeQuantum: example.timeQuantum,
      priorityHigherValueIsHigher: example.priorityHigherValueIsHigher,
      priorityMode: example.priorityMode || 'non-preemptive'
    });
    assert(res.success, `Example "${example.name}" with ${algo} works`);
    // Verify mathematical invariants for each process
    for (const p of res.processStats) {
      assert(p.turnaroundTime === p.completionTime - p.arrivalTime, 'TAT = CT - AT');
      assert(p.waitingTime === p.turnaroundTime - p.burstTime, 'WT = TAT - BT');
      assert(p.waitingTime >= 0, 'WT >= 0');
      assert(p.responseTime === p.firstStartTime - p.arrivalTime, 'RT = FT - AT');
    }
  }
}

console.log(`\n🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);

