import React, { useState, useEffect } from 'react';
import { Project } from '../../../types/Project';
import styles from './AddOrEditProjectModal.module.css';

type AddOrEditProjectModalProps = {
  onClose: () => void;
  onSave: (data: Project) => void;
  project?: Project; // optional for editing
};

const AddOrEditProjectModal: React.FC<AddOrEditProjectModalProps> = ({ onClose, onSave, project }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setDescription(project.description || '');
      setStatus(project.status || 'active');
    }
  }, [project]);

  const isFormValid = () => {
    return title.trim() !== '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const formData: Project = {
      ...(project?._id ? { _id: project._id } : {}),
      title,
      description,
      status,
    };

    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{project ? 'Edit Project' : 'Add New Project'}</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input
              name="title"
              type="text"
              placeholder="Project Title*"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

          <div className={styles.row}>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            className={styles.saveBtn}
            type="submit"
            disabled={!isFormValid()}
          >
            {project ? 'Save' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditProjectModal;
