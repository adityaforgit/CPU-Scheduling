<<<<<<< HEAD
# CPU Scheduling Algorithm Visualizer ⚡🖥️

An interactive, responsive, and educational web application for visualizing and analyzing operating system CPU scheduling algorithms in real time.

Built with **React**, **JavaScript**, **Vite**, **Recharts**, and custom **CSS**.

---

## 🌟 References & Inspiration

- **Live Reference Website:** [CPU Scheduling Algorithm Visualiser (Netlify)](https://cpu-scheduling-algorithm-visualiser.netlify.app/)
- **Reference GitHub Repository:** [PrinceSinghhub/CPU-SCHEDULING-ALGORITHM-VISUALISER](https://github.com/PrinceSinghhub/CPU-SCHEDULING-ALGORITHM-VISUALISER)

---

## 🚀 Key Features

### 1. Supported CPU Scheduling Algorithms
1. **FCFS (First Come, First Serve)** — Non-preemptive, FIFO discipline.
2. **SJF (Shortest Job First)** — Non-preemptive, optimal average waiting time for stationary processes.
3. **SRTF (Shortest Remaining Time First)** — Preemptive SJF, dynamic preemption based on remaining burst time.
4. **Priority Scheduling (Non-Preemptive)** — Configurable priority direction (lower or higher number = higher priority).
5. **Priority Scheduling (Preemptive)** — High-priority tasks preempt lower-priority tasks on arrival.
6. **Round Robin (RR)** — Time-shared scheduling with configurable **Time Quantum (Q)** and preemption queueing.
7. **LJF (Longest Job First)** — Non-preemptive, schedules the longest burst first.
8. **LRTF (Longest Remaining Time First)** — Preemptive LJF, interleaves execution of long-running tasks.

### 2. Interactive Gantt Timeline
- **Visual Process Blocks:** Color-coded blocks labeled with Process ID and duration ($\Delta t$).
- **Separate CPU Idle State:** Styled with distinct diagonal hatch patterns and clear `IDLE` markers.
- **Labeled Time Axis:** Exact numerical time stamps under every boundary transition.
- **Interactive Playback Controller:** Play, pause, step forward, step backward, reset, and adjust playback speed ($0.5\times$ to $4\times$) to watch execution step by step.
- **Hover Inspection Tooltips:** View start time, end time, and slice duration for each timeline block.

### 3. Recharts Visual Analytics
- **Process Metrics Comparison:** Grouped horizontal and vertical bar charts comparing **Burst Time (BT)**, **Waiting Time (WT)**, **Turnaround Time (TAT)**, and **Response Time (RT)** across all processes.
- **CPU Utilization & Allocation Donut Chart:** Visual breakdown of Active CPU Time vs. Idle CPU Time.
- **Workload Share Chart:** Relative CPU burst share per process.

### 4. Comprehensive Metrics & Results
- **Summary Cards:**
  - **Average Waiting Time:** $\frac{\sum \text{WT}}{n}$
  - **Average Turnaround Time:** $\frac{\sum \text{TAT}}{n}$
  - **Average Response Time:** $\frac{\sum \text{RT}}{n}$
  - **CPU Utilization (%):** $\frac{\text{Total Busy CPU Time}}{\text{Total Timeline Time}} \times 100$
  - **System Throughput:** $\frac{\text{Processes Completed}}{\text{Total Time}}$
  - **Total Makespan:** Overall execution duration
- **Results Table:**
  - Process ID, Arrival Time, Burst Time, Priority, Completion Time, Turnaround Time, Waiting Time, and Response Time.
  - Highlighted summary row with average metrics.
  - **Export to CSV:** One-click download of the complete metrics table.

### 5. Chronological Event Log
- Step-by-step audit log of every scheduling event: arrival, execution start, preemption, quantum expiry, completion, and idle intervals.
- Filterable by event type (`Execution Starts`, `Preemptions`, `Completions`, `CPU Idle`).
- One-click **Copy Log** button for lab reports and homework assignments.

### 6. Process Queue Management & Presets
- Add, edit inline, and delete processes dynamically.
- Input validation with real-time error alerts (preventing negative arrival times, zero burst times, and duplicate IDs).
- **Load Example Presets:**
  - *Standard Mix (4 Processes)*
  - *Convoy Effect / SJF Comparison*
  - *Gaps & Idle CPU Periods*
  - *Priority & Preemption Showdown*
- **Randomize:** Generates realistic test processes with a single click.

### 7. Educational Guide & Reference Modal
- In-depth theoretical overview of each scheduling policy.
- Advantages, trade-offs, time complexity, and real-world operating system contexts (e.g. Linux CFS, Windows scheduler, RTOS).

---

## 📐 Formulas & Evaluation Metrics

$$\text{Turnaround Time (TAT)} = \text{Completion Time (CT)} - \text{Arrival Time (AT)}$$

$$\text{Waiting Time (WT)} = \text{Turnaround Time (TAT)} - \text{Burst Time (BT)}$$

$$\text{Response Time (RT)} = \text{First Scheduled Time} - \text{Arrival Time (AT)}$$

$$\text{CPU Utilization (\%)} = \left(\frac{\text{Busy CPU Time}}{\text{Total Time}}\right) \times 100$$

$$\text{Throughput} = \frac{\text{Total Processes Completed}}{\text{Total Timeline Duration}}$$

---

## 🛠️ Tech Stack

- **React 18** — Component-driven reactive UI
- **JavaScript (ES Modules)** — Clean, decoupled algorithm simulation engine
- **Vite 5** — Ultra-fast build tool and development server
- **Recharts** — Responsive charting for process metrics and CPU allocation
- **Lucide React** — Modern, crisp UI icons
- **CSS3** — Custom modern dark slate theme with responsive grids and animations

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
Clone the repository and install dependencies:

```bash
cd "CPU scheduling"
npm install
```

### Development Server
Start the local Vite development server:

```bash
npm run dev
```

Open your browser at the URL shown in the terminal (typically `http://localhost:3000` or `http://localhost:5173`).

### Run Test Suite
Verify all 8 scheduling algorithms, preemption behaviors, idle periods, and mathematical invariants across 600+ test cases:

```bash
npm test
```

### Production Build
Create an optimized production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Architecture

```text
├── index.html                      # HTML entry with custom typography
├── package.json                    # Project dependencies and npm scripts
├── vite.config.js                  # Vite configuration & chunk optimization
├── src/
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Top-level application coordinator
│   ├── index.css                   # Global styles, variables, and responsive layout
│   ├── algorithms/                 # Pure scheduling logic decoupled from UI
│   │   ├── types.js                # Algorithm metadata, presets, and constants
│   │   ├── fcfs.js                 # First Come First Serve
│   │   ├── sjf.js                  # Shortest Job First (Non-preemptive)
│   │   ├── srtf.js                 # Shortest Remaining Time First (Preemptive SJF)
│   │   ├── priority.js             # Priority (Preemptive & Non-Preemptive)
│   │   ├── roundRobin.js           # Round Robin with Time Quantum
│   │   ├── ljf.js                  # Longest Job First (Non-preemptive)
│   │   ├── lrtf.js                 # Longest Remaining Time First (Preemptive LJF)
│   │   ├── index.js                # Input validator, runner, and metrics calculator
│   │   └── verifyAlgorithms.js     # Comprehensive automated test suite
│   └── components/
│       ├── Navbar.jsx              # Header with docs modal & external reference links
│       ├── AlgorithmSelector.jsx   # Algorithm picker, quantum stepper & priority toggle
│       ├── ProcessInputTable.jsx   # Process queue editor, examples & action toolbar
│       ├── MetricsCards.jsx        # Summary cards (WT, TAT, RT, CPU Util, Throughput)
│       ├── GanttTimeline.jsx       # Visual timeline bar with idle stripes & playback
│       ├── RechartsVisualizations.jsx # Recharts bar & donut analytical visualizations
│       ├── ResultsTable.jsx        # Complete tabular results & CSV export
│       ├── StepLog.jsx             # Chronological event log with filter & copy
│       └── AlgorithmModal.jsx      # Educational theory and trade-off reference modal
```

---

## 📄 License

MIT License. Open source and free for educational use.

=======
# CPU-Scheduling
An interactive CPU scheduling visualizer built with React that simulates algorithms like FCFS, SJF, SRTF, Round Robin, Priority, LJF, and LRTF, with a Gantt chart and process performance metrics.
>>>>>>> 838760f7ea8f11f8a14406481782927ea66c72d4
