import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MainContent.module.css';
import { useAuth } from '../../../context/AuthContext.tsx';
import Card from '../../ui/Card/Card.tsx';
import Button from '../../ui/Button/Button.tsx';
import ModalPortal from '../../ui/ModalPortal/ModalPortal.js';
import AddTaskModal from '../../modals/AddTaskModal/AddTaskModal.tsx';
import EditTaskModal from '../../modals/EditTaskModal/EditTaskModal.tsx';
import TaskTable from './TaskTable.tsx';
import { Project } from '../../../types/Project.ts';
import { Task } from '../../../types/Task.ts';


export default function MainContent({
  project,
  activeTab,
}: {
  project: Project | undefined;
  activeTab: string | null;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | false>(false);
  const { token } = useAuth();

  useEffect(() => {
    if (activeTab) {
      fetchTasks(activeTab);
    }
  }, [activeTab]);

  const fetchTasks = async (projectId: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async (task: Task) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/tasks/`,
        { ...task, project: activeTab },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(prev => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (err: any) {
      console.error('Error deleting task:', err.message);
    }
  };

  const handleSave = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task => (task._id === updatedTask._id ? updatedTask : task))
    );
    setEditTask(false);
  };

  if (!activeTab) return <div>Select a project to see details</div>;
  if (!project) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Card>
          <div className={styles.projectCardHeader}>
            <h2>{project.title}</h2>
            <span className={`${styles.status} ${styles[project.status]}`}>
              {project.status}
            </span>
          </div>
          <p className={styles.projectDescription}>{project.description}</p>
        </Card>

        <div className={styles.tasksHeader}>
          <h3>Tasks</h3>
          <Button onClick={() => setShowAddModal(true)}>+ Add Task</Button>
        </div>

        <TaskTable
          tasks={tasks}
          onEdit={setEditTask}
          onDelete={handleDelete}
        />

        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onSave={(taskData) => {
              addTask(taskData);
              setShowAddModal(false);
            }}
          />
        )}

        {editTask && (

          <EditTaskModal
            task={editTask}
            onClose={() => setEditTask(false)}
            onSave={handleSave}
          />

        )}
      </div>
    </div>
  );
}
