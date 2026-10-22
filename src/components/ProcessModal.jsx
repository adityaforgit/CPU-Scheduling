import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function ProcessModal({
  isOpen,
  mode = 'add', // 'add' | 'edit'
  initialData = null,
  onClose,
  onSave
}) {
  const [id, setId] = useState('');
  const [arrivalTime, setArrivalTime] = useState(0);
  const [burstTime, setBurstTime] = useState(1);
  const [priority, setPriority] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setId(initialData.id || '');
      setArrivalTime(initialData.arrivalTime ?? 0);
      setBurstTime(initialData.burstTime ?? 1);
      setPriority(initialData.priority ?? 1);
    } else {
      setId('');
      setArrivalTime(0);
      setBurstTime(1);
      setPriority(1);
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id.trim()) {
      setError('Please provide a Process ID (e.g., P1).');
      return;
    }
    if (arrivalTime < 0 || isNaN(arrivalTime)) {
      setError('Arrival Time must be 0 or greater.');
      return;
    }
    if (burstTime <= 0 || isNaN(burstTime)) {
      setError('Burst Time must be a positive integer (greater than 0).');
      return;
    }
    if (isNaN(priority)) {
      setError('Priority must be a valid number.');
      return;
    }

    onSave({
      id: id.trim(),
      arrivalTime: Number(arrivalTime),
      burstTime: Number(burstTime),
      priority: Number(priority)
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <h3 className="modal-title-text">
            {mode === 'add' ? 'Add New Process' : `Edit Process ${initialData?.id || ''}`}
          </h3>
          <button type="button" className="modal-x-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-body">
          {error && <div className="modal-error-banner">{error}</div>}

          <div className="form-field-group">
            <label htmlFor="proc-id" className="form-field-label">Process ID</label>
            <input
              id="proc-id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="e.g. P4"
              className="form-text-input"
              required
            />
          </div>

          <div className="form-row-2col">
            <div className="form-field-group">
              <label htmlFor="proc-at" className="form-field-label">Arrival Time</label>
              <input
                id="proc-at"
                type="number"
                min="0"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="form-text-input"
                required
              />
            </div>

            <div className="form-field-group">
              <label htmlFor="proc-bt" className="form-field-label">Burst Time</label>
              <input
                id="proc-bt"
                type="number"
                min="1"
                value={burstTime}
                onChange={(e) => setBurstTime(e.target.value)}
                className="form-text-input"
                required
              />
            </div>
          </div>

          <div className="form-field-group">
            <label htmlFor="proc-priority" className="form-field-label">Priority</label>
            <input
              id="proc-priority"
              type="number"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="form-text-input"
              required
            />
          </div>

          <div className="modal-actions-bar">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit-save">
              <Check size={16} />
              <span>{mode === 'add' ? 'Add Process' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

