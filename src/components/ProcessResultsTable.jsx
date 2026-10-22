import React from 'react';
import { List, Download } from 'lucide-react';

export default function ProcessResultsTable({
  processStats = [],
  metrics,
  algorithmName = ''
}) {
  if (!processStats || processStats.length === 0) return null;

  const handleExportCSV = () => {
    const headers = ['Process', 'Completion Time', 'Turnaround Time', 'Waiting Time', 'Response Time'];
    const rows = processStats.map(p => [p.id, p.completionTime, p.turnaroundTime, p.waitingTime, p.responseTime]);
    const avgRow = ['Average', '-', metrics.avgTurnaroundTime, metrics.avgWaitingTime, metrics.avgResponseTime];

    const csvContent = [headers.join(','), ...rows.map(r => r.join(',')), avgRow.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `process_results_${algorithmName.toLowerCase().replace(/\s+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card process-results-card">
      <div className="card-header">
        <div className="card-header-title">
          <List size={20} className="header-icon-blue" />
          <h2 className="card-title">Process results</h2>
        </div>

        <button
          type="button"
          className="btn-export-csv"
          onClick={handleExportCSV}
          title="Download results as CSV"
        >
          <Download size={14} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="card-body">
        <div className="table-wrapper">
          <table className="ui-table results-ui-table">
            <thead>
              <tr>
                <th>Process</th>
                <th>Completion Time</th>
                <th>Turnaround Time</th>
                <th>Waiting Time</th>
                <th>Response Time</th>
              </tr>
            </thead>
            <tbody>
              {processStats.map((proc) => (
                <tr key={proc.id}>
                  <td>
                    <div className="process-id-cell">
                      <span
                        className="process-dot"
                        style={{ backgroundColor: proc.color }}
                      />
                      <span className="process-name">{proc.id}</span>
                    </div>
                  </td>
                  <td>{proc.completionTime}</td>
                  <td>{proc.turnaroundTime}</td>
                  <td>{proc.waitingTime}</td>
                  <td>{proc.responseTime}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="results-footer-row">
                <td className="footer-label-cell">Average</td>
                <td className="text-muted">-</td>
                <td className="font-semibold">{metrics.avgTurnaroundTime} ms</td>
                <td className="font-semibold">{metrics.avgWaitingTime} ms</td>
                <td className="font-semibold">{metrics.avgResponseTime} ms</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

