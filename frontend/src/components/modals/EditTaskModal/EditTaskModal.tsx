import React, { useState, useEffect } from 'react';
import styles from './EditTaskModal.module.css'; // ✅ Reusing styles
import { useAuth } from '../../../context/AuthContext.tsx';
import axios from 'axios';


type EditTaskModalProps = {
  onClose: () => void;
  onSave: (updatedTask: any) => void;
  task: any;
};

const EditTaskModal: React.FC<EditTaskModalProps> = ({ onClose, onSave, task}) => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    dueDate: '',
  });

  useEffect(() => {
    console.log("task: ", task);
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isFormValid = () => {
    return form.title.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const { title, description, status, dueDate } = form;

    const payload = {
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(response.data);
      onSave(response.data); // return updated task
    } catch (err: any) {
      console.error('Error updating task:', err.message);
    }

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Edit Task</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input
              name="title"
              type="text"
              placeholder="Task Title*"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className={styles.row}>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className={styles.row}>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <input
              name="dueDate"
              type="date"
              placeholder="Due Date"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>

          <button
            className={styles.saveBtn}
            type="submit"
            disabled={!isFormValid()}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
