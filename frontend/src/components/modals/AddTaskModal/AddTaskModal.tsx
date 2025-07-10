import React, { useState } from 'react';
import styles from '../AddOrEditProjectModal/AddOrEditProjectModal.module.css';
import {Task} from '../../../types/Task.ts';

type AddTaskModalProps = {
    onClose: () => void;
    // onSave: (data: { title: string; description: string; status: string }) => void;
    onSave: (data: Task) => void;
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');

    const isFormValid = () => {
        return title.trim() !== '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) return;

        const formData = { title, description, status, dueDate };
        onSave(formData);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Add New Task</h3>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <input
                            name="title"
                            type="text"
                            placeholder="Task Title*"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className={styles.row}>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Task Description"
                        />
                    </div>

                    <div className={styles.row}>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <div className={styles.row}>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <button
                        className={styles.saveBtn}
                        type="submit"
                        disabled={!isFormValid()}
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
