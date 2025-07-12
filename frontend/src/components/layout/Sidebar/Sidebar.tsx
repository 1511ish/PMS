import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import Button from '../../ui/Button/Button.tsx';
import AddOrEditProjectModal from '../../modals/AddOrEditProjectModal/AddOrEditProjectModal.tsx'
import LogoutModal from '../../modals/LogoutModal/Logout.js';
import { Project } from '../../../types/Project.ts';
import { useAuth } from '../../../context/AuthContext.tsx';


export default function Sidebar({
    projects,
    activeTab,
    setActiveTab,
    onDeleteProject,
    onAddProject,
    onEditProject
}: {
    projects: Project[];
    activeTab: string | null;
    setActiveTab: (id: string) => void;
    onDeleteProject: (id: string) => void;
    onAddProject: (data: Project) => void;
    onEditProject: (data: Project) => void;
}) {
    const { setToken } = useAuth();
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showLogoutModal, setshowLogoutModal] = useState(false);
    const [editProject, setEditProject] = useState<Project | false>(false);

    return (
        <div className={styles.sidebar}>
            <div className={styles.upperSection}>
                <Button onClick={() => setShowProjectModal(true)}>+ Add Project</Button>
            </div>

            <div className={styles.lowerSection}>
                <section>
                    <div className={styles.sectionTitle}>Projects</div>
                    <ul>
                        {projects.map((project) => (
                            <li
                                key={project._id}
                                className={`${styles.menuItem} ${activeTab === project._id ? styles.active : ''
                                    }`}
                                onClick={() => {
                                    if (project._id) {
                                        setActiveTab(project._id);
                                    }
                                }}
                            >
                                <span>{project.title}</span>

                                <div className={styles.projectActions}>
                                    <button
                                        className={styles.editBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditProject(project);
                                        }}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (project._id) {
                                                onDeleteProject(project._id);
                                            }
                                        }
                                        }
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <div className={styles.sectionTitle}>Others</div>
                    <div className={styles.menuItem} onClick={() => { setshowLogoutModal(true) }}>
                        <div
                            style={
                                {
                                    display: 'flex',
                                    alignItems: 'center',
                                }
                            }>
                            <img src="/icons/logout2x.png" alt="Logout" className={styles.icon} />
                            Logout
                        </div>
                        {showLogoutModal && (
                                <LogoutModal onCancel={() => setshowLogoutModal(false)} onLogout={() => { setToken(null) }} />
                        )}
                    </div>
                </section>
            </div>

            {showProjectModal && (
                <AddOrEditProjectModal
                    onClose={() => setShowProjectModal(false)}
                    onSave={(data) => {
                        onAddProject(data);
                        setShowProjectModal(false);
                    }}
                />
            )}

            {editProject && (
                <AddOrEditProjectModal
                    onClose={() => setEditProject(false)}
                    project={editProject}
                    onSave={(data) => {
                        onEditProject(data);
                    }}
                />
            )}

        </div>
    );
}
