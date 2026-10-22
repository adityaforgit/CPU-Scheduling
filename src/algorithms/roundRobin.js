/**
 * Round Robin (RR) CPU Scheduling Algorithm
 * Preemptive scheduling with a configurable Time Quantum.
 */
export function simulateRoundRobin(processes, timeQuantum = 2) {
  const quantum = Math.max(1, Number(timeQuantum) || 1);

  const procs = processes.map((p, index) => ({
    ...p,
    originalIndex: index,
    remainingTime: p.burstTime,
    firstStartTime: null,
    completionTime: null,
    inQueue: false
  }));

  const timeline = [];
  const logs = [];
  const readyQueue = [];
  let currentTime = 0;
  let completedCount = 0;
  const n = procs.length;

  // Function to enqueue newly arrived processes up to targetTime
  const enqueueArrivals = (targetTime) => {
    const newlyArrived = procs.filter(
      p => !p.inQueue && p.remainingTime > 0 && p.arrivalTime <= targetTime
    );

    // Sort newly arrived by arrival time, then originalIndex
    newlyArrived.sort((a, b) => {
      if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
      return a.originalIndex - b.originalIndex;
    });

    for (const p of newlyArrived) {
      p.inQueue = true;
      readyQueue.push(p);
      logs.push({
        time: p.arrivalTime,
        processId: p.id,
        message: `Process ${p.id} arrived and entered the Ready Queue.`,
        type: 'arrive'
      });
    }
  };

  // Initially enqueue processes arrived at time 0
  enqueueArrivals(currentTime);

  while (completedCount < n) {
    if (readyQueue.length === 0) {
      // Find next process arrival
      const unarrived = procs.filter(p => p.remainingTime > 0 && !p.inQueue);
      if (unarrived.length === 0) break;

      const nextArrival = Math.min(...unarrived.map(p => p.arrivalTime));
      if (nextArrival > currentTime) {
        timeline.push({
          processId: 'IDLE',
          startTime: currentTime,
          endTime: nextArrival,
          duration: nextArrival - currentTime
        });
        logs.push({
          time: currentTime,
          processId: 'IDLE',
          message: `CPU is IDLE from time ${currentTime} to ${nextArrival}. Ready queue empty.`,
          type: 'idle'
        });
        currentTime = nextArrival;
      }

      enqueueArrivals(currentTime);
      continue;
    }

    const currentProc = readyQueue.shift();

    if (currentProc.firstStartTime === null) {
      currentProc.firstStartTime = currentTime;
      logs.push({
        time: currentTime,
        processId: currentProc.id,
        message: `Process ${currentProc.id} starts executing for the first time.`,
        type: 'start'
      });
    }

    const executionTime = Math.min(currentProc.remainingTime, quantum);
    const sliceStart = currentTime;
    const sliceEnd = currentTime + executionTime;

    timeline.push({
      processId: currentProc.id,
      startTime: sliceStart,
      endTime: sliceEnd,
      duration: executionTime
    });

    logs.push({
      time: sliceStart,
      processId: currentProc.id,
      message: `Process ${currentProc.id} runs for ${executionTime} unit(s) (Time slice: [${sliceStart}, ${sliceEnd}]).`,
      type: 'run'
    });

    currentProc.remainingTime -= executionTime;
    currentTime = sliceEnd;

    // Enqueue newly arrived processes during this execution slice before re-adding currentProc
    enqueueArrivals(currentTime);

    if (currentProc.remainingTime === 0) {
      currentProc.completionTime = currentTime;
      completedCount++;
      logs.push({
        time: currentTime,
        processId: currentProc.id,
        message: `Process ${currentProc.id} finished execution at time ${currentTime}.`,
        type: 'complete'
      });
    } else {
      // Re-queue the preempted process
      readyQueue.push(currentProc);
      logs.push({
        time: currentTime,
        processId: currentProc.id,
        message: `Process ${currentProc.id} quantum expired (Remaining: ${currentProc.remainingTime}). Moved to back of Ready Queue.`,
        type: 'preempt'
      });
    }
  }

  // Merge any adjacent slices of the same process if quantum didn't switch
  const mergedTimeline = mergeSlices(timeline);

  return { procs, timeline: mergedTimeline, logs };
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

