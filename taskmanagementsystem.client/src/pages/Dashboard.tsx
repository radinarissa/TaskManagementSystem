import React, { useState, useEffect } from 'react';
import { Task } from '../models/task';
import { taskService } from '../services/task-service';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await taskService.getTasks();
            setTasks(data);
            setError('');
        } catch (err: any) {
            setError('Error fetching tasks: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await taskService.deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err: any) {
            setError('Error deleting task: ' + err.message);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    const handleFormSubmit = async (taskData: any) => {
        try {
            if (editingTask) {
                await taskService.updateTask(editingTask.id, taskData);
            } else {
                await taskService.createTask(taskData);
            }
            fetchTasks();
            setShowForm(false);
            setEditingTask(null);
        } catch (err: any) {
            setError('Error saving task: ' + err.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Task Dashboard</h1>
                <button
                    className="btn btn-primary"
                    onClick={handleCreateTask}
                >
                    Add New Task
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <TaskList
                    tasks={tasks}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                />
            )}

            {showForm && (
                <TaskForm
                    task={editingTask}
                    onSubmit={handleFormSubmit}
                    onClose={handleFormClose}
                />
            )}
        </div>
    );
};

export default Dashboard;