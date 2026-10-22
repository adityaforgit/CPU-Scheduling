/**
 * Longest Remaining Time First (LRTF) CPU Scheduling Algorithm
 * Preemptive LJF.
 */
export function simulateLRTF(processes) {
  const procs = processes.map((p, index) => ({
    ...p,
    originalIndex: index,
    remainingTime: p.burstTime,
    firstStartTime: null,
    completionTime: null
  }));

  const rawTimeline = [];
  const logs = [];
  let currentTime = 0;
  let completedCount = 0;
  const n = procs.length;
  let lastRunningProcessId = null;

  while (completedCount < n) {
    const available = procs.filter(p => p.remainingTime > 0 && p.arrivalTime <= currentTime);

    if (available.length === 0) {
      const unarrived = procs.filter(p => p.remainingTime > 0);
      const nextArrival = Math.min(...unarrived.map(p => p.arrivalTime));

      rawTimeline.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        duration: nextArrival - currentTime
      });
      logs.push({
        time: currentTime,
        processId: 'IDLE',
        message: `CPU is IDLE from time ${currentTime} to ${nextArrival}.`,
        type: 'idle'
      });
      currentTime = nextArrival;
      lastRunningProcessId = null;
      continue;
    }

    // Sort by remainingTime descending, then arrivalTime ascending, then originalIndex ascending
    available.sort((a, b) => {
      if (b.remainingTime !== a.remainingTime) return b.remainingTime - a.remainingTime;
      if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
      return a.originalIndex - b.originalIndex;
    });

    const currentProc = available[0];

    if (lastRunningProcessId !== null && lastRunningProcessId !== currentProc.id) {
      const prevProc = procs.find(p => p.id === lastRunningProcessId);
      if (prevProc && prevProc.remainingTime > 0) {
        logs.push({
          time: currentTime,
          processId: currentProc.id,
          message: `Process ${prevProc.id} (Remaining: ${prevProc.remainingTime}) preempted by Process ${currentProc.id} (Remaining: ${currentProc.remainingTime}).`,
          type: 'preempt'
        });
      }
    }

    if (currentProc.firstStartTime === null) {
      currentProc.firstStartTime = currentTime;
      logs.push({
        time: currentTime,
        processId: currentProc.id,
        message: `Process ${currentProc.id} starts executing for the first time.`,
        type: 'start'
      });
    }

    rawTimeline.push({
      processId: currentProc.id,
      startTime: currentTime,
      endTime: currentTime + 1,
      duration: 1
    });

    currentProc.remainingTime -= 1;
    currentTime += 1;
    lastRunningProcessId = currentProc.id;

    if (currentProc.remainingTime === 0) {
      currentProc.completionTime = currentTime;
      completedCount++;
      logs.push({
        time: currentTime,
        processId: currentProc.id,
        message: `Process ${currentProc.id} completed execution at time ${currentTime}.`,
        type: 'complete'
      });
      lastRunningProcessId = null;
    }
  }

  const timeline = mergeSlices(rawTimeline);
  return { procs, timeline, logs };
}

function mergeSlices(slices) {
  if (slices.length === 0) return [];
  const merged = [];
  let curr = { ...slices[0] };

  for (let i = 1; i < slices.length; i++) {
    const next = slices[i];
    if (next.processId === curr.processId && next.startTime === curr.endTime) {
      curr.endTime = next.endTime;
      curr.duration = curr.endTime - curr.startTime;
    } else {
      merged.push(curr);
      curr = { ...next };
    }
  }
  merged.push(curr);
  return merged;
}

