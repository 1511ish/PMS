import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar/Sidebar.tsx';
import MainContent from '../layout/MainContent/MainContent.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { Project } from '../../types/Project.ts';
import styles from './Dashboard.module.css';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { token, setToken } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/projects`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects(res.data);
      if (!activeTab && res.data.length > 0) {
        setActiveTab(res.data[0]._id);
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setToken(null);
      }
    }
  };

  const addProject = async (projectData: {
    title: string;
    description: string;
    status: string;
  }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/projects`,
        projectData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects((prev) => [...prev, res.data]);
      setActiveTab(res.data._id);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setToken(null);
      }
    }
  };

  const editProject = async (updatedProject: Project) => {
    try {
      const { _id, ...updatedData } = updatedProject;
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/projects/${_id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects((prev) =>
        prev.map((p) => (p._id === _id ? res.data : p))
      );
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setToken(null);
      }
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/projects/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      if (activeTab === projectId) {
        setActiveTab(null);
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setToken(null);
      }
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar
        projects={projects}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddProject={addProject}
        onEditProject={editProject}
        onDeleteProject={handleDeleteProject}
      />
      <MainContent
        activeTab={activeTab}
        project={projects.find((p) => p._id === activeTab)}
      />
    </div>
  );
};

export default Dashboard;
