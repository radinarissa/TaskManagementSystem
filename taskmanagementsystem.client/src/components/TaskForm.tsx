import React, { useState, useEffect } from 'react';
import { Task, Priority, Status } from '../models/task';

interface TaskFormProps {
    task: Task | null;
    onSubmit: (taskData: any) => void;
    onClose: () => void;
}

// В реалното приложение бихме извличали тези данни от API
const priorities: Priority[] = [
    { id: 1, name: 'Low', color: '#28a745' },
    { id: 2, name: 'Medium', color: '#ffc107' },
    { id: 3, name: 'High', color: '#dc3545' }
];

const statuses: Status[] = [
    { id: 1, name: 'New' },
    { id: 2, name: 'Open' },
    { id: 3, name: 'InProgress' },
    { id: 4, name: 'Resolved' },
    { id: 5, name: 'Closed' }
];

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priorityId, setPriorityId] = useState(1);
    const [statusId, setStatusId] = useState(1);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
            setPriorityId(task.priorityId);
            setStatusId(task.statusId);
        }
    }, [task]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required';
        } else if (title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const taskData = {
            title,
            description,
            dueDate: dueDate || null,
            priorityId,
            statusId
        };

        onSubmit(taskData);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{task ? 'Edit Task' : 'Create New Task'}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="dueDate" className="form-label">Due Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dueDate"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="priority" className="form-label">Priority</label>
                                <select
                                    className="form-select"
                                    id="priority"
                                    value={priorityId}
                                    onChange={(e) => setPriorityId(Number(e.target.value))}
                                >
                                    {priorities.map(priority => (
                                        <option key={priority.id} value={priority.id}>
                                            {priority.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select
                                    className="form-select"
                                    id="status"
                                    value={statusId}
                                    onChange={(e) => setStatusId(Number(e.target.value))}
                                >
                                    {statuses.map(status => (
                                        <option key={status.id} value={status.id}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;