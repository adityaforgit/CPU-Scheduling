/**
 * First Come, First Serve (FCFS) CPU Scheduling Algorithm
 * Non-preemptive.
 */
export function simulateFCFS(processes) {
  // Deep clone processes and preserve original index for stable tie-breaking
  const procs = processes.map((p, index) => ({
    ...p,
    originalIndex: index,
    remainingTime: p.burstTime,
    firstStartTime: null,
    completionTime: null
  }));

  // Sort primarily by arrival time, then by original index
  const sorted = [...procs].sort((a, b) => {
    if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
    return a.originalIndex - b.originalIndex;
  });

  const timeline = [];
  const logs = [];
  let currentTime = 0;

  for (const proc of sorted) {
    // If CPU is idle before process arrives
    if (currentTime < proc.arrivalTime) {
      const idleDuration = proc.arrivalTime - currentTime;
      timeline.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: proc.arrivalTime,
        duration: idleDuration
      });
      logs.push({
        time: currentTime,
        processId: 'IDLE',
        message: `CPU is IDLE from time ${currentTime} to ${proc.arrivalTime} waiting for processes to arrive.`,
        type: 'idle'
      });
      currentTime = proc.arrivalTime;
    }

    const startTime = currentTime;
    const endTime = currentTime + proc.burstTime;
    proc.firstStartTime = startTime;
    proc.completionTime = endTime;

    timeline.push({
      processId: proc.id,
      startTime,
      endTime,
      duration: proc.burstTime
    });

    logs.push({
      time: startTime,
      processId: proc.id,
      message: `Process ${proc.id} (Burst: ${proc.burstTime}, Arrived: ${proc.arrivalTime}) begins execution.`,
      type: 'start'
    });

    logs.push({
      time: endTime,
      processId: proc.id,
      message: `Process ${proc.id} completed execution at time ${endTime}.`,
      type: 'complete'
    });

    currentTime = endTime;
  }

  return { procs, timeline, logs };
}

