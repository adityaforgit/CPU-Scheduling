/**
 * Priority Scheduling Algorithms
 * Supports both Non-Preemptive and Preemptive modes with configurable priority direction.
 */

function comparePriority(a, b, higherValueIsHigher) {
  if (higherValueIsHigher) {
    if (a.priority !== b.priority) return b.priority - a.priority;
  } else {
    if (a.priority !== b.priority) return a.priority - b.priority;
  }
  if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
  return a.originalIndex - b.originalIndex;
}

export function simulatePriorityNonPreemptive(processes, higherValueIsHigher = false) {
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
    const available = procs.filter(p => !p.isCompleted && p.arrivalTime <= currentTime);

    if (available.length === 0) {
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
        message: `CPU is IDLE from time ${currentTime} to ${nextArrival}. No process available.`,
        type: 'idle'
      });
      currentTime = nextArrival;
      continue;
    }

    available.sort((a, b) => comparePriority(a, b, higherValueIsHigher));

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
      message: `Process ${selected.id} (Priority: ${selected.priority}, Burst: ${selected.burstTime}) scheduled to run.`,
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

export function simulatePriorityPreemptive(processes, higherValueIsHigher = false) {
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

    available.sort((a, b) => comparePriority(a, b, higherValueIsHigher));

    const currentProc = available[0];

    if (lastRunningProcessId !== null && lastRunningProcessId !== currentProc.id) {
      const prevProc = procs.find(p => p.id === lastRunningProcessId);
      if (prevProc && prevProc.remainingTime > 0) {
        logs.push({
          time: currentTime,
          processId: currentProc.id,
          message: `Process ${prevProc.id} (Priority: ${prevProc.priority}) preempted by Process ${currentProc.id} (Priority: ${currentProc.priority}).`,
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

