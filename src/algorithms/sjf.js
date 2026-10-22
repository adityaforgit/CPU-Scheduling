/**
 * Shortest Job First (SJF) CPU Scheduling Algorithm
 * Non-preemptive.
 */
export function simulateSJF(processes) {
  const procs = processes.map((p, index) => ({
    ...p,
    originalIndex: index,
    remainingTime: p.burstTime,
    firstStartTime: null,
    completionTime: null,
    isCompleted: false
  }));

  const timeline = [];
  const logs = [];
  let currentTime = 0;
  let completedCount = 0;
  const n = procs.length;

  while (completedCount < n) {
    // Find processes arrived by currentTime and not completed
    const available = procs.filter(p => !p.isCompleted && p.arrivalTime <= currentTime);

    if (available.length === 0) {
      // Find the next arrival time among remaining processes
      const unarrived = procs.filter(p => !p.isCompleted);
      const nextArrival = Math.min(...unarrived.map(p => p.arrivalTime));

      timeline.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        duration: nextArrival - currentTime
      });
      logs.push({
        time: currentTime,
        processId: 'IDLE',
        message: `CPU is IDLE from time ${currentTime} to ${nextArrival}. No arrived processes.`,
        type: 'idle'
      });
      currentTime = nextArrival;
      continue;
    }

    // Pick process with shortest burstTime, then earliest arrival, then originalIndex
    available.sort((a, b) => {
      if (a.burstTime !== b.burstTime) return a.burstTime - b.burstTime;
      if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
      return a.originalIndex - b.originalIndex;
    });

    const selected = available[0];
    const startTime = currentTime;
    const endTime = currentTime + selected.burstTime;

    selected.firstStartTime = startTime;
    selected.completionTime = endTime;
    selected.isCompleted = true;
    completedCount++;

    timeline.push({
      processId: selected.id,
      startTime,
      endTime,
      duration: selected.burstTime
    });

    logs.push({
      time: startTime,
      processId: selected.id,
      message: `Process ${selected.id} (Burst: ${selected.burstTime}) scheduled to run (Shortest job available).`,
      type: 'start'
    });

    logs.push({
      time: endTime,
      processId: selected.id,
      message: `Process ${selected.id} finished at time ${endTime}.`,
      type: 'complete'
    });

    currentTime = endTime;
  }

  return { procs, timeline, logs };
}

