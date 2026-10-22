import React from 'react';
import { List, Pencil, Trash2, Plus } from 'lucide-react';
import { PROCESS_COLORS } from '../algorithms/types.js';

export default function ProcessesCard({
  processes,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteProcess
}) {
  return (
    <div className="card processes-card">
      <div className="card-header">
        <div className="card-header-title">
          <List size={20} className="header-icon-blue" />
          <h2 className="card-title">Processes</h2>
        </div>
      </div>

      <div className="card-body">
        <div className="table-wrapper">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Process</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                <th>Priority</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {processes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-row-text">
                    No processes added. Click "+ Add process" below.
                  </td>
                </tr>
              ) : (
                processes.map((proc, index) => {
                  const color = proc.color || PROCESS_COLORS[index % PROCESS_COLORS.length];
                  return (
                    <tr key={proc.id || index}>
                      <td>
                        <div className="process-id-cell">
                          <span
                            className="process-dot"
                            style={{ backgroundColor: color }}
                          />
                          <span className="process-name">{proc.id}</span>
                        </div>
                      </td>
                      <td>{proc.arrivalTime}</td>
                      <td>{proc.burstTime}</td>
                      <td>{proc.priority}</td>
                      <td>
                        <div className="actions-cell">
                          <button
                            type="button"
                            className="action-btn edit-btn"
                            onClick={() => onOpenEditModal(index)}
                            title={`Edit ${proc.id}`}
                            aria-label={`Edit ${proc.id}`}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            type="button"
                            className="action-btn delete-btn"
                            onClick={() => onDeleteProcess(index)}
                            title={`Delete ${proc.id}`}
                            aria-label={`Delete ${proc.id}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          className="add-process-btn"
          onClick={onOpenAddModal}
        >
          <Plus size={16} />
          <span>Add process</span>
        </button>
      </div>
    </div>
  );
}

